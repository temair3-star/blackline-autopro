const fs = require("fs");
const path = require("path");
const { createRequire } = require("module");
const { execSync } = require("child_process");

const localReq = createRequire(__filename);
const ROOT = path.resolve(__dirname, "..");
const BACKUP_DIR = path.join(ROOT, ".rolldown-binding-backup");
const BINDING_FILE = "rolldown-binding.linux-x64-gnu.node";
const PKG_NAME = "@rolldown/binding-linux-x64-gnu";

function findBindingInNodeModules() {
  try {
    const pkgPath = localReq.resolve(`${PKG_NAME}/package.json`);
    const file = path.join(path.dirname(pkgPath), BINDING_FILE);
    if (fs.existsSync(file)) return file;
  } catch {}
  return null;
}

function findInBackup() {
  const backup = path.join(BACKUP_DIR, BINDING_FILE);
  if (fs.existsSync(backup)) return backup;
  return null;
}

function downloadBinding() {
  const tmpDir = path.join(ROOT, ".rolldown-tmp");
  let result = null;
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    fs.mkdirSync(tmpDir, { recursive: true });
    execSync(`npm pack ${PKG_NAME}@1.2.1`, { cwd: tmpDir, stdio: "pipe" });
    const tgz = fs
      .readdirSync(tmpDir)
      .find((f) => f.endsWith(".tgz"));
    if (!tgz) return null;
    execSync(`tar xzf "${tgz}"`, { cwd: tmpDir, stdio: "pipe" });
    const extracted = path.join(tmpDir, "package", BINDING_FILE);
    if (fs.existsSync(extracted)) {
      const staged = path.join(ROOT, ".rolldown-staged-binding.node");
      fs.copyFileSync(extracted, staged);
      result = staged;
    }
  } catch (e) {
    console.warn(`[rolldown-fix] download failed: ${e.message}`);
  } finally {
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
  }
  return result;
}

function getBindingSource() {
  return findBindingInNodeModules() || findInBackup() || downloadBinding();
}

function ensureBackup(source) {
  if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
  const backup = path.join(BACKUP_DIR, BINDING_FILE);
  if (!fs.existsSync(backup)) {
    fs.copyFileSync(source, backup);
    console.log(`[rolldown-fix] backed up native binding`);
  }
}

function restoreToRolldown(source) {
  let rolldownDistDir;
  try {
    rolldownDistDir = path.join(
      path.dirname(localReq.resolve("rolldown/package.json")),
      "dist"
    );
  } catch {
    console.warn("[rolldown-fix] rolldown package not found, skipping");
    return;
  }

  const dest = path.join(rolldownDistDir, BINDING_FILE);
  if (fs.existsSync(dest)) return;

  try {
    fs.copyFileSync(source, dest);
    console.log(`[rolldown-fix] restored native binding to rolldown/dist`);
  } catch (e) {
    console.warn(`[rolldown-fix] failed to restore binding: ${e.message}`);
  }

  const pkgDir = path.dirname(
    (() => {
      try {
        return localReq.resolve(`${PKG_NAME}/package.json`);
      } catch {
        return "";
      }
    })()
  );
  if (pkgDir) {
    const pkgDest = path.join(pkgDir, BINDING_FILE);
    if (!fs.existsSync(pkgDest)) {
      try {
        fs.copyFileSync(source, pkgDest);
        console.log(`[rolldown-fix] restored native binding to @rolldown package`);
      } catch {}
    }
  }
}

const source = getBindingSource();
if (!source) {
  console.warn("[rolldown-fix] could not obtain native binding from any source");
  process.exit(0);
}

ensureBackup(source);
restoreToRolldown(source);
