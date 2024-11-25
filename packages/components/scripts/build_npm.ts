import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

import package_ from "./package.json" with { type: "json" };

await emptyDir("./npm");

await build({
  entryPoints: ["./src/mod.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  esModule: true,
  scriptModule: "cjs",
  test: false,
  package: {
    ...package_,
    version: Deno.args[0] ?? package_.version,
  },
  mappings: {
    "https://lib.deno.dev/x/grammy@1.x/mod.ts": {
      name: "grammy",
      version: "^1.0.0",
      peerDependency: true,
    },
    "https://lib.deno.dev/x/zod@3.x/mod.ts": {
      name: "zod",
      version: "^3.0.0",
    },
    "https://esm.sh/qs@6.x": {
      name: "qs",
      version: "^6.0.0",
    },
    "https://esm.sh/devalue@4.x": {
      name: "devalue",
      version: "^4.0.0",
    },
  },
  postBuild() {
    // post build steps
    Deno.copyFileSync("src/LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
