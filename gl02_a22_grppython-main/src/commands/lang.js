import config from "../config";
import { avaiableLocales, i } from "../i18n";

export default function (program) {
  program
    .command("lang")
    .option("-s, --set <locale>", i("cmds.lang.params.lang.descr"))
    .description(i("cmds.lang.descr"))
    .action((options) => {
      if (options.set) {
        if (avaiableLocales.includes(options.set)) {
          config.locale = options.set;
          config.saveToFile();
          console.log(i("cmds.lang.actions.change", config.locale));
        } else {
          console.log(i("cmds.lang.actions.error", config.locale));
        }
      } else {
        console.log(i("cmds.lang.actions.show", config.locale));
      }
    });
}
