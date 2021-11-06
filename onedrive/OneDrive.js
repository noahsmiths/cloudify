const request = require('request-promise-native');
const express = require('express');
const fs = require('fs');
const open = require('open');
const oneDriveAPI = require('onedrive-api');
const path = require('path');

/*
0: Unhandled Error
1: Login Rejected
2: Error uploading
3: Error sharing
*/

class OneDrive {
    constructor (tokenPath, credentialsPath) {
        this._tokenPath = tokenPath;
        this._credentials = JSON.parse(fs.readFileSync(credentialsPath));

        //this._scopes = ['https://www.googleapis.com/auth/drive'];
        this._port = 8080;
        this._scopes = 'files.readwrite offline_access';
    }

    login () {
        return new Promise(async (res, rej) => {
            try {
                if (fs.existsSync(this._tokenPath)) {
                    let tokens = JSON.parse(fs.readFileSync(this._tokenPath));

                    let newTokenRequest = await request({
                        url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
                        method: 'POST',
                        form: {
                            client_id: this._credentials.client_id,
                            redirect_uri: this._credentials.redirect_uri,
                            //client_secret: this._credentials.client_secret,
                            //code: request.query.code,
                            grant_type: 'refresh_token',
                            refresh_token: tokens.refresh_token
                        }
                    });

                    let newTokens = JSON.parse(newTokenRequest);

                    this.access_token = newTokens.access_token;
                    res(newTokens.access_token);

                    fs.writeFileSync(this._tokenPath, newTokenRequest);
                } else {
                    let app = express();
                    let server;

                    app.get('/', async (req, response) => {
                        response.send(`Logged in. Close this window.`);

                        if (req.query.code) {
                            //console.log(request.query.code);
                            let tokenRequest = await request({
                                url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
                                method: 'POST',
                                form: {
                                    client_id: this._credentials.client_id,
                                    redirect_uri: this._credentials.redirect_uri,
                                    //client_secret: this._credentials.client_secret,
                                    code: req.query.code,
                                    grant_type: 'authorization_code'
                                }
                            });

                            let parsedTokens = JSON.parse(tokenRequest);
                            //console.log(parsedTokens);

                            this.access_token = parsedTokens.access_token;
                            res(parsedTokens.access_token);

                            fs.writeFileSync(this._tokenPath, tokenRequest);
                        } else { //Handle login error here
                            //console.log('login denied');
                            rej({
                                errorCode: 1,
                                error: "Login Denied"
                            });
                        }

                        server.close();
                    });

                    server = app.listen(this._port);

                    open(`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${this._credentials.client_id}&scope=${encodeURIComponent(this._scopes)}&response_type=code&redirect_uri=${this._credentials.redirect_uri}`);
                }

                //this._access_token = access_token;
                //res(access_token);

                /*
                fs.readFile(this._tokenPath, (err, token) => {

                });
                */
            } catch (err) {
                rej({
                    errorCode: 0,
                    error: err
                })
            }
        });
    }

    uploadAndGetLink (filePath, callback) {
        return new Promise(async (res, rej) => {
            let fileSize = fs.statSync(filePath).size;

            //console.log(this.access_token);

            oneDriveAPI.items.uploadSession({
                accessToken: this.access_token,
                filename: path.basename(filePath),
                fileSize: fileSize,
                readableStream: fs.createReadStream(filePath)
            }, (progress) => {
                if (callback) {
                    callback(progress / fileSize);
                }
            })
            .then((item) => {
                //console.log(item);
                return request({
                    url: `https://graph.microsoft.com/v1.0/me/drive/items/${item.id}/createLink`,
                    method: 'POST',
                    json: true,
                    headers: {
                        'Authorization': `bearer ${this.access_token}`
                    },
                    body: {
                        'type': 'view',
                        'scope': 'anonymous',
                    }
                });
            })
            .then((share) => {
                if (share.link.webUrl) {
                    res(share.link.webUrl);
                } else {
                    rej({
                        errorCode: 3,
                        error: share
                    })
                }
            })
            .catch((err) => {
                rej({
                    errorCode: 2,
                    error: err
                });
            });
        });
    }
}

module.exports = OneDrive;
