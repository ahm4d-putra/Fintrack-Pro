const renderStats = {
    animateValue(elementId, value) {
        const element = document.getElementById(elementId);
        element.classList.add('animate-value');
        element.textContent = formatters.currency(value);
        
        setTimeout(() => {
            element.classList.remove('animate-value');
        }, 600);
    },
    
    update() {
        const totals = calculator.getTotals(app.state.transactions);
        const balance = totals.income - totals.expense;
        
        this.animateValue('totalBalance', balance);
        this.animateValue('totalIncome', totals.income);
        this.animateValue('totalExpense', totals.expense);
    }
};