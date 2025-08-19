document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('virtual-input');
    const cursor = document.getElementById('cursor');
    const keys = document.querySelectorAll('.key');
    const clearBtn = document.getElementById('clear-btn');
    const capsLockBtn = document.getElementById('caps-lock');
    const submitBtn = document.getElementById('submit-btn');
    const successModal = document.getElementById('success-modal');
    const closeSuccessBtn = document.getElementById('close-success');
    const errorModal = document.getElementById('error-modal');
    const closeErrorBtn = document.getElementById('close-error');
    const backspaceKey = document.getElementById('backspace-key');
    const prevBtn = document.getElementById('prevBtn');
    // 移除 enterKey 相關宣告與事件
    // const enterKey = document.getElementById('enter-key');

    // Prev 按鈕點擊事件
    prevBtn.addEventListener('click', function() {
        window.location.href = 'task.html';
    });

    // Caps Lock 狀態
    let capsLockActive = false;

    // 更新游標位置的函數
    function updateCursorPosition() {
        const text = input.value;
        // 單行input不需自動調整高度
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = window.getComputedStyle(input).font;
        const textWidth = context.measureText(text).width;
        const padding = 20; // 輸入框的左右padding
        cursor.style.left = (padding + textWidth) + 'px';
        cursor.style.top = '';
    }

    // 更新鍵盤字母顯示的函數
    function updateKeyboardDisplay() {
        const letterKeys = document.querySelectorAll('.key[data-key]');
        letterKeys.forEach(key => {
            const keyValue = key.getAttribute('data-key');
            // 只處理字母鍵（A-Z）
            if (keyValue && keyValue.length === 1 && keyValue.match(/[A-Z]/)) {
                if (capsLockActive) {
                    // 大寫模式：顯示大寫字母
                    key.textContent = keyValue;
                } else {
                    // 小寫模式：顯示小寫字母
                    key.textContent = keyValue.toLowerCase();
                }
            }
        });
    }

    // 禁用實體鍵盤輸入
    input.addEventListener('keydown', function(e) {
        e.preventDefault();
        return false;
    });

    input.addEventListener('keyup', function(e) {
        e.preventDefault();
        return false;
    });

    input.addEventListener('keypress', function(e) {
        e.preventDefault();
        return false;
    });

    // 禁用右鍵選單
    input.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // 禁用複製貼上
    input.addEventListener('copy', function(e) {
        e.preventDefault();
        return false;
    });

    input.addEventListener('paste', function(e) {
        e.preventDefault();
        return false;
    });

    input.addEventListener('cut', function(e) {
        e.preventDefault();
        return false;
    });

    // 虛擬鍵盤按鍵事件
    keys.forEach(key => {
        key.addEventListener('click', function() {
            let keyValue = this.getAttribute('data-key');
            // 將 . 替換為 +
            if (keyValue === '.') keyValue = '+';
            
            // 跳過Caps Lock按鍵的處理
            if (this.id === 'caps-lock') {
                return;
            }
            
            // 添加按鍵動畫效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);

            // 處理不同類型的按鍵
            if (keyValue === ' ') {
                // 空白鍵
                input.value += ' ';
            } else {
                // 一般按鍵 - 根據Caps Lock狀態決定大小寫
                let finalKeyValue = keyValue;
                if (keyValue.length === 1 && keyValue.match(/[A-Z]/)) {
                    finalKeyValue = capsLockActive ? keyValue : keyValue.toLowerCase();
                }
                input.value += finalKeyValue;
            }

            // 更新游標位置
            updateCursorPosition();

            // 聚焦到輸入框
            input.focus();
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
            
            // 跳過Caps Lock按鍵的處理
            if (this.id === 'caps-lock') {
                return;
            }
            
            if (keyValue === ' ') {
                input.value += ' ';
            } else {
                // 一般按鍵 - 根據Caps Lock狀態決定大小寫
                let finalKeyValue = keyValue;
                if (keyValue.length === 1 && keyValue.match(/[A-Z]/)) {
                    finalKeyValue = capsLockActive ? keyValue : keyValue.toLowerCase();
                }
                input.value += finalKeyValue;
            }
            
            // 更新游標位置
            updateCursorPosition();
            
            input.focus();
        });
    });

    // Caps Lock 按鍵事件
    capsLockBtn.addEventListener('click', function() {
        capsLockActive = !capsLockActive;
        
        // 更新按鍵狀態
        this.setAttribute('data-state', capsLockActive ? 'on' : 'off');
        
        // 更新視覺狀態
        if (capsLockActive) {
            this.classList.add('active');
        } else {
            this.classList.remove('active');
        }
        
        // 更新鍵盤字母顯示
        updateKeyboardDisplay();
        
        // 添加動畫效果
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
        
        input.focus();
    });

    // Caps Lock 觸控支援
    capsLockBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        this.style.transform = 'scale(0.95)';
    });

    capsLockBtn.addEventListener('touchend', function(e) {
        e.preventDefault();
        capsLockActive = !capsLockActive;
        
        // 更新按鍵狀態
        this.setAttribute('data-state', capsLockActive ? 'on' : 'off');
        
        // 更新視覺狀態
        if (capsLockActive) {
            this.classList.add('active');
        } else {
            this.classList.remove('active');
        }
        
        // 更新鍵盤字母顯示
        updateKeyboardDisplay();
        
        this.style.transform = '';
        input.focus();
    });

    // 清除按鈕
    clearBtn.addEventListener('click', function() {
        input.value = '';
        updateCursorPosition();
        input.focus();
        
        // 添加動畫效果
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });

    // Backspace 鍵功能
    backspaceKey.addEventListener('click', function() {
        input.value = input.value.slice(0, -1);
        updateCursorPosition();
        input.focus();
    });
    backspaceKey.addEventListener('touchend', function(e) {
        e.preventDefault();
        input.value = input.value.slice(0, -1);
        updateCursorPosition();
        input.focus();
    });

    // 點擊輸入框時聚焦
    input.addEventListener('click', function() {
        this.focus();
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
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    // 為按鍵添加音效（可選，取消註釋即可啟用）
    /*
    keys.forEach(key => {
        key.addEventListener('click', function() {
            playKeySound();
        });
    });
    */

    // 添加視覺反饋
    function addVisualFeedback(element) {
        element.style.backgroundColor = '#667eea';
        element.style.color = 'white';
        setTimeout(() => {
            element.style.backgroundColor = '';
            element.style.color = '';
        }, 150);
    }

    // 為控制按鈕添加視覺反饋
    clearBtn.addEventListener('click', function() {
        addVisualFeedback(this);
    });

    // 提交按鈕事件
    submitBtn.addEventListener('click', function() {
        const inputValue = input.value;
        
        // 添加動畫效果
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
        
        // 檢查是否完全等於"ELLA"（不能有多餘空格或字符）
        if (inputValue === 'ELLA') {
            // 答對時寫入 localStorage
            localStorage.setItem('B1Cleared', 'true');
            // 顯示成功提示窗
            successModal.classList.add('show');
            // 這裡不再寫入 ch2Unlocked
        } else {
            // 顯示失敗提示窗
            errorModal.classList.add('show');
        }
        
        // 清除輸入框內容
        input.value = '';
        updateCursorPosition();
        
        input.focus();
    });

    // 關閉成功提示窗
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', function() {
            localStorage.setItem('B1_done', 'true');
            successModal.classList.remove('show');
            window.location.href = 'task.html';
        });
    }

    // 點擊背景關閉提示窗
    successModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('show');
            input.focus();
        }
    });

    // 關閉失敗提示窗
    closeErrorBtn.addEventListener('click', function() {
        errorModal.classList.remove('show');
        input.focus();
    });

    // 點擊背景關閉失敗提示窗
    errorModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('show');
            input.focus();
        }
    });

    // 初始化時聚焦到輸入框並設置游標位置
    input.focus();
    updateCursorPosition();
    updateKeyboardDisplay(); // 設置初始鍵盤顯示狀態

    // 防止頁面重新載入時失去焦點
    window.addEventListener('beforeunload', function() {
        input.blur();
    });

    // 添加錯誤處理
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
    });

    // 添加載入完成提示
    console.log('虛擬鍵盤系統已載入完成！');
});
