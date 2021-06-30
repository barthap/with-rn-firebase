"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPlugin = exports.withApplyGoogleServicesPlugin = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const constants_1 = require("./constants");
/**
 * Update `app/build.gradle` by applying google-services plugin
 */
const withApplyGoogleServicesPlugin = (config, { installPerfMonitoring, installCrashlytics }) => {
    return config_plugins_1.withAppBuildGradle(config, (config) => {
        if (config.modResults.language === "groovy") {
            config.modResults.contents = applyPlugin(config.modResults.contents, installPerfMonitoring !== null && installPerfMonitoring !== void 0 ? installPerfMonitoring : false, installCrashlytics !== null && installCrashlytics !== void 0 ? installCrashlytics : false);
        }
        else {
            config_plugins_1.WarningAggregator.addWarningAndroid("android-google-services", `Cannot automatically configure app build.gradle if it's not groovy`);
        }
        return config;
    });
};
exports.withApplyGoogleServicesPlugin = withApplyGoogleServicesPlugin;
function applyPlugin(appBuildGradle, installPerfMonitoring, installCrashlytics) {
    let newBuildGradle = appBuildGradle;
    // Make sure the project does not have the plugin already
    const pattern = new RegExp(`apply\\s+plugin:\\s+['"]${constants_1.googleServicesPlugin}['"]`);
    if (!newBuildGradle.match(pattern)) {
        newBuildGradle += `\napply plugin: '${constants_1.googleServicesPlugin}'`;
    }
    const crashlyticsPattern = new RegExp(`apply\\s+plugin:\\s+['"]${constants_1.crashlyticsPlugin}['"]`);
    if (installCrashlytics && !newBuildGradle.match(crashlyticsPattern)) {
        newBuildGradle += `\napply plugin: '${constants_1.crashlyticsPlugin}'`;
    }
    const perfPattern = new RegExp(`apply\\s+plugin:\\s+['"]${constants_1.perfMonitoringPlugin}['"]`);
    if (installPerfMonitoring && !newBuildGradle.match(perfPattern)) {
        newBuildGradle += `\napply plugin: '${constants_1.perfMonitoringPlugin}'`;
    }
    return newBuildGradle;
}
exports.applyPlugin = applyPlugin;
