import chalk from "chalk";
import { formatDay } from "../utils/date";
import { resolve } from "node:path";

export default {
  descr: "Course management tool of the Central University of the Republic of Sealand",
  general: {
    code: "Code",
    unit: (n = 1) => `Course Unit${n > 1 ? "s" : ""}`,
    room: (n = 1) => `Room${n > 1 ? "s" : ""}`,
    type: `Type`,
    group: `Group`,
    subGroup: `SubGroup`,
    capacity: `Capacity`,
    entries: `Participants`,
    session: (n = 1) => `Session${n > 1 ? "s" : ""}`,
    course: `Course`,
    timeSlot: (timeSlot) => {
      return formatDay(timeSlot.day) + " " + ("0" + timeSlot.hour).slice(-2) + ":" + ("0" + timeSlot.minute).slice(-2);
    },
    from: "De",
    to: "À",
  },
  prompts: {
    delete: "Delete ?",
  },
  cmds: {
    db: {
      descr: "Database management",
      info: {
        descr: "Displays information about the database",
        title: "Informations about the database",
        params: {
          path: "Path to the file or folder",
        },
      },
      import: {
        added: "added",
      },
      drop: {
        deleted: "deleted",
      },
    },
    info: {
      descr: "Displays information",
      unit: {
        descr: "Displays information about a teaching unit",
        unitCode: "Unit code",
        error: "Unit not found",
      },
      room: {
        descr: "Displays information about a room",
        roomCode: "Room code",
        error: "Room not found",
      },
    },
    lang: {
      descr: "Display or change language",
      params: {
        lang: {
          name: "fr|en",
          descr: "Language",
        },
      },
      actions: {
        show: (lang) => `${chalk.bold("Selected language")} : ${chalk.cyan(lang)}.`,
        error: chalk.red(`This language does not exist: please choose ${chalk.cyan("fr")} or ${chalk.cyan("en")}.`),
        change: (lang) => chalk.green(`${chalk.bold("New language")} : ${chalk.cyan(lang)}.`),
      },
    },
    find: {
      descr: "Find a free room with a time slot",

      room: {
        descr: "Enter the slots in DHH:MM form: (D-Day: L|MA|ME|D|V|S|D)",
        from: "Beginning of time slot -> example : L08:30",
        to: "End of time slot -> example : L10:30",
        freeroom: "Number of rooms available:",
      },
    },
    stats: {
      room_capacity: {
        descr: "Display the list of rooms with the capacity ordered in ascending order for a given list of teaching units",
      },
      roomRate: {
        descr: "Display of the hourly room occupancy rate",
        ordonne: "Ordinate: hourly volume per week",
      },
    },
    cleanup: {
      descr: "Delete the config",
      confirmMessage: "Delete the configuration",
    },

    timetable: {
      descr: "Return to iCal format the timetable of person's teaching units ",
      export: {
        descr: "Export timetable",
        output: "Output file",
        noEvents: "Error during export",
        sucess: (file) => chalk.green(`The file ${chalk.cyan(resolve(__dirname, file))} has been created.\List of events: `),
        error: (file) => chalk.red(`The file ${chalk.cyan(resolve(__dirname, file))} could not be created.`),
      },
      add: {
        unitCode: "Teaching Unit code",
        noCM: "No lecture",
        nTD: "TD number",
        nTP: "TP number",
        success: (code, str) => chalk.green(`The unit ${chalk.cyan(code)} has been added.\nRegistered courses: ${str}`),
      },
      remove: {
        unitCode: "Teaching Unit code",
        success: (unit) => chalk.green(`The unit ${chalk.cyan(unit)} has been removed.`),
        error: (unit) => chalk.red(`The unit ${chalk.cyan(unit)} does not exist.`),
      },
    },
  },
  errors: {
    notExist: (file) => chalk.red(`The file ${chalk.cyan(file)} do not exist.`),
    notCru: (file) => chalk.red(`The file ${chalk.cyan(file)} is not a CRU file.`),
    parse: (file) => chalk.red(`The file ${chalk.cyan(file)} has an invalid format.`),
    na: chalk.red("N/A"),
    noRoom: chalk.red("No room available")
  },
  date: {
    days: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
    },
  },
  $fallback: "No translation",
};
