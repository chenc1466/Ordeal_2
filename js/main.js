document.querySelectorAll('.chapter-btn').forEach(btn => {
    const ch = btn.getAttribute('data-ch');
    const img = btn.querySelector('img');
    if (btn.classList.contains('lock')) {
        const normalSrc = 'src/lock.png';
        const hoverSrc = 'src/lock_hover.png';
        btn.addEventListener('mouseenter', () => { img.src = hoverSrc; });
        btn.addEventListener('mouseleave', () => { img.src = normalSrc; });
    } else {
        const normalSrc = `src/ch${ch}.png`;
        const hoverSrc = `src/ch${ch}_hover.png`;
        btn.addEventListener('mouseenter', () => { img.src = hoverSrc; });
        btn.addEventListener('mouseleave', () => { img.src = normalSrc; });
    }
});

// circle-btn hover image switch
const taskBtn = document.querySelector('.task-btn img');
const packageBtn = document.querySelector('.package-btn img');
const mailBtn = document.querySelector('.mail-btn img');
if (taskBtn) {
    const normal = 'src/task.png';
    const hover = 'src/task_hover.png';
    taskBtn.parentElement.addEventListener('mouseenter', () => { taskBtn.src = hover; });
    taskBtn.parentElement.addEventListener('mouseleave', () => { taskBtn.src = normal; });
    // 添加點擊事件跳轉到 task.html
    taskBtn.parentElement.addEventListener('click', () => {
        window.location.href = 'task.html';
    });
}
if (packageBtn) {
    const normal = 'src/package.png';
    const hover = 'src/package_hover.png';
    packageBtn.parentElement.addEventListener('mouseenter', () => { packageBtn.src = hover; });
    packageBtn.parentElement.addEventListener('mouseleave', () => { packageBtn.src = normal; });
}
if (mailBtn) {
    const normal = 'src/mail.png';
    const hover = 'src/mail_hover.png';
    mailBtn.parentElement.addEventListener('mouseenter', () => { mailBtn.src = hover; });
    mailBtn.parentElement.addEventListener('mouseleave', () => { mailBtn.src = normal; });
    mailBtn.parentElement.addEventListener('click', () => {
        window.location.href = 'mail.html';
    });
}

// content-box hover show btn name (support when individual buttons exist)
const contentBox = document.querySelector('.content-box');
const taskBtnEl = document.querySelector('.task-btn');
const packageBtnEl = document.querySelector('.package-btn');
const mailBtnEl = document.querySelector('.mail-btn');

function attachLabelHover(btn, label) {
    if (!contentBox || !btn) return;
    const show = () => {
        contentBox.textContent = label;
        contentBox.style.opacity = '1';
        contentBox.style.pointerEvents = 'auto';
    };
    const hide = () => {
        contentBox.style.opacity = '0';
        contentBox.style.pointerEvents = 'none';
    };
    btn.addEventListener('mouseenter', show);
    btn.addEventListener('mouseleave', hide);
    // touch support
    btn.addEventListener('touchstart', (e) => { e.preventDefault(); show(); }, { passive: false });
    btn.addEventListener('touchend', (e) => { e.preventDefault(); hide(); }, { passive: false });
}

attachLabelHover(taskBtnEl, 'Task');
attachLabelHover(mailBtnEl, 'Mail');


// ch btn hover show content box
const chapterBtns = document.querySelectorAll('.chapter-btn');
chapterBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        const ch = btn.getAttribute('data-ch');
        if (btn.classList.contains('lock')) {
            contentBox.textContent = `Oops... It's locked.`;
        } else {
            contentBox.textContent = `Chapter ${ch}`;
        }
        contentBox.style.opacity = '1';
        contentBox.style.pointerEvents = 'auto';
    });
    btn.addEventListener('mouseleave', () => {
        contentBox.style.opacity = '0';
        contentBox.style.pointerEvents = 'none';
    });
});

// 顯示解鎖但未完成的任務數
function updateTaskBadge() {
    const badge = document.getElementById('taskBadge');
    if (!badge) return;
    const tasks = ['B1', 'B2', 'B3', 'B4', 'B6'];
    let count = 0;
    tasks.forEach(key => {
        if (localStorage.getItem(key + '_unlocked') === 'true' && localStorage.getItem(key + '_done') !== 'true') {
            count++;
        }
    });
    if (count > 0) {
        badge.textContent = count;
        badge.style.opacity = '1';
    } else {
        badge.textContent = '';
        badge.style.opacity = '0';
    }
}
document.addEventListener('DOMContentLoaded', updateTaskBadge);
window.addEventListener('storage', updateTaskBadge);

// 顯示未讀信件數
function updateMailBadge() {
    const badge = document.getElementById('mailBadge');
    if (!badge) return;
    let count = 0;
    try {
        const status = JSON.parse(localStorage.getItem('mailStatusV1') || '{}');
        for (const k in status) {
            if (status[k] && status[k].hidden === false && status[k].read === false) count++;
        }
    } catch {}
    if (count > 0) {
        badge.textContent = count;
        badge.style.opacity = '1';
    } else {
        badge.textContent = '';
        badge.style.opacity = '0';
    }
}
document.addEventListener('DOMContentLoaded', updateMailBadge);
window.addEventListener('storage', updateMailBadge);
