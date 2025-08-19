document.getElementById('homeBtn').addEventListener('click', function() {
    window.location.href = 'main.html';
});
/* 任務圖示可點擊跳轉（如需要，依 B1~B6 加入） */
// 這裡可擴充任務互動邏輯 

document.addEventListener('DOMContentLoaded', function() {
    // 檢查 localStorage 標記（B1~B6）
    const doneList = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'];
    doneList.forEach(key => {
        const img = document.querySelector('.task-icon img[alt="' + key + '"]');
        if (!img) return;
        // 檢查是否解鎖
        if (localStorage.getItem(key + '_unlocked') !== 'true') {
            img.src = 'src/' + key + '_locked.png';
            img.classList.add('locked');
            img.style.pointerEvents = 'none';
            img.parentElement.style.cursor = 'not-allowed';
        } else if (localStorage.getItem(key + '_done') === 'true') {
            img.src = 'src/' + key + '_completed.png';
            img.classList.add('done');
            img.style.pointerEvents = 'none';
            img.parentElement.style.cursor = 'default';
        } else {
            img.style.pointerEvents = 'auto';
            img.parentElement.style.cursor = 'pointer';
            img.parentElement.onclick = function() {
                window.location.href = key + '.html';
            };
        }
    });
}); 