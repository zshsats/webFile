import Vue from 'vue'
let tpl= require('./tableMain.html');
require('./tableMain.less');
import simpleTable from '../simpleTable/simpleTable.js';
import pagTable from '../pagTable/pagTable.js';
const tableMain= Vue.component('tableMain', {
    template:tpl,
    components: {
        'simple-table': simpleTable,
        'pag-table':pagTable
    },
    data () {
        return {

        };
    },
    computed: {

    }
})

export default tableMain;