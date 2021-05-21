"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withCopyFile = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const withCopyFile = (config, { platform, from, to }) => config_plugins_1.withDangerousMod(config, [
    platform,
    async (config) => {
        const srcPath = path_1.default.resolve(config.modRequest.projectRoot, from);
        const destPath = path_1.default.resolve(config.modRequest.platformProjectRoot, to);
        await promises_1.default.copyFile(srcPath, destPath);
        return config;
    },
]);
exports.withCopyFile = withCopyFile;
