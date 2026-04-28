const COURSES_API_BASE_URL = `http://${window.location.hostname}:3000`;

export async function loadCourses() {
    const currentEl = document.getElementById('current');
    const passedEl = document.getElementById('passed');

    if (!currentEl || !passedEl) {
        return;
    }

    try {
        const response = await fetch(`${COURSES_API_BASE_URL}/api/courses`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const courses = await response.json();
        currentEl.innerHTML = '';
        passedEl.innerHTML = '';

        courses.forEach((course) => createBox(course, currentEl, passedEl));
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
}

async function markCoursePassed(code) {
    const input = window.prompt('Enter grade (0-5):');
    if (input === null) {
        return;
    }

    const grade = Number(input.trim());
    if (!Number.isInteger(grade) || grade < 0 || grade > 5) {
        alert('Grade must be an integer between 0 and 5.');
        return;
    }

    try {
        const response = await fetch(
            `${COURSES_API_BASE_URL}/api/courses/${encodeURIComponent(code)}/passed`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ grade })
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const message = errorData.error || 'Failed to mark course as passed';
            alert(message);
            return;
        }

        loadCourses();
    } catch (_error) {
        alert('Could not connect to backend. Is server running?');
    }
}

function createBox(course, currentEl, passedEl) {
    const box = document.createElement('div');
    box.className = 'coursebox';
    box.style.setProperty('--course-color', course.color || '#666');
    box.innerHTML = `
        <h3>${course.code} - ${course.name}</h3>
        <p>Credits: ${course.credits}</p>

    `;

    if (Number(course.passed) !== 1) {
        const actions = document.createElement('div');
        actions.className = 'course-actions';

        const passedButton = document.createElement('button');
        passedButton.className = 'course-pass-btn';
        passedButton.type = 'button';
        passedButton.textContent = 'Passed';
        passedButton.color = '#ff0000';
        passedButton.addEventListener('click', () => markCoursePassed(course.code));

        actions.appendChild(passedButton);
        box.appendChild(actions);
    }

    if (Number(course.passed) === 1) {
        passedEl.appendChild(box);
    } else {
        currentEl.appendChild(box);
    }
}

document.addEventListener('DOMContentLoaded', loadCourses);
window.loadCourses = loadCourses;
document.addEventListener('course-added', loadCourses);