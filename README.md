# AR Solution Home Tutor - Web Application

A modern, high-energy web application for **AR Solution Home Tutor** connecting parents and students across Classes 1–12 (CBSE, ICSE, Maharashtra State Board) with verified 1-on-1 home and online tutors.

Direct WhatsApp Coordinator Helpline: **+91 91127 68872** (`9112768872`)

---

## 📱 Why the Website Did Not Open on Mobile

When hosting from GitHub:
1. **GitHub Pages defaults to serving the uncompiled root folder**:
   If GitHub Pages is set to `main` branch with `/ (root)`, it serves `index.html` pointing to `<script type="module" src="/src/main.tsx"></script>`. Mobile browsers (Safari on iPhone, Chrome on Android) **cannot execute raw `.tsx` TypeScript files** and will show a blank white screen.
2. **Missing trailing slash on mobile**:
   When mobile users open `https://arhuse8.github.io/ARSolution` (without the trailing `/`), relative assets fail to resolve. We added an automatic URL normalizer to instantly fix this.
3. **Restricted mobile WebViews / Private Browsing**:
   We added safe wrappers around `localStorage` and `matchMedia`, plus an `ErrorBoundary` with a direct "Contact Coordinator on WhatsApp" fallback.

---

## 🚀 How to Make It Open on Mobile (Choose ANY 1 of 3 Options)

### 🥇 Option 1: Set Folder to `/docs` (Easiest - 10 Seconds)
The compiled production bundle is already built and committed into the `docs/` folder of this repository.

1. Open your repository on GitHub: `https://github.com/arhuse8/ARSolution`
2. Click **Settings** (top tab) ⚙️
3. In the left menu, click **Pages** 📄
4. Under **Build and deployment**:
   - **Source**: Select **"Deploy from a branch"**
   - **Branch**: Select **`main`** (or `master`)
   - **Folder**: Change from `/ (root)` to **`/docs`**
5. Click **Save**.
6. Wait 30–60 seconds, then open on your mobile phone:
   👉 **`https://arhuse8.github.io/ARSolution/`**
   The website will open immediately with full styling, mobile menus, and 1-tap WhatsApp connectivity!

---

### 🥈 Option 2: Switch to "GitHub Actions" (Automated)
Your repository has the pre-configured workflow `.github/workflows/deploy.yml`:

1. Open `https://github.com/arhuse8/ARSolution`
2. Click **Settings** > **Pages**
3. Under **Build and deployment** > **Source**, change from **"Deploy from a branch"** to **"GitHub Actions"**
4. GitHub Actions will automatically run `npm run build` and publish the site.

---

### 🥉 Option 3: Deploy via Terminal (`npm run deploy`)
1. In your local terminal, run:
   ```bash
   npm run deploy
   ```
2. In GitHub repository **Settings** > **Pages**, set **Branch** to **`gh-pages`** and folder to **`/ (root)`**, then click **Save**.

---

## 🛠️ Mobile Improvements Included in this Build

- **Compiled `/docs` folder**: Static HTML, CSS, and JS ready for instant GitHub Pages serving without build tools.
- **Auto-Trailing Slash Redirect**: Visiting `arhuse8.github.io/ARSolution` automatically normalizes to `arhuse8.github.io/ARSolution/` so assets load seamlessly on mobile.
- **Mobile Popup Safe WhatsApp Launcher**: Directly launches the native WhatsApp app on Android & iOS without popup blockers or blank windows.
- **Narrow Screen Adaptation**: Responsive Floating WhatsApp Widget fits smoothly on all devices down to 320px screens.
- **Client-Side Error Boundary**: Catches any browser incompatibilities and offers an instant reload button and WhatsApp coordinator helpline (+91 91127 68872).
- **LocalStorage Direct Message Inbox**: Parent booking submissions are stored locally and accessible in the Coordinator Inbox on static GitHub Pages.
