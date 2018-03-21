import Vue from 'vue'
let tpl= require('./startMain.html');
require('./startMain.less');
import menuList from '../menuList/menuList.js';
const startMain= Vue.component('startMain', {
    template:tpl,
    components:{
        "menu-data":menuList
    },
    data () {
        return {
            isCollapsed: false,
            menuList: [
                {
                    id: '1-1',
                    path: 'home',
                    name: '首页',
                    isOpen:false,
                    isChildren:false,
                    children: []
                },
                {
                    id: '2',
                    path: 'zl',
                    name: '组件库',
                    isOpen:false,
                    isChildren:true,
                    children: [
                        {
                            id: '2-1',
                            path: 'tab',
                            name: '选项卡',
                        },
                        {
                            id: '2-2',
                            path: 'table',
                            name: '表格',

                        }
                    ]
                },
                {
                    id: '3',
                    path: 'zl',
                    name: '朋友圈',
                    isOpen:false,
                    isChildren:true,
                    children: [
                        {
                            id: '3-1',
                            path: 'life',
                            name: '好友动态',
                        },
                        {
                            id: '3-2',
                            path: 'friend',
                            name: '我的好友',
                            children: []
                        }
                    ]
                },
                {
                    id: '4',
                    path: 'zl',
                    name: '个人中心',
                    isOpen:false,
                    isChildren:true,
                    children: [
                        {
                            id: '4-1',
                            path: 'aticle',
                            name: '文章发布',
                        },
                        {
                            id: '4-2',
                            path: 'set',
                            name: '设置中心'
                        }
                    ]
                }
            ],
            firstRout:'首页',
            lastRout:"",
        }
    },
    computed: {
        menuitemClasses: function () {
            return [
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        }
    },
    methods: {
        goState:function (name) {
            var that = this;
            this.menuLists.forEach(function (item) {
                if(name===item.path){
                    that.firstRout =item.name;
                }else {
                    item.children.forEach(function (unit) {
                        if(name===unit.path){
                            that.lastRout=unit.name;
                        }
                    })
                }
            })
            this.$router.push(name)

        },
        goStateOne(index){
            this.menuList.forEach(function (item,i) {
                if(i===index){
                    item.isOpen=!item.isOpen;
                }else{
                    item.isOpen = false;
                }
            });

            if(this.menuList[index].children.length===0){
                this.$router.push(this.menuList[index].path);
                this.firstRout =this.menuList[index].name;
                this.lastRout="";
            }
        },
        goStateTwo(index,num){
            this.$router.push(this.menuList[index].children[num].path);
            this.firstRout =this.menuList[index].name;
            this.lastRout=this.menuList[index].children[num].name;
        }
    }
})

export default startMain;