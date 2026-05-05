# 🚀 VERCEL DEPLOYMENT CHECKLIST

## Before Deploying:

### 1. **Environment Variables Setup** ✅
   - [ ] Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - [ ] Add these variables:
     ```
     VITE_FIREBASE_API_KEY=your_actual_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     VITE_RAZORPAY_KEY_ID=rzp_live_your_key_here
     VITE_ADMIN_USERNAME=admin
     VITE_ADMIN_PASSWORD=school@2024
     ```
   - [ ] DO NOT commit the `.env` file to GitHub (already in .gitignore ✓)

### 2. **Git & GitHub** ✅
   - [ ] Commit all changes:
     ```powershell
     git add .
     git commit -m "Fix: Vercel deployment blank page - add error boundary and proper vite config"
     git push origin main
     ```

### 3. **Vercel Deployment** ✅
   - [ ] Go to https://vercel.com/dashboard
   - [ ] Click "Add New" → "Project"
   - [ ] Import your repository: `https://github.com/alokkumaar1/UPG-School.git`
   - [ ] Select "Vite" as framework (Vercel should auto-detect)
   - [ ] Add Environment Variables (from Step 1)
   - [ ] Click "Deploy"

## After Deployment:

### 4. **Verify Deployment** 🔍
   - [ ] Visit your Vercel URL
   - [ ] Open Browser DevTools (F12)
   - [ ] Check Console tab - should show NO errors
   - [ ] Check Network tab - all assets should load (status 200)
   - [ ] Try navigating to different routes:
     - [ ] `/` (Home)
     - [ ] `/admission` (Application Form)
     - [ ] `/admin/login` (Admin Panel)
     - [ ] `/invalid-page` (should show 404)

### 5. **Test All Features** 🧪
   - [ ] Firebase config loads (no "Error (auth/invalid-api-key)")
   - [ ] Images display correctly
   - [ ] Forms are interactive
   - [ ] Routing works (links don't cause 404)
   - [ ] Admin login page loads

### 6. **Common Issues & Fixes** 🔧

   **Issue: Still blank page?**
   - Check browser console (F12 → Console tab) for errors
   - Click "Details" on Error Boundary (if it appears)
   - Check Vercel deployment logs:
     1. Go to Vercel Dashboard
     2. Select project → Deployments
     3. Click the failed/latest deployment
     4. Check "Build Logs" tab
     5. Look for red error messages

   **Issue: 404 on routes?**
   - Confirm vercel.json has correct rewrites ✓
   - Verify package.json build script: "build": "vite build" ✓
   - Check that dist/ folder exists after build ✓

   **Issue: Firebase errors?**
   - Verify all VITE_FIREBASE_* variables are set in Vercel
   - Check they exactly match your Firebase project settings
   - NO extra spaces or quotes

   **Issue: Slow loading?**
   - Images are large (3MB each)
   - Consider compressing: https://compressor.io
   - Or lazy load images

### 7. **Debugging Steps** 🐛

   If you still see blank page:

   1. **Local test (always do first):**
      ```powershell
      npm run build      # Build
      npm run preview    # Test production build locally
      ```
      Open http://localhost:4173 and check for errors

   2. **Check Vercel Logs:**
      - Deployment should show: "✓ Built successfully in XXs"
      - Output directory: dist (check build logs)

   3. **Screenshot console errors:**
      - Go to your Vercel deployment URL
      - Press F12 to open DevTools
      - Go to Console tab
      - Take screenshot of ANY red errors
      - Share it for debugging

   4. **Check Network requests:**
      - In DevTools Network tab
      - Refresh page (Ctrl+Shift+R for hard refresh)
      - Look for failed requests (red status)
      - Check if assets are served from Vercel

## ✨ Final Summary:

| Item | Status | Action |
|------|--------|--------|
| vite.config.js | ✅ Fixed | Build output & sourcemap configured |
| vercel.json | ✅ Fixed | Routing & caching configured |
| Error Boundary | ✅ Added | Will catch any runtime errors |
| Environment Variables | ⏳ Pending | Add your Firebase keys to Vercel |
| Production Build | ✅ Tested | Builds successfully locally |
| Deployment | ⏳ Pending | Deploy to Vercel after adding env vars |

---

**QUICK START:**
1. ✅ All code fixes are done
2. ⏳ Add environment variables to Vercel dashboard
3. ⏳ Push code to GitHub
4. ⏳ Deploy on Vercel
5. ✅ Test the live URL

Questions? Check the "Common Issues & Fixes" section or take a console screenshot for debugging!
