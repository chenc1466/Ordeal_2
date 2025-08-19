
document.getElementById('go-main').addEventListener('click', function() {
    // 重設 mail 狀態
    const mailStatus = {
        1: { hidden: false, read: false },
        2: { hidden: true, read: false },
        3: { hidden: true, read: false }
    };
    localStorage.setItem('mailStatusV1', JSON.stringify(mailStatus));
    alert('你有一封新信件，請到Mail查看！');
    // 上鎖所有任務
    ['B1','B2','B3','B4','B5','B6'].forEach(k => localStorage.setItem(k+'_unlocked', 'false'));
    ['B1','B2','B3','B4','B5','B6'].forEach(k => localStorage.setItem(k+'_done', 'false'));
    // 上鎖Ch2-Ch5
    ['ch2Unlocked','ch3Unlocked','ch4Unlocked','ch5Unlocked'].forEach(k => localStorage.setItem(k, 'false'));
    window.location.href = 'mail.html';
}); 

