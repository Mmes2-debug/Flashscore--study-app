import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sportscentral.app',
  appName: 'Sports Central',
  webDir: 'apps/frontend/out',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
    cleartext: false,
    allowNavigation: ['https://sportscentral.app', '*.sportscentral.app']
  },
  android: {
    buildOptions: {
      keystorePath: 'android/keystore/release.keystore',
      keystoreAlias: 'sportscentral',
      releaseType: 'APK'
    }
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1A1A1A',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      androidSpinnerStyle: 'large',
      spinnerColor: '#FF6B00'
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    },
    // Privacy-preserving configuration
    CapacitorCookies: {
      enabled: true
    },
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
