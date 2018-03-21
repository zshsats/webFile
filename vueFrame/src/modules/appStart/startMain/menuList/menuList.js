import Vue from 'vue'
let tpl= require('./menuList.html');
require('./menuList.less');
import  Velocity from 'velocity-animate';
import fun from "../../../../service/common.js";
const menuList= Vue.component('menuList', {
    template:tpl,
    props:['menuData'],

    created:function () {

    },

    methods:{
        beforeEnter(el) {
            el.style.height = 0;
            el.style.overflow="hidden";
        },
        enter(el,done){
            let height = el.scrollHeight + "px";
            Velocity(el, {transition:'height 0.5s ease-out',height:height}, { duration:500 },{ complete: done });
        },
        beforeLeave(el){

        },
        leave(el,done){
            Velocity(el, {transition:'height 0.5s ease-out',height:0}, { duration: 500 },{ complete: done });

        },
        goRoute(ev){
            var ev = ev || window.event;
            var target = ev.target || ev.srcElement;
            let nodeEvent=null;
            nodeEvent=this.getNode(target,50);
            let index,num=null;
            if(fun.IEVersion()<11){
                index = nodeEvent.getAttribute('data-index');
            }else{
                index = nodeEvent.dataset.index;
            }
            if(fun.IEVersion()<11){
                num = nodeEvent.getAttribute('data-num');
            }else{
                num = nodeEvent.dataset.num;
            }
            if(undefined !== num && parseInt(num)>=0){
                this.goStateTwo(index,num);
            }else{
                this.goStateOne(index);
            }
        },
        getNode(target,i){
            let getNode=target;
            for(var j=0;j<i;j++){
                getNode=getNode["parentNode"];
                if(getNode.nodeName.toLowerCase()==="ul"){
                    break;
                }
                if(getNode.nodeName.toLowerCase()==="li"){
                  return getNode;
                }
            }
            return getNode;
        },
        goStateOne(index){
           this.$emit('go-state-one',parseInt(index));
        },
        goStateTwo(index,num){
            this.$emit('go-state-two',parseInt(index),parseInt(num));
        }


    }
})

export default menuList;