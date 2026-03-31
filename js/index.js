import { loadCourses } from './courses.js';

const INDEX_API_BASE_URL = `http://${window.location.hostname}:3000`;

function normalizeUrl(value) {
    const raw = String(value || '').trim();
    if (!raw) {
        return '';
    }

    if (/^https?:\/\//i.test(raw)) {
        return raw;
    }

    return `https://${raw}`;
}

function buildLinkOrPlaceholder(url, text) {
    const href = normalizeUrl(url);
    if (!href) {
        const span = document.createElement('span');
        span.textContent = 'Not set';
        return span;
    }

    const link = document.createElement('a');
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = text;
    return link;
}

function createLectureBox(course) {
    const box = document.createElement('div');
    box.className = 'coursebox';
    box.style.setProperty('--course-color', course.color || '#666');

    const title = document.createElement('h3');
    title.textContent = course.name || course.code || 'Unnamed course';

    const lectureRow = document.createElement('p');
    lectureRow.append('Lectures: ');
    lectureRow.appendChild(buildLinkOrPlaceholder(course.lectures, 'View lectures'));

    const recordingRow = document.createElement('p');
    recordingRow.append('Recordings: ');
    recordingRow.appendChild(buildLinkOrPlaceholder(course.recordings, 'View recordings'));

    box.appendChild(title);
    box.appendChild(lectureRow);
    box.appendChild(recordingRow);

    return box;
}

async function loadLectureLinks() {
    const container = document.getElementById('lectureLinks');
    if (!container) {
        return;
    }

    try {
        const response = await fetch(`${INDEX_API_BASE_URL}/api/courses`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const courses = await response.json();
        const visibleCourses = courses.filter((course) => Number(course.passed) !== 1);

        container.innerHTML = '';

        if (visibleCourses.length === 0) {
            const emptyState = document.createElement('p');
            emptyState.textContent = 'No lecture links yet.';
            container.appendChild(emptyState);
            return;
        }

        visibleCourses.forEach((course) => {
            container.appendChild(createLectureBox(course));
        });
    } catch (error) {
        console.error('Error fetching lecture links:', error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    loadCourses();
    loadLectureLinks();
});
