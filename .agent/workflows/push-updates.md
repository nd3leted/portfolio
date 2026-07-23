---
description: How to push website updates to GitHub and Cloudflare
---

# Push Website Updates

When you've made changes to your portfolio and want to publish them online, follow these steps:

## Option 1: Ask Claude (Easiest!)

Just say one of these:
- "Push my changes"
- "Update my website"
- "Deploy my portfolio"

Claude will run the commands for you automatically.

---

## Option 2: Run Commands Yourself

If you want to do it manually, open **Terminal** and run:

// turbo-all
```bash
cd /Users/andyhung/Documents/Antigravity
git add -A
git commit -m "Update portfolio"
git push
```

### What each command does:
1. `cd ...` - Navigate to your project folder
2. `git add -A` - Stage all your changes
3. `git commit -m "..."` - Save changes with a message
4. `git push` - Upload to GitHub

---

## What happens after pushing:

1. **GitHub** - Updates immediately
2. **GitHub Pages** - Rebuilds in ~1-2 minutes  
   → Live at: https://nd3leted.github.io/portfolio
3. **Cloudflare Pages** - Rebuilds in ~30 seconds  
   → Live at your custom domain

---

## Quick Tips:

- Always test locally first at http://localhost:8080
- Use descriptive commit messages like "Add new project" or "Fix mobile layout"
- Changes go live automatically after pushing!
