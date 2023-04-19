var fs = require('fs');
let vCardsJS = require('vcards-js');
const readline = require('readline');
var path = require("path");

const generate = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//User enters information for the vCard generation
const query = (vCard) => {
    generate.question('Nom? ', function (lname) {
        if (lname == lname.match(/[a-zA-Z ]*/)) {
            vCard.lastName = lname;
        }
        generate.question('Prenom? ', function (fname){
            if (fname == fname.match(/[a-zA-Z ]*/)) {
                vCard.firstName = fname;
            }
            generate.question('Titre? ', function(title){
                if (title.match(/[a-zA-Z0-9 ]*/)) {
                    vCard.title = title;
                }
                generate.question('Numero? ', function(num){
                    if (num.match(/[0-9]{10}/)) {
                        vCard.cellPhone = num;
                    }
                    const fn_mail = vCard.firstName.replaceAll(' ','').toLowerCase();
                    const ln_mail = vCard.lastName.replaceAll(' ','').toLowerCase();
                    const fullname = fn_mail.concat(ln_mail);
                    const mail = fullname+"@email.fr";
                    vCard.email = mail;
                    // Save contact to VCF file
                    vCard.saveToFile(path.join(__dirname, `./vcard-storage/${fullname}.vcf`));
                    generate.close();
                    //Print VCard info to console
                    fs.readFile(path.join(__dirname, `./vcard-storage/${fullname}.vcf`),'utf8', function(err,data) {
                        if (err) {
                            return err;
                        } else {
                            console.log(data);
                        }
                    });
                });
            });
        });
    });
} 

const createContact = () => {
    let vCard = vCardsJS();
    query(vCard);
}

module.exports = {
    createContact
};