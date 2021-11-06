const GoogleDrive = require("./GoogleDrive");
const { google } = require('googleapis');

/*
function listFiles(auth) {
    const drive = google.drive({version: 'v3', auth});
    drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length) {
        console.log('Files:');
        files.map((file) => {
            console.log(`${file.name} (${file.id})`);
        });
        } else {
        console.log('No files found.');
        }
    });
}

let googleDrive = new GoogleDrive("token.json", "credentials.json");

googleDrive.login()
    .then((auth) => {
        listFiles(auth);
    })
    .catch((e) => {
        console.log(e);
    });

    */

let googleDrive = new GoogleDrive("token.json", "credentials.json");

googleDrive.login()
    .then(() => {
        return googleDrive.uploadAndGetLink('notes.txt');
    })
    .then((link) => {
        console.log(link);
    })
    .catch((e) => {
        console.log(e);
    });
