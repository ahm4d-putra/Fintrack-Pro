const validators = {
    isEmpty(value) {
        return !value || value.trim() === '';
    },
    
    isPositiveNumber(value) {
        const num = parseFloat(value);
        return !isNaN(num) && num > 0;
    },
    
    transaction(data) {
        const errors = [];
        
        if (this.isEmpty(data.name)) {
            errors.push('Nama transaksi wajib diisi');
        }
        
        if (!this.isPositiveNumber(data.amount)) {
            errors.push('Jumlah harus angka positif');
        }
        
        if (this.isEmpty(data.category)) {
            errors.push('Kategori wajib dipilih');
        }
        
        if (this.isEmpty(data.date)) {
            errors.push('Tanggal wajib diisi');
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }
};