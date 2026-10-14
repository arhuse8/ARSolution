# AR Solution Home Tutor - Web Application

A modern, high-energy web application for **AR Solution Home Tutor** connecting parents and students across Classes 1–12 (CBSE, ICSE, Maharashtra State Board) with verified 1-on-1 home and online tutors.

Direct WhatsApp Coordinator Routing: **+91 91127 68872** (`9112768872`)

---

## 🚀 How to Host on GitHub Pages (Fixed: Website Now Opens Cleanly)

### Why the site wasn't opening before:
The previous Vite build had a hardcoded base path (`/ARSolution/`). If your GitHub repository had a different name (e.g. `ar-solution`, `home-tutor`, or `<username>.github.io`), the browser failed to locate JavaScript and CSS bundles with `404 Not Found`, showing a blank page.

### The Fix Applied:
1. **Relative Base Path (`base: './'`)**: The project now builds using relative asset links (`./assets/...`). It works automatically on **any GitHub repository name**, custom domain, or local folder without manual changes.
2. **GitHub Pages Routing Fallback (`404.html`)**: Added SPA fallback in `public/404.html` so refreshing or direct links won't result in 404 errors.
3. **Jekyll Bypass (`.nojekyll`)**: Added `.nojekyll` to prevent GitHub from ignoring Vite bundles.
4. **Offline / Static Direct Message Inbox**: Parent submissions to WhatsApp are automatically stored in `localStorage`, meaning the Coordinator Inbox displays all direct messages even on static GitHub Pages hosting.

---

## 📦 Steps to Deploy to GitHub Pages

### Option 1: Automatic Deployment with GitHub Actions (Recommended)
This repository includes a ready-to-run GitHub Actions workflow in `.github/workflows/deploy.yml`.

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Configure GitHub Pages with relative base and WhatsApp direct messaging"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. **Enable GitHub Pages in your Repository Settings**:
   - Go to your GitHub repository -> **Settings** -> **Pages** (on the left sidebar).
   - Under **Build and deployment** > **Source**, choose **GitHub Actions**.
   - Your site will automatically build and publish! The live URL will be shown (e.g. `https://<your-username>.github.io/<your-repo-name>/`).

---

### Option 2: Deploy Built `dist` Folder Directly (gh-pages)
If you prefer deploying the built files directly:

1. **Build the production bundle**:
   ```bash
   npm run build
   ```
2. The production files are generated in `./dist` (including `index.html`, `404.html`, and `.nojekyll`).
3. You can push the `./dist` folder to a `gh-pages` branch or upload it directly. Under repository **Settings** -> **Pages**, set **Source** to **Deploy from a branch** and select `gh-pages` / `/ (root)`.

---

## ⚡ Key Features

- **Direct WhatsApp Routing (9112768872)**: When parents submit the booking form or click any demo action, WhatsApp opens immediately with pre-filled, cleanly formatted details (Student Name, Mobile Number, Class, Board, Subjects, Mode, Location, Expected Fees, Preferred Time, Special Notes).
- **Coordinator Inbox & Direct Messages**: An in-app inbox displaying all submitted student requests with search, filter, and 1-tap message copying.
- **Gen Z Aesthetics & UX**: Sleek glassmorphism cards, category chips (Primary, Middle, Boards, Senior), and responsive Dawn / Midnight theme toggle.
- **AI Academic Planner**: Personalized syllabi, weekly roadmaps, and board exam tips powered by curriculum benchmarks.
- **Teacher Verification System**: Safe ID badge protection for verified educators.
