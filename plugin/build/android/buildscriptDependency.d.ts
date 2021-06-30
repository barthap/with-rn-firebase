import { ConfigPlugin } from "@expo/config-plugins";
import { AndroidProps } from "./props";
/**
 * Update `<project>/build.gradle` by adding google-services dependency to buildscript
 */
export declare const withBuildscriptDependency: ConfigPlugin<AndroidProps>;
export declare function setBuildscriptDependency(buildGradle: string, installPerfMonitoring: boolean, installCrashlytics: boolean): string;
