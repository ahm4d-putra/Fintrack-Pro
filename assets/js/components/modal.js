const modal = {
    open(id = null) {
        const overlay = document.getElementById('modal');
        
        if (id) {
            const t = app.state.transactions.find(tr => tr.id === id);
            if (!t) return;
            
            document.getElementById('modalEditId').value = id;
            document.getElementById('modalName').value = t.name;
            document.getElementById('modalAmount').value = t.amount;
            document.getElementById('modalDate').value = t.date;
            document.getElementById('modalCategory').value = t.category;
            ui.selectModalType(t.type);
        }
        
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    close() {
        document.getElementById('modal').classList.remove('active');
        document.body.style.overflow = '';
        document.getElementById('modalForm').reset();
    },
    
    closeOnOverlay(e) {
        if (e.target === e.currentTarget) {
            this.close();
        }
    }
};