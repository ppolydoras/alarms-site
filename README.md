# SecureGuard - Alarm Systems Website

A complete, production-quality static multi-page website for a home & commercial alarm systems and fire detection/suppression solutions company. Built with accessibility-first principles, targeting WCAG 2.2 AA compliance.

## 🌐 Live Demo

After deployment, the site will be available at:
```
https://alarm-systems.gr/
```

## 📁 Project Structure

```
alarms-site/
├── index.html           # Home page
├── products.html        # Product categories
├── services.html        # Services offered
├── firesafety.html      # Fire detection & suppression
├── about.html           # About the company
├── contact.html         # Contact form (Formspree)
├── accessibility.html   # Accessibility statement
├── privacy.html         # Privacy policy
├── 404.html             # Custom 404 error page
├── styles.css           # Custom CSS overrides
├── scripts.js           # Minimal JavaScript
├── sitemap.xml          # XML sitemap for SEO
├── robots.txt           # Robots directives
├── assets/
│   └── logo.svg         # Company logo placeholder
└── README.md            # This file
```

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, modern layouts
- **Bootstrap 5.3** - CSS framework (via CDN)
- **Vanilla JavaScript** - Minimal, accessibility-focused
- **Formspree** - Contact form processing

## ♿ Accessibility Features

This site targets **WCAG 2.2 AA** compliance:

- ✅ Skip link for keyboard navigation
- ✅ Proper heading hierarchy (single H1 per page)
- ✅ Semantic HTML landmarks (header, nav, main, footer)
- ✅ Visible focus indicators on all interactive elements
- ✅ Color contrast meeting AA standards (4.5:1 minimum)
- ✅ Keyboard-navigable menus and forms
- ✅ ARIA attributes for dynamic content
- ✅ Form labels with for/id associations
- ✅ Required field indicators (visual and programmatic)
- ✅ Error messages with aria-describedby
- ✅ aria-live regions for status updates
- ✅ Meaningful alt text for images
- ✅ Respects prefers-reduced-motion
- ✅ Responsive design (mobile-first)

## 🚀 Running Locally

### Option 1: Python HTTP Server

```bash
cd alarms-site
python3 -m http.server 8000
```

Then open: `http://localhost:8000`

### Option 2: Node.js HTTP Server

```bash
# Install http-server globally if needed
npm install -g http-server

# Run the server
cd alarms-site
http-server -p 8000
```

Then open: `http://localhost:8000`

### Option 3: VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 4: PHP Built-in Server

```bash
cd alarms-site
php -S localhost:8000
```

## 📤 Deploying to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name your repository (e.g., `alarms-site`)
3. Keep it public for GitHub Pages
4. Don't initialize with README (we have one)

### Step 2: Push the Code

```bash
cd alarms-site

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: SecureGuard website"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/alarms-site.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in sidebar)
3. Under "Source", select:
   - **Deploy from a branch**
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Wait 1-2 minutes for deployment

Your site will be live at:
```
https://alarm-systems.gr/
```

## ⚙️ Post-Deployment Configuration

### Update Canonical URLs

After deployment, update the base URL in these files:

1. **All HTML files** - Update the canonical URLs:
   ```html
   <link rel="canonical" href="https://alarm-systems.gr/">
   <meta property="og:url" content="https://alarm-systems.gr/">
   ```

2. **sitemap.xml** - Replace all URLs:
   ```xml
   <loc>https://alarm-systems.gr/</loc>
   ```

3. **robots.txt** - Update sitemap location:
   ```
   Sitemap: https://alarm-systems.gr/sitemap.xml
   ```

4. **contact.html** - Update the Formspree redirect URL:
   ```html
   <input type="hidden" name="_next" value="https://alarm-systems.gr/contact.html?submitted=true">
   ```

### Using a Custom Domain (Optional)

1. Add a `CNAME` file with your domain:
   ```
   www.yourdomain.gr
   ```
2. Configure DNS at your domain registrar
3. Update all canonical URLs to use your domain

## 📬 Formspree Configuration

The contact form uses [Formspree](https://formspree.io) for processing.

### Current Configuration

- **Form Action**: `https://formspree.io/f/xreeponq`
- **Honeypot**: Anti-spam field included (`_gotcha`)
- **Redirect**: Returns to contact page with `?submitted=true`

### Setting Up Your Own Form

1. Create an account at [formspree.io](https://formspree.io)
2. Create a new form
3. Copy your form endpoint
4. Update `contact.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
5. Verify your email in Formspree dashboard
6. Test the form submission

### Testing Form Submissions

- Formspree has a test mode for development
- Check your email for submissions
- Submissions also appear in Formspree dashboard

## 🌍 Language

The site is in **Greek (el)**. All UI text, meta descriptions, and content are in Greek.

## 📱 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome for Android)

## 🔍 SEO Features

- Unique `<title>` and `<meta description>` per page
- Open Graph meta tags for social sharing
- Twitter Card meta tags
- Canonical URLs
- XML Sitemap
- robots.txt
- Semantic HTML structure
- Mobile-friendly (responsive)

## 📝 Content Notes

This is a **skeleton/demo site** with:
- Realistic placeholder content in Greek
- No real products or prices
- No e-commerce functionality
- No backend (static HTML only)
- Contact form processing via Formspree

## 🤝 Contributing

This is a demonstration project. Feel free to fork and adapt for your own use.

## 📄 License

This project is provided as-is for demonstration purposes. All content is placeholder material. The Bootstrap framework is licensed under MIT.

---

**SecureGuard** - Ασφάλεια που εμπιστεύεστε, τεχνολογία που προστατεύει.
