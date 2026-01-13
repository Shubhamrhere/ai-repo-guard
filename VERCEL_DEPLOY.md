# Vercel Deployment Guide 🚀

## Step-by-Step Deployment Process

### Step 1: Vercel Account Setup

1. **Vercel pe jao**: https://vercel.com
2. **Sign up/Login** karo (GitHub account se easily sign up kar sakte ho)
3. Dashboard mein jao

### Step 2: Project Import Karo

1. Vercel Dashboard mein **"Add New..."** → **"Project"** click karo
2. **"Import Git Repository"** select karo
3. Apni GitHub repository select karo: `Shubhamrhere/ai-repo-guard`
4. **"Import"** click karo

### Step 3: Project Configuration

1. **Framework Preset**: Automatically detect hoga (Vite)
2. **Root Directory**: `.` (default - change mat karo)
3. **Build Command**: `npm run build` (auto-detect hoga)
4. **Output Directory**: `dist` (auto-detect hoga)
5. **Install Command**: `npm install` (auto-detect hoga)

### Step 4: ⚠️ IMPORTANT - Environment Variables Add Karo

**Yeh sabse important step hai!**

1. **"Environment Variables"** section mein jao
2. **"Add"** button click karo
3. Ye variable add karo:
   - **Key**: `VITE_GEMINI_API_KEY`
   - **Value**: `AIzaSyCLnALnDYyP3pcyvOK98FSwELW2ie49-Jw` (ya apni API key)
   - **Environment**: 
     - ✅ **Production** (check karo)
     - ✅ **Preview** (check karo)
     - ✅ **Development** (check karo - optional)
4. **"Save"** click karo

### Step 5: Deploy!

1. **"Deploy"** button click karo
2. Build process start hoga (2-3 minutes lag sakte hain)
3. Deploy complete hone ke baad aapko **live URL** milega!

## After Deployment

### Your App URL
Deploy ke baad aapko milta hai:
- **Production URL**: `https://ai-repo-guard.vercel.app` (ya custom domain)
- Har commit pe automatically redeploy hoga!

### Important Notes

1. **Environment Variables**: 
   - `.env` file local development ke liye hai
   - Vercel pe environment variables add karna **must** hai
   - API key Vercel dashboard mein add karni hogi

2. **Automatic Deployments**:
   - Main branch pe push = Production deploy
   - Other branches = Preview deployments

3. **Build Settings** (Auto-detect hoga):
   ```
   Framework: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

## Troubleshooting

### Build Fails?
- Check environment variables properly add hui hain ya nahi
- Build logs check karo Vercel dashboard mein

### API Key Not Working?
- Environment variable name check karo: `VITE_GEMINI_API_KEY` (exact match)
- Redeploy karo after adding environment variables

### 404 Errors?
- Check `dist` folder properly build ho raha hai
- Vite config check karo

## Quick Checklist ✅

- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Environment variable `VITE_GEMINI_API_KEY` added
- [ ] All environments (Production, Preview) selected
- [ ] Deploy button clicked
- [ ] Build successful
- [ ] Live URL working

## Custom Domain (Optional)

1. Vercel Dashboard → Project → Settings → Domains
2. Custom domain add karo
3. DNS settings configure karo
4. SSL automatically setup hoga!

---

**Deploy karo aur apna app live karo! 🎉**
