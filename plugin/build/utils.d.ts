import { ModPlatform, ConfigPlugin } from "@expo/config-plugins";
interface CopyFileProps {
    platform: ModPlatform;
    from: string;
    to: string;
}
export declare const withCopyFile: ConfigPlugin<CopyFileProps>;
export declare function warnBothPlatforms(text: string, link?: string, androidOnly?: boolean): void;
declare type VersionCompareResult = -1 | 0 | 1;
export declare function compareVersions(v1: string, v2: string, options?: {
    lexicographical?: boolean;
    zeroExtend?: boolean;
    numPartsToCompare: number;
}): VersionCompareResult;
export {};
