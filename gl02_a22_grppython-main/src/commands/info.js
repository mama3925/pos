import chalk from "chalk";
import db from "../db";
import { i } from "../i18n";
import { table } from "table";
import { formatDay } from "../utils/date";

export default function (program) {
  const dbCommand = program.command("info").description(i("cmds.info.descr"));

  dbCommand
    .command("unit")
    .description(i("cmds.info.unit.descr"))
    .argument("<unitCode>", i("cmds.info.unit.unitCode"))
    .action((unitCode) => {
      const unit = db.getUnit(unitCode);

      if (unit) {
        console.log(i("cmds.info.unit.unitCode") + " : " + chalk.bold(unit.code));
        console.log(unit.toString());
      } else {
        console.log(chalk.red(i("cmds.info.unit.error", unitCode)));
      }
    });

  dbCommand
    .command("room")
    .description(i("cmds.info.room.descr"))
    .argument("<roomCode>", i("cmds.info.room.roomCode"))
    .action((roomCode) => {
      const room = db.getRoom(roomCode);

      if (room) {
        //Affichage Code et Capacité Room
        console.log(
          table([
            [chalk.bold.blue("Code"), chalk.bold.blue("Capacité")],
            [room.code, room.capacity],
          ])
        );

        const sessions = [];
        room.sessions.forEach((session) => {
          sessions.push(session);
        });

        // Affichage Tableau Horaire d'Occupation
        console.log(
          chalk.bold("Horaires d'occupation  : \n") +
            table([
              [chalk.bold.blue(i("cmds.info.room.from")), chalk.bold.blue(i("cmds.info.room.to"))],
              ...sessions.map((session) => [formatDay(session.from.day) + " : " + session.from.hour + ":" + session.from.minute, formatDay(session.to.day) + " : " + session.to.hour + ":" + session.to.minute]),
            ])
        );
      } else {
        console.log(chalk.red(i("cmds.info.room.error", roomCode)));
      }
    });
}
