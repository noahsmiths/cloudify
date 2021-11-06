const Streamja = require('./Streamja');

let streamja = new Streamja();

streamja.uploadFile('./test.mp4').then((r) => console.log(r)).catch(e => console.log(e));
