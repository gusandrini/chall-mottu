// scripts/update-commit-hash.js
const { execSync } = require("child_process");
const fs = require("fs");

const appJsonPath = "./app.json";

try {
  const appConfig = JSON.parse(fs.readFileSync(appJsonPath, "utf-8"));
  const commitHash = execSync("git rev-parse --short HEAD").toString().trim();
  console.log("✅ Commit hash encontrado:", commitHash);

  appConfig.expo.extra = appConfig.expo.extra || {};
  appConfig.expo.extra.commitHash = commitHash;

  fs.writeFileSync(appJsonPath, JSON.stringify(appConfig, null, 2));
  console.log("📦 app.json atualizado com o commit hash!");
} catch (error) {
  console.error("⚠️ Erro ao atualizar o commit hash:", error);
  process.exit(1);
}
