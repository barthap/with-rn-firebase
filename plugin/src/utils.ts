import {
  ModPlatform,
  withDangerousMod,
  ConfigPlugin,
  WarningAggregator,
} from "@expo/config-plugins";
import { ExpoConfig } from "@expo/config-types";
import chalk from "chalk";
import fs from "fs/promises";
import path from "path";

interface CopyFileProps {
  platform: ModPlatform;
  from: string;
  to: string;
}

export const withCopyFile: ConfigPlugin<CopyFileProps> = (
  config: ExpoConfig,
  { platform, from, to }
) =>
  withDangerousMod(config, [
    platform,
    async (config) => {
      const srcPath = path.resolve(config.modRequest.projectRoot, from);
      const destPath = path.resolve(config.modRequest.platformProjectRoot, to);
      await fs.copyFile(srcPath, destPath);
      return config;
    },
  ]);

export function warnBothPlatforms(
  text: string,
  link?: string,
  androidOnly = false
) {
  WarningAggregator.addWarningAndroid("with-rn-firebase", text, link);
  if (!androidOnly)
    WarningAggregator.addWarningIOS("with-rn-firebase", text, link);

  // WarningAggregator seem not to work in custom plugins, a workaround
  const linkText = link ? `Learn more: ${link}` : "";
  console.warn(chalk.yellow(`[with-rn-firebase] ${text} ${linkText}`));
}

type VersionCompareResult = -1 | 0 | 1;

export function compareVersions(
  v1: string,
  v2: string,
  options: {
    lexicographical?: boolean;
    zeroExtend?: boolean;
    numPartsToCompare: number;
  } = { numPartsToCompare: 3 }
): VersionCompareResult {
  const { lexicographical, zeroExtend, numPartsToCompare } = options;

  let v1parts: string[] | number[] = v1.split(".").slice(0, numPartsToCompare),
    v2parts: string[] | number[] = v2.split(".").slice(0, numPartsToCompare);

  const isValidPart = (x: string) =>
    (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);

  if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
    throw new Error("Non pure-numeric versions are not supported");
  }

  if (zeroExtend) {
    while (v1parts.length < v2parts.length) v1parts.push("0");
    while (v2parts.length < v1parts.length) v2parts.push("0");
  }

  if (!lexicographical) {
    v1parts = v1parts.map(Number);
    v2parts = v2parts.map(Number);
  }

  for (let i = 0; i < v1parts.length; ++i) {
    if (v2parts.length === i) {
      return 1;
    }

    if (v1parts[i] === v2parts[i]) {
      continue;
    } else if (v1parts[i] > v2parts[i]) {
      return 1;
    } else {
      return -1;
    }
  }

  if (v1parts.length !== v2parts.length) {
    return -1;
  }

  return 0;
}
