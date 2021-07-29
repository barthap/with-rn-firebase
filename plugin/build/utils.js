"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareVersions = exports.warnBothPlatforms = exports.withCopyFile = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const chalk_1 = __importDefault(require("chalk"));
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
function warnBothPlatforms(text, link, androidOnly = false) {
    config_plugins_1.WarningAggregator.addWarningAndroid("with-rn-firebase", text, link);
    if (!androidOnly)
        config_plugins_1.WarningAggregator.addWarningIOS("with-rn-firebase", text, link);
    // WarningAggregator seem not to work in custom plugins, a workaround
    const linkText = link ? `Learn more: ${link}` : "";
    console.warn(chalk_1.default.yellow(`[with-rn-firebase] ${text} ${linkText}`));
}
exports.warnBothPlatforms = warnBothPlatforms;
function compareVersions(v1, v2, options = { numPartsToCompare: 3 }) {
    const { lexicographical, zeroExtend, numPartsToCompare } = options;
    let v1parts = v1.split(".").slice(0, numPartsToCompare), v2parts = v2.split(".").slice(0, numPartsToCompare);
    const isValidPart = (x) => (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        throw new Error("Non pure-numeric versions are not supported");
    }
    if (zeroExtend) {
        while (v1parts.length < v2parts.length)
            v1parts.push("0");
        while (v2parts.length < v1parts.length)
            v2parts.push("0");
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
        }
        else if (v1parts[i] > v2parts[i]) {
            return 1;
        }
        else {
            return -1;
        }
    }
    if (v1parts.length !== v2parts.length) {
        return -1;
    }
    return 0;
}
exports.compareVersions = compareVersions;
