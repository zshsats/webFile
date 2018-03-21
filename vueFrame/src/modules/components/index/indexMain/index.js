import Vue from 'vue'
let tpl= require('./index.html');
import articleList from '../articleList/articleList.js';

const Index= Vue.component('Index', {
    template:tpl,
    components: {
        'article-list': articleList
    },
})

export default Index;