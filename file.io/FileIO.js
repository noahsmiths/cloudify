const request = require('request-promise-native');
const fs = require('fs');

/*
Error Codes:
0: Error uploading file
*/

class FileIO {
    constructor () {
        this._uploadURL = 'https://file.io/';
    }

    uploadAndGetLink (filePath) {
        return new Promise((res, rej) => {
            request({
                url: this._uploadURL,
                method: 'POST',
                formData: {
                    file: fs.createReadStream(filePath)
                },
            })
            .then((response) => {
                //console.log(r);
                response = JSON.parse(response);
                if (response.success) {
                    res(response.link);
                } else {
                    rej({
                        errorCode: 0,
                        error: response
                    });
                }
            })
            .catch((err) => {
                rej({
                    errorCode: 0,
                    error: err
                });
            });
        });
    }
}

module.exports = FileIO;
