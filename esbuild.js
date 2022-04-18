const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    outdir: "lib",
    platform: "node",
    target: ["node14"],
    bundle: true,
    sourcemap: true,
    minify: true,
  })
  .then(() => "⚡ Done!")
  .catch(() => process.exit(1));
