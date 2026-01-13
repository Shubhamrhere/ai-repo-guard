# GitHub Push Guide - Step by Step

## Step 1: GitHub pe New Repository Banao

1. GitHub.com pe jao aur login karo
2. Top right corner mein **"+"** button click karo
3. **"New repository"** select karo
4. Repository details fill karo:
   - **Repository name**: `gemini-repo-guard` (ya jo naam chahiye)
   - **Description**: "AI-powered security analysis tool for GitHub repositories"
   - **Visibility**: Public ya Private (aapki choice)
   - **⚠️ IMPORTANT**: **"Initialize this repository with a README"** ko **UNCHECK** karo (kyunki aapke paas already code hai)
5. **"Create repository"** button click karo

## Step 2: Terminal Commands (Project Folder mein)

Apne project folder mein ye commands run karo:

```bash
# Step 1: Git initialize karo (agar nahi hai)
git init

# Step 2: Sab files add karo
git add .

# Step 3: Pehla commit karo
git commit -m "Initial commit: Gemini Repo Guard - AI-powered security analysis tool"

# Step 4: Main branch ko 'main' naam do (agar master hai to)
git branch -M main

# Step 5: GitHub repository ka URL add karo
# (Yaha aapka actual GitHub username aur repo name aayega)
git remote add origin https://github.com/YOUR_USERNAME/gemini-repo-guard.git

# Step 6: Code push karo
git push -u origin main
```

## Step 3: GitHub Username/Password

Agar aapse username/password mange to:
- **Username**: Apna GitHub username
- **Password**: GitHub Personal Access Token use karo (password nahi)

### Personal Access Token Banana:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" click karo
3. Permissions: `repo` select karo
4. Token copy karo aur password ki jagah use karo

## Quick Commands (Copy-Paste Ready)

```bash
cd "C:\Users\dell\OneDrive\Desktop\New folder (2)\gemini-repo-guard-main"
git init
git add .
git commit -m "Initial commit: Gemini Repo Guard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gemini-repo-guard.git
git push -u origin main
```

**⚠️ Remember**: `YOUR_USERNAME` ko apne actual GitHub username se replace karo!

## Agar Error Aaye To:

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/gemini-repo-guard.git
```

### "failed to push some refs"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Authentication Error
- Personal Access Token use karo (password nahi)
- Ya SSH key setup karo
