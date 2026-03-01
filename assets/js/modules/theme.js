const theme = {
    get() {
        return storage.local.get('fintrack_theme') || 'light'; 
    },
    
    set(mode) {
        storage.local.set('fintrack_theme', mode);  
    },
    
    toggle() {
        const current = this.get();
        const next = current === 'light' ? 'dark' : 'light';
        
        if (next === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('theme-icon').classList.replace('ph-moon', 'ph-sun');
        } else {
            document.documentElement.removeAttribute('data-theme');
            document.getElementById('theme-icon').classList.replace('ph-sun', 'ph-moon');
        }
        
        this.set(next);
        
        setTimeout(() => charts.updateTheme(), 100);
    },
    
    init() {
        if (this.get() === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('theme-icon').classList.replace('ph-moon', 'ph-sun');
        }
    }
};