import fs from "fs/promises";
import path from "path";

import { applyPlugin } from "../src/android/applyPlugin";
import { setBuildscriptDependency } from "../src/android/buildscriptDependency";

describe("Android Tests", () => {
  let appBuildGradle: string;
  let projectBuildGradle: string;

  beforeAll(async () => {
    projectBuildGradle = await fs.readFile(
      path.resolve(__dirname, "./fixtures/project_build.gradle"),
      { encoding: "utf-8" }
    );

    appBuildGradle = await fs.readFile(
      path.resolve(__dirname, "./fixtures/app_build.gradle"),
      { encoding: "utf-8" }
    );
  });

  it("applies changes to project build.gradle", async () => {
    const result = setBuildscriptDependency(projectBuildGradle, false);
    expect(result).toMatchSnapshot();
  });

  it("applies changes to app/build.gradle", async () => {
    const result = applyPlugin(appBuildGradle, false);
    expect(result).toMatchSnapshot();
  });

  it("applies perf monitoring classpath to project build.gradle", async () => {
    const result = setBuildscriptDependency(projectBuildGradle, true);
    expect(result).toMatchSnapshot();
  });

  it("applies perf monitoring plugin to app/build.gradle", async () => {
    const result = applyPlugin(appBuildGradle, true);
    expect(result).toMatchSnapshot();
  });
});
