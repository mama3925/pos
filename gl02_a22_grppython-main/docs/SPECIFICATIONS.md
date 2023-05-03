# Spécifications

Ce fichier recense les commandes et explications de chaque spécifications demandées par le commanditaire

```console
 node .
```

désigne l'éxécution du programme, **cm.exe** par exemple sera utilisé pour les utilsteurs finaux

## Spécifications fonctionnelles

## Ajouter et supprimer des informations de la base de données

Importer un/des fichier(s)

```console
 node . db import <path>
```

> path : fichier ou dossier (tous les fichiers contenus se terminants par .cru)

Réinitialiser la base de données

```console
 node . db drop
```

### SPEC F01 - Consulter les informations d'une UE

**Un utilisateur doit pouvoir consulter pour une UE donnée, toutes les
informations relatives à cette dernière comme le code de l'UE, les différents
créneaux horaires ainsi que les salles qui lui sont associées.**

```console
 node . info unit <unitCode>
```

### SPEC F02 - Consulter les informations d'une salle

**Un utilisateur doit pouvoir consulter à quel moment de la semaine une
certaine salle est libre. De plus, la capacité maximale d'une salle doit
être indiquée.**

```console
node . info room <roomCode>
```

### SPEC F03 - Rechercher une salle libre

**Un utilisateur doit pouvoir rechercher les salles libres pour un
créneau horaire donné.**

```console
node . find room <from> <to>
```

### SPEC F04 - Exporter son emploi du temps

**Un utilisateur doit pouvoir générer un fichier au format iCalendar entre
deux dates données contenant les cours auxquels il participe, afin de
l'intégrer à son propre logiciel d'agenda.**

Ajouter une UE à l'emploi du temps

```console
node . timetable add <unitCode>
```

> --noCM : pas d'inscription au CM de l'UE

> --tp \<number\> : groupe de TP

> --td \<number\> : groupe de TD

Retirer une UE de l'emploi du temps

```console
node . timetable remove <unitCode>
```

Exporter l'emploi du temps

```console
node . timetable export <path>
```

path : chemin vers un nouveau fichier .ics

### SPEC F05 - Statistiques sur les taux d'occupation

**Le système doit générer des visuels permettant de suivre le taux
d'occupation des salles.**

```console
node . stats room-rate
```

> --slice \<number\> : nombre d'éléments par ligne

### SPEC F06 - Classement des salles par capacité d'accueil

**Le système doit pouvoir générer un classement des salles ordonnées par
capacités d'accueil.**

- Une modification au cahier des charges a été apportée, au lieu d'avoir une liste d'UEs en argument, on a toutes les UEs présentes dans la base de données. Donc pas d'argument en entrée

```console
node . stats room-capacity
```

## Spécifications non fonctionnelles

### SPEC NF01 - Qualité des données

**Le système doit vérifier la qualité des données d'emploi du temps
(redondance, une salle ne peut être utilisée que par un seul professeur
pendant un créneau donné).**

### SPEC NF02 - Portabilité

**Le système doit pouvoir fonctionner sur un matériel informatique plus
ancien.**

### SPEC NF03 - Accessibilité

**Le système doit pouvoir fonctionner dans plusieurs langues (Français,
Anglais, ...)**

Afficher la langue

```console
node . lang
```

- Français

```console
node . lang --set fr
```

- Anglais

```console
node . lang --set en
```

## Nettoyage

Supprimer la base de donnée, l'emploi du temps et la langue

```console
node . cleanup
```
