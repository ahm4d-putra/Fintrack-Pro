const exporter = {
    toCSV() {
        const data = app.state.transactions;
        
        if (data.length === 0) {
            toast.show('Tidak ada data untuk diexport!', 'error');
            return;
        }
        
        const headers = ['ID', 'Nama', 'Jumlah', 'Tipe', 'Kategori', 'Tanggal'];
        const rows = data.map(t => [
            t.id,
            `"${t.name}"`,
            t.amount,
            t.type,
            t.category,
            t.date
        ]);
        
        const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `fintrack_export_${formatters.inputDate(new Date())}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
        toast.show('Data berhasil diexport!', 'success');
    }
};