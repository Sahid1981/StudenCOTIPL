const progress_API_BASE_URL = `http://${window.location.hostname}:3000`;

function loadProgress() {
    const circle = document.querySelector('.progress-ring__progress');
    if (!circle) {
        return;
    }

    fetch(`${progress_API_BASE_URL}/api/progress`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        })
        .then((progress) => {
            setProgress(progress.done, progress.max);
        })
        .catch((error) => {
            console.error('Error fetching progress:', error);
        });
}

function setProgress(done) {
    const circle = document.querySelector('.progress-ring__progress');
    if (!circle) {
        return;
    }
    const maxValue = 270;
    const doneValue = Number(done) || 0;
    const radius = Number(circle.getAttribute('r'));
    const circumference = 2 * Math.PI * radius;
    const percent = Math.max(0, Math.min(1, doneValue / maxValue));
    const offset = circumference * (1 - percent);

    
    circle.style.strokeDasharray = String(circumference);
    circle.style.strokeDashoffset = String(circumference);

    requestAnimationFrame(() => {
        circle.style.strokeDashoffset = String(offset);
    });

    const doneEl = document.getElementById('done');
    if (doneEl) {
        doneEl.textContent = String(doneValue);
    }

    const maxEl = document.getElementById('max');
    if (maxEl) {
        maxEl.textContent = String(maxValue);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProgress);
} else {
    loadProgress();
}