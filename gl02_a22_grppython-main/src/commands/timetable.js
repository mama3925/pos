import chalk from "chalk";
import config from "../config";
import db from "../db";
import { i } from "../i18n";
import { CourseType } from "../models/course-type";
import { dayToNumber, timeSlotToCustomTimestamp } from "../utils/date";
import ics from "ics";
import { existsSync, writeFileSync } from "node:fs";

export default function (program) {
  const timetableCommand = program.command("timetable").description(i("cmds.info.descr"));

  // timetableCommand
  //   .command("show")
  //   .description("Voir emploi du temps")
  //   .action((options) => {});

  timetableCommand
    .command("export")
    .description(i("cmds.timetable.export.descr"))
    .argument("<output>", i("cmds.timetable.export.output"))
    .action((output) => {
      const sessions = [];

      config.timetable.units.forEach((timetableUnit) => {
        const unit = db.getUnit(timetableUnit.code);
        if (!unit) return;

        ["cm", "td", "tp"].forEach((courseType) => {
          if (timetableUnit.courseGroups[courseType]) {
            const course = unit.findCourse(CourseType[courseType.toUpperCase()], timetableUnit.courseGroups[courseType]);
            if (course) sessions.push(...course.sessions);
          }
        });
      });

      const date = new Date();

      const events = sessions
        .filter((session) => session.from.timestamp != null && session.to.timestamp != null)
        .map((session) => {
          return {
            title: session.course.unit.code + " " + session.course.formattedType,
            start: [date.getFullYear(), date.getMonth() + 1, date.getDate() - date.getDay() + session.from.day + 1, session.from.hour, session.from.minute],
            end: [date.getFullYear(), date.getMonth() + 1, date.getDate() - date.getDay() + session.to.day + 1, session.to.hour, session.to.minute],
            recurrenceRule: "FREQ=WEEKLY",
          };
        });

      if (events.length == 0) {
        console.log(chalk.red(i("cmds.timetable.export.noEvents")));
        return;
      }

      // @ts-ignore
      const { error, value } = ics.createEvents(events);
      if (error) {
        console.log(error);
        return;
      }

      if (!existsSync(output)) {
        writeFileSync(output, value);

        console.log(i("cmds.timetable.export.success", output));
        console.log(events.map((e) => e.title));
      } else {
        console.log(i("cmds.timetable.export.error", output));
      }
    });

  timetableCommand
    .command("add")
    .argument(`<unitCode>`, i("cmds.timetable.add.unitCode"))
    .option("--noCM", i("cmds.timetable.add.noCM"))
    .option("--td <nTD>", i("cmds.timetable.add.nTD"))
    .option("--tp <nTP>", i("cmds.timetable.add.nTP"))
    .action((unitCode, options) => {
      const unit = db.getUnit(unitCode);

      if (!unit) {
        console.log(chalk.red(i("cmds.info.unit.error", unitCode)));
        return;
      }

      let cmGroup = !options.noCM ? unit.findCourse(CourseType.CM) : null;
      let tdGroup = options.td ? unit.findCourse(CourseType.TD, parseInt(options.td)) : null;
      let tpGroup = options.tp ? unit.findCourse(CourseType.TP, parseInt(options.tp)) : null;

      let timetableUnit = config.timetable.units.find((u) => u.code === unit.code);

      if (timetableUnit) {
        config.timetable.units.splice(config.timetable.units.indexOf(timetableUnit), 1);
      } else {
        timetableUnit = { code: unit.code, courseGroups: { cm: null, td: null, tp: null } };
      }

      timetableUnit.code = unit.code;
      timetableUnit.courseGroups.cm = cmGroup ? cmGroup.group : null;
      timetableUnit.courseGroups.tp = tpGroup ? tpGroup.group : null;
      timetableUnit.courseGroups.td = tdGroup ? tdGroup.group : null;

      config.timetable.units.push(timetableUnit);
      config.saveToFile();

      let strGroup = "";
      if (cmGroup) strGroup += "CM" + cmGroup.group + " ";
      if (tdGroup) strGroup += "TD" + tdGroup.group + " ";
      if (tpGroup) strGroup += "TP" + tpGroup.group + " ";

      console.log(i("cmds.timetable.add.success", timetableUnit.code, strGroup));
    });

  timetableCommand
    .command("remove")
    .argument(`<unitCode>`, i("cmds.timetable.remove.unitCode"))
    .action((unitCode) => {
      const unit = db.getUnit(unitCode);
      let timetableUnit = config.timetable.units.find((u) => u.code === unit.code);

      if (timetableUnit) {
        config.timetable.units.splice(config.timetable.units.indexOf(timetableUnit), 1);
        config.saveToFile();

        console.log(i("cmds.timetable.remove.success", unitCode));
      } else {
        console.log(i("cmds.timetable.remove.error", unitCode));
      }
    });
}
