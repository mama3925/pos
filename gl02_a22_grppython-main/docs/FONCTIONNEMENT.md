# Fonctionnement

Ce document présente le fonctionnement de notre application.

## Données

Le jeu de données initialement données pour le projet est dans le dossier `data`. Il est constitué de sous-dossiers classés par tranche alphabétique contenant un unique fichier chacun `edt.cru`.
Exemple : `data/AB/edt.cru` comprend toutes les infos concernant les UEs commençant par A ou B.

## Parseur & Système de base de données

La totalité des fonctionnalités du projet (Spécifications) repose sur notre parseur `src/parser.js` et notre système de base de données `src/db.js`.

Peu importe les fonctionnalités, il faut que nous puissions extraitre les différents types de données présents dans un fichier `edt.cru`.

Ainsi, pour chaque Spécificiation nous pouvons importer la Base de données de plusieurs façons :

- `node . db import <path>` qui importe la totalité des données d'un dossier ou fichier

Le parseur va permettre **de "découper" le fichier de données en un ensemble d'objets crées à partir des classes définies dans `src/models`**. Cet ensemble constituera le jeu de données nécessaire au fonctionnement de la Spécification.

Nous pouvons également supprimer la Base de données de plusieurs façons :

- `node . db drop` qui efface la base de données
