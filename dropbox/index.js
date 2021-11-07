const DropBox = require('./DropBox');

let dropBox = new DropBox('token.json', 'credentials.json');
dropBox.login().
    then((t) => {
        //console.log(t);
        return dropBox.uploadAndGetLink('Notes.txt');
    })
    .then(link => console.log(link))
    .catch(e => {
        console.log(e);
    });
