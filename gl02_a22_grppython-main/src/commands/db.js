import chalk from "chalk";
import { existsSync, lstatSync } from "node:fs";
import { resolve } from "node:path";
import db from "../db";
import { i } from "../i18n";
import confirm from "@inquirer/confirm";

export default function (program) {
  const dbCommand = program.command("db");

  dbCommand.command("info").action(() => {
    db.printInfo();
  });

  dbCommand
    .command("import")
    .argument("<path>", i("cmds.db.info.params.path"))
    .action((path) => {
      const fullPath = resolve(path);

      try {
        const { newRoomCount, newUnitCount } = db.importFromDisk(fullPath);

        console.log(`${chalk.cyan(newUnitCount)} ${i("general.unit", newUnitCount)} + ${chalk.cyan(newRoomCount)} ${i("general.room", newRoomCount)} ${i("cmds.db.import.added")}`);
      } catch (e) {
        console.log(e.message);
      }
    });

  // TODO remove from file

  dbCommand.command("drop").action(async (path) => {
    const isConfirmed = await confirm({ message: i("prompts.delete") });
    if (isConfirmed) {
      const unitCount = db.units.length;
      const roomCount = db.rooms.length;
      db.rooms = [];
      db.units = [];
      db.saveToConfig();

      console.log(`${chalk.cyan(unitCount)} ${i("general.unit", unitCount)} + ${chalk.cyan(roomCount)} ${i("general.room", roomCount)} ${i("cmds.db.drop.deleted")}`);
    }
  });
}
