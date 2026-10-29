const fs = require("fs");
const path = require("path");
const { createRequire } = require("module");

const localReq = createRequire(__filename);
const ROOT = path.resolve(__dirname, "..");
const BACKUP_DIR = path.join(ROOT, ".rolldown-binding-backup");
const BINDING_FILE = "rolldown-binding.linux-x64-gnu.node";

function getBindingSource() {
  try {
    const pkgPath = localReq.resolve("@rolldown/binding-linux-x64-gnu/package.json");
    const dir = path.dirname(pkgPath);
    const file = path.join(dir, BINDING_FILE);
    if (fs.existsSync(file)) return file;
  } catch {}

  const backup = path.join(BACKUP_DIR, BINDING_FILE);
  if (fs.existsSync(backup)) return backup;

  return null;
}

function ensureBackup(source) {
  if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
  const backup = path.join(BACKUP_DIR, BINDING_FILE);
  if (!fs.existsSync(backup)) {
    fs.copyFileSync(source, backup);
    console.log(`[rolldown-fix] backed up native binding to ${backup}`);
  }
}

function restoreToRolldown() {
  let rolldownDir;
  try {
    rolldownDir = path.dirname(localReq.resolve("rolldown/package.json"));
  } catch {
    console.warn("[rolldown-fix] rolldown package not found, skipping");
    return;
  }

  const dest = path.join(rolldownDir, "dist", BINDING_FILE);
  if (fs.existsSync(dest)) return;

  const source = getBindingSource();
  if (!source) {
    console.warn("[rolldown-fix] no native binding source found, skipping");
    return;
  }

  try {
    fs.copyFileSync(source, dest);
    console.log(`[rolldown-fix] restored native binding to ${dest}`);
  } catch (e) {
    console.warn(`[rolldown-fix] failed to restore binding: ${e.message}`);
  }
}

const source = getBindingSource();
if (source) {
  ensureBackup(source);
}
restoreToRolldown();
