"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBuildscriptDependency = exports.withBuildscriptDependency = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const constants_1 = require("./constants");
/**
 * Update `<project>/build.gradle` by adding google-services dependency to buildscript
 */
const withBuildscriptDependency = (config) => {
    return config_plugins_1.withProjectBuildGradle(config, (config) => {
        if (config.modResults.language === "groovy") {
            config.modResults.contents = setBuildscriptDependency(config.modResults.contents);
        }
        else {
            config_plugins_1.WarningAggregator.addWarningAndroid("android-google-services", `Cannot automatically configure project build.gradle if it's not groovy`);
        }
        return config;
    });
};
exports.withBuildscriptDependency = withBuildscriptDependency;
function setBuildscriptDependency(buildGradle) {
    if (buildGradle.includes(constants_1.googleServicesClassPath)) {
        return buildGradle;
    }
    // TODO: Find a more stable solution for this
    return buildGradle.replace(/dependencies\s?{/, `dependencies {
        classpath '${constants_1.googleServicesClassPath}:${constants_1.googleServicesVersion}'`);
}
exports.setBuildscriptDependency = setBuildscriptDependency;
