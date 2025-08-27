document.addEventListener('DOMContentLoaded', function() {
    const segs = [
        document.getElementById('seg1'),
        document.getElementById('seg2'),
        document.getElementById('seg3'),
        document.getElementById('seg4')
    ];
    const keys = document.querySelectorAll('.key');
    const clearBtn = document.getElementById('clear-btn');
    const submitBtn = document.getElementById('submit-btn');
    const successModal = document.getElementById('success-modal');
    const closeSuccessBtn = document.getElementById('close-success');
    const errorModal = document.getElementById('error-modal');
    const closeErrorBtn = document.getElementById('close-error');
    const prevBtn = document.getElementById('prevBtn');

    // Prev 按鈕點擊事件
    prevBtn.addEventListener('click', function() {
        window.location.href = 'task.html';
    });

    // 禁用實體鍵盤輸入於各分段
    segs.forEach(seg => {
        ['keydown','keyup','keypress','contextmenu','copy','paste','cut'].forEach(evt => {
            seg.addEventListener(evt, e => { e.preventDefault(); return false; });
        });
    });

    // 虛擬鍵盤按鍵事件
    keys.forEach(key => {
        key.addEventListener('click', function() {
            let keyValue = this.getAttribute('data-key');
            // 將 . 替換為 +
            if (keyValue === '.') keyValue = '+';
            
            // 添加按鍵動畫效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);

            // 將字元輸入到當前分段（從左到右第一個未滿的）
            for (let i = 0; i < segs.length; i++) {
                if (segs[i].value.length < 2) {
                    segs[i].value += keyValue;
                    break;
                }
            }
        });

        // 添加觸控支援
        key.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
        });

        key.addEventListener('touchend', function(e) {
            e.preventDefault();
            let keyValue = this.getAttribute('data-key');
            // 將 . 替換為 +
            if (keyValue === '.') keyValue = '+';
            
            // 將字元輸入到當前分段（從左到右第一個未滿的）
            for (let i = 0; i < segs.length; i++) {
                if (segs[i].value.length < 2) {
                    segs[i].value += keyValue;
                    break;
                }
            }
            
            this.style.transform = '';
        });
    });

    // 清除按鈕
    clearBtn.addEventListener('click', function() {
        segs.forEach(s => s.value = '');
        
        // 添加動畫效果
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });

    // 防止頁面滾動（在移動設備上）
    document.addEventListener('touchmove', function(e) {
        if (e.target.closest('.keyboard-container')) {
            e.preventDefault();
        }
    }, { passive: false });

    // 添加鍵盤音效（可選）
    function playKeySound() {
        // 創建一個簡單的按鍵音效
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    // 提交按鈕事件
    submitBtn.addEventListener('click', function() {
        // 添加動畫效果
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);

        // 獲取所有分段的輸入值
        const inputValue = segs.map(seg => seg.value).join('');
        
        // 檢查答案
        if (inputValue === '15382339') {
            // 正確答案
            localStorage.setItem('B6Cleared', 'true');
            
            successModal.classList.add('show');
        } else {
            // 錯誤答案
            errorModal.classList.add('show');
        }
    });

    // 成功提示窗關閉事件
    closeSuccessBtn.addEventListener('click', function() {
        successModal.classList.remove('show');
        // 延遲跳轉，讓動畫完成
        localStorage.setItem('B6_done', 'true');
        setTimeout(() => {
            window.location.href = 'task.html';
        }, 300);
    });

    // 錯誤提示窗關閉事件
    closeErrorBtn.addEventListener('click', function() {
        errorModal.classList.remove('show');
    });

    // 點擊模態框外部關閉
    successModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('show');
        }
    });

    errorModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('show');
        }
    });

});
