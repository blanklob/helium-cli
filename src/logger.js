import chalk from "chalk";

export default function logger(logLevel) {
  let level;

  switch (logLevel) {
    case "silent":
      level = 0;
      break;
    case "info":
      level = 1;
      break;
    case "warning":
      level = 2;
      break;
    case "error":
      level = 3;
      break;
    default:
      level = 3;
  }

  return {
    level,
    info(...args) {
      if (level >= 0) {
        console.log(
          `${chalk.white.bgBlue.bold(" Info: ")} ${chalk.white(...args)}`
        );
      }
    },
    warn(...args) {
      if (level >= 2) {
        console.warn(
          `${chalk.black.bgYellow.bold(" Warning: ")} ${chalk.white(...args)}`
        );
      }
    },
    error(...args) {
      if (level >= 3) {
        console.error(
          `${chalk.white.bgRed.bold(" Error: ")} ${chalk.white(...args)}`
        );
      }
    },
  };
}
