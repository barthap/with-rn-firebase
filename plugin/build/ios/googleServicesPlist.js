"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGoogleServicesFile = exports.withIosGoogleServicesFile = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const Paths_1 = require("@expo/config-plugins/build/ios/Paths");
const Xcodeproj_1 = require("@expo/config-plugins/build/ios/utils/Xcodeproj");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const withIosGoogleServicesFile = (config, { relativePath }) => {
    return config_plugins_1.withXcodeProject(config, (config) => {
        config.modResults = setGoogleServicesFile({
            projectRoot: config.modRequest.projectRoot,
            project: config.modResults,
            googleServicesFileRelativePath: relativePath,
        });
        return config;
    });
};
exports.withIosGoogleServicesFile = withIosGoogleServicesFile;
function setGoogleServicesFile({ projectRoot, project, googleServicesFileRelativePath, }) {
    const googleServiceFilePath = path_1.default.resolve(projectRoot, googleServicesFileRelativePath);
    fs_1.default.copyFileSync(googleServiceFilePath, path_1.default.join(Paths_1.getSourceRoot(projectRoot), "GoogleService-Info.plist"));
    const projectName = Xcodeproj_1.getProjectName(projectRoot);
    const plistFilePath = `${projectName}/GoogleService-Info.plist`;
    if (!project.hasFile(plistFilePath)) {
        project = Xcodeproj_1.addResourceFileToGroup({
            filepath: plistFilePath,
            groupName: projectName,
            project,
            isBuildFile: true,
        });
    }
    return project;
}
exports.setGoogleServicesFile = setGoogleServicesFile;
