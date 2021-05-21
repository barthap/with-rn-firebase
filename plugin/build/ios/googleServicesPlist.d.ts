import { ConfigPlugin, XcodeProject } from "@expo/config-plugins";
export declare const withIosGoogleServicesFile: ConfigPlugin<{
    relativePath: string;
}>;
export declare function setGoogleServicesFile({ projectRoot, project, googleServicesFileRelativePath, }: {
    project: XcodeProject;
    projectRoot: string;
    googleServicesFileRelativePath: string;
}): XcodeProject;
