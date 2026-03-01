const filter = {
    getState() {
        return {
            search: document.getElementById('searchInput').value.toLowerCase(),
            type: document.getElementById('filterType').value,
            category: document.getElementById('filterCategory').value,
            date: document.getElementById('filterDate').value
        };
    },
    
    apply() {
        const state = this.getState();
        
        return app.state.transactions.filter(t => {
            const matchSearch = t.name.toLowerCase().includes(state.search);
            const matchType = !state.type || t.type === state.type;
            const matchCategory = !state.category || t.category === state.category;
            const matchDate = !state.date || t.date === state.date;
            
            return matchSearch && matchType && matchCategory && matchDate;
        });
    }
};