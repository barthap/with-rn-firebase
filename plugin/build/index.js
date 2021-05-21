"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("@expo/config-plugins");
const android_1 = require("./android");
const ios_1 = require("./ios");
const DEFAULT_ANDROID_GOOGLE_SERVICES_PATH = "firebase/google-services.json";
const DEFAULT_IOS_GOOGLE_SERVICES_PATH = "firebase/GoogleService-Info.plist";
/**
 * A config plugin for configuring `react-native-firebase`
 */
const withRnFirebase = (config, { androidGoogleServicesPath, iosGoogleServicesPath, androidOptions = {} } = {}) => {
    var _a, _b;
    const resolvedAndroidServicesPath = androidGoogleServicesPath ||
        ((_a = config.android) === null || _a === void 0 ? void 0 : _a.googleServicesFile) ||
        DEFAULT_ANDROID_GOOGLE_SERVICES_PATH;
    const resolvedIosServicePath = iosGoogleServicesPath ||
        ((_b = config.ios) === null || _b === void 0 ? void 0 : _b.googleServicesFile) ||
        DEFAULT_IOS_GOOGLE_SERVICES_PATH;
    return config_plugins_1.withPlugins(config, [
        // iOS
        ios_1.withFirebaseAppDelegate,
        [
            ios_1.withIosGoogleServicesFile,
            {
                relativePath: resolvedIosServicePath,
            },
        ],
        // Android
        [android_1.withBuildscriptDependency, androidOptions],
        [android_1.withApplyGoogleServicesPlugin, androidOptions],
        [
            android_1.withCopyAndroidGoogleServices,
            {
                relativePath: resolvedAndroidServicesPath,
            },
        ],
    ]);
};
let plugin;
try {
    const pak = require("@react-native-firebase/app/package.json");
    plugin = config_plugins_1.createRunOncePlugin(withRnFirebase, pak.name, pak.version);
}
catch (e) {
    plugin = withRnFirebase;
}
exports.default = plugin;
