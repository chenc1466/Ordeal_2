const MAIL_STORAGE_KEY = 'mailStatusV1';

const mails = [
    {
        id: 1,
        title: '試煉規則',
        body: '1. 試煉僅開放75分鐘，超時將有被困在試煉的可能。\n2. 此裝置為試煉面板，請勿弄壞，否則將無法進行試煉。\n' + 
              '3. 試煉中，分為劇情及探索模式。\n   劇情模式中，請坐在指定位置完成指示。\n   探索模式中，可以自由尋找、討論。\n' +
              '4. 若有問題，可以請教Xian意識體。',
        hidden: false,
        read: false
    },
    {
        id: 2,
        title: '新手教學一',
        body: '已解鎖 郵件 功能。\n提示：可以獲得很多資訊的地方。',
        hidden: true,
        read: false
    },
    {
        id: 3,
        title: '新手教學二',
        body: '已解鎖 劇情 功能。\n提示：部分上鎖，完成指定條件即可繼續解鎖。',
        hidden: true,
        read: false
    },
    {
        id: 4,
        title: '新手教學三',
        body: '已解鎖 任務 功能。\n提示：完成任務可解鎖相對應劇情或碎片。',
        hidden: true,
        read: false
    }
];

function loadMailStatus() {
    const saved = localStorage.getItem(MAIL_STORAGE_KEY);
    if (!saved) return;
    try {
        const status = JSON.parse(saved);
        mails.forEach(mail => {
            if (status[mail.id]) {
                mail.hidden = status[mail.id].hidden;
                mail.read = status[mail.id].read;
            }
        });
    } catch {}
}

function saveMailStatus() {
    const status = {};
    mails.forEach(mail => {
        status[mail.id] = { hidden: mail.hidden, read: mail.read };
    });
    localStorage.setItem(MAIL_STORAGE_KEY, JSON.stringify(status));
}

const mailList = document.getElementById('mailList');
const mailContentTitle = document.getElementById('mailContentTitle');
const mailContentBody = document.getElementById('mailContentBody');
const homeBtn = document.getElementById('homeBtn');

function renderMailList() {
    mailList.innerHTML = '';
    mails.forEach((mail, idx) => {
        if (mail.hidden) return;
        const item = document.createElement('div');
        item.className = 'mail-item';
        if (!mail.read) item.classList.add('unread');
        if (mail.read) item.classList.add('read');
        item.textContent = mail.title;
        item.tabIndex = 0;
        item.addEventListener('click', () => selectMail(idx));
        item.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') selectMail(idx);
        });
        mailList.appendChild(item);
    });
}

function unlockMailById(id) {
    const mail = mails.find(m => m.id === id);
    if (mail && mail.hidden) {
        mail.hidden = false;
        saveMailStatus();
        renderMailList();
    }
}

function selectMail(idx) {
    document.querySelectorAll('.mail-item').forEach((el, i) => {
        el.classList.toggle('active', i === idx);
    });
    mails[idx].read = true;
    saveMailStatus();
    mailContentTitle.textContent = mails[idx].title;
    mailContentBody.textContent = mails[idx].body;
    // 點擊第一封只解鎖第二封
    if (idx === 0) unlockMailById(2);
    // 點擊第二封只解鎖第三封
    if (idx === 1) unlockMailById(3);
    renderMailList();
}

function clearMailContent() {
    mailContentTitle.textContent = '';
    mailContentBody.textContent = '';
}

homeBtn.addEventListener('click', () => {
    window.location.href = 'main.html';
});

// 提供外部解鎖第三封信的函式
window.unlockMailById = unlockMailById;

loadMailStatus();
renderMailList();
clearMailContent(); 