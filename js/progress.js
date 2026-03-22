function setProgress(done, max) {
    const circle = document.querySelector('.progress-ring__progress');
    if (!circle || max <= 0) {
        return;
    }

    const radius = Number(circle.getAttribute('r'));
    const circumference = 2 * Math.PI * radius;
    const percent = done / max;
    const offset = circumference * (1 - percent);

    circle.style.strokeDasharray = String(circumference);
    circle.style.strokeDashoffset = String(offset);

    const doneEl = document.getElementById('done');
    if (doneEl) {
        doneEl.textContent = String(done);
    }
}