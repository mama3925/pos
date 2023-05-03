import config, { cleanup } from "../config";
import { i } from "../i18n";
import confirm from "@inquirer/confirm";

export default function (program) {
  program
    .command("cleanup")
    .description(i("cmds.cleanup.descr"))
    .action(async () => {
      const isConfirmed = await confirm({ message: i("cmds.cleanup.confirmMessage") });

      if (isConfirmed) {
        cleanup();
      }
    });
}
