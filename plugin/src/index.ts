import {
  ConfigPlugin,
  withPlugins,
  createRunOncePlugin,
} from "@expo/config-plugins";

import {
  withApplyGoogleServicesPlugin,
  withBuildscriptDependency,
  withCopyAndroidGoogleServices,
} from "./android";
import { AndroidProps } from "./android/props";
import { withFirebaseAppDelegate, withIosGoogleServicesFile } from "./ios";
import { compareVersions, warnBothPlatforms } from "./utils";

// not nice solution, but this package is deprecated anyway
let rnfbPackageJson: any = null;
let wasDisplayed = false;
const DEPRECATE_SINCE_RNFB_VERSION = "12.4.0";

function displayDeprecationWarning(options: PluginProps) {
  if (wasDisplayed) return;

  try {
    rnfbPackageJson = require("@react-native-firebase/app/package.json");
    const versionStr: string = rnfbPackageJson.version;

    if (compareVersions(versionStr, DEPRECATE_SINCE_RNFB_VERSION) >= 0) {
      warnBothPlatforms(
        `with-rn-firebase is deprecated since React Native Firebase ${DEPRECATE_SINCE_RNFB_VERSION} in favor of built-in plugins.`,
        "https://rnfirebase.io/#expo"
      );

      if (options.androidOptions?.installCrashlytics) {
        warnBothPlatforms(
          `installCrashlytics is deprecated in favor of built-in @react-native-firebase/crashlytics plugin`,
          "https://rnfirebase.io/#expo",
          true
        );
      }

      if (options.androidOptions?.installPerfMonitoring) {
        warnBothPlatforms(
          `installPerfMonitoring is deprecated in favor of built-in @react-native-firebase/perf plugin`,
          "https://rnfirebase.io/#expo",
          true
        );
      }
    } else {
      warnBothPlatforms(
        `You are using React Native Firebase ${versionStr}. The with-rn-firebase plugin is deprecated since ${DEPRECATE_SINCE_RNFB_VERSION}. Be careful when updating!`,
        "https://rnfirebase.io/#expo"
      );
    }
  } catch (e) {
    rnfbPackageJson = null;
    warnBothPlatforms(
      "Could not find @react-native-firebase/app. Is the package installed? Anyway, with-rn-firebase is deprecated.",
      "https://rnfirebase.io/#expo"
    );
  } finally {
    wasDisplayed = true;
  }
}

const DEFAULT_ANDROID_GOOGLE_SERVICES_PATH = "firebase/google-services.json";
const DEFAULT_IOS_GOOGLE_SERVICES_PATH = "firebase/GoogleService-Info.plist";

interface PluginProps {
  /**
   * Custom location of `google-services.json`,
   * relative to project root
   */
  androidGoogleServicesPath?: string;
  /**
   * Custom location of `GoogleService-Info.plist`,
   * relative to project root
   */
  iosGoogleServicesPath?: string;

  androidOptions?: AndroidProps;
}

/**
 * A config plugin for configuring `react-native-firebase`
 */
const withRnFirebase: ConfigPlugin<PluginProps> = (
  config,
  { androidGoogleServicesPath, iosGoogleServicesPath, androidOptions = {} } = {}
) => {
  const resolvedAndroidServicesPath =
    androidGoogleServicesPath ||
    config.android?.googleServicesFile ||
    DEFAULT_ANDROID_GOOGLE_SERVICES_PATH;

  const resolvedIosServicePath =
    iosGoogleServicesPath ||
    config.ios?.googleServicesFile ||
    DEFAULT_IOS_GOOGLE_SERVICES_PATH;

  displayDeprecationWarning({ androidOptions });

  return withPlugins(config, [
    // iOS
    withFirebaseAppDelegate,
    [
      withIosGoogleServicesFile,
      {
        relativePath: resolvedIosServicePath,
      },
    ],
    // Android
    [withBuildscriptDependency, androidOptions],
    [withApplyGoogleServicesPlugin, androidOptions],
    [
      withCopyAndroidGoogleServices,
      {
        relativePath: resolvedAndroidServicesPath,
      },
    ],
  ]);
};

let plugin: ConfigPlugin<PluginProps>;
if (rnfbPackageJson != null) {
  plugin = createRunOncePlugin(
    withRnFirebase,
    rnfbPackageJson.name,
    rnfbPackageJson.version
  );
} else {
  plugin = withRnFirebase;
}
export default plugin;
