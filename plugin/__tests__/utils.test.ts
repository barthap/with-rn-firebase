import { compareVersions } from "../src/utils";

describe(compareVersions, () => {
  it("properly compares semver versions", () => {
    expect(compareVersions("1.7.1", "1.7.10")).toBeLessThan(0);
    expect(compareVersions("1.6.1", "1.7.10")).toBeLessThan(0);
    expect(compareVersions("1.6.20", "1.7.10")).toBeLessThan(0);
    expect(compareVersions("1.7.1", "1.7.10")).toBeLessThan(0);
    expect(compareVersions("1.7", "1.7.0")).toBeLessThan(0);
    expect(compareVersions("1.7", "1.8.0")).toBeLessThan(0);

    expect(compareVersions("1.7.10", "1.7.1")).toBeGreaterThan(0);
    expect(compareVersions("1.7.10", "1.6.1")).toBeGreaterThan(0);
    expect(compareVersions("1.7.10", "1.6.20")).toBeGreaterThan(0);
    expect(compareVersions("1.7.0", "1.7")).toBeGreaterThan(0);
    expect(compareVersions("1.8.0", "1.7")).toBeGreaterThan(0);

    expect(compareVersions("1.7.10", "1.7.10")).toBe(0);
    expect(compareVersions("1.7", "1.7")).toBe(0);
  });
});
