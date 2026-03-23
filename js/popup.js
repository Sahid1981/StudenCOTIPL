document.addEventListener('DOMContentLoaded', function () {
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
});

window.openPopup = openPopup;
window.closePopup = closePopup;
window.addCourse = addCourse;

function openPopup() {
    const popup = document.getElementById('addcoursepopup');
    if (popup) {
        popup.style.display = 'block';
    }
}

function closePopup() {
    const popup = document.getElementById('addcoursepopup');
    if (popup) {
        popup.style.display = 'none';
    }
}

function addCourse() {
    const codeEl = document.getElementById('code');
    const nameEl = document.getElementById('name');
    const lecturesEl = document.getElementById('lectures');
    const recordingsEl = document.getElementById('recordings');

    if (!codeEl || !nameEl || !creditsEl) {
        return;
    }

    const code = codeEl.value.trim();
    const name = nameEl.value.trim();
    const credits = creditsEl.value.trim();

    if (!code || !name || !credits) {
        alert('Fill in all course fields before adding.');
        return;
    }

    closePopup();
    codeEl.value = '';
    nameEl.value = '';
    creditsEl.value = '';
}
