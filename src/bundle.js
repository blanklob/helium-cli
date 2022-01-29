import esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import logger from "./logger.js";
import entrypoints from "./entrypoints.js";

export const build = async ({
  development = false,
  plugins = [],
  ...options
}) => {
  const LOGGER = logger();

  await esbuild
    .build({
      entryPoints: [...entrypoints],
      entryNames: "[name]",
      outdir: "assets",
      outbase: "src",
      format: "esm",
      target: "es2015",
      bundle: true,
      watch: development && {
        onRebuild(error, result) {
          if (error) LOGGER.error("Helium watch failed: ", error);
          else LOGGER.info("Helium rebuild your files..");
        },
      },
      sourcemap: development,
      minify: !development,
      ...options,
      plugins: [...plugins, sassPlugin()],
    })
    .catch(() => process.exit(1));
};
