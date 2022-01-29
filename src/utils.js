import fs from "fs";
import { spawn } from "child_process";
import logger from "./logger.js";

/**
 * Deletes a file from the filesystem if it exists.
 * Does nothing if it doesn't do anything.
 * @param {string} pathToFile  path to file to delete
 */
export function cleanFile(pathToFile) {
  try {
    fs.unlinkSync(pathToFile);
  } catch (err) {
    switch (err.code) {
      case "ENOENT":
        return;
      default:
        throw new Error(err);
    }
  }
}

/**
 * Spawns a child process to run a specific shopify theme command
 * @param {string[]}  args      array to pass to the command
 * @param {string}    dir       directory to run command on
 */

export function runShopifyCommand(args, dir = process.cwd()) {
  const LOGGER = logger();

  return new Promise((resolve, reject) => {
    const childProcess = spawn("shopify", ["theme", ...args], {
      dir,
      stdio: ["inherit", "inherit", "pipe"],
    });

    childProcess.on("error", (error) => {
      LOGGER.error(error.toString("utf8"));
    });

    childProcess.on("close", () => {
      LOGGER.warn("Helium command finished");
      resolve();
    });
  });
}

/**
 * Checks if Shopify CLI is installed
 * Does nothing if it doesn't do anything.
 * @param {string}    version   shopify cli version string
 */

export function checkShopifyInstallation(version = "2.9.0") {
  const LOGGER = logger();

  return new Promise((resolve, reject) => {
    const childProcess = spawn("shopify", {
      stdio: ["inherit", "inherit"],
    });

    childProcess.on("error", (error) => {
      LOGGER.error(error.toString("utf8"));
    });

    childProcess.on("close", () => {
      LOGGER.warn("Helium command finished");
      resolve();
    });
  });
}
