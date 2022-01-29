#!/usr/bin/env node

import logger from "./logger.js";
import { runShopifyCommand } from "./utils.js";
import { build } from "./bundle.js";

const [, , ...args] = process.argv;
const LOGGER = logger();

args.forEach((value) => {
  switch (value) {
    case "serve":
      LOGGER.info("Helium is Serving files");
      LOGGER.warn("Helium is waiting for theme upload to finish");
      runShopifyCommand(["serve"]);
      break;

    case "watch":
      LOGGER.info("Helium is watching over your changes");
      LOGGER.warn("Helium is asking you to make some changes");
      try {
        build({
          development: true,
        });
      } catch (err) {
        LOGGER.error(err);
      }
      break;

    case "build":
      LOGGER.info("Helium is building files crazy fast");
      try {
        build({}).then(() =>
          LOGGER.info("Helium finished building files in few Milliseconds")
        );
      } catch (err) {
        LOGGER.error(err);
      }
      break;

    case "lint":
      LOGGER.info("Helium is linting files");
      runShopifyCommand(["check"]);
      break;

    default:
      LOGGER.error("Unknown Helium command");
      break;
  }
});
