# HESC Staff Portal - macOS Local Deployment Guide

This guide provides detailed step-by-step instructions to deploy and run the HESC Staff Portal application locally on your Mac.

---

## Prerequisites

Before starting, ensure your Mac has the following installed:

### 1. **Node.js and npm**
The application requires Node.js version 18 or higher.

**Check if installed:**
```bash
node --version
npm --version
```

**If not installed:**
- Visit [nodejs.org](https://nodejs.org/)
- Download the LTS (Long Term Support) version
- Run the installer and follow the prompts
- Verify installation by running the commands above

### 2. **pnpm Package Manager**
This project uses pnpm instead of npm for better dependency management.

**Install pnpm:**
```bash
npm install -g pnpm
```

**Verify installation:**
```bash
pnpm --version
```

### 3. **Git** (Optional but recommended)
For version control and cloning the repository.

**Check if installed:**
```bash
git --version
```

**If not installed:**
- Install Xcode Command Line Tools:
```bash
xcode-select --install
```

---

## Step-by-Step Deployment Instructions

### Step 1: Obtain the Application Files

You have two options:

#### Option A: Download from Manus
1. Access your Manus project dashboard
2. Navigate to the Code panel
3. Click "Download all files"
4. Extract the ZIP file to your desired location (e.g., `~/Projects/hesc-staff-portal`)

#### Option B: Clone from GitHub (if available)
```bash
git clone <repository-url>
cd hesc-staff-portal
```

### Step 2: Navigate to Project Directory

Open Terminal and navigate to your project folder:

```bash
cd ~/Projects/hesc-staff-portal
```

(Replace `~/Projects/hesc-staff-portal` with your actual path)

### Step 3: Install Dependencies

Install all required npm packages using pnpm:

```bash
pnpm install
```

This command will:
- Read the `package.json` file
- Download all dependencies listed in the project
- Create a `node_modules` folder
- Generate a `pnpm-lock.yaml` file for reproducible installs

**Expected time:** 2-5 minutes depending on your internet connection

**If you encounter issues:**
- Clear the cache: `pnpm store prune`
- Try again: `pnpm install`

### Step 4: Start the Development Server

Run the development server:

```bash
pnpm dev
```

**Expected output:**
```
➜  Local:   http://localhost:3000/
➜  Network: http://192.168.x.x:3000/
```

The application will automatically open in your default browser at `http://localhost:3000/`

### Step 5: Access the Application

Open your web browser and navigate to:
```
http://localhost:3000/
```

You should see the HESC Staff Portal with:
- Teal sidebar navigation on the left
- HESC logo in the sidebar header
- Executive Dashboard displaying metrics and charts
- Full navigation menu (Dashboard, Applications, Student Records, etc.)

---

## Navigating the Application

### Main Pages

1. **Dashboard** - Executive overview with key metrics and charts
2. **Applications** - Manage financial aid applications
3. **Student Records** - View and manage student information
4. **Grants & Scholarships** - Program management and funding allocation
5. **Reports** - Analytics and report generation
6. **Programs** - Program configuration and management
7. **Documents** - Document management
8. **College** - College-specific information
9. **Help** - Help and support documentation
10. **Settings** - System and user settings

### Persona Selector

In the top-right header, you can switch between different user roles:
- Support Staff
- Staff
- Program Manager
- Administrator
- Executive

Each persona represents different access levels and features.

---

## Common Tasks

### Stopping the Development Server

Press `Ctrl+C` in the Terminal window running the dev server.

### Rebuilding the Application

If you make changes to the code:

```bash
pnpm build
```

This creates an optimized production build in the `dist/` folder.

### Viewing Production Build

To preview the production build locally:

```bash
pnpm preview
```

### Checking for TypeScript Errors

```bash
pnpm check
```

### Formatting Code

```bash
pnpm format
```

---

## Troubleshooting

### Issue: "Command not found: pnpm"

**Solution:**
```bash
npm install -g pnpm
```

### Issue: Port 3000 Already in Use

**Solution 1:** Kill the process using port 3000
```bash
lsof -ti:3000 | xargs kill -9
```

**Solution 2:** Use a different port
```bash
pnpm dev -- --port 3001
```

### Issue: "Module not found" or Dependency Errors

**Solution:**
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Issue: Changes Not Reflecting in Browser

**Solution:**
1. Hard refresh the browser: `Cmd+Shift+R`
2. Clear browser cache
3. Restart the dev server: `Ctrl+C` then `pnpm dev`

### Issue: "Cannot find module @/components/ui/..."

**Solution:**
Ensure all dependencies are installed:
```bash
pnpm install
```

The `@/` alias is configured in the project and should resolve automatically.

---

## Project Structure

```
hesc-staff-portal/
├── client/
│   ├── public/
│   │   ├── images/
│   │   │   └── hesc-logo.png
│   │   └── __manus__/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Applications.tsx
│   │   │   ├── StudentRecords.tsx
│   │   │   ├── GrantsScholarships.tsx
│   │   │   ├── Reports.tsx
│   │   │   ├── Programs.tsx
│   │   │   ├── Documents.tsx
│   │   │   ├── College.tsx
│   │   │   ├── Help.tsx
│   │   │   ├── Settings.tsx
│   │   │   └── NotFound.tsx
│   │   ├── components/
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── ui/
│   │   ├── contexts/
│   │   │   └── ThemeContext.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── index.html
├── server/
│   └── index.ts
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```

---

## Development Tips

### Hot Module Replacement (HMR)
The development server supports HMR, meaning changes to your code automatically reflect in the browser without a full page reload.

### Browser DevTools
- Open DevTools: `Cmd+Option+I`
- Use React DevTools extension for component inspection
- Check the Console tab for error messages

### VS Code Integration
If using VS Code:
1. Install the "Vite" extension
2. Install the "Tailwind CSS IntelliSense" extension
3. Install the "TypeScript Vue Plugin" extension

---

## Building for Production

To create a production-ready build:

```bash
pnpm build
```

This generates:
- Optimized JavaScript bundles in `dist/public/assets/`
- Minified CSS files
- Production-ready HTML

**Output:**
```
../dist/public/index.html                   367.88 kB │ gzip: 105.63 kB
../dist/public/assets/index-BzcuKDiv.css    119.82 kB │ gzip:  18.86 kB
../dist/public/assets/index-DbaDOU0M.js   1,377.78 kB │ gzip: 340.47 kB
```

---

## Environment Variables

The application uses environment variables for configuration. These are automatically injected in the Manus environment:

- `VITE_ANALYTICS_ENDPOINT` - Analytics service endpoint
- `VITE_ANALYTICS_WEBSITE_ID` - Analytics website ID
- `VITE_APP_ID` - Application ID
- `VITE_APP_TITLE` - Application title
- `VITE_APP_LOGO` - Application logo URL

For local development, these are optional and the app will work without them.

---

## Performance Optimization

The application uses:
- **React 19** - Latest React version with improved performance
- **Vite** - Fast build tool with instant HMR
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Recharts** - Composable charting library

---

## Support and Resources

### Official Documentation
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)

### Troubleshooting Resources
- Check the browser console for error messages
- Review the Terminal output for build errors
- Verify all dependencies are installed: `pnpm list`

---

## Next Steps

After successfully deploying locally:

1. **Explore the Interface** - Navigate through all pages to understand the application structure
2. **Customize Styling** - Modify `client/src/index.css` to adjust colors and themes
3. **Update Content** - Replace mock data with real data from your backend
4. **Add Features** - Implement additional functionality as needed
5. **Deploy to Production** - Follow your organization's deployment procedures

---

## Additional Notes

- The application is a static frontend built with React and does not require a backend server for basic functionality
- All data displayed is currently mock data for demonstration purposes
- To connect to a real backend API, you would need to add API endpoints and integrate them with the existing components
- The sidebar navigation is fully functional and supports role-based access patterns

---

**Last Updated:** January 2026
**Version:** 1.0.0
