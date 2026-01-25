# iOS Deployment Guide

Instructions for testing the Minimal Weather app on your iPhone.

## Prerequisites
- Mac with Xcode installed
- iPhone connected via USB cable
- Apple ID (free account works)

## Steps

### 1. Build & Sync
```bash
npm run build
npx cap sync ios
npx cap open ios
```

### 2. Connect Your iPhone
- Plug your iPhone into your Mac via USB
- Unlock and trust the computer if prompted

### 3. Configure Signing in Xcode
1. Click **"App"** in the Project Navigator (left sidebar)
2. Select **"App"** target under TARGETS
3. Go to **"Signing & Capabilities"** tab
4. Check **"Automatically manage signing"**
5. Select your **Team** (Apple ID) from dropdown
   - Click "Add Account" if needed

### 4. Select Device
- In Xcode toolbar, click device selector
- Choose your iPhone from the list

### 5. Build & Run
- Press **⌘ + R** or click **▶ Play**

### 6. Trust Developer (First Time)
If you see "Untrusted Developer" on iPhone:
1. Go to **Settings → General → VPN & Device Management**
2. Find your developer profile
3. Tap **Trust**
4. Run again with **⌘ + R**

## Notes

| Account Type | App Expiration |
|--------------|----------------|
| Free Apple ID | 7 days |
| Paid Developer ($99/yr) | 1 year |

## Updating the App
After code changes:
```bash
npm run build
npx cap sync ios
```
Then press **⌘ + R** in Xcode.
