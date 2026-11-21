# FlagForge — Plateforme CTF & Write-ups (React + Laravel)

Application web Full-Stack dédiée à l'hébergement de challenges CTF, la soumission sécurisée de flags (hachage SHA-256 côté Laravel) et le partage de write-ups.

## Stack technique
- **Frontend** : React 18, Vite, Tailwind CSS, Lucide Icons (déployable sur Vercel)
- **Backend** : Laravel 11 API REST, Eloquent ORM, validation `hash_equals`

## Démarrage rapide (Frontend)
```bash
cd frontend-react
npm install
npm run dev
```

## Intégration Backend Laravel
Copiez les fichiers de `backend-laravel/` dans un projet Laravel (`composer create-project laravel/laravel api`), configurez `.env`, puis lancez :
```bash
php artisan migrate
php artisan serve
```
