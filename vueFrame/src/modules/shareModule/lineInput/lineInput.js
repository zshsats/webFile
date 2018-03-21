import Vue from 'vue'
let tpl= require('./lineInput.html');
require('./lineInput.less');
const lineInput= Vue.component('lineInput', {
    template:tpl,
    data(){
        return {

        }
    }
})

export default lineInput;