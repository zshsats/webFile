const mysql = require('mysql');
let db = {};
db.connection = function () {
    let connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '1101',
        port: '3306',
        database: 'shared',
    });
    //数据库连接
    connection.connect(function(err){
        if(err){
            console.log(err);
            return;
        }
    });
    return connection;
}
//关闭数据库
db.close = function(connection){
    //关闭连接
    connection.end(function(err){
        if(err){
            return;
        }else{
            console.log('关闭连接');
        }
    });
}
db.search=function (connection,sql,param,callback) {
    connection.query(sql,param,function(err,data){
        if(err){
            console.log('查询数据失败')
        } else {
          callback(data)
        }
    })
}
exports = module.exports = db;