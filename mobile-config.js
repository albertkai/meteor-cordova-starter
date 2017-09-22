// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: '<your-app-id>',
  name: 'my new awesome app',
  description: 'This is a basic Meteor + Cordova + React app. Works with robot',
  author: 'Me Myself',
  email: 'my@email.com',
  website: 'http://mywebsite.com/',
  version: '0.0.1',
  buildNumber: 1,
});

App.icons({
  iphone_2x: 'resources/icons/iphone_2x.png',
  iphone_3x: 'resources/icons/iphone_3x.png',
  ipad: 'resources/icons/ipad.png',
  ipad_2x: 'resources/icons/ipad_2x.png',
  ipad_pro: 'resources/icons/ipad_pro.png',
  ios_settings: 'resources/icons/ios_settings.png',
  ios_settings_2x: 'resources/icons/ios_settings_2x.png',
  ios_settings_3x: 'resources/icons/ios_settings_3x.png',
  ios_spotlight: 'resources/icons/ios_spotlight.png',
  ios_spotlight_2x: 'resources/icons/ios_spotlight_2x.png',
  android_mdpi: 'resources/icons/android_mdpi.png',
  android_hdpi: 'resources/icons/android_hdpi.png',
  android_xhdpi: 'resources/icons/android_xhdpi.png',
  android_xxhdpi: 'resources/icons/android_xxhdpi.png',
  android_xxxhdpi: 'resources/icons/android_xxxhdpi.png',
});

App.launchScreens({
  iphone_2x: 'resources/splash/iphone_2x.png',
  iphone5: 'resources/splash/iphone5.png',
  iphone6: 'resources/splash/iphone6.png',
  iphone6p_portrait: 'resources/splash/iphone6p_portrait.png',
  iphone6p_landscape: 'resources/splash/iphone6p_landscape.png',
  ipad_portrait: 'resources/splash/ipad_portrait.png',
  ipad_portrait_2x: 'resources/splash/ipad_portrait_2x.png',
  ipad_landscape: 'resources/splash/ipad_landscape.png',
  ipad_landscape_2x: 'resources/splash/ipad_landscape_2x.png',
  android_mdpi_portrait: 'resources/splash/android_mdpi_portrait.png',
  android_mdpi_landscape: 'resources/splash/android_mdpi_landscape.png',
  android_xhdpi_portrait: 'resources/splash/android_xhdpi_portrait.png',
  android_xhdpi_landscape: 'resources/splash/android_xhdpi_landscape.png',
  android_xxhdpi_portrait: 'resources/splash/android_xxhdpi_portrait.png',
  android_xxhdpi_landscape: 'resources/splash/android_xxhdpi_landscape.png',
});

// Let these urls access the following domains
App.accessRule('*'); // @@@@@@@@@@@@@@@@

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('DisallowOverscroll', true);
App.setPreference('BackupWebStorage', 'local');
App.setPreference('AutoHideSplashScreen', true); // ???
App.setPreference('KeyboardDisplayRequiresUserAction', false);

// https://github.com/Differential/meteor-mobile-cookbook/blob/master/iOS/Status%20Bar.md
App.setPreference('StatusBarOverlaysWebView', true);
App.setPreference('StatusBarStyle', 'default');
App.setPreference('Orientation', 'portrait');

// Pass preferences for a particular PhoneGap/Cordova plugin
// SEE http://cordova.apache.org/docs/en/4.0.0/config_ref_index.md.html#The%20config.xml%20File

// If we will use this: https://github.com/mbanting/meteor-cordova-accounts-resume, the we'll need:
//App.configurePlugin('org.apache.cordova.file', {
//    iosPersistentFileLocation: 'Library'
//});
