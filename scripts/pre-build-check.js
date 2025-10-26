
#!/usr/bin/env node

/**
 * Pre-Build Validation
 * Catches common issues before build starts
 */

const fs = require('fs');
const path = require('path');

class PreBuildValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  validate() {
    console.log('🔍 Running pre-build validation...\n');

    this.checkSharedPackage();
    this.checkNodeModules();
    this.checkTypeScriptConfig();
    this.checkEnvironmentVariables();
    this.checkDiskSpace();

    this.printResults();
    return this.errors.length === 0;
  }

  checkSharedPackage() {
    const sharedDist = path.join(__dirname, '..', 'packages', 'shared', 'dist');
    
    if (!fs.existsSync(sharedDist)) {
      this.errors.push('Shared package not built. Run: npm run build --workspace=packages/shared');
    } else {
      const indexJs = path.join(sharedDist, 'index.js');
      if (!fs.existsSync(indexJs)) {
        this.errors.push('Shared package dist/index.js missing');
      } else {
        console.log('✅ Shared package validated');
      }
    }
  }

  checkNodeModules() {
    const frontendModules = path.join(__dirname, '..', 'apps', 'frontend', 'node_modules');
    const rootModules = path.join(__dirname, '..', 'node_modules');

    if (!fs.existsSync(frontendModules) && !fs.existsSync(rootModules)) {
      this.errors.push('node_modules not found. Run: npm install --legacy-peer-deps');
    } else {
      console.log('✅ Dependencies validated');
    }
  }

  checkTypeScriptConfig() {
    const tsconfig = path.join(__dirname, '..', 'apps', 'frontend', 'tsconfig.json');
    
    if (!fs.existsSync(tsconfig)) {
      this.errors.push('Frontend tsconfig.json missing');
    } else {
      console.log('✅ TypeScript config validated');
    }
  }

  checkEnvironmentVariables() {
    const envExample = path.join(__dirname, '..', 'apps', 'frontend', '.env.example');
    const envDev = path.join(__dirname, '..', 'apps', 'frontend', '.env.development');

    if (!fs.existsSync(envDev)) {
      this.warnings.push('No .env.development file found. Using defaults.');
    } else {
      console.log('✅ Environment variables configured');
    }
  }

  checkDiskSpace() {
    // Basic check - just ensure we can write
    const testFile = path.join(__dirname, '..', '.build-test');
    try {
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
      console.log('✅ Disk space available');
    } catch (error) {
      this.errors.push('Cannot write to filesystem. Check disk space.');
    }
  }

  printResults() {
    console.log('\n' + '='.repeat(50));
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️  Warnings:');
      this.warnings.forEach(w => console.log(`   - ${w}`));
    }

    if (this.errors.length > 0) {
      console.log('\n❌ Errors:');
      this.errors.forEach(e => console.log(`   - ${e}`));
      console.log('\n🛠️  Fix errors before building.');
    } else {
      console.log('\n✅ All pre-build checks passed!');
    }

    console.log('='.repeat(50) + '\n');
  }
}

const validator = new PreBuildValidator();
const isValid = validator.validate();
process.exit(isValid ? 0 : 1);
