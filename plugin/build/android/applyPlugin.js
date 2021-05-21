"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPlugin = exports.withApplyGoogleServicesPlugin = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const constants_1 = require("./constants");
/**
 * Update `app/build.gradle` by applying google-services plugin
 */
const withApplyGoogleServicesPlugin = (config) => {
    return config_plugins_1.withAppBuildGradle(config, (config) => {
        if (config.modResults.language === "groovy") {
            config.modResults.contents = applyPlugin(config.modResults.contents);
        }
        else {
            config_plugins_1.WarningAggregator.addWarningAndroid("android-google-services", `Cannot automatically configure app build.gradle if it's not groovy`);
        }
        return config;
    });
};
exports.withApplyGoogleServicesPlugin = withApplyGoogleServicesPlugin;
function applyPlugin(appBuildGradle) {
    // Make sure the project does not have the plugin already
    const pattern = new RegExp(`apply\\s+plugin:\\s+['"]${constants_1.googleServicesPlugin}['"]`);
    if (appBuildGradle.match(pattern)) {
        return appBuildGradle;
    }
    // Add it to the end of the file
    return appBuildGradle + `\napply plugin: '${constants_1.googleServicesPlugin}'`;
}
exports.applyPlugin = applyPlugin;
