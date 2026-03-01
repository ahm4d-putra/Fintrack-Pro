const toast = {
    show(message, type = 'success') {
        const toastEl = document.getElementById('toast');
        const messageEl = document.getElementById('toastMessage');
        
        messageEl.textContent = message;
        toastEl.className = `toast ${type} show`;
        
        // Update icon based on type
        const icon = toastEl.querySelector('i');
        icon.className = 'ph ' + {
            success: 'ph-check-circle',
            error: 'ph-x-circle',
            warning: 'ph-warning-circle'
        }[type];
        
        setTimeout(() => {
            toastEl.classList.remove('show');
        }, 3000);
    }
};