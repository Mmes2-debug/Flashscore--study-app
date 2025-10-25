# Android Build Configuration Guide

**⚠️ IMPORTANT: These are configuration templates for Android build setup.**

This directory contains configuration files for building Sports Central as an Android app for Google Play Store. Before you can build, you need to initialize Capacitor to generate the actual Android project.

## 🚀 Initial Setup (REQUIRED)

First, you must initialize Capacitor:

```bash
# Install Capacitor CLI
npm install -g @capacitor/cli

# Install Capacitor dependencies
npm install @capacitor/core @capacitor/cli @capacitor/android

# Initialize Capacitor (if not done)
npx cap init

# Add Android platform (this generates the full Android project)
npx cap add android

# Sync web assets to Android
npx cap sync android
```

**Note**: The configuration files in this directory (build.gradle, AndroidManifest.xml, etc.) serve as templates/reference. When you run `npx cap add android`, Capacitor will generate its own Android project structure which you can then customize using these templates as a guide.

## 📋 Prerequisites

Before building, ensure you have:
- Android Studio Arctic Fox or later
- JDK 11 or later
- Android SDK with API 35 installed
- Gradle 8.2 or later
- Node.js 20+ (for frontend build)
- Capacitor CLI installed

## 🏗️ Build Steps

### 1. Install Dependencies

```bash
# Install Node.js dependencies (from project root)
npm install

# Build the frontend for production
cd apps/frontend
npm run build
cd ../..
```

### 2. Generate Android Project (Using Capacitor)

```bash
# Install Capacitor CLI (if not already installed)
npm install -g @capacitor/cli

# Initialize Capacitor (if not already done)
npx cap init

# Add Android platform
npx cap add android

# Sync web assets to Android
npx cap sync android
```

### 3. Open in Android Studio

```bash
# Open Android project
npx cap open android
```

Or manually open the `android/` folder in Android Studio.

### 4. Configure Signing (For Release Builds)

#### Generate Keystore (First Time Only)

```bash
# Create keystore directory
mkdir -p android/keystore

# Generate release keystore
keytool -genkey -v -keystore android/keystore/release.keystore \
  -alias sportscentral -keyalg RSA -keysize 2048 -validity 10000

# Follow prompts and SAVE the passwords securely!
```

#### Create keystore.properties

Create `android/keystore.properties`:
```properties
storePassword=YOUR_STORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=sportscentral
storeFile=keystore/release.keystore
```

**⚠️ IMPORTANT**: Add `keystore.properties` to `.gitignore`!

### 5. Build Release APK/AAB

#### Using Android Studio:
1. Build → Generate Signed Bundle/APK
2. Choose Android App Bundle (AAB) for Play Store
3. Select your keystore file
4. Enter passwords
5. Choose "release" build variant
6. Click Finish

#### Using Command Line:

```bash
# Build release APK
cd android
./gradlew assembleRelease

# Build release AAB (recommended for Play Store)
./gradlew bundleRelease

# Output locations:
# APK: android/app/build/outputs/apk/release/app-release.apk
# AAB: android/app/build/outputs/bundle/release/app-release.aab
```

## 🔒 Security Checklist

Before releasing:
- [ ] Remove all debug logs and console.log statements
- [ ] Verify ProGuard/R8 is enabled (`minifyEnabled true`)
- [ ] Check that no API keys are hardcoded in code
- [ ] Ensure all secrets are in environment variables
- [ ] Verify HTTPS is enforced (`usesCleartextTraffic="false"`)
- [ ] Test Kids Mode blocking all prohibited content
- [ ] Verify parental consent flow works end-to-end
- [ ] Test data export and deletion functionality
- [ ] Confirm no analytics for users under 13
- [ ] Check that all third-party SDKs are COPPA compliant

## 📱 Testing

### Test on Physical Devices

Test on at least:
- One phone (Android 7.0+)
- One tablet (if supporting tablets)
- Different Android versions (7, 10, 13, 14, 15)
- Different screen sizes

