#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const BRIGHT = "\x1b[1m";
const GREEN = "\x1b[32m";
const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";

function getNearestPackageJson(dir = process.cwd()) {
  const packageJsonPath = path.join(dir, "package.json");

  if (fs.existsSync(packageJsonPath)) return require(packageJsonPath);

  const nextDir = path.resolve(dir, "..");
  if (nextDir === dir) return null;

  return getNearestPackageJson(nextDir);
}

const packageJson = getNearestPackageJson();

if (!packageJson) {
  console.log(BRIGHT, RED, "\nno package.json file found\n");
  process.exit(0);
}

const existingPackages = Object.keys({
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
});

const allPackageUpgrades = process.argv.slice(2);

const packagesToUpgrade = allPackageUpgrades.filter((packageVersion) => {
  for (const existingPackage of existingPackages) {
    if (packageVersion.startsWith(existingPackage)) return true;
  }

  return false;
});

if (packagesToUpgrade.length === 0) {
  console.log(BRIGHT, YELLOW, "\nno packages to upgrade.\n");
  process.exit(0);
}

console.log(
  BRIGHT,
  GREEN,
  "\nupgrading only:",
  RESET,
  "\n- ",
  packagesToUpgrade.join("\n- "),
  "\n"
);

spawn("yarn", ["upgrade", ...packagesToUpgrade], {
  shell: true,
  stdio: "inherit",
});
