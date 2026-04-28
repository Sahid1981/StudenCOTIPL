# StudenCOTIPL

A full-stack student productivity application developed for planning studies, tracking progress, and organizing course-related links in one place.

This system combines:

![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white)

The project demonstrates frontend-backend integration, RESTful API design, database persistence, and practical student workflow tooling.

## Table of Contents

- [Project Overview](#studencotipl)
- [System Architecture](#system-architecture)
- [Project Goals](#project-goals)
- [Features Implemented](#features-implemented)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Usage](#frontend-usage)
- [API Endpoints](#api-endpoints)
- [Security and Validation](#security-and-validation)
- [Future Improvements](#future-improvements)
- [Guidance and References](#guidance-and-references)
- [License](#license)

# System Architecture

```text
+------------------------------+
|  Static Frontend (HTML/CSS)  |
|  + Vanilla JS Modules        |
+--------------+---------------+
			   |
		       | HTTP (JSON)
               v
+------------------------------+
|  Node.js REST API            |
|  (Express)                   |
+--------------+---------------+
			   |
			   | SQL Queries
			   v
+------------------------------+
|  MySQL Database              |
|  (courses table)             |
+------------------------------+
```

### Communication Flow

1. User opens frontend pages (Home, Courses, Timetable)
2. Frontend sends API requests to backend (`/api/*`)
3. Backend validates input and executes MySQL operations
4. JSON response is returned and rendered in UI components

<div align="right">
<a href="#table-of-contents">Back to top</a>
</div>

# Project Goals

- Help students manage current and completed courses
- Track total completed credits toward degree target
- Track average grade visually
- Store lecture and recording links per course
- Offer a clean and responsive multi-page interface
- Keep backend simple, readable, and extensible

<div align="right">
<a href="#table-of-contents">Back to top</a>
</div>

# Features Implemented

## Core Features

- Multi-page frontend: Home, Courses, Timetable
- Add new course via popup form
- Mark course as passed and assign grade (0-5)
- Separate lists for current and passed courses
- Progress ring for completed credits (out of 270)
- Grade ring for average grade (out of 5)
- Lecture and recording quick links on home page
- Embedded timetable view via Google Calendar iframe

## Backend Features

- Health endpoint for backend status check
- Create/read/update course operations
- Filtering courses by passed status
- Progress calculation endpoint
- Average grade calculation endpoint
- Auto-initialize table and index on startup

<div align="right">
<a href="#table-of-contents">Back to top</a>
</div>

# Technologies Used

## Backend

- Node.js
- Express
- MySQL
- dotenv
- cors

## Frontend

- HTML
- CSS
- JavaScript
- Font Awesome (icons)

<div align="right">
<a href="#table-of-contents">Back to top</a>
</div>

# Project Structure

```text
StudenCOTIPL/
	backend/
		server.js
		seed.sql
		.env
	css/
		style.css
	js/
		courses.js
		grade.js
		index.js
		popup.js
		progress.js
	image/
	index.html
	courses.html
	timetable.html
```

<div align="right">
<a href="#table-of-contents">Back to top</a>
</div>

# Backend Setup

## 1. Install dependencies

```bash
npm install
```

## 2. Create environment file

Create a file at `backend/.env` with:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=cotipl
PORT=3000
```

## 3. Initialize database (optional)

You can manually set up the database using the seed file before starting the backend:

Linux/macOS:
```bash
mysql -u root -p < backend/seed.sql
```

Windows PowerShell:
```powershell
Get-Content backend/seed.sql | mysql -u root -p
```

The seed file creates:
- The `cotipl` database
- The `courses` table with full schema

Important: the backend does not create the database itself. Import the seed file first, then start the backend.

## 4. Start backend

```bash
npm start
```

Backend runs at:

```text
http://localhost:3000
```

## 5. Verify backend health

Open:

```text
http://localhost:3000/api/health
```

<div align="right">
<a href="#table-of-contents">Back to top</a>
</div>

# Frontend Usage

1. Start the backend first
2. Open `http://localhost:3000/` in browser
3. Navigate to Courses page to add and update courses
4. Return to Home page to monitor credits and grade metrics
5. Use Timetable page for weekly calendar view


<div align="right">
<a href="#table-of-contents">Back to top</a>
</div>

# API Endpoints

- `GET /api/health` -> backend status
- `GET /api/courses` -> list all courses
- `GET /api/courses?passed=true|false` -> filter by status
- `POST /api/courses` -> create a course
- `PATCH /api/courses/:code/passed` -> mark passed and set grade
- `GET /api/progress` -> completed credits summary
- `GET /api/grade` -> average grade summary

<div align="right">
<a href="#table-of-contents">Back to top</a>
</div>

# Security and Validation

- Input validation for required fields in API endpoints
- Grade validation constrained to integer range 0-5
- Duplicate course code protection through primary key constraints
- Server-side error handling with meaningful HTTP statuses

<div align="right">
<a href="#table-of-contents">Back to top</a>
</div>

# Future Improvements

- Authentication and user-specific course data
- Edit/delete course operations in UI
- Search, sorting, and filtering on course lists
- Unit/integration tests for backend API
- Docker-based local environment
- CI pipeline for linting and tests

<div align="right">
<a href="#table-of-contents">Back to top</a>
</div>

# Guidance and References

The following pages and tools were used for guidance, inspiration, and help while building the project:

- [YouTube: page design inspiration](https://www.youtube.com/watch?v=0YFrGy_mzjY)
- [Portfolio site used for page design inspiration](https://sahid1981.github.io/myportfolio/)
- [YouTube: progress and grade meter help](https://www.youtube.com/watch?v=gx9A7JJ095U)
- [Stack Overflow](https://stackoverflow.com/) for code troubleshooting and implementation ideas
- [GitHub Copilot](https://github.com/features/copilot) for graphics and general development support
- [Canva website color schemes](https://www.canva.com/learn/website-color-schemes/) for color palette ideas
- [Visual Studio Code](https://code.visualstudio.com/) for coding
- [Visual Studio](https://visualstudio.microsoft.com/) AI tools for guidance and fixing errors

<div align="right">
<a href="#table-of-contents">Back to top</a>
</div>

# License

This project is developed for educational purposes.

MIT License can be applied if published publicly.

<div align="right">
<a href="#table-of-contents">Back to top</a>
</div>
