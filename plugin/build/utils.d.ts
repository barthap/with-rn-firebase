import { ModPlatform, ConfigPlugin } from "@expo/config-plugins";
interface CopyFileProps {
    platform: ModPlatform;
    from: string;
    to: string;
}
export declare const withCopyFile: ConfigPlugin<CopyFileProps>;
export {};
