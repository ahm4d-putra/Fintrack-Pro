const transaction = {
    // ============================================================
    // INIT
    // ============================================================
    
    async init() {
        console.log('Loading transactions...');
        
        // Cek app sudah defined
        if (typeof app === 'undefined') {
            console.error('❌ app is not defined! Pastikan main.js load sebelum transactions.js');
            throw new Error('app not defined');
        }
        
        try {
            // Load data dari Supabase
            app.state.transactions = await storage.getTransactions();
            console.log('Loaded:', app.state.transactions.length, 'transactions');
        } catch (error) {
            console.error('Failed to load:', error);
            app.state.transactions = [];
        }
        
        // Setup real-time (kalau error, skip aja)
        try {
            this.setupRealtimeSubscription();
        } catch (error) {
            console.warn('Realtime subscription failed:', error);
        }
        
        // Render pertama kali
        this.refresh();
    },
    
    setupRealtimeSubscription() {
        storage.subscribe(async (payload) => {
            console.log('Real-time event:', payload.eventType);
            await this.refresh();
            
            const messages = {
                INSERT: 'Data baru ditambahkan!',
                UPDATE: 'Data diperbarui!',
                DELETE: 'Data dihapus!'
            };
            
            if (messages[payload.eventType]) {
                toast.show(messages[payload.eventType], 'success');
            }
        });
    },
    
    // ============================================================
    // REFRESH
    // ============================================================
    
    async refresh() {
        // Reload data
        try {
            app.state.transactions = await storage.getTransactions();
        } catch (error) {
            console.error('Refresh failed:', error);
        }
        
        // Update semua UI
        renderList.update();
        renderStats.update();
        charts.update();
        budget.check();
    },
    
    // ============================================================
    // CREATE
    // ============================================================
    
    async add(e) {
        e.preventDefault();
        
        const data = {
            name: document.getElementById('name').value.trim(),
            amount: parseFloat(document.getElementById('amount').value),
            type: document.querySelector('input[name="type"]:checked').value,
            category: document.getElementById('category').value,
            date: document.getElementById('date').value
        };
        
        // Validasi
        const validation = this.validate(data);
        if (!validation.valid) {
            toast.show(validation.message, 'error');
            return;
        }
        
        try {
            await storage.addTransaction(data);
            await this.refresh();
            ui.resetForm();
            toast.show('Transaksi berhasil ditambahkan!', 'success');
        } catch (error) {
            console.error('Add error:', error);
            toast.show('Gagal menambahkan: ' + error.message, 'error');
        }
    },
    
    // ============================================================
    // UPDATE
    // ============================================================
    
    async update(e) {
        e.preventDefault();
        
        const id = parseInt(document.getElementById('modalEditId').value);
        const existing = app.state.transactions.find(t => t.id === id);
        
        if (!existing) {
            toast.show('Transaksi tidak ditemukan!', 'error');
            return;
        }
        
        const updates = {
            name: document.getElementById('modalName').value.trim(),
            amount: parseFloat(document.getElementById('modalAmount').value),
            type: document.querySelector('input[name="modalType"]:checked').value,
            category: document.getElementById('modalCategory').value,
            date: document.getElementById('modalDate').value
        };
        
        const validation = this.validate(updates);
        if (!validation.valid) {
            toast.show(validation.message, 'error');
            return;
        }
        
        try {
            await storage.updateTransaction(id, updates);
            await this.refresh();
            modal.close();
            toast.show('Transaksi berhasil diupdate!', 'success');
        } catch (error) {
            console.error('Update error:', error);
            toast.show('Gagal mengupdate: ' + error.message, 'error');
        }
    },
    
    // ============================================================
    // DELETE
    // ============================================================
    
    async delete(id) {
        if (!confirm('Yakin ingin menghapus transaksi ini?')) {
            return;
        }
        
        const existing = app.state.transactions.find(t => t.id === id);
        if (!existing) {
            toast.show('Transaksi tidak ditemukan!', 'error');
            return;
        }
        
        try {
            await storage.deleteTransaction(id);
            await this.refresh();
            toast.show('Transaksi berhasil dihapus!', 'success');
        } catch (error) {
            console.error('Delete error:', error);
            toast.show('Gagal menghapus: ' + error.message, 'error');
        }
    },
    
    // ============================================================
    // VALIDATION
    // ============================================================
    
    validate(data) {
        if (!data.name || data.name.trim() === '') {
            return { valid: false, message: 'Nama transaksi wajib diisi!' };
        }
        
        if (!data.amount || isNaN(data.amount) || data.amount <= 0) {
            return { valid: false, message: 'Jumlah harus angka positif!' };
        }
        
        if (!data.category || data.category === '') {
            return { valid: false, message: 'Kategori wajib dipilih!' };
        }
        
        if (!data.date || data.date === '') {
            return { valid: false, message: 'Tanggal wajib diisi!' };
        }
        
        return { valid: true, message: '' };
    }
};