### Required Tests:
- [ ] App installs and launches successfully
- [ ] All core features work (predictions, live matches, etc.)
- [ ] Kids Mode properly restricts content
- [ ] Parental consent flow completes
- [ ] Offline mode works
- [ ] Push notifications work (if enabled)
- [ ] Deep links work correctly
- [ ] Payment flow works (with Stripe test mode)
- [ ] Data export produces correct file
- [ ] Data deletion removes all user data
- [ ] App survives rotation and background/foreground
- [ ] No crashes or freezes under normal use

## 🚀 Deployment to Play Store

### 1. Prepare Store Listing

See `play-store/` directory for:
- App description
- Screenshots guide
- Feature graphic
- Data safety responses

### 2. Create Play Console Account

1. Go to https://play.google.com/console
2. Pay one-time $25 developer fee
3. Complete account verification

### 3. Create App

1. Click "Create App"
2. Fill in basic details:
   - Name: Sports Central
   - Default language: English (United States)
   - App or Game: App
   - Free or Paid: Free (with in-app purchases)
   - Declarations: Accept all required policies

### 4. Complete Store Listing

Fill out all required sections:
- App details (name, description, screenshots)
- Categorization (Education)
- Contact details
- Privacy policy URL
- Target audience and content
- Data safety form

### 5. Content Rating

Complete the questionnaire honestly:
- Violence: None
- Sexual content: None
- Language: None
- Controlled substances: None
- Gambling: None (educational predictions only)
- User interaction: Yes (moderated)

Expected rating: **Everyone** or **Everyone 10+**

### 6. Pricing & Distribution

- Set countries where app will be available
- Confirm app is free
- Set up in-app products (if any)

### 7. Upload Release

#### Internal Testing (Recommended First):
1. Create internal testing track
2. Upload AAB file
3. Invite testers (your email + team)
4. Test for 1-2 weeks
5. Fix any issues

#### Production Release:
1. Go to Production track
2. Upload signed AAB
3. Add release notes
4. Roll out to 100% of users (or staged rollout)

### 8. Review & Publish

1. Review all sections (Google will prompt if anything missing)
2. Submit for review
3. Wait for approval (typically 1-7 days)
4. Once approved, app goes live!

## 🔄 Updates

To release updates:

```bash
# 1. Update version in android/app/build.gradle
versionCode 2  // Increment this (integer)
versionName "2.0.1"  // Semantic version

# 2. Build new AAB
./gradlew bundleRelease

# 3. Upload to Play Console
# - Go to Production → Create new release
# - Upload new AAB
# - Add release notes
# - Roll out
```

## 🐛 Troubleshooting

### Build Fails
- Clean and rebuild: `./gradlew clean`
- Invalidate caches in Android Studio
- Check Gradle version compatibility
- Ensure all SDK packages are installed

### App Crashes on Startup
- Check Logcat for error messages
- Verify all native libraries are included
- Check ProGuard rules aren't removing needed classes

### WebView Issues
- Ensure `androidx.webkit` is included
- Check WebView chrome version on device
- Test on different Android versions

### Kids Mode Not Working
- Verify age verification logic
- Check content filtering rules
- Test parental consent flow
- Ensure server-side gating is active

## 📚 Additional Resources

- [Android Developer Docs](https://developer.android.com/)
- [Capacitor Android Guide](https://capacitorjs.com/docs/android)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [COPPA Compliance Guide](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions)

## 🆘 Support

For build issues:
- Check Android Studio logs
- Review Gradle console output
- Check `adb logcat` for runtime errors

For Play Store issues:
- Review rejection reasons carefully
- Check Play Console email notifications
- Contact Play support if needed

---

**Target API Level**: 35 (Android 15) ✅  
**Min API Level**: 24 (Android 7.0)  
**COPPA Compliant**: ✅  
**Ready for Production**: After testing ✅  

Last updated: October 25, 2025
