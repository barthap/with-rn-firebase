import fs from "fs/promises";
import path from "path";

import { modifyObjcAppDelegate } from "../ios/appDelegate";

describe("iOS Tests", () => {
  it("tests changes made to AppDelegate.m", async () => {
    const appDelegate = await fs.readFile(
      path.join(__dirname, "./fixtures/AppDelegate.m"),
      { encoding: "utf8" }
    );
    const result = modifyObjcAppDelegate(appDelegate);
    expect(result).toMatchSnapshot();
  });
});
