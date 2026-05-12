# FinTrack Pro 💰

A personal finance tracker web app to manage income and expenses with ease. Started as a simple recording tool, evolved into a full web application backed by a real database.

![HTML](https://img.shields.io/badge/HTML-40.8%25-E34F26?logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-38.8%25-F7DF1E?logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-20.4%25-1572B6?logo=css3&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-Charting-FF6384?logo=chartdotjs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Description

FinTrack Pro is built using **Vanilla JavaScript** and **Supabase** as the backend database. No frontend framework — intentionally built this way to strengthen core JavaScript fundamentals.

---

## Features

- **Visual Dashboard** — Summary of income, expenses, and balance displayed as charts.
- **Transaction Management** — Add, edit, and delete transactions with categories.
- **Filter & Search** — Search transactions by date, category, or name.
- **Budget Alerts** — Notifications when spending approaches a set limit.
- **Dark Mode** — Comfortable UI for nighttime use.
- **Export CSV** — Download transaction data for reporting or backup.

### Feature Checklist

- [x] CRUD transactions with real-time sync
- [x] Pie chart for expense distribution
- [x] Bar chart for monthly trends
- [x] Filter by date, category, and type
- [x] Transaction search
- [x] Dark mode toggle
- [x] Export data to CSV
- [x] Budget alerts
- [ ] User authentication
- [ ] Multi-currency support
- [ ] Recurring transactions
- [ ] Progressive Web App (PWA)

---

## Built With

- **HTML, CSS, Vanilla JavaScript** — Frontend, no framework.
- **[Supabase](https://supabase.com/)** — Backend as a service (PostgreSQL).
- **[Chart.js](https://www.chartjs.org/)** — Data visualization charts.
- **[Phosphor Icons](https://phosphoricons.com/)** — Icon library.

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/ahm4d-putra/Fintrack-Pro.git
cd Fintrack-Pro
```

### 2. Setup Supabase

- Create a new project at [supabase.com](https://supabase.com)
- Go to **SQL Editor** and run the following script:

```sql
create table transactions (
  id bigint generated always as identity primary key,
  user_id uuid default '00000000-0000-0000-0000-000000000001',
  name text not null,
  amount decimal not null,
  type text check (type in ('income', 'expense')) not null,
  category text not null,
  date date not null,
  created_at timestamp with time zone default now()
);

alter table transactions disable row level security;
```

### 3. Configure Environment

Edit `assets/js/config/supabase.js` with your Supabase project credentials:

```js
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

> You can find both values in your Supabase project under **Settings → API**.

### 4. Run the App

Open `index.html` directly in your browser, or use a live server:

```sh
npx live-server
```

---

## Project Structure

```text
Fintrack-Pro/
├── assets/
│   ├── js/
│   │   └── config/
│   │       └── supabase.js     # Supabase credentials config
│   └── ...                     # Other assets (CSS, icons, etc)
├── index.html                  # Landing / Login page
├── app.html                    # Main dashboard app
└── README.md
```

---

## About the Project

This project was built as a portfolio piece and to deepen understanding of Vanilla JavaScript. By avoiding frameworks, the fundamentals of the language can be explored more thoroughly — DOM manipulation, async/await, event handling, and state management, all from scratch.

---

## Contributing

Contributions are welcome for new features or bug fixes. Feel free to open a pull request on GitHub.

---

## Author

**Ahmad Putra Ramadhan**

- **GitHub**: [@ahm4d-putra](https://github.com/ahm4d-putra)
- **Instagram**: [@ahmaddd9_](https://instagram.com/ahmaddd9_)

---

## License

This project is open source and available under the [MIT License](LICENSE).
