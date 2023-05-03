import chalk from "chalk";
import { formatDay } from "../utils/date";
import { resolve } from "node:path";


export default {
  descr: "Outil de gestion des cours de l'université centrale de la république de Sealand",
  general: {
    code: "Code",
    unit: (n = 1) => `Unité${n > 1 ? "s" : ""} d'enseignement`,
    room: (n = 1) => `Salle${n > 1 ? "s" : ""}`,
    type: `Type`,
    group: `Groupe`,
    subGroup: `Sous-groupe`,
    capacity: `Capacité`,
    entries: `Participants`,
    session: (n = 1) => `Session${n > 1 ? "s" : ""}`,
    course: `Cours`,
    timeSlot: (timeSlot) => {
      return formatDay(timeSlot.day) + " " + ("0" + timeSlot.hour).slice(-2) + ":" + ("0" + timeSlot.minute).slice(-2);
    },
    from: "De",
    to: "À",
  },
  prompts: {
    delete: "Supprimer ?",
  },
  cmds: {
    db: {
      descr: "Gestion de la base de données",
      info: {
        descr: "Affiche des informations sur la base de données",
        title: "Informations sur la base de données",
        params: {
          path: "Chemin vers le fichier ou le dossier",
        },
      },
      import: {
        added: "ajoutés",
      },
      drop: {
        deleted: "supprimés",
      },
    },
    info: {
      descr: "Affiche des informations",
      unit: {
        descr: "Affiche des informations sur une unité d'enseignement",
        unitCode: "Code de l'unité",
        error: "Unité non trouvée",
      },
      room: {
        descr: "Affiche des informations sur une salle",
        roomCode: "Code de la salle",
        error: "Salle non trouvée",
        from: "DE",
        to: "A",
      },
    },
    lang: {
      descr: "Afficher ou changer la langue",
      params: {
        lang: {
          name: "fr|en",
          descr: "Langue",
        },
      },
      actions: {
        show: (lang) => `${chalk.bold("Langue selectionnée")} : ${chalk.cyan(lang)}.`,
        error: chalk.red(`Cette langue n'existe pas : veuillez choissir ${chalk.cyan("fr")} ou ${chalk.cyan("en")}.`),
        change: (lang) => chalk.green(`${chalk.bold("Nouvelle langue")} : ${chalk.cyan(lang)}.`),
      },
    },
    find: {
      descr: "Trouver salle libre avec un cnéneau horaire ",

      room: {
        descr: "Rentrer le créneaux sous forme JHH:MM : (Jour J : L|MA|ME|J|V|S|D) (",
        from: "Debut horaire créneau -> exemple : L08:30",
        to: "Fin horaire créneau -> exemple : L10:30",
        freeroom: "Nombre de salles disponibles :",
      },
    },
    stats: {
      roomCapacity: {
        descr: "Afficher la liste salles avec la capacité d'accueil ordonnée par ordre croissant pour une liste d'UE donnée",
      },
      roomRate: {
        descr: "Visualisation du taux horaire d'occupation des salles",
        ordonne: "Ordonnée : volume horaire par semaine",
      },
    },
    cleanup: {
      descr: "Supprimer la config",
      confirmMessage: "Supprimer la configuration ?",
    },
    timetable: {
      descr: "Retourner au format iCal le calendrier des UEs d'une personne",
      export: {
        descr: "Exporter l'emploi du temps",
        output: "Fichier de sortie",
        noEvents: "Aucun événement à exporter.",
        success: (file) => chalk.green(`L'emploi du temps a été exporté dans le fichier ${chalk.cyan(resolve(__dirname, file))}\nListe des événements :`),
        error: (file) => chalk.red(`Fichier déjà existant ${chalk.cyan(resolve(__dirname, file))}`),
      },
      add: {
        unitCode: "Code de l'UE",
        noCM: "Pas de CM",
        nTD: "Numéro de TD",
        nTP: "Numéro de TP",
        success: (code, str) => chalk.green(`L'UE ${chalk.cyan(code)} a été ajoutée.\nInscrit dans ${str}`),
      },
      remove: {
        unitCode: "Code de l'UE",
        success: (unit) => chalk.green(`L'UE ${chalk.cyan(unit)} a été supprimée.`),
        error: (unit) => chalk.red(`L'UE ${chalk.cyan(unit)} n'a pas été trouvée.`),
      },
    },
  },
  errors: {
    notExist: (file) => chalk.red(`Le fichier ${chalk.cyan(file)} n'existe pas.`),
    notCru: (file) => chalk.red(`Le fichier ${chalk.cyan(file)} n'est pas un fichier CRU.`),
    parse: (file) => chalk.red(`Le fichier ${chalk.cyan(file)} a un format invalide.`),
    na: chalk.red("N/A"),
    noRoom: chalk.red("Aucune salle disponible.")
  },
  date: {
    days: {
      monday: "Lundi",
      tuesday: "Mardi",
      wednesday: "Mercredi",
      thursday: "Jeudi",
      friday: "Vendredi",
      saturday: "Samedi",
      sunday: "Dimanche",
    },
  },
  $fallback: "Pas de traduction.",
};
