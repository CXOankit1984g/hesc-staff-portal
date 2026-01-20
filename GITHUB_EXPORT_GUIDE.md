# GitHub Export Guide - HESC Staff Portal

This guide explains how to export the HESC Staff Portal application to a GitHub repository.

## Method 1: Using Manus Management UI (Recommended)

The easiest way to export your project to GitHub is through the Manus Management UI:

### Steps:

1. **Open Management UI**
   - Click the "Settings" panel in the Manus Management UI (right side of the screen)
   - Navigate to the "GitHub" section in the Settings sub-menu

2. **Connect GitHub Account**
   - Click "Connect GitHub" or "Authorize with GitHub"
   - You'll be redirected to GitHub to authorize the Manus application
   - Grant the necessary permissions and authorize

3. **Configure Export Settings**
   - Select the GitHub owner (your personal account or organization)
   - Enter the repository name (e.g., `hesc-staff-portal`)
   - Choose repository visibility (Public or Private)
   - Add an optional description

4. **Export Project**
   - Click "Export to GitHub" button
   - Manus will create a new repository and push all project files
   - You'll receive a confirmation with the repository URL

5. **Access Your Repository**
   - Navigate to `https://github.com/{owner}/{repository-name}`
   - Your code is now on GitHub and ready to use

---

## Method 2: Manual GitHub Export via CLI

If you prefer to manually export the project:

### Prerequisites:
- GitHub account
- Git installed on your machine
- GitHub CLI (`gh`) or Git credentials configured

### Steps:

1. **Create a New Repository on GitHub**
   - Go to https://github.com/new
   - Enter repository name: `hesc-staff-portal`
   - Choose visibility (Public/Private)
   - Click "Create repository"
   - **Do NOT** initialize with README, .gitignore, or license

2. **Download Project Files**
   - From Manus Management UI, go to "Code" panel
   - Click "Download all files" to get the complete project
   - Extract the ZIP file to your local machine

3. **Initialize Git Repository**
   ```bash
   cd hesc-staff-portal
   git init
   git add .
   git commit -m "Initial commit: HESC Staff Portal"
   ```

4. **Add Remote Repository**
   ```bash
   git remote add origin https://github.com/{your-username}/hesc-staff-portal.git
   git branch -M main
   git push -u origin main
   ```

5. **Verify Upload**
   - Visit your GitHub repository URL
   - Confirm all files are present

---

## Project Structure

Your GitHub repository will include:

```
hesc-staff-portal/
├── client/                 # React frontend application
│   ├── public/            # Static assets (images, favicon)
│   ├── src/
│   │   ├── pages/         # Page components (Dashboard, Applications, etc.)
│   │   ├── components/    # Reusable UI components
│   │   ├── lib/           # Utility functions and helpers
│   │   ├── contexts/      # React contexts
│   │   ├── App.tsx        # Main app component with routing
│   │   ├── main.tsx       # React entry point
│   │   └── index.css      # Global styles and Tailwind config
│   └── index.html         # HTML template
├── server/                # Backend server (Express)
├── shared/                # Shared types and constants
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.ts         # Vite build configuration
├── DEPLOYMENT_GUIDE_MAC.md # macOS deployment instructions
└── README.md              # Project documentation
```

---

## After Export: Next Steps

### 1. **Add Collaborators**
   - Go to Settings → Collaborators
   - Add team members who should have access

### 2. **Set Up Branch Protection**
   - Go to Settings → Branches
   - Create a rule for the `main` branch
   - Require pull request reviews before merging

### 3. **Enable GitHub Actions (Optional)**
   - Create `.github/workflows/` directory
   - Add CI/CD workflows for automated testing and deployment

### 4. **Configure Secrets (Optional)**
   - Go to Settings → Secrets and variables → Actions
   - Add any API keys or environment variables needed for CI/CD

### 5. **Update README.md**
   - Add project description
   - Include setup instructions
   - Document features and usage

---

## Keeping GitHub in Sync

### Option A: Using Manus UI
- Make changes in Manus
- Create a new checkpoint
- Re-export to GitHub (this will update the repository)

### Option B: Using Git CLI
- Download latest files from Manus
- Commit changes locally: `git add . && git commit -m "Update message"`
- Push to GitHub: `git push origin main`

### Option C: Two-Way Sync
- Clone the GitHub repo to your machine
- Make changes locally
- Push to GitHub
- Download from GitHub and import back to Manus if needed

---

## Important Notes

1. **Environment Variables**: Sensitive data (API keys, database credentials) should NOT be committed to GitHub. Use `.gitignore` and GitHub Secrets instead.

2. **Large Files**: GitHub has a 100MB file size limit. If your project includes large assets, consider using Git LFS (Large File Storage).

3. **License**: Consider adding a LICENSE file to specify how others can use your code.

4. **.gitignore**: The project includes a `.gitignore` file to exclude `node_modules/`, build artifacts, and other unnecessary files.

5. **Deployment**: To deploy from GitHub, you can use:
   - GitHub Pages (for static sites)
   - Vercel, Netlify, or Railway (for full-stack apps)
   - Docker containers on any cloud provider

---

## Troubleshooting

### "Repository already exists"
- The repository name is already taken on GitHub
- Choose a different name or delete the existing repository

### "Permission denied (publickey)"
- Your Git credentials aren't configured
- Run: `git config --global user.email "your-email@example.com"`
- Run: `git config --global user.name "Your Name"`
- Set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### "Remote origin already exists"
- You're trying to add a remote that already exists
- Remove it first: `git remote remove origin`
- Then add the new remote: `git remote add origin https://github.com/...`

---

## Support

For more information:
- [GitHub Documentation](https://docs.github.com)
- [Git Tutorial](https://git-scm.com/doc)
- [Manus Help Center](https://help.manus.im)
