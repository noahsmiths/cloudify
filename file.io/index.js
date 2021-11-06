const FileIO = require('./FileIO');

let fileIO = new FileIO();

fileIO.uploadFile('./test.txt').then((r) => console.log(r)).catch(e => console.log(e));
