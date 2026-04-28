const grade_API_BASE_URL = `http://${window.location.hostname}:3000`;

function loadGrade() {
    const circle = document.querySelector('.progress-ring__grade');
    if (!circle) {
        return;
    }

    fetch(`${grade_API_BASE_URL}/api/grade`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        })
        .then((payload) => {
            setGrade(payload.averageGrade, payload.maxGrade);
        })
        .catch((error) => {
            console.error('Error fetching grade:', error);
        });
}

function setGrade(grade) {
    const circle = document.querySelector('.progress-ring__grade');
    if (!circle) {
        return;
    }
    const maxValue = 5;
    const gradeValue = Number(grade) || 0;
    const radius = Number(circle.getAttribute('r'));
    const circumference = 2 * Math.PI * radius;
    const percent = Math.max(0, Math.min(1, gradeValue / maxValue));
    const offset = circumference * (1 - percent);

    circle.style.strokeDasharray = String(circumference);
    circle.style.strokeDashoffset = String(circumference);

    requestAnimationFrame(() => {
        circle.style.strokeDashoffset = String(offset);
    });

    const gradeEl = document.getElementById('grade');
    if (gradeEl) {
        gradeEl.textContent = String(Number(gradeValue.toFixed(2)));
    }

    const maxEl = document.getElementById('maxGrade');
    if (maxEl) {
        maxEl.textContent = String(maxValue);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadGrade);
} else {
    loadGrade();
}