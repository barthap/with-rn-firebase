import {
  ConfigPlugin,
  WarningAggregator,
  withAppBuildGradle,
} from "@expo/config-plugins";

import { googleServicesPlugin, perfMonitoringPlugin } from "./constants";
import { AndroidProps } from "./props";

/**
 * Update `app/build.gradle` by applying google-services plugin
 */
export const withApplyGoogleServicesPlugin: ConfigPlugin<AndroidProps> = (
  config,
  { installPerfMonitoring }
) => {
  return withAppBuildGradle(config, (config) => {
    if (config.modResults.language === "groovy") {
      config.modResults.contents = applyPlugin(
        config.modResults.contents,
        installPerfMonitoring ?? false
      );
    } else {
      WarningAggregator.addWarningAndroid(
        "android-google-services",
        `Cannot automatically configure app build.gradle if it's not groovy`
      );
    }
    return config;
  });
};

export function applyPlugin(
  appBuildGradle: string,
  installPerfMonitoring: boolean
) {
  let newBuildGradle = appBuildGradle;

  // Make sure the project does not have the plugin already
  const pattern = new RegExp(
    `apply\\s+plugin:\\s+['"]${googleServicesPlugin}['"]`
  );
  if (!newBuildGradle.match(pattern)) {
    newBuildGradle += `\napply plugin: '${googleServicesPlugin}'`;
  }

  const perfPattern = new RegExp(
    `apply\\s+plugin:\\s+['"]${perfMonitoringPlugin}['"]`
  );
  if (installPerfMonitoring && !newBuildGradle.match(perfPattern)) {
    newBuildGradle += `\napply plugin: '${perfMonitoringPlugin}'`;
  }

  return newBuildGradle;
}
