import {
  ConfigPlugin,
  WarningAggregator,
  withProjectBuildGradle,
} from "@expo/config-plugins";

import {
  crashlyticsClassPath,
  crashlyticsVersion,
  googleServicesClassPath,
  googleServicesVersion,
  perfMonitoringClassPath,
  perfMonitoringVersion,
} from "./constants";
import { AndroidProps } from "./props";

/**
 * Update `<project>/build.gradle` by adding google-services dependency to buildscript
 */
export const withBuildscriptDependency: ConfigPlugin<AndroidProps> = (
  config,
  { installPerfMonitoring, installCrashlytics }
) => {
  return withProjectBuildGradle(config, (config) => {
    if (config.modResults.language === "groovy") {
      config.modResults.contents = setBuildscriptDependency(
        config.modResults.contents,
        installPerfMonitoring ?? false,
        installCrashlytics ?? false
      );
    } else {
      WarningAggregator.addWarningAndroid(
        "android-google-services",
        `Cannot automatically configure project build.gradle if it's not groovy`
      );
    }
    return config;
  });
};

export function setBuildscriptDependency(
  buildGradle: string,
  installPerfMonitoring: boolean,
  installCrashlytics: boolean
) {
  let newBuildGradle = buildGradle;
  if (!newBuildGradle.includes(googleServicesClassPath)) {
    // TODO: Find a more stable solution for this
    newBuildGradle = newBuildGradle.replace(
      /dependencies\s?{/,
      `dependencies {
        classpath '${googleServicesClassPath}:${googleServicesVersion}'`
    );
  }

  if (
    installPerfMonitoring &&
    !newBuildGradle.includes(perfMonitoringClassPath)
  ) {
    newBuildGradle = newBuildGradle.replace(
      /dependencies\s?{/,
      `dependencies {
        classpath '${perfMonitoringClassPath}:${perfMonitoringVersion}'`
    );
  }

  if (installCrashlytics && !newBuildGradle.includes(crashlyticsClassPath)) {
    newBuildGradle = newBuildGradle.replace(
      /dependencies\s?{/,
      `dependencies {
        classpath '${crashlyticsClassPath}:${crashlyticsVersion}'`
    );
  }

  return newBuildGradle;
}
