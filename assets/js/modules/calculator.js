const calculator = {
    getTotals(transactions) {
        return transactions.reduce((acc, t) => {
            acc[t.type] += t.amount;
            return acc;
        }, { income: 0, expense: 0 });
    },
    
    getBalance(transactions) {
        const totals = this.getTotals(transactions);
        return totals.income - totals.expense;
    },
    
    getMonthlyExpense(transactions, month) {
        return transactions
            .filter(t => {
                if (t.type !== 'expense') return false;
                return t.date.startsWith(month);
            })
            .reduce((sum, t) => sum + t.amount, 0);
    },
    
    getCategoryBreakdown(transactions) {
        return transactions
            .filter(t => t.type === 'expense')
            .reduce((acc, t) => {
                acc[t.category] = (acc[t.category] || 0) + t.amount;
                return acc;
            }, {});
    },
    
    getMonthlyTrend(transactions) {
        const monthly = {};
        
        transactions.forEach(t => {
            const month = t.date.substring(0, 7);
            if (!monthly[month]) {
                monthly[month] = { income: 0, expense: 0 };
            }
            monthly[month][t.type] += t.amount;
        });
        
        const months = Object.keys(monthly).sort().slice(-6);
        
        return {
            labels: months,
            income: months.map(m => monthly[m].income),
            expense: months.map(m => monthly[m].expense)
        };
    }
};