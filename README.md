# AR Solution Home Tutor - Web Application

A modern, high-energy web application for **AR Solution Home Tutor** connecting parents and students across Classes 1–12 (CBSE, ICSE, Maharashtra State Board) with verified 1-on-1 home and online tutors.

Direct WhatsApp Coordinator Helpline: **+91 91127 68872** (`9112768872`)

---

## 📱 Fix for "Blank Page When Open" on GitHub Pages

When you open `https://arhuse8.github.io/ARSolution/` and see a **blank page**, it is because GitHub Pages is currently configured to publish from **`/(root)`** instead of the built bundle. The root contains raw uncompiled files (`src/main.tsx`), which mobile & desktop browsers cannot execute directly.

### ⚡ Fix in 10 Seconds (Recommended):

1. Go to your repository settings on GitHub:  
   👉 **https://github.com/arhuse8/ARSolution/settings/pages**
2. Under **"Build and deployment"**:
   - Keep **Source**: `Deploy from a branch`
   - Under **Branch**: Select **`main`** and change the folder dropdown from **`/(root)`** to **`/docs`**
   - Click **Save**
3. Wait 30 seconds, then open:  
   👉 **https://arhuse8.github.io/ARSolution/**

Your website will load immediately with all styling, class cards, teacher registration, and WhatsApp chat!

---

### Alternative Fix: Use GitHub Actions

1. Go to **https://github.com/arhuse8/ARSolution/settings/pages**
2. Under **"Build and deployment"** -> **"Source"**:
   - Select **GitHub Actions**
3. Go to the **Actions** tab (`https://github.com/arhuse8/ARSolution/actions`), click **Deploy to GitHub Pages** on the left, and click **Run workflow**.

---

## 🛠️ Local Development & Build Commands

- **Start Dev Server**: `npm run dev` (starts on `http://localhost:3000`)
- **Build All Static Bundles**: `npm run build`
  - Generates `dist/` (for GitHub Actions)
  - Generates `docs/` (for GitHub Pages `/docs` deployment)
  - Generates `assets/` (for root deployment fallback)
- **Check Compilation**: `npm run lint`
