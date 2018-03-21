
const login = require('./controller/login.js');
global.pathRoot = __dirname;


module.exports = function (app) {
    var bodyParser = require('body-parser');

    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())
    app.use('*', function(req, res, next) {

        res.header('Access-Control-Allow-Origin', req.headers.origin);//注意这里不能使用 *
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("X-Powered-By",' 3.2.1');
        res.header('Access-Control-Allow-Credentials', true); // 允许服务器端发送Cookie数据
        res.header("Content-Type", "application/json;charset=utf-8");
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');//设置方法
        if (req.method == 'OPTIONS') {
            res.sendStatus(200); // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。

        }
        else {
            next();
        }

    });
    app.post('/login',login.checkLogin);


    return app;
}