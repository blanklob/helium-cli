#!/usr/bin/env node

import chalk from 'chalk';

const [,, ...args ] = process.argv;
const port = 4949;
const logger = console.log;

args.forEach((value, index) => {
    switch (value) {
        case "serve":
            logger(chalk.blue(`Helium serving the theme on port ${port}`));
            break;

        case "watch":
            logger(chalk.blue(`Helium watching over file changes`));
            break;
        
        case "build":
            logger(chalk.blue(`Helium is building files...`));
            break;

        case "lint":
            logger(chalk.blue(`Helium lint finished in ..`));
            break;
    
        default:
            logger(chalk.red(`Unknown Helium command`));
            break;
    }
})
