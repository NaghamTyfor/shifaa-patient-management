```
# 🏥 Shifaa – Patient Management System

A full‑stack patient management system designed for small clinics, built with **React (Vite)** on the frontend and **Laravel 12** on the backend. It provides a smooth, Arabic‑first experience with authentication, search, pagination, and bulk actions.

---

## 📁 Project Structure

This repository contains both the backend and frontend in a single monorepo:

```
shifaa/
├── backend/          # Laravel 12 API
└── frontend/         # React + Vite application
```

---

## ✨ Features

- **Complete CRUD** for patients (Create, Read, Update, Delete).
- **Instant search** by patient name with highlighted matches.
- **Server‑side pagination** with configurable items per page.
- **Multi‑select & bulk delete** for efficient management.
- **Authentication** via email and password (Laravel Sanctum).
- **Fully RTL Arabic UI** – designed for Arabic‑speaking users.
- **Stunning login page** with animated backgrounds and glowing effects.
- **Performance optimized** – debounced search, `React.memo`, and lightweight background for the dashboard.

---

## 🛠️ Tech Stack

### Backend
- **Laravel 12** – PHP framework.
- **Laravel Sanctum** – API token authentication.
- **MySQL** – relational database.
- **Service‑Repository pattern** – clean separation of concerns.
- **API Resources** – consistent JSON responses.

### Frontend
- **React 19** – UI library.
- **Vite** – fast build tool and dev server.
- **Axios** – HTTP client.
- **React Router DOM** – routing.
- **Motion (framer‑motion)** – smooth animations.
- **Lucide React** – icon set.
- **Tailwind CSS** – utility‑first styling.

---

## ⚙️ Requirements

- **PHP 8.2+** and **Composer** (for Laravel).
- **MySQL** or any supported database.
- **Node.js 18+** and **npm** or **yarn** (for React).
- **Git** (to clone the repository).

---

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/NaghamTyfor/shifaa.git
cd shifaa
```

### 2. Backend – Laravel

```bash
cd backend
composer install
cp .env.example .env
```

Edit the `.env` file with your database credentials:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=shifaa_db
DB_USERNAME=root
DB_PASSWORD=
```

Then run:
```bash
php artisan key:generate
php artisan migrate
php artisan db:seed   # This creates the demo user account
```

Start the Laravel development server:
```bash
php artisan serve
```
The API will be available at: `http://localhost:8000`

---

### 3. Frontend – React

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` folder:
```env
VITE_API_URL=http://localhost:8000/api
```

Start the React development server:
```bash
npm run dev
```
The app will be available at the URL shown in the terminal (default: `http://localhost:5173`).

---

### 4. Login Credentials

Use the demo account (created by the seeder):
- **Email:** `doctor@gmail.com`
- **Password:** `12345678`

---

## 👥 Author

- **NaghamTyfor** – [GitHub Profile](https://github.com/NaghamTyfor)

---

## 📄 License

This project is open‑source and available under the **MIT License**. Feel free to use, modify, and distribute it for personal or commercial purposes.

---

## 🙏 Acknowledgements

Special thanks to the open‑source community and the maintainers of Laravel, React, and all the libraries that made this project possible.

---

**⭐ If you like this project, please give it a star on GitHub!**

