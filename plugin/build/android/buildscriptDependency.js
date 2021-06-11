"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBuildscriptDependency = exports.withBuildscriptDependency = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const constants_1 = require("./constants");
/**
 * Update `<project>/build.gradle` by adding google-services dependency to buildscript
 */
const withBuildscriptDependency = (config, { installPerfMonitoring }) => {
    return config_plugins_1.withProjectBuildGradle(config, (config) => {
        if (config.modResults.language === "groovy") {
            config.modResults.contents = setBuildscriptDependency(config.modResults.contents, installPerfMonitoring !== null && installPerfMonitoring !== void 0 ? installPerfMonitoring : false);
        }
        else {
            config_plugins_1.WarningAggregator.addWarningAndroid("android-google-services", `Cannot automatically configure project build.gradle if it's not groovy`);
        }
        return config;
    });
};
exports.withBuildscriptDependency = withBuildscriptDependency;
function setBuildscriptDependency(buildGradle, installPerfMonitoring) {
    let newBuildGradle = buildGradle;
    if (!newBuildGradle.includes(constants_1.googleServicesClassPath)) {
        // TODO: Find a more stable solution for this
        newBuildGradle = newBuildGradle.replace(/dependencies\s?{/, `dependencies {
        classpath '${constants_1.googleServicesClassPath}:${constants_1.googleServicesVersion}'`);
    }
    if (installPerfMonitoring &&
        !newBuildGradle.includes(constants_1.perfMonitoringClassPath)) {
        newBuildGradle = newBuildGradle.replace(/dependencies\s?{/, `dependencies {
        classpath '${constants_1.perfMonitoringClassPath}:${constants_1.perfMonitoringVersion}'`);
    }
    return newBuildGradle;
}
exports.setBuildscriptDependency = setBuildscriptDependency;
