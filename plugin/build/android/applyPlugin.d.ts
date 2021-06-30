import { ConfigPlugin } from "@expo/config-plugins";
import { AndroidProps } from "./props";
/**
 * Update `app/build.gradle` by applying google-services plugin
 */
export declare const withApplyGoogleServicesPlugin: ConfigPlugin<AndroidProps>;
export declare function applyPlugin(appBuildGradle: string, installPerfMonitoring: boolean, installCrashlytics: boolean): string;
