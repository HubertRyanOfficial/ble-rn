# React Native Bluetooth Project

This guide provides step-by-step instructions to set up and run a **React Native Bluetooth** application from an open-source project.

## Prerequisites

Before you start, make sure you have the following tools installed and configured:

1. **Node.js** (Recommended: LTS version)  
   Install Node.js from [https://nodejs.org/](https://nodejs.org/).

2 **Android Studio** (for Android development)  
 Install Android Studio from [https://developer.android.com/studio](https://developer.android.com/studio).

3. **A physical device** (Android or iOS)  
   Bluetooth functionality needs to be tested on a real device, as it is not supported in simulators/emulators.

---

## Step 1: Clone the Repository

Clone the open-source React Native Bluetooth project to your local machine using Git:

```bash
git clone https://github.com/your-repository-name/bluetooth-app.git
cd bluetooth-app
```

---

## Step 2: Install Dependencies

The project uses npm to manage dependencies. Run the following command to install all the required packages:

```bash
npm install
```

If you are working on iOS, navigate to the `ios` folder and install CocoaPods dependencies:

```bash
cd ios
pod install
cd ..
```

---

## Step 3: Configure Bluetooth Permissions

### iOS

To enable Bluetooth on iOS, add the following keys to the `Info.plist` file located at `ios/YourAppName/Info.plist`.

```xml
<key>NSBluetoothAlwaysUsageDescription</key>
<string>Your app needs Bluetooth access to discover and connect to devices.</string>
<key>NSBluetoothPeripheralUsageDescription</key>
<string>Your app needs Bluetooth access to connect to peripherals.</string>
```

### Android

For Android, ensure the following permissions are added to the `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

Additionally, for Android 12 and above, include the following permissions in the `AndroidManifest.xml` under `<manifest>`:

```xml
<uses-permission android:name="android.permission.BLUETOOTH_SCAN" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
<uses-permission android:name="android.permission.BLUETOOTH_ADVERTISE" />
```

---

## Step 4: Run the Application

### 4.1 Running on Android

Make sure you have an Android device connected via USB and USB debugging is enabled, or use a physical Android device with Bluetooth capabilities.

Run the following command to launch the app on your Android device:

```bash
npx react-native run-android
```

### 4.2 Running on iOS

For iOS, you will need to have Xcode installed. To run the app on your iOS device or simulator:

```bash
npx react-native run-ios
```

Note: Bluetooth functionality must be tested on a physical device, as iOS simulators do not support Bluetooth.

---

## Step 5: Testing Bluetooth Functionality

After successfully running the app, the Bluetooth features should be fully functional.

- **Scan for Devices**: The app will scan for nearby Bluetooth devices.
- **Connect to a Device**: Select a device from the list and connect to it.
- **Disconnect**: Disconnect from the Bluetooth device as needed.

---

## Troubleshooting

### 1. **Bluetooth Permissions**

If the app is not detecting or connecting to devices, check that the necessary Bluetooth permissions are granted, especially on Android 12+ devices, where permissions need to be explicitly requested at runtime.

### 2. **Ensure Bluetooth is Enabled**

Make sure Bluetooth is enabled on your testing device.

### 3. **Device Compatibility**

Ensure that your testing device supports Bluetooth and is compatible with the Bluetooth Low Energy (BLE) standard (if applicable).

---

## Conclusion

That's it! You should now have the React Native Bluetooth application up and running on your physical device. You can explore the functionality to discover, connect, and interact with Bluetooth devices.

If you want to contribute to the project, feel free to fork the repository, make changes, and submit pull requests.

---

### Links

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [react-native-ble-plx](https://github.com/dotintent/react-native-ble-plx)
