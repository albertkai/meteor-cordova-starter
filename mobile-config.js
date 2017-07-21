// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'io.betterme',
  name: 'betterme',
  description: 'Make yourself and the world around you better',
  author: 'Albert Kai',
  email: 'albertkai@me.com',
  website: 'http://better.me/',
  version: '0.0.1',
  buildNumber: 1,
});

// Set up resources such as icons and launch screens.
// App.icons({
//     'iphone': 'resources/icons/ffm-app-icon-1x.png',
//     'iphone_2x': 'resources/icons/ffm-app-icon-2x.png',
//     'iphone_3x': 'resources/icons/ffm-app-icon-3x.png',

//     'android_ldpi': 'resources/icons/ffm-app-icon-1x.png',
//     'android_mdpi': 'resources/icons/ffm-app-icon-1x.png',
//     'android_hdpi': 'resources/icons/ffm-app-icon-2x.png',
//     'android_xhdpi': 'resources/icons/ffm-app-icon-3x.png'
// });

// App.launchScreens({
  //'iphone': 'splash/Default~iphone.png',
  //'iphone_2x': 'splash/Default@2x~iphone.png',
  // ... more screen sizes and platforms ...
// });

// Let these urls access the following domains
App.accessRule("*"); // @@@@@@@@@@@@@@@@

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('BackupWebStorage', 'local');
App.setPreference('AutoHideSplashScreen', true); // ???
App.setPreference('KeyboardDisplayRequiresUserAction', false);

// https://github.com/Differential/meteor-mobile-cookbook/blob/master/iOS/Status%20Bar.md
App.setPreference('StatusBarOverlaysWebView', false);
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
