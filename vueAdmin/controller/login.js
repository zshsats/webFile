var db=require('../sqlConfig.js');
var jwt = require("jsonwebtoken");
checkLogin=function (req, res, next) {

    var connect = db.connection();
    var param = req.body;
    console.log(param)
    var sql="SELECT id,name,password FROM user WHERE ?";
    db.search(connect,"SELECT id,name,password FROM user WHERE name=? AND password=?",[param.name,param.password],function (data) {
        console.log(req.cookies)
        if(data[0]){
            var timestamp = new Date().getTime()+1000*60*60*24*3;
            var token = jwt.sign({
                name: 'test'
            }, ''+data[0].id, {
                expiresIn:timestamp
            });
            res.cookie("isLogin", "1", {maxAge: 600000 , httpOnly: false});
            res.end(JSON.stringify({
                state:1,
                data:{
                    data:data[0],
                    token:token
                }
            }));
        }else{

            res.end(JSON.stringify({
                state:0,
                data:{
                    message:"请检查您的用户名和密码"
                }
            }));
        }

    });

}
module.exports = {
    checkLogin:checkLogin
};