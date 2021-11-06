const request = require('request-promise-native');
const fs = require('fs');

/*
Error Codes:
0: Error uploading file
*/

class Streamja {
    constructor () {
        this._baseURL = 'https://streamja.com';
    }

    uploadAndGetLink (filePath) {
        return new Promise((res, rej) => {
            let jar = request.jar();
            request({
                url: `${this._baseURL}/shortId.php`,
                method: 'POST',
                form: {
                    new: 1
                },
                jar: jar,
            })
            .then((response) => {
                response = JSON.parse(response);
                if (response.status === 1) {
                    return request({
                        url: `${this._baseURL}${response.uploadUrl}`,
                        method: 'POST',
                        formData: {
                            'file': fs.createReadStream(filePath)
                        },
                        jar: jar,
                    });
                } else {
                    rej({
                        errorCode: 0,
                        error: response
                    });
                }
            })
            .then((response) => {
                response = JSON.parse(response);
                if (response.status === 1) {
                    res(`${this._baseURL}/${response.shortId}`);
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

module.exports = Streamja;
