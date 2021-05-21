"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withCopyAndroidGoogleServices = void 0;
const utils_1 = require("../utils");
const constants_1 = require("./constants");
/**
 * Copy `google-services.json`
 */
const withCopyAndroidGoogleServices = (config, { relativePath }) => {
    try {
        return utils_1.withCopyFile(config, {
            platform: "android",
            from: relativePath,
            to: constants_1.DEFAULT_TARGET_PATH,
        });
    }
    catch (e) {
        throw new Error(`Cannot copy google-services.json, because the file ${relativePath} doesn't exist. Please provide a valid path in \`app.json\`.`);
    }
};
exports.withCopyAndroidGoogleServices = withCopyAndroidGoogleServices;
