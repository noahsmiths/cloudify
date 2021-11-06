const OneDrive = require('./OneDrive');

let oneDrive = new OneDrive('token.json', 'credentials.json');
oneDrive.login().
    then(() => {
        return oneDrive.uploadAndGetLink('notes.txt');
    })
    .then(link => console.log(link))
    .catch(e => {
        console.log(e);
    });
