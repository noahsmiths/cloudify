const fs = require('fs');
const { google } = require('googleapis');
const open = require('open');
const express = require('express');
const mime = require('mime-types');
const path = require('path');
const oneDriveAPI = require('onedrive-api');
const request = require('request-promise-native');
const dropboxV2Api = require('dropbox-v2-api');
window.ipcRenderer = require('electron').ipcRenderer;
window.ElectronClipboard = require('electron').clipboard;