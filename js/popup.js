const API_BASE_URL = `http://${window.location.hostname}:3000`;

function rancolor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function openPopup() {
    const popup = document.getElementById('addcoursepopup');
    if (popup) {
        popup.style.display = 'flex';
    }
}

function closePopup() {
    const popup = document.getElementById('addcoursepopup');
    if (popup) {
        popup.style.display = 'none';
    }
}

async function addCourse() {
    const codeEl = document.getElementById('code');
    const nameEl = document.getElementById('name');
    const creditsEl = document.getElementById('credits');
    const lecturesEl = document.getElementById('lectures');
    const recordingsEl = document.getElementById('recordings');

    if (!codeEl || !nameEl || !creditsEl || !lecturesEl || !recordingsEl) {
        return;
    }

    const code = codeEl.value.trim();
    const name = nameEl.value.trim();
    const credits = creditsEl.value.trim();
    const lectures = lecturesEl.value.trim();
    const recordings = recordingsEl.value.trim();

    if (!code || !name || !credits || !lectures || !recordings) {
        alert('Fill in all course fields before adding.');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code,
                name,
                credits,
                lectures,
                recordings,
                passed: 0,
                color: rancolor(),
                grade: null
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const message = errorData.error || 'Failed to save course';
            alert(message);
            return;
        }
    } catch (_error) {
        alert('Could not connect to backend. Is server running?');
        return;
    }

    closePopup();
    codeEl.value = '';
    nameEl.value = '';
    creditsEl.value = '';
    lecturesEl.value = '';
    recordingsEl.value = '';

    if (typeof window.loadCourses === 'function') {
        window.loadCourses();
    }
}

function initPopup() {
    const openBtn = document.getElementById('openPopupBtn');
    const addBtn = document.getElementById('addCourseBtn');
    const cancelBtn = document.getElementById('cancelPopupBtn');
    const popup = document.getElementById('addcoursepopup');

    if (popup) {
        popup.style.display = 'none';
    }

    if (openBtn) {
        openBtn.addEventListener('click', openPopup);
    }

    if (addBtn) {
        addBtn.addEventListener('click', addCourse);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closePopup);
    }

    if (popup) {
        popup.addEventListener('click', function (event) {
            if (event.target === popup) {
                closePopup();
            }
        });
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closePopup();
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPopup);
} else {
    initPopup();
}
