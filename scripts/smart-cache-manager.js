
#!/usr/bin/env node

/**
 * Smart Build Cache Manager
 * Prevents build corruption by managing Next.js cache intelligently
 */

const fs = require('fs');
const path = require('path');

class SmartCacheManager {
  constructor() {
    this.frontendPath = path.join(__dirname, '..', 'apps', 'frontend');
    this.cachePaths = [
      path.join(this.frontendPath, '.next'),
      path.join(this.frontendPath, 'node_modules', '.cache'),
      path.join(__dirname, '..', 'node_modules', '.cache')
    ];
  }

  checkCacheHealth() {
    console.log('🔍 Checking cache health...');
    let hasIssues = false;

    for (const cachePath of this.cachePaths) {
      if (fs.existsSync(cachePath)) {
        const stats = fs.statSync(cachePath);
        const ageInHours = (Date.now() - stats.mtimeMs) / (1000 * 60 * 60);
        
        // Cache older than 24 hours might be stale
        if (ageInHours > 24) {
          console.log(`⚠️  Stale cache detected: ${cachePath} (${ageInHours.toFixed(1)}h old)`);
          hasIssues = true;
        }
      }
    }

    return hasIssues;
  }

  clearCache(selective = true) {
    console.log('🧹 Clearing build cache...');

    for (const cachePath of this.cachePaths) {
      if (fs.existsSync(cachePath)) {
        if (selective && cachePath.includes('.next')) {
          // Only clear specific Next.js cache folders that cause issues
          const selectivePaths = [
            path.join(cachePath, 'cache'),
            path.join(cachePath, 'server', 'chunks'),
            path.join(cachePath, 'static', 'webpack')
          ];

          selectivePaths.forEach(p => {
            if (fs.existsSync(p)) {
              fs.rmSync(p, { recursive: true, force: true });
              console.log(`  ✓ Cleared: ${path.relative(this.frontendPath, p)}`);
            }
          });
        } else if (!selective) {
          fs.rmSync(cachePath, { recursive: true, force: true });
          console.log(`  ✓ Cleared: ${path.relative(__dirname, cachePath)}`);
        }
      }
    }
  }

  optimizeForBuild() {
    console.log('⚡ Optimizing for build...');
    
    // Create optimized cache structure
    const nextCachePath = path.join(this.frontendPath, '.next', 'cache');
    if (!fs.existsSync(nextCachePath)) {
      fs.mkdirSync(nextCachePath, { recursive: true });
    }

    console.log('✅ Cache optimization complete');
  }
}

// CLI interface
const args = process.argv.slice(2);
const manager = new SmartCacheManager();

if (args.includes('--check')) {
  const hasIssues = manager.checkCacheHealth();
  process.exit(hasIssues ? 1 : 0);
} else if (args.includes('--clear-all')) {
  manager.clearCache(false);
} else if (args.includes('--clear-selective')) {
  manager.clearCache(true);
} else if (args.includes('--optimize')) {
  manager.optimizeForBuild();
} else {
  console.log(`
Smart Build Cache Manager

Usage:
  node scripts/smart-cache-manager.js [option]

Options:
  --check             Check cache health
  --clear-selective   Clear only problematic cache (recommended)
  --clear-all        Clear all cache
  --optimize         Optimize cache structure for builds
  `);
}
