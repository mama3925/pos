const prog = require('caporal');
const GIFTController = require("./gift/gift.controller");
const CollectionController = require("./collection/collection.controller");
const environment = require("./environment");
const vcard = require("./vcard/vcard");
const fs = require("fs");
const path = require("path");
const mylogger = require("./utils/logger");

const questionTypes = /^Description|Category|MC|Numerical|Short|Essay|TF|Matching$/;

const giftController = GIFTController.GIFTController(environment.pathToData);
const collectionController = CollectionController.CollectionController();

const loadQuestionBank = () => {
	const filenames = fs.readdirSync(path.join(__dirname, "../data"));
	let collection = collectionController.create();
	for (const f of filenames) {
		collection = collectionController.merge(collection, giftController.readFile(f))
	}
	return collection;
}

const setQuestionsId = (c) => {
	for(let i=0; i<c.length; i++) {
		c[i].id = i;
	}

	return c;
}

const login = () => {

}

var isLoggedIn = true;
var collection = loadQuestionBank();
collection = setQuestionsId(collection);

prog
    .version('1.0.0')
    .description('A simple program that says "biiiip"')
    .command('fd', 'Rechercher une question')
	.argument('<type>', 'type de question', questionTypes)
	.argument('[keyword...]', 'mot-clés à recherché')
	.action((args, _options, _logger) => {
		if (!isLoggedIn) {
			isLoggedIn = login();
		}
		let matchingQuestions = collectionController.find(collection, args.type, args.keyword);
		matchingQuestions.length > 1 ? collectionController.print(matchingQuestions) : console.log("Aucune question trouvée")
	})

	.command('cct', 'Créer un fichier de contact')
	.action((_args, _options, _logger) => {
		if (!isLoggedIn) {
			isLoggedIn = login();
		}
		vcard.createContact();
	})

	.command('ds', "Affiche toutes les questions présentes dans la banque de questions")
	.action((_args, _options, _logger) => {
		if (!isLoggedIn) {
			isLoggedIn = login();
		}
		collectionController.print(collection);
	})
	
	.command("ce", "Créer un examen à partir des questions présentes dans la banque de questions")
	.argument("<title>", "titre de l'examen")
	.argument("<question-id...>", "Identifiants des questions à ajoutés")
	.action((args, _options, _logger) => {
		if (!isLoggedIn) {
			isLoggedIn = login();
		}
		let ids = args.questionId.map(id => parseInt(id));
		let exam = collectionController.getById(collection, ids);
		if (collectionController.isLengthValid(exam)) {
			console.log("Examen généré:");
			console.log("-".repeat(process.stdout.columns));
			collectionController.print(exam);
			collectionController.saveExam(exam, args.title);
		} else {
			mylogger.logError("L'examen doit contenir 15 à 20 questions");
		}
	})

	.command("de", "Affiche un examen déjà sauvegardé")
	.argument("<title>", "titre de l'examen")
	.action((args, _options, _logger) => {
		if (!isLoggedIn) {
			isLoggedIn = login();
		}
		let exam = collectionController.getFromFile(args.title);
		if (exam) {
			collectionController.print(exam);
		}
	})

prog.parse(process.argv);