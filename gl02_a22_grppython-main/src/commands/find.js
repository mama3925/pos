import chalk from "chalk";
import db from "../db";
import { i } from "../i18n";
import { dayToNumber, timeSlotToCustomTimestamp } from "../utils/date";
import { table } from "table";

export default function (program) {
  const dbCommand = program.command("find").description(i("cmds.find.descr"));

  dbCommand
    .command("room")
    .description(i("cmds.find.room.descr"))
    .argument("<from>", i("cmds.find.room.from"))
    .argument("<to>", i("cmds.find.room.to"))
    .action((from, to) => {
      try {
        const fromTimeSlot = parseTimeSlotInput(from);
        const toTimeSlot = parseTimeSlotInput(to);

        const fromTimestamp = timeSlotToCustomTimestamp(fromTimeSlot);
        const toTimestamp = timeSlotToCustomTimestamp(toTimeSlot);

        const freeRooms = [];

        db.rooms.forEach((room) => {
          if (room.isFree(fromTimestamp, toTimestamp)) {
            freeRooms.push(room);
          }
        });

        freeRooms.sort((a, b) => a.capacity - b.capacity);
        if (freeRooms.length > 0) {
          console.log(table([[chalk.bold(i("general.room")), chalk.bold(i("general.capacity"))], ...freeRooms.map((room) => [chalk.green(room.code), chalk.cyan(room.capacity)])]));

          console.log(chalk.bold(i("cmds.find.room.freeroom")), chalk.cyan(freeRooms.length));
        } else {
          console.log(chalk.bold(i("errors.noRoom")));
        }
      } catch (e) {
        console.log(chalk.red(e.message));
      }
    });
}
const regex = /^(?<day>L|MA|V|ME|J|S|D)(?<hour>(\d{1,2})):(?<minute>\d{1,2})$/;

function parseTimeSlotInput(input) {
  const match = input.match(regex);

  if (!match) {
    throw new Error("Parsing");
  }

  if (match[2] > 23 || match[4]>60) {
    throw new Error("Invalid time input");
  }

  const { day, hour, minute } = match.groups;

  return {
    day: dayToNumber(day),
    hour: parseInt(hour),
    minute: parseInt(minute)
  };
}
