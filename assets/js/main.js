// ============================================================
// MAIN APP - Define dulu sebelum modules
// ============================================================

const app = {
    state: {
        transactions: [],
        budget: 0
    },
    
    async init() {
        console.log('Initializing FinTrack Pro...');
        
        try {
            // 1. Load transactions dari Supabase
            await transaction.init();
            
            // 2. Init lainnya
            budget.init();
            theme.init();
            
            // 3. Set default date
            document.getElementById('date').valueAsDate = new Date();
            
            console.log('FinTrack Pro initialized successfully!');
        } catch (error) {
            console.error('Initialization failed:', error);
            toast.show('Gagal memuat aplikasi!', 'error');
        }
    }
};

// ============================================================
// UI HELPERS
// ============================================================

const ui = {
    selectType(type) {
        document.querySelectorAll('.radio-label').forEach(el => {
            el.classList.remove('active', 'income', 'expense');
        });
        
        const label = event.currentTarget;
        label.classList.add('active', type);
        document.getElementById(`type${type.charAt(0).toUpperCase() + type.slice(1)}`).checked = true;
    },
    
    selectModalType(type) {
        document.getElementById(`modalType${type.charAt(0).toUpperCase() + type.slice(1)}`).checked = true;
        
        const labelIncome = document.getElementById('modalLabelIncome');
        const labelExpense = document.getElementById('modalLabelExpense');
        
        labelIncome.classList.toggle('active', type === 'income');
        labelExpense.classList.toggle('active', type === 'expense');
        labelIncome.classList.toggle('income', type === 'income');
        labelExpense.classList.toggle('expense', type === 'expense');
    },
    
    resetForm() {
        document.getElementById('transactionForm').reset();
        document.getElementById('date').valueAsDate = new Date();
        document.getElementById('editId').value = '';
        document.getElementById('submitText').textContent = 'Simpan Transaksi';
        
        document.querySelector('.radio-label--expense').classList.add('active');
        document.querySelector('.radio-label--income').classList.remove('active');
        document.getElementById('typeExpense').checked = true;
    }
};

// ============================================================
// INIT ON DOM READY
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});