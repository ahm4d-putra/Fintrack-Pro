const charts = {
    instances: {},
    
    init() {
        this.createPie();
        this.createBar();
    },
    
    createPie() {
        const ctx = document.getElementById('pieChart').getContext('2d');
        const data = calculator.getCategoryBreakdown(app.state.transactions);
        
        if (this.instances.pie) {
            this.instances.pie.destroy();
        }
        
        this.instances.pie = new Chart(ctx, {
            ...CHART_CONFIG.pie,
            data: {
                labels: Object.keys(data),
                datasets: [{
                    data: Object.values(data),
                    backgroundColor: CONSTANTS.COLORS.PRIMARY
                }]
            }
        });
    },
    
    createBar() {
        const ctx = document.getElementById('barChart').getContext('2d');
        const trend = calculator.getMonthlyTrend(app.state.transactions);
        
        if (this.instances.bar) {
            this.instances.bar.destroy();
        }
        
        this.instances.bar = new Chart(ctx, {
            ...CHART_CONFIG.bar,
            data: {
                labels: trend.labels.map(formatters.monthYear),
                datasets: [
                    {
                        label: 'Pemasukan',
                        data: trend.income,
                        backgroundColor: CONSTANTS.COLORS.SUCCESS
                    },
                    {
                        label: 'Pengeluaran',
                        data: trend.expense,
                        backgroundColor: CONSTANTS.COLORS.DANGER
                    }
                ]
            }
        });
    },
    
    update() {
        this.createPie();
        this.createBar();
    },
    
    updateTheme() {
        const textColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--text').trim();
        
        [this.instances.pie, this.instances.bar].forEach(chart => {
            if (chart) {
                if (chart.options.plugins.legend) {
                    chart.options.plugins.legend.labels.color = textColor;
                }
                if (chart.options.scales.x) {
                    chart.options.scales.x.ticks.color = textColor;
                }
                if (chart.options.scales.y) {
                    chart.options.scales.y.ticks.color = textColor;
                    chart.options.scales.y.grid.color = textColor + '20';
                }
                chart.update();
            }
        });
    }
};