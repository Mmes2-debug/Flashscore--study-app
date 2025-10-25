
#!/bin/bash

set -e

echo "🔍 Sports Central Build Verification (Enterprise-Grade)"
echo "========================================================="
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    if [ $2 -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
    else
        echo -e "${RED}❌ $1${NC}"
        exit 1
    fi
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Step 1: Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf packages/shared/dist
rm -rf apps/frontend/.next
rm -rf apps/frontend/out
rm -rf node_modules/.cache
print_status "Clean completed" $?

# Step 2: Verify Node version
echo ""
echo "📦 Verifying Node.js version..."
NODE_VERSION=$(node -v)
echo "Node.js: $NODE_VERSION"
print_status "Node.js verified" $?

# Step 3: Install dependencies
echo ""
echo "📥 Installing dependencies..."
npm install --legacy-peer-deps --quiet
print_status "Dependencies installed" $?

# Step 4: Build shared package
echo ""
echo "🔨 Building shared package..."
cd packages/shared
npm run build 2>&1 | tee /tmp/shared-build.log
SHARED_BUILD_STATUS=$?
cd ../..

if [ $SHARED_BUILD_STATUS -eq 0 ]; then
    print_status "Shared package built successfully" 0
    
    # Verify output files
    if [ -d "packages/shared/dist" ] && [ "$(ls -A packages/shared/dist 2>/dev/null)" ]; then
        echo "  📁 Output: packages/shared/dist"
        echo "  📄 Files: $(ls packages/shared/dist | wc -l) generated"
    else
        print_status "Shared package dist folder is empty" 1
    fi
else
    echo ""
    echo "📋 Shared Package Build Log:"
    cat /tmp/shared-build.log
    print_status "Shared package build failed" 1
fi

# Step 5: Build frontend
echo ""
echo "🔨 Building frontend..."
cd apps/frontend
npm run build 2>&1 | tee /tmp/frontend-build.log
FRONTEND_BUILD_STATUS=$?
cd ../..

if [ $FRONTEND_BUILD_STATUS -eq 0 ]; then
    print_status "Frontend built successfully" 0
    
    # Verify Next.js output
    if [ -d "apps/frontend/.next" ] && [ "$(ls -A apps/frontend/.next 2>/dev/null)" ]; then
        echo "  📁 Output: apps/frontend/.next"
        
        # Check for required Next.js directories
        if [ -d "apps/frontend/.next/server" ]; then
            echo "  ✓ Server bundle created"
        fi
        if [ -d "apps/frontend/.next/static" ]; then
            echo "  ✓ Static assets created"
        fi
    else
        print_status "Frontend .next folder is empty" 1
    fi
else
    echo ""
    echo "📋 Frontend Build Log:"
    cat /tmp/frontend-build.log
    print_status "Frontend build failed" 1
fi

# Step 6: Verify build artifacts
echo ""
echo "🔍 Verifying build artifacts..."

# Check shared package exports
if [ -f "packages/shared/dist/index.js" ] && [ -f "packages/shared/dist/index.d.ts" ]; then
    print_status "Shared package exports verified" 0
else
    print_status "Shared package exports missing" 1
fi

# Check Next.js build manifest
if [ -f "apps/frontend/.next/build-manifest.json" ]; then
    print_status "Next.js build manifest verified" 0
else
    print_status "Next.js build manifest missing" 1
fi

# Step 7: Size analysis
echo ""
echo "📊 Build Size Analysis:"
SHARED_SIZE=$(du -sh packages/shared/dist 2>/dev/null | cut -f1)
FRONTEND_SIZE=$(du -sh apps/frontend/.next 2>/dev/null | cut -f1)
echo "  Shared package: $SHARED_SIZE"
echo "  Frontend build: $FRONTEND_SIZE"

# Final summary
echo ""
echo "========================================================="
echo -e "${GREEN}✅ All builds completed successfully!${NC}"
echo ""
echo "📦 Ready for deployment to:"
echo "  • Vercel (Frontend)"
echo "  • Replit Deployments"
echo ""
echo "🚀 Next steps:"
echo "  1. Test locally: cd apps/frontend && npm start"
echo "  2. Deploy to Vercel: vercel --prod"
echo "  3. Monitor at: https://vercel.com/dashboard"
echo ""
