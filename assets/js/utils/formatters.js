const formatters = {
    currency(num) {
        return 'Rp ' + num.toLocaleString('id-ID');
    },
    
    date(dateStr) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString('id-ID', options);
    },
    
    monthYear(dateStr) {
        const [year, month] = dateStr.split('-');
        return `${month}/${year}`;
    },
    
    inputDate(date) {
        return date.toISOString().split('T')[0];
    }
};