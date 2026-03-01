const storage = {
    // ============================================================
    // GET ALL TRANSACTIONS
    // ============================================================
    
    async getTransactions() {
        const { data, error } = await supabaseClient
            .from('transactions')
            .select('*')
            .order('date', { ascending: false });
            
        if (error) {
            console.error('Error fetching from Supabase:', error);
            // Fallback ke localStorage
            return this.local.get('fintrack_backup') || [];
        }
        
        // Backup ke localStorage
        this.local.set('fintrack_backup', data);
        return data || [];
    },
    
    // ============================================================
    // ADD TRANSACTION
    // ============================================================
    
    async addTransaction(transaction) {
        // Tambahin user_id (wajib ada di tabel)
        const dataWithUser = {
            ...transaction,
            user_id: '00000000-0000-0000-0000-000000000001' // Dummy UUID
        };
        
        const { data, error } = await supabaseClient
            .from('transactions')
            .insert([dataWithUser])
            .select();
            
        if (error) {
            console.error('Supabase insert error:', error);
            throw new Error(error.message);
        }
        
        return data[0];
    },
    
    // ============================================================
    // UPDATE TRANSACTION
    // ============================================================
    
    async updateTransaction(id, updates) {
        const { error } = await supabaseClient
            .from('transactions')
            .update(updates)
            .eq('id', id);
            
        if (error) {
            console.error('Supabase update error:', error);
            throw new Error(error.message);
        }
    },
    
    // ============================================================
    // DELETE TRANSACTION
    // ============================================================
    
    async deleteTransaction(id) {
        const { error } = await supabaseClient
            .from('transactions')
            .delete()
            .eq('id', id);
            
        if (error) {
            console.error('Supabase delete error:', error);
            throw new Error(error.message);
        }
    },
    
    // ============================================================
    // REAL-TIME SUBSCRIPTION
    // ============================================================
    
    subscribe(callback) {
        return supabaseClient
            .channel('transactions')
            .on('postgres_changes', 
                { 
                    event: '*', 
                    schema: 'public', 
                    table: 'transactions' 
                },
                (payload) => {
                    console.log('Real-time change:', payload);
                    callback(payload);
                }
            )
            .subscribe((status) => {
                console.log('Realtime status:', status);
            });
    },
    
    // ============================================================
    // LOCAL STORAGE (BACKUP/OFFLINE)
    // ============================================================
    
    local: {
        get(key) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (e) {
                console.error('LocalStorage get error:', e);
                return null;
            }
        },
        
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.error('LocalStorage set error:', e);
                return false;
            }
        },
        
        remove(key) {
            localStorage.removeItem(key);
        }
    }
};