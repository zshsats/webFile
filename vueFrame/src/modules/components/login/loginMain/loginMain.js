import Vue from 'vue'
let tpl= require('./loginMain.html');
require('./loginMain.less');
import loginFun from '../service/loginFun.js';
import fun from '../../../../service/common.js';

let randCheckNum = null;
let tagValid = null;
const loginMain= Vue.component('loginMain', {
    template:tpl,
    directives: {
       checkInit:{
           bind:function(el){
               tagValid = el;
               loginFun.valideChange(el,240,45,function (checkNum) {
                   randCheckNum = checkNum;

               });
           }
       }
    },
    data () {
        return {
            loginData:{
                name:"",
                password:"",
                checkNum:""
            },
            randCheckNum:"",
            tagValid:null,
            checked:false,
            ruleLogin: {
                name: [
                    {
                        required: true, message: '用户名是必填项'
                    }
                ],
                password: [
                    {required: true, message: '密码或账号错误'}
                ]
            }
        }
    },
    created(){
        this.checkInit();
    },

    methods:{
        loginSubmit(name){
            let that = this;
            this.rememberPassword(this.checked);
            if(that.loginData.checkNum === randCheckNum){
                that.$refs[name].validate((valid) => {
                    if (valid) {
                        that.post('/login',{name:that.loginData.name,password:that.loginData.password}).then(function (data) {
                           if(data.state===1){
                               localStorage.setItem("token",data.data.token);
                               that.$router.push("/zl");
                           }else {
                               that.$Modal.error({
                                   title: "错误提示",
                                   content: data.data.message
                               });
                               loginFun.valideChange(tagValid,240,45,function (checkNum) {
                                   randCheckNum = checkNum;
                               });


                           }
                        });

                    } else {
                        that.$Message.error('请您检查你的账号和密码!');
                    }
                })
            }else{
                this.$Message.error('请您重新验证您的验证码!');
            }
        },
        checkValide(ev){
            let tag =ev.currentTarget;
            let that = this;
            loginFun.valideChange(tag,240,45,function (checkNum) {
                randCheckNum = checkNum;
            });
        },
        rememberPassword(val){
            if(val){
                localStorage.setItem("username",this.loginData.name );
                localStorage.setItem("password",this.loginData.password );
                localStorage.setItem("checked",val );

            }else{
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                localStorage.removeItem("checked");
            }
        },
        checkInit(){
            if(fun.strBool(localStorage.getItem("checked"))){
                this.checked = true;
                this.loginData.name =  localStorage.getItem("username");
                this.loginData.password =  localStorage.getItem("password");
            }else{
                this.checked = false;
                this.loginData.name = "";
                this.loginData.password=""
            }
        }
    }

})

export default loginMain;