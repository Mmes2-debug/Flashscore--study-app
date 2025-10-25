
#!/bin/bash

echo "🔍 Vercel Deployment Setup Verification"
echo "========================================"
echo ""

# Check if vercel.json exists
if [ -f "vercel.json" ]; then
    echo "✅ vercel.json found"
else
    echo "❌ vercel.json missing"
fi

# Check if frontend package.json exists
if [ -f "apps/frontend/package.json" ]; then
    echo "✅ Frontend package.json found"
else
    echo "❌ Frontend package.json missing"
fi

# Check if shared package exists
if [ -f "packages/shared/package.json" ]; then
    echo "✅ Shared package found"
else
    echo "❌ Shared package missing"
fi

# Check if next.config.js exists
if [ -f "apps/frontend/next.config.js" ]; then
    echo "✅ next.config.js found"
else
    echo "❌ next.config.js missing"
fi

echo ""
echo "📋 Next Steps:"
echo "1. Push code to GitHub"
echo "2. Import repository in Vercel dashboard"
echo "3. Set environment variables (see docs/Blueprint.md)"
echo "4. Deploy!"
echo ""
echo "📖 Full guide: docs/Blueprint.md"
