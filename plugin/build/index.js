"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("@expo/config-plugins");
const android_1 = require("./android");
const ios_1 = require("./ios");
const utils_1 = require("./utils");
// not nice solution, but this package is deprecated anyway
let rnfbPackageJson = null;
let wasDisplayed = false;
const DEPRECATE_SINCE_RNFB_VERSION = "12.4.0";
function displayDeprecationWarning(options) {
    var _a, _b;
    if (wasDisplayed)
        return;
    try {
        rnfbPackageJson = require("@react-native-firebase/app/package.json");
        const versionStr = rnfbPackageJson.version;
        if (utils_1.compareVersions(versionStr, DEPRECATE_SINCE_RNFB_VERSION) >= 0) {
            utils_1.warnBothPlatforms(`with-rn-firebase is deprecated since React Native Firebase ${DEPRECATE_SINCE_RNFB_VERSION} in favor of built-in plugins.`, "https://rnfirebase.io/#expo");
            if ((_a = options.androidOptions) === null || _a === void 0 ? void 0 : _a.installCrashlytics) {
                utils_1.warnBothPlatforms(`installCrashlytics is deprecated in favor of built-in @react-native-firebase/crashlytics plugin`, "https://rnfirebase.io/#expo", true);
            }
            if ((_b = options.androidOptions) === null || _b === void 0 ? void 0 : _b.installPerfMonitoring) {
                utils_1.warnBothPlatforms(`installPerfMonitoring is deprecated in favor of built-in @react-native-firebase/perf plugin`, "https://rnfirebase.io/#expo", true);
            }
        }
        else {
            utils_1.warnBothPlatforms(`You are using React Native Firebase ${versionStr}. The with-rn-firebase plugin is deprecated since ${DEPRECATE_SINCE_RNFB_VERSION}. Be careful when updating!`, "https://rnfirebase.io/#expo");
        }
    }
    catch (e) {
        rnfbPackageJson = null;
        utils_1.warnBothPlatforms("Could not find @react-native-firebase/app. Is the package installed? Anyway, with-rn-firebase is deprecated.", "https://rnfirebase.io/#expo");
    }
    finally {
        wasDisplayed = true;
    }
}
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
    displayDeprecationWarning({ androidOptions });
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
if (rnfbPackageJson != null) {
    plugin = config_plugins_1.createRunOncePlugin(withRnFirebase, rnfbPackageJson.name, rnfbPackageJson.version);
}
else {
    plugin = withRnFirebase;
}
exports.default = plugin;
