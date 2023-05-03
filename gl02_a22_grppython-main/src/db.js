import chalk from "chalk";
import { existsSync, lstatSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, normalize } from "node:path";
import config from "./config";
import { i } from "./i18n";
import Course from "./models/course";
import { Room } from "./models/room";
import { Session } from "./models/session";
import Unit from "./models/unit";
import { parse } from "./parser";

export default {
  units: [],
  rooms: [],
  printInfo() {
    console.log(chalk.green.bold(i("cmds.db.info.title")));
    console.log();
    console.log(`  ${chalk.white.bold(i("general.unit", 2))} : ${chalk.cyan(this.units.length)}`);
    console.log(`  ${chalk.white.bold(i("general.room", 2))} : ${chalk.cyan(this.rooms.length)}`);
  },
  getUnit(code) {
    return this.units.find((unit) => unit.code === code) ?? null;
  },
  getRoom(code) {
    return this.rooms.find((room) => room.code === code) ?? null;
  },
  _loadFromFile(path) {
    path = normalize(path);
    if (!path.endsWith(".cru")) {
      throw new Error(i("errors.notCru", path));
    }

    const oldCount = this.rooms.length;

    const { units, rooms } = parse(loadFile(path), this.rooms);

    // check if unit already exists
    const newUnits = units.filter((newUnit) => !this.getUnit(newUnit.code));

    this.units.push(...newUnits);

    return { newUnitCount: newUnits.length, newRoomCount: rooms.length - oldCount };
  },
  _loadFromDirectory(path) {
    path = normalize(path);

    const newCounts = { newUnitCount: 0, newRoomCount: 0 };

    getFiles(path).forEach((file) => {
      if (file.endsWith(".cru")) {
        const counts = this._loadFromFile(file);
        newCounts.newUnitCount += counts.newUnitCount;
        newCounts.newRoomCount += counts.newRoomCount;
      }
    });

    return newCounts;
  },
  importFromDisk(fullPath) {
    if (existsSync(fullPath)) {
      let counts = { newUnitCount: 0, newRoomCount: 0 };

      if (lstatSync(fullPath).isDirectory()) {
        counts = this._loadFromDirectory(fullPath);
      } else {
        counts = this._loadFromFile(fullPath);
      }

      this.saveToConfig();

      return counts;
    } else {
      throw new Error(i("errors.notExist", fullPath));
    }
  },
  searchRoom(code) {
    return this.rooms.find((room) => room.code === code);
  },
  searchUnit(code) {
    return this.units.find((unit) => unit.code === code);
  },
  saveToConfig() {
    config.db.units = this.units;
    config.db.rooms = this.rooms;
    config.saveToFile();
  },
  loadFromConfig() {
    this.units = config.db.units.map((unit) => {
      const newUnit = new Unit(unit.code);
      newUnit.courses = unit.courses.map((course) => {
        const newCourse = new Course(course.type, course.group, newUnit.code, course.entries);
        newCourse.sessions = course.sessions.map((session) => {
          const newSession = new Session(session.from, session.to, session.subGroup, session.roomCode);
          return newSession;
        });
        return newCourse;
      });
      return newUnit;
    });
    this.rooms = config.db.rooms.map((room) => new Room(room.code, room.capacity));
  },
};

function loadFile(path) {
  if (!existsSync(path)) {
    throw new Error(i("errors.notExist", path));
  }
  return readFileSync(path, "utf-8");
}

function getFiles(dir) {
  let results = [];
  const list = readdirSync(dir);
  list.forEach(function (file) {
    file = join(dir, file);
    const stat = statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else {
      results.push(file);
    }
  });
  return results;
}
