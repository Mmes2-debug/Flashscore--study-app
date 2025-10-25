
# Vercel Frontend Deployment Blueprint

## Prerequisites
- GitHub repository with your code
- Vercel account (free tier works)
- MongoDB Atlas connection string
- Backend deployed (Replit or Render)

## Step 1: Environment Variables

Set these in Vercel Project Settings → Environment Variables:

```bash
# Backend Connection
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.replit.app

# Database (optional for frontend-only features)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sportscentral

# NextAuth Configuration
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>

# OAuth (if using)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Optional API Keys
NEXT_PUBLIC_ODDS_API_KEY=your-odds-api-key
NEXT_PUBLIC_ANALYTICS_API_KEY=your-analytics-api-key
```

## Step 2: Verify Build Configuration

Your `vercel.json` is already configured correctly:
- Build command: `npm run build:shared && cd apps/frontend && npm run build`
- Output directory: `apps/frontend/.next`
- Install command: `npm install --legacy-peer-deps`

## Step 3: Deploy to Vercel

### Option A: Via Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel will auto-detect the configuration from `vercel.json`
4. Add environment variables (from Step 1)
5. Click "Deploy"

### Option B: Via Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

## Step 4: Post-Deployment

1. **Update Backend CORS**: Add your Vercel URL to backend's `FRONTEND_URL` env var
2. **Test the deployment**: Visit your Vercel URL
3. **Set up custom domain** (optional): Vercel Dashboard → Domains

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all dependencies are in package.json
- Ensure shared package builds first (already configured)

### API Calls Fail
- Verify `NEXT_PUBLIC_BACKEND_URL` is set correctly
- Check backend CORS allows your Vercel domain
- Ensure backend is running

### Hydration Errors
- Clear browser cache
- Check for client-side only components wrapped in `ClientOnly`
- Review console logs for specific mismatches

## Architecture

```
Frontend (Vercel) → Backend (Replit/Render) → MongoDB Atlas
                 ↘ ML Service (Render)
```

## Cost
- **Vercel**: Free tier (100GB bandwidth/month)
- **Total**: $0/month on free tier

## Continuous Deployment
- Push to `main` → Auto-deploys to production
- Push to other branches → Creates preview deployments

## Security Checklist
- ✅ NEXTAUTH_SECRET is strong (32+ chars)
- ✅ Environment variables are set (not in code)
- ✅ Backend CORS is properly configured
- ✅ MongoDB Atlas IP whitelist includes Vercel IPs
