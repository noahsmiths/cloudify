const fs = require('fs');
const { google } = require('googleapis');
const open = require('open');
const express = require('express');
const mime = require('mime-types');
const path = require('path');

/*
Error Codes:
0: Unhandled Error
1: Error reading credentials.json
2: Error getting token after OAuth login
3: Error writing to token.json file
4: Error uploading and sharing
*/

class GoogleDriveUploader {
    constructor(tokens, credentials) {
        this._tokens = tokens;
        this._credentials = credentials;
    }
    login () {
        return new Promise((res, rej) => {
            const { client_secret, client_id } = this._credentials.installed;
            this.oAuth2Client = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:8080');
            this.oAuth2Client.setCredentials(this._tokens);
            res();
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

module.exports = GoogleDriveUploader;
