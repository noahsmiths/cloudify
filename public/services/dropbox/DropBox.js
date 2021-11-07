/*
0: Unhandled Error
1: Login Rejected
2: Error uploading
3: Error sharing
*/

class DropBox {
    constructor (tokenPath, credentialsPath) {
        this._tokenPath = tokenPath;
        //this._credentials = JSON.parse(fs.readFileSync(credentialsPath));
        this._credentials = credentialsPath;

        this._port = 8080;
    }

    login () {
        return new Promise(async (res, rej) => {
            try {
                let token = localStorage.getItem('dropbox_token');
                if (token) {
                    //let tokens = JSON.parse(fs.readFileSync(this._tokenPath));
                    tokens = JSON.parse(token);

                    let newTokenRequest = await request({
                        url: 'https://api.dropbox.com/oauth2/token',
                        method: 'POST',
                        form: {
                            client_id: this._credentials.client_id,
                            client_secret: this._credentials.client_secret,
                            grant_type: 'refresh_token',
                            refresh_token: tokens.refresh_token,
                        }
                    });

                    let newTokens = JSON.parse(newTokenRequest);

                    tokens.access_token = newTokens.access_token;
                    tokens.token_type = newTokens.token_type;
                    tokens.expires_in = newTokens.expires_in;

                    this.access_token = tokens.access_token;

                    localStorage.setItem('dropbox_token', JSON.stringify(tokens));

                    res(tokens.access_token);
                    //fs.writeFileSync(this._tokenPath, JSON.stringify(tokens));
                } else {
                    let app = express();
                    let server;

                    app.get('/', async (req, response) => {
                        response.send(`Logged in. Close this window.`);

                        if (req.query.code) {
                            let tokenRequest = await request({
                                url: 'https://api.dropboxapi.com/oauth2/token',
                                method: 'POST',
                                form: {
                                    client_id: this._credentials.client_id,
                                    redirect_uri: this._credentials.redirect_uri,
                                    client_secret: this._credentials.client_secret,
                                    code: req.query.code,
                                    grant_type: 'authorization_code',
                                }
                            });

                            let parsedTokens = JSON.parse(tokenRequest);
                            //console.log(parsedTokens);

                            this.access_token = parsedTokens.access_token;
                            
                            localStorage.setItem('dropbox_token', tokenRequest);
                            //fs.writeFileSync(this._tokenPath, tokenRequest);

                            res(parsedTokens.access_token);
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

                    open(`https://www.dropbox.com/oauth2/authorize?client_id=${this._credentials.client_id}&token_access_type=offline&response_type=code&redirect_uri=${this._credentials.redirect_uri}`);
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

    uploadAndGetLink (filePath) {
        return new Promise(async (res, rej) => {
            try {
                const dropbox = dropboxV2Api.authenticate({
                    token: this.access_token
                });

                //Upload File
                dropbox({
                    resource: 'files/upload',
                    parameters: {
                        path: `/${path.basename(filePath)}`
                    },
                    readStream: fs.createReadStream(filePath)
                }, (err, result, response) => {
                    if (err) {
                        rej({
                            errorCode: 2,
                            error: err
                        });
                    }

                    //Share File
                    dropbox({
                        resource: 'sharing/create_shared_link_with_settings',
                        parameters: {
                            path: result.path_display,
                            settings: {
                                audience: 'public',
                                access: 'viewer',
                                allow_download: true,
                            }
                        }
                    }, (err, result, response) => {
                        if (err) {
                            rej({
                                errorCode: 3,
                                error: err
                            });
                        }
                        res(result.url);
                    });
                    //console.log(result);
                    //console.log(response);
                });
            } catch (e) {
                rej({
                    errorCode: 0,
                    error: e
                });
            }
        });
    }
}

window.DropBox = DropBox;
