const renderList = {
    getIcon(category) {
        return CONSTANTS.CATEGORIES[category] || 'ph-package';
    },
    
    createItem(t) {
        const div = document.createElement('div');
        div.className = `transaction-item ${t.type}`;
        div.innerHTML = `
            <div class="transaction__icon">
                <i class="ph ${this.getIcon(t.category)}"></i>
            </div>
            <div class="transaction__info">
                <div class="transaction__title">${helpers.escapeHtml(t.name)}</div>
                <div class="transaction__meta">
                    <span>${t.category}</span>
                    <span>•</span>
                    <span>${formatters.date(t.date)}</span>
                </div>
            </div>
            <div class="transaction__amount">
                ${t.type === 'income' ? '+' : '-'} ${formatters.currency(t.amount)}
            </div>
            <div class="transaction__actions">
                <button class="btn btn--small btn-edit" onclick="modal.open(${t.id})" title="Edit">
                    <i class="ph ph-pencil-simple"></i>
                </button>
                <button class="btn btn--small btn-delete" onclick="transaction.delete(${t.id})" title="Hapus">
                    <i class="ph ph-trash"></i>
                </button>
            </div>
        `;
        return div;
    },
    
    update() {
        const list = document.getElementById('transactionList');
        const filtered = filter.apply();
        
        document.getElementById('transactionCount').textContent = 
            `${filtered.length} transaksi`;
        
        if (filtered.length === 0) {
            list.innerHTML = `
                <div class="empty-state">
                    <i class="ph ph-receipt"></i>
                    <h3>Belum ada transaksi</h3>
                    <p>Mulai catat keuanganmu dengan menekan tombol "Tambah Transaksi"</p>
                </div>
            `;
            return;
        }
        
        // Sort by date desc
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        list.innerHTML = '';
        filtered.forEach(t => {
            list.appendChild(this.createItem(t));
        });
    }
};