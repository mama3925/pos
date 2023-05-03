# GL02_A22_grpPython - Contexte SRU

Utilitaire en invite de commande pour l'Université centrale de la république de Sealand qui souhaite faciliter la gestion de ses locaux et l'organisation de ses usagers.

## Contributeurs

Etudiants de l'UTT:

Groupe Python - A22:
- [Martin Gandon](mailto:martin.gandon@utt.fr)
- [Louis Duhal Berruer](mailto:louis.duhal_berruer@utt.fr)
- [Louis Give](mailto:louis.give@utt.fr)
- [Marielle Charon](mailto:marielle.charon@utt.fr)

Groupe anticonstitutionnellement - A22:
- [Bastien Boulet](mailto:bastien.boulet@utt.fr)
- [Emmanuel Tran](mailto:emmanuel.tran@utt.fr)
- [Wuyuan Xu](mailto:wuyuan.xu@utt.fr)

> [SPECIFICATIONS/DOCUMENTATION](docs/SPECIFICATIONS.md)

> [FONCTIONNEMENT](docs/FONCTIONNEMENT.md)

## Installation & exécution

Ce programme nécessite Node.js > 15.0.0 et npm > 6.0.0 pour être exécuté.
Aide pour [Installer '**nodejs**'](https://nodejs.org/fr/download/)

Ouvrez le dossier contenant le projet et vérifiez que le fichier **package.json** est présent puis, suivez les instructions ci-dessous :

### Installez les dépendances avec npm

```console
npm install
```

### Construisez le projet

```console
npm run build
```

**Un unique fichier JavaScript a été produit, il se trouve dans ./dist/bundle.cjs. Le programme peut être exécuté des façons suivantes :**

```console
node ./dist/cm.cjs
```

ou

```console
npm start
```

ou plus simplement

```console
node .
```

### Créer un exécutable (distribuable)

```console
npm make
```

**Trois binaires ont été créés dans le répertoire bin, un pour Windows, un pour macos et un pour Linux, ils peuvent être ensuite distribués aux utilisateurs finaux**

## Développement

### Installez les dépendances

```console
npm install
```

### Lancer le mode de développement

```console
npm run dev
```

### Exécutez pour tester vos modifications

```console
node .
```

## Tests unitaires

### Lancez les tests avec :

```console
npm run test
```

## Choix Technique

1.  **Commander** : aucune différence d'API avec Caporal, mis à jour régulièrement, communauté importante
2.  **Chalk** : expressive API (permet l'utilisation de couleurs)
3.  **Usage de Typescript (i18n.ts)** : permet d'améliorer l'expérience développeur avec de l'autocomplétion
4.  **pkg** : permet de créer un binaire
5.  **esbuild** : permet de minifier et de compiler le code dans un seul fichier
6.  **ics** : sérialiseur/déseraliseur au format iCalendar
7.  **vitest** : Utilisé pour les tests unitaires
8.  **ervy** : Permet d'afficher le taux d'occupation des salles sous forme de graphes (SPEC F05), bibliothèque de génération de graphiques

## Licence

Copyright (c) 2022-2023 Python<3

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
