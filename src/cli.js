#!/usr/bin/env node

import logger from "./logger.js";
import { runShopifyCommand } from "./utils.js";

const [,, ...args ] = process.argv;
const LOGGER = logger();

args.forEach((value, index) => {
    switch (value) {
        case "serve":
            LOGGER.info("Helium is Serving files");
            runShopifyCommand(['serve']);
            break;

        case "watch":
            LOGGER.info("Helium watching over file changes");
            break;
        
        case "build":
            LOGGER.info("Helium is building files");
            break;

        case "lint":
            LOGGER.info("Helium is linting files");
            runShopifyCommand(['check']);
            break;
            
        default:        
            LOGGER.error("Unknown Helium command!");
            break;
    }
})
