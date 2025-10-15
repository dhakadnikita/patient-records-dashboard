# Patient Records Dashboard

A simple React (Vite) app demonstrating a Patient Records Dashboard with search, modal details, add patient form (local), and loading/error states.

## Features
- Landing page with header and navigation (Home / Patients / About)
- Patients page: fetches mock patient data from JSONPlaceholder and maps to patient cards
- Search bar to filter patients by name
- View Details modal for each patient
- Add New Patient (local state only)
- Loading and error states
- Responsive design (desktop + mobile)

## Run locally

Requirements: Node.js >= 16

1. Install dependencies
```bash
npm install
```

2. Run dev server
```bash
npm run dev
```

3. Build for production
```bash
npm run build
```

## Deploy
You can deploy to Vercel or Netlify — connect the repo and set build command `npm run build` and publish directory `dist`.

## Notes
- The app fetches user data from `https://jsonplaceholder.typicode.com/users`. Ages are randomly generated for demo.
- This zip contains a minimal Vite setup (no CSS frameworks) to keep things simple.

Screenshots: (Add screenshots here in your repo after running the app.)

"# patient-records-dashboard" 
