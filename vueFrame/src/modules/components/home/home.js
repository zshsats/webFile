import Vue from 'vue'
let tpl= require('./home.html');
require('./home.less');
const Home= Vue.component('Home', {
    template:tpl,
    data(){
       return {
           detail: false
       }
    }
})

export default Home;