import db from "../db.js";
import { i } from "../i18n.js";

import { bar, bg } from "ervy";
import chalk from "chalk";

export default function (program) {
  const statsCommand = program.command("stats");

  statsCommand
    .command("room-capacity")
    .argument("<roomCode>", i("cmds.info.room.roomCode"))
    .description(i("cmds.stats.roomCapacity.descr"))
    .action(() => {
      
      //on cherche toutes les salles donnees par l'utilisateur
      var entries = [];
      for (let j=0;j<process.argv.length;j++) {
        if (j>3) {
          entries.push(process.argv[j]);
        }
      }

      //on cherche les donnees avec salles donnees par l'utilisateur
      var entry = [];
      for (let j=0;j<entries.length;j++) {
        if (db.getRoom(entries[j]) !== null) {entry.push(db.getRoom(entries[j])); }
      }
    
      //triage et affichage
      if (entry.length !== 0) {
        db.rooms
        .sort((a, b) => a.capacity - b.capacity)
        .forEach((room) => {
          for (let j=0;j<entry.length;j++) {
            if (room.code === entry[j]['code']) {console.log(room.toString());}
          }
        }) 
        if (entries.length !== entry.length) {console.log(chalk.red("Some rooms entered are invalid."));}
      } else {
        console.log(chalk.red("Invalid rooms."));
      }
       
    });

  statsCommand
    .command("room-rate")
    .description(i("cmds.stats.roomRate.descr"))
    .option("-s, --slice <numberSmallerthan31>", "slice", 15)
    .action((options) => {
      const roomsStats = db.rooms
        .map((room) => {
          const totalDuration = room.sessions.filter((session) => session.from.timestamp != null && session.to.timestamp != null).reduce((acc, session) => acc + session.to.timestamp - session.from.timestamp, 0) / 60;
          return { key: room.code, value: totalDuration, style: bg("blue") };
        })
        .filter((entry) => entry.value && entry.value > 0 && entry.key)
        .sort((a, b) => b.value - a.value);

      if (roomsStats.length == 0) {
        // message aucune donnée
        return;
      }

      const maxHeight = 15;
      const maxValue = roomsStats[0].value;

      while (roomsStats.length > 0) {
        const chunk = roomsStats.splice(0, Math.max(parseInt(options.slice) || 1, 1));
        if (chunk.length > 0 && chunk.length <=31) {
          const max = chunk[0] ? chunk[0].value : 1;
          console.log(bar(chunk, { height: Math.ceil((max * maxHeight) / maxValue), barWidth: 4, padding: 1 }));
          console.log();
        }
        else{
          console.log("Tu doit entrer un chiffre moins que 31");
          return;
        }
      }
      console.log(chalk.gray(i("cmds.stats.roomRate.ordonne")));
      console.log();
      console.log(`${chalk.white.bold(i("general.room", 2))} : ${chalk.cyan(db.rooms.length)}`);
    });
}

