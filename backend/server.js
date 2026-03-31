const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: __dirname + '/.env' });

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const dbConfig = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	connectionLimit: 10,
	queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

async function initDatabase() {
	await pool.query(`
		CREATE TABLE IF NOT EXISTS courses (
			code VARCHAR(45) NOT NULL PRIMARY KEY,
			name VARCHAR(100) NOT NULL,
			credits INT NOT NULL,
			recordings VARCHAR(255) NOT NULL,
			lectures VARCHAR(255) NOT NULL,
			passed TINYINT(1) NOT NULL DEFAULT 0,
			color varchar(10) NOT NULL DEFAULT '#ff0000'
		)
	`);
}

app.get('/api/health', (_req, res) => {
	res.json({ ok: true });
});

app.get('/api/courses', async (_req, res) => {
	try {
		const [rows] = await pool.query('SELECT * FROM courses');
		res.json(rows);
	} catch (error) {
		console.error('Error fetching courses:', error);
		res.status(500).json({ error: 'Failed to fetch courses' });
	}
});

app.post('/api/courses', async (req, res) => {
	const {
		code,
		name,
		credits,
        recordings,
		lectures,
		passed,
		color
	} = req.body || {};	

	const courseOp = credits;
	const courseLecture = lectures;
	const courseRecodings = recordings;
	const coursePassed = passed ?? 0;

	if (!code || !name || courseOp === undefined || courseOp === null || courseOp === '') {
		return res.status(400).json({ error: 'code, name and op are required' });
	}

	const parsedOp = Number(courseOp);
	if (!Number.isInteger(parsedOp) || parsedOp < 0) {
		return res.status(400).json({ error: 'op must be a non-negative integer' });
	}

	const parsedPassed = Number(coursePassed);
	if (!(parsedPassed === 0 || parsedPassed === 1)) {
		return res.status(400).json({ error: 'passed must be 0 or 1' });
	}

	try {
		await pool.execute(
			`INSERT INTO courses (code, name, credits, recordings, lectures, passed, color)
			 VALUES (?, ?, ?, ?, ?, ?, ?)`,
			[
				String(code).trim(),
				String(name).trim(),
				parsedOp,
				String(courseRecodings).trim(),
				String(courseLecture).trim(),
				parsedPassed,
				String(color).trim()
			]
		);

		return res.status(201).json({
			message: 'Course saved successfully',
			code: String(code).trim()
		});
	} catch (error) {
		if (error && error.code === 'ER_DUP_ENTRY') {
			return res.status(409).json({ error: 'Course code already exists' });
		}

		console.error('Error saving course:', error);
		return res.status(500).json({ error: 'Failed to save course' });
	}
});

app.patch('/api/courses/:code/passed', async (req, res) => {
	const code = String(req.params.code || '').trim();

	if (!code) {
		return res.status(400).json({ error: 'course code is required' });
	}

	try {
		const [result] = await pool.execute(
			'UPDATE courses SET passed = 1 WHERE code = ? AND passed = 0',
			[code]
		);

		if (result.affectedRows === 0) {
			return res.status(404).json({ error: 'Course not found or already passed' });
		}

		return res.json({
			message: 'Course marked as passed',
			code
		});
	} catch (error) {
		console.error('Error updating course passed flag:', error);
		return res.status(500).json({ error: 'Failed to update course status' });
	}
});

app.get('/api/courses/:passed', async (req, res) => {
	const { passed } = req.params;

	if (passed !== 'true' && passed !== 'false') {
		return res.status(400).json({ error: 'Invalid passed parameter. Use true or false.' });
	}

	try {
		const [rows] = await pool.query('SELECT name, recordings, lectures FROM courses WHERE passed = ?', [passed === 'true' ? 1 : 0]);
		res.json(rows);
	} catch (error) {
		console.error('Error fetching courses:', error);
		res.status(500).json({ error: 'Failed to fetch courses' });
	}
});

async function startServer() {
	try {
		await initDatabase();
		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error('Failed to initialize server:', error);
		process.exit(1);
	}
}

startServer();
