#!/bin/bash

# Clear npm cache
echo "Clearing npm cache..."
npm cache clean --force

# Clear watchman cache
echo "Clearing watchman cache..."
watchman watch-del-all

# Clear Metro Bundler cache
echo "Clearing Metro Bundler cache..."
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/haste-map-*

# Clear Expo cache
echo "Clearing Expo cache..."
rm -rf ~/.expo/cache

# Remove node_modules and reinstall dependencies
echo "Removing node_modules and reinstalling dependencies..."
rm -rf node_modules
npm install

# Clear iOS build artifacts (if applicable)
if [ -d "ios" ]; then
  echo "Clearing iOS build artifacts..."
  cd ios
  rm -rf Pods
  rm -rf Podfile.lock
  pod install
  cd ..
fi

# Clear Android build artifacts (if applicable)
# if [ -d "android" ]; then
#   echo "Clearing Android build artifacts..."
#   cd android
#   ./gradlew clean
#   cd ..
# fi

echo "Cleaning completed successfully."