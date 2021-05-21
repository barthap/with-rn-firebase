import fs from "fs/promises";
import path from "path";

import { applyPlugin } from "../src/android/applyPlugin";
import { setBuildscriptDependency } from "../src/android/buildscriptDependency";

describe("Android Tests", () => {
  it("tests project build.gradle changes", async () => {
    const buildGradle = await fs.readFile(
      path.resolve(__dirname, "./fixtures/project_build.gradle"),
      { encoding: "utf-8" }
    );

    const result = setBuildscriptDependency(buildGradle);

    expect(result).toMatchSnapshot();
  });

  it("tests app build.gradle changes", async () => {
    const buildGradle = await fs.readFile(
      path.resolve(__dirname, "./fixtures/app_build.gradle"),
      { encoding: "utf-8" }
    );

    const result = applyPlugin(buildGradle);

    expect(result).toMatchSnapshot();
  });
});
