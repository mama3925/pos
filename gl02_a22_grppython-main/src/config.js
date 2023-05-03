import * as fs from "node:fs";
import { resolve } from "node:path";
import os from "os";

const userHomeDir = os.homedir();

const CONFIG_PATH = resolve(userHomeDir, ".cm-config.json");

let config = {
  locale: "fr",
  db: {
    units: [],
    rooms: [],
  },
  timetable: {
    units: [], // codes of units with groups
  },
  saveToFile,
  loadFromFile,
};

function saveToFile() {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify({ ...config, saveToFile: undefined, loadFromFile: undefined }));
}

function loadFromFile() {
  if (fs.existsSync(CONFIG_PATH)) {
    config = Object.assign(config, JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8")));
  }
}

export function cleanup() {
  if (fs.existsSync(CONFIG_PATH)) {
    fs.rmSync(CONFIG_PATH);
  }
}

export default config;
