// js/Ch1.js
document.addEventListener('DOMContentLoaded', function () {
    const contentArea = document.querySelector('.content-area');
    const rightArrowBtn = document.getElementById('right-arrow');
    const lines = [
        '請讀前言及第一章。<br><hr>',
        '現在開始自我介紹。<br><hr>',
        '第一章完結。<br><hr>',
        '已解鎖 CH2。<br><hr>'
    ];
    let currentLine = 0;

    // 初始化只顯示第一行
    contentArea.innerHTML = `<p>${lines[0]}</p>`;

    rightArrowBtn.addEventListener('click', function () {
        currentLine++;
        if (currentLine < lines.length) {
            // 累積顯示
            contentArea.innerHTML = lines.slice(0, currentLine + 1).map(line => `<p>${line}</p>`).join('');
            // 最後一行時換成 home 按鈕
            if (currentLine === lines.length - 1) {
                rightArrowBtn.querySelector('img').src = 'src/home.png';
                rightArrowBtn.querySelector('img').alt = 'Home';
            }
        } else {
            // 點擊 home，解鎖 ch2 並回主選單
            localStorage.setItem('ch2Unlocked', 'true');
            window.location.href = 'main.html';
        }
    });
}); 