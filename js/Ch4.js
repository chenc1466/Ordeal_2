document.addEventListener('DOMContentLoaded', function () {
    const contentArea = document.querySelector('.content-area');
    const rightArrowBtn = document.getElementById('right-arrow');
    const lines = [
        '請讀第四章。<br><hr>',
        '第四章完結。<br><hr>',
        '現在可以開始自由探索及討論。<br><hr>需完成 <strong>任務三</strong> 。<br><hr>'
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
            // 點擊 home，解鎖任務 B5、B6 並回主選單
            localStorage.setItem('B5_unlocked', 'true');
            localStorage.setItem('B6_unlocked', 'true');
            window.location.href = 'main.html';
        }
    });
});
