const http = require('http');
const express = require('express');
var cookieParser = require('cookie-parser');
const app = express();
const hostname = 'localhost';
const port = 1101;
const formidable=require("formidable");
const form=formidable.IncomingForm();

var bodyParser = require('body-parser');
var cors=require('cors');
app.use(cors({
    origin: 'http://localhost:1008',
    credentials: true
}))

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
const appUrl = require('./router.js')(app);
app.use('/photos',express.static(__dirname + '/photos'));
console.log(__dirname);
const server = http.createServer(appUrl);


server.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`);
});



