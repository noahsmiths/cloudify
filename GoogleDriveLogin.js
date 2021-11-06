const fs = require('fs');
const { google } = require('googleapis');
const open = require('open');
const express = require('express');

/*
Error Codes:
0: Unhandled Error
1: Error reading credentials.json
2: Error getting token after OAuth login
3: Error writing to token.json file
*/

class GoogleDriveLogin {
    constructor (tokenPath, credentialsPath) {
        this._tokenPath = tokenPath;
        this._credentialsPath = credentialsPath;

        this._scopes = ['https://www.googleapis.com/auth/drive'];
        this._port = 8080;
    }

    login () {
        return new Promise((res, rej) => {
            try {
                fs.readFile(this._credentialsPath, (err, content) => {
                    if (err) {
                        rej({
                            errorCode: 1,
                            error: err,
                        });
                    }
                    // Authorize a client with credentials, then call the Google Drive API.
                    authorize(JSON.parse(content), res);
                });

                let authorize = (credentials, callback) => {
                    const { client_secret, client_id, redirect_uris } = credentials.installed;

                    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[1]);

                    // Check if we have previously stored a token.
                    fs.readFile(this._tokenPath, (err, token) => {
                        if (err) return getAccessToken(oAuth2Client, callback);
                        oAuth2Client.setCredentials(JSON.parse(token));
                        callback(oAuth2Client);
                    });
                }

                let getAccessToken = (oAuth2Client, callback) => {
                    const authUrl = oAuth2Client.generateAuthUrl({
                        access_type: 'offline',
                        scope: this._scopes,
                        //prompt: 'consent',
                    });

                    let app = express();
                    let server;

                    app.get('/', (req, res) => {
                        //console.log(req.query);
                        res.send(`Logged in. Close this window.`);
                        server.close();

                        oAuth2Client.getToken(req.query.code, (err, token) => {
                        if (err) {
                            rej({
                                errorCode: 2,
                                error: err,
                            });
                        }
                        oAuth2Client.setCredentials(token);
                        // Store the token to disk for later program executions

                        try {
                            fs.writeFileSync(this._tokenPath, JSON.stringify(token));
                        } catch (writeErr) {
                            rej({
                                errorCode: 3,
                                error: writeErr,
                            });
                        }

                        callback(oAuth2Client);
                        });
                    });

                    server = app.listen(this._port);

                    open(authUrl);
                }
            } catch (err) {
                rej({
                    errorCode: 0,
                    error: err
                });
            }
        });
    }
}

module.exports = GoogleDriveLogin;
