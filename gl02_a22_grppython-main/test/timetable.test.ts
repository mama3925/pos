import { expect, test } from "vitest";
import { Command } from "commander";
import createTimetableCommand from "../src/commands/timetable";
import db from "../src/db";
import { resolve } from "node:path";
import config from "../src/config";

const program = new Command();
createTimetableCommand(program);

db.importFromDisk(resolve(__dirname, "../data/"));
program.parse(["node", ".", "timetable", "add", "MATH02", "--td", "1", "--tp", "2"]);
program.parse(["node", ".", "timetable", "add", "NF04", "--td", "1", "--tp", "1"]);
program.parse(["node", ".", "timetable", "add", "LE03", "--noCM", "--td", "1"]);
program.parse(["node", ".", "timetable", "export", "./test/tmp/tt.ics"]);

test("génération iCalendar", () => {
  expect(config.timetable.units).toContainEqual({ "code": "MATH02", "courseGroups": {"cm": 1, "td": 1, "tp": 2}});
});
