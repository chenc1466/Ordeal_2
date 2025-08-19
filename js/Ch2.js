document.addEventListener('DOMContentLoaded', function () {
    const contentArea = document.querySelector('.content-area');
    const rightArrowBtn = document.getElementById('right-arrow');
    const homeBtn = document.getElementById('homeBtn');
    const lines = [
        '請讀第二章。<br><hr>',
        '第二章完結。<br><hr>',
        '現在可以開始自由探索及討論。<br><hr>需完成 <strong>任務一</strong> ，才能解鎖 CH3。<br><hr>'
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
            // 解鎖新手教學三信件
            if (window.opener && window.opener.unlockMailById) {
                window.opener.unlockMailById(4);
            } else {
                // 直接操作 localStorage
                const key = 'mailStatusV1';
                const status = JSON.parse(localStorage.getItem(key) || '{}');
                if (status[4]) status[4].hidden = false;
                else status[4] = { hidden: false, read: false };
                localStorage.setItem(key, JSON.stringify(status));
            }
            alert('新郵件已送達，請至Mail查看！');
            localStorage.setItem('B1_unlocked', 'true');
            localStorage.setItem('B2_unlocked', 'true');
            window.location.href = 'main.html';
        }
    });
});
