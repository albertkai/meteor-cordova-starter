// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.discotech.betterme',
  name: 'betterme',
  description: 'Make yourself and the world around you better',
  author: 'Albert Kai',
  email: 'albertkai@me.com',
  website: 'http://better.me/',
  version: '0.0.2',
  buildNumber: 2,
});

App.icons({
  // iOS
  'iphone': 'resources/icons/Icon-60.png',
  'iphone_2x': 'resources/icons/Icon-60@2x.png',
  'iphone_3x': 'resources/icons/Icon-60@2x.png',
  'ipad': 'resources/icons/Icon-76.png',
  'ipad_2x': 'resources/icons/Icon-76@2x.png',
  'ipad_pro': 'resources/icons/Icon-76@2x.png',

  // Android
  'android_ldpi': 'resources/icons/icon-ldpi.png',
  'android_mdpi': 'resources/icons/icon-mdpi.png',
  'android_hdpi': 'resources/icons/icon-hdpi.png',
  'android_xhdpi': 'resources/icons/icon-xhdpi.png',
});

App.launchScreens({
  // iOS
  'iphone': 'resources/splash/splash-320x480.png',
  'iphone_2x': 'resources/splash/splash-320x480@2x.png',
  'iphone5': 'resources/splash/splash-320x568@2x.png',
  'ipad_portrait': 'resources/splash/splash-768x1024.png',
  'ipad_portrait_2x': 'resources/splash/splash-768x1024@2x.png',
  'ipad_landscape': 'resources/splash/splash-1024x768.png',
  'ipad_landscape_2x': 'resources/splash/splash-1024x768@2x.png',

  // Android
  'android_ldpi_portrait': 'resources/splash/splash-200x320.png',
  'android_ldpi_landscape': 'resources/splash/splash-320x200.png',
  'android_mdpi_portrait': 'resources/splash/splash-320x480.png',
  'android_mdpi_landscape': 'resources/splash/splash-480x320.png',
  'android_hdpi_portrait': 'resources/splash/splash-480x800.png',
  'android_hdpi_landscape': 'resources/splash/splash-800x480.png',
  'android_xhdpi_portrait': 'resources/splash/splash-720x1280.png',
  'android_xhdpi_landscape': 'resources/splash/splash-1280x720.png'
});

// Let these urls access the following domains
App.accessRule("*"); // @@@@@@@@@@@@@@@@

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('DisallowOverscroll', true);
App.setPreference('BackupWebStorage', 'local');
App.setPreference('AutoHideSplashScreen', true); // ???
App.setPreference('KeyboardDisplayRequiresUserAction', false);

// https://github.com/Differential/meteor-mobile-cookbook/blob/master/iOS/Status%20Bar.md
App.setPreference('StatusBarOverlaysWebView', true);
App.setPreference('StatusBarStyle', 'default');

// Pass preferences for a particular PhoneGap/Cordova plugin
// SEE http://cordova.apache.org/docs/en/4.0.0/config_ref_index.md.html#The%20config.xml%20File

// If we will use this: https://github.com/mbanting/meteor-cordova-accounts-resume, the we'll need:
//App.configurePlugin('org.apache.cordova.file', {
//    iosPersistentFileLocation: 'Library'
//});


App.configurePlugin('cordova-plugin-facebook4', {
  APP_ID: '1903245093279775',
  APP_NAME: 'betterme',
});
