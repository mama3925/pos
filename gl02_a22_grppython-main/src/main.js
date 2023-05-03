import { Command } from "commander";
import pkg from "../package.json";
import { i } from "./i18n";

import createLangCommand from "./commands/lang";
import createDbCommand from "./commands/db";
import createInfoCommand from "./commands/info";
import createFindCommand from "./commands/find";
import createTimetableCommand from "./commands/timetable";
import createStatsCommand from "./commands/stats";
import createCleanupCommand from "./commands/cleanup";

import db from "./db";
import config from "./config";

config.loadFromFile();
db.loadFromConfig();

const program = new Command();

program.name("course-manager").description(i("descr")).version(pkg.version);

createLangCommand(program);
createDbCommand(program);
createFindCommand(program);
createInfoCommand(program);
createTimetableCommand(program);
createStatsCommand(program);
createCleanupCommand(program);

program.parse();

export default program;
