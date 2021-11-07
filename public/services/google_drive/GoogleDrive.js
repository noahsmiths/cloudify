/*
Error Codes:
0: Unhandled Error
1: Error reading credentials.json
2: Error getting token after OAuth login
3: Error writing to token.json file
4: Error uploading and sharing
*/

class GoogleDrive {
    constructor (tokenPath, credentialsPath) {
        this._tokenPath = tokenPath;
        this._credentialsPath = credentialsPath;

        this._scopes = ['https://www.googleapis.com/auth/drive'];
        this._port = 8080;
    }

    login () {
        return new Promise((res, rej) => {
            try {
                let authorize = (credentials, callback) => {
                    const { client_secret, client_id, redirect_uris } = credentials.installed;

                    this.oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[1]);

                    // Check if we have previously stored a token.
                    let token = localStorage.getItem('google_drive_token');
                    if (token) {
                        token = JSON.parse(token);
                        this.oAuth2Client.setCredentials(token);
                        callback(this.oAuth2Client);
                    } else {
                        getAccessToken(callback);
                    }
                    /*
                    fs.readFile(this._tokenPath, (err, token) => {
                        if (err) return getAccessToken(callback);
                        this.oAuth2Client.setCredentials(JSON.parse(token));
                        callback(this.oAuth2Client);
                    });
                    */
                }

                let getAccessToken = (callback) => {
                    const authUrl = this.oAuth2Client.generateAuthUrl({
                        access_type: 'offline',
                        scope: this._scopes,
                        //prompt: 'consent',
                    });

                    let app = express();
                    let server;

                    app.get('/', (request, response) => {
                        //console.log(req.query);
                        response.send(`Logged in. Close this window.`);

                        this.oAuth2Client.getToken(request.query.code, (err, token) => {
                            if (err) {
                                rej({
                                    errorCode: 2,
                                    error: err,
                                });
                            }
                            this.oAuth2Client.setCredentials(token);
                            // Store the token to disk for later program executions

                            try {
                                //fs.writeFileSync(this._tokenPath, JSON.stringify(token));
                                localStorage.setItem('google_drive_token', JSON.stringify(token));
                            } catch (writeErr) {
                                rej({
                                    errorCode: 3,
                                    error: writeErr,
                                });
                            }

                            //this._auth = this.oAuth2Client;
                            callback(this.oAuth2Client);
                        });

                        server.close();
                    });

                    server = app.listen(this._port);

                    open(authUrl);
                }

                authorize(this._credentialsPath, res);
            } catch (err) {
                rej({
                    errorCode: 0,
                    error: err
                });
            }
        });
    }

    uploadAndGetLink (filePath) {
        return new Promise(async (res, rej) => {
            try {
                const drive = google.drive({
                    version: 'v3',
                    auth: this.oAuth2Client
                });

                const fileMimeType = mime.lookup(filePath);
                const fileName = path.basename(filePath);

                const fileUpload = await drive.files.create({
                    requestBody: {
                        name: fileName,
                        mimeType: fileMimeType,
                    },
                    media: {
                        mimeType: fileMimeType,
                        body: fs.createReadStream(filePath),
                    }
                });

                let uploadedFileId = fileUpload.data.id;

                const fileShare = await drive.permissions.create({
                    fileId: uploadedFileId,
                    requestBody: {
                        type: 'anyone',
                        role: 'reader',
                    },
                });

                if (fileShare.status === 200) {
                    res(`https://drive.google.com/file/d/${uploadedFileId}/view?usp=sharing`);
                    //console.log(`https://drive.google.com/file/d/${uploadedFileId}/view?usp=sharing`);
                } else {
                    rej({
                        errorCode: 4,
                        error: fileShare,
                    });
                }

                //console.log(fileShare);
                //res(response);
                //console.log(response);
            } catch (err) {
                rej({
                    errorCode: 4,
                    error: err
                });
            }
        });
    }
}

window.GoogleDrive = GoogleDrive;
