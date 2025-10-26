
#!/usr/bin/env node

/**
 * Build Progress Monitor
 * Detects build hangs and provides diagnostic information
 */

const { spawn } = require('child_process');
const path = require('path');

class BuildMonitor {
  constructor(timeout = 180000) { // 3 minutes default
    this.timeout = timeout;
    this.lastOutput = Date.now();
    this.buildProcess = null;
    this.hangDetected = false;
  }

  startBuild(command, args, cwd) {
    console.log(`🔨 Starting build: ${command} ${args.join(' ')}`);
    console.log(`📍 Working directory: ${cwd}`);
    console.log(`⏱️  Timeout: ${this.timeout / 1000}s\n`);

    this.buildProcess = spawn(command, args, {
      cwd,
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: true
    });

    // Monitor stdout
    this.buildProcess.stdout.on('data', (data) => {
      process.stdout.write(data);
      this.lastOutput = Date.now();
    });

    // Monitor stderr
    this.buildProcess.stderr.on('data', (data) => {
      process.stderr.write(data);
      this.lastOutput = Date.now();
    });

    // Hang detection
    const hangCheck = setInterval(() => {
      const timeSinceOutput = Date.now() - this.lastOutput;
      
      if (timeSinceOutput > this.timeout) {
        console.error(`\n⚠️  BUILD HANG DETECTED! No output for ${timeSinceOutput / 1000}s`);
        console.error('🔍 Diagnostic Information:');
        console.error(`   - Process PID: ${this.buildProcess.pid}`);
        console.error(`   - Command: ${command} ${args.join(' ')}`);
        console.error(`   - Working directory: ${cwd}`);
        console.error('\n💡 Suggested actions:');
        console.error('   1. Run: node scripts/smart-cache-manager.js --clear-selective');
        console.error('   2. Check for infinite loops in components');
        console.error('   3. Disable next-intl temporarily if issue persists\n');
        
        this.hangDetected = true;
        this.buildProcess.kill('SIGTERM');
        clearInterval(hangCheck);
      }
    }, 10000); // Check every 10 seconds

    this.buildProcess.on('close', (code) => {
      clearInterval(hangCheck);
      
      if (this.hangDetected) {
        process.exit(1);
      } else if (code !== 0) {
        console.error(`\n❌ Build failed with code ${code}`);
        process.exit(code);
      } else {
        console.log('\n✅ Build completed successfully!');
        process.exit(0);
      }
    });
  }
}

// CLI usage
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log(`
Build Progress Monitor

Usage:
  node scripts/build-monitor.js <command> <args...>

Example:
  node scripts/build-monitor.js npm run build --workspace=@magajico/frontend
  `);
  process.exit(1);
}

const [command, ...cmdArgs] = args;
const monitor = new BuildMonitor();
monitor.startBuild(command, cmdArgs, process.cwd());
