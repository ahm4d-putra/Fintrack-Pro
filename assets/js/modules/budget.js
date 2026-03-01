const budget = {
    getLimit() {
        return parseFloat(storage.local.get('fintrack_budget')) || 0;  
    },
    
    save() {
        const value = parseFloat(document.getElementById('budgetLimit').value) || 0;
        storage.local.set('fintrack_budget', value);  
        app.state.budget = value;
        this.check();
        toast.show('Budget berhasil disimpan!', 'success');
    },
    
    check() {
        const limit = app.state.budget;
        const currentMonth = helpers.getCurrentMonth();
        const spent = calculator.getMonthlyExpense(app.state.transactions, currentMonth);
        
        const warning = document.getElementById('budgetWarning');
        if (limit > 0 && spent > limit * 0.8) {
            warning.classList.add('show');
        } else {
            warning.classList.remove('show');
        }
    },
    
    init() {
        const saved = this.getLimit();
        if (saved) {
            document.getElementById('budgetLimit').value = saved;
            app.state.budget = saved;
        }
    }
};