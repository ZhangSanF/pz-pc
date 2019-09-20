<template>
    <div class="main_kan_new">
        <div class="title-sub">
            <h2>{{curTitle}}</h2>
            <b class="line"></b>
        </div>
        <div class="content_post">
            <div class="sidesub">
                <div class="static_nav">
                    <div class="reg_btn">
                        <a href="javascript:void(0);">帮助中心</a>
                    </div>
                    <ul>
                        <li v-for="(item, index) in getHelpCenter.rows" :key="index">
                            <a href="javascript:void(0);" @click="handleClick(item.title, item.id)">
                                <img src="../../assets/image/diao.jpg" alt="">
                                {{item.title}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mainsub">
                <div class="herp1" v-html="dataItem">
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions ,mapGetters } from "vuex";

export default {
    data() {
        return {
            dataItem: '',
            curTitle: ''
        }
    },
    created() {  
        if(this.getBangzhuQuery.title != '') {
            this.curTitle = this.getBangzhuQuery.title
            this.getReadArticles({id: this.getBangzhuQuery.id, title: this.curTitle}).then((res) => {
                if(res.code == 200) {
                    this.dataItem = res.data.content
                }
            })
        }     
        // if(Object.keys(this.getHelpCenter).length !== 0) {
        //     this.curTitle = this.getHelpCenter.rows[0].title
        //     this.getReadArticles({id: '', title: this.curTitle}).then((res) => {
        //         if(res.code == 200) {
        //             this.dataItem = res.data.content
        //         }
        //     })
        // }       
    },
    methods: {
        ...mapActions(['getReadArticles']),
        handleClick(title, id) {
            this.curTitle = title
            this.$store.commit('BANGZHU_QUERY', {id: id, title: title})
            // this.curTitle = title
            // this.getReadArticles({id: id, title: title}).then((res) => {
            //     if(res.code == 200) {
            //         this.dataItem = res.data.content
            //     }
            // }) 
        }
    },
    computed: {
        ...mapGetters(['getHelpCenter', 'getBangzhuQuery'])
    },
    watch: {
        // 'getHelpCenter': {
        //     handler() {
        //         this.curTitle = this.getHelpCenter.rows[0].title
        //         this.getReadArticles({id: '', title: this.curTitle}).then((res) => {
        //             if(res.code == 200) {
        //                 this.dataItem = res.data.content
        //             }
        //         })                             
        //     },
        //     deep: true
        // }

        'getBangzhuQuery':{
            handler() {
                this.curTitle = this.getBangzhuQuery.title
                this.getReadArticles({id: this.getBangzhuQuery.id, title: this.curTitle}).then((res) => {
                    if(res.code == 200) {
                        this.dataItem = res.data.content
                    }
                }) 
            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.main_kan_new{
    margin: 0px auto;min-height: 500px;width: 978px;margin-top: 5px;background: #fff;margin-bottom: 20px;overflow: hidden;
    .title-sub{
        border-bottom: #e7ecee 1px solid;position: relative;margin: 0px 30px;height: 40px;
        h2{
            z-index: 3;position: absolute;padding: 0 15px;height: 30px;line-height: 30px;background: #fff;
            color: #69737b;font-size: 16px;top: 24px;left: 20px;
        }
        .line{
            position: absolute;line-height: 0;width: 100%;display: none;background: #e7ecee;float: left;height: 1px;font-size: 0px;
            overflow: hidden;top:35px;left: 0; 
        }
    }
    .content_post{
        position: relative;width: 100%;float: left;overflow: hidden;
        .sidesub{
            border-left: #e8ecef 1px solid;width: 250px;padding: 30px 30px 0;float: right;margin-right: 30px;min-height: 500px;
            .static_nav{
                position: relative;width: 208px;padding: 20px 0 30px;
                .reg_btn{
                    margin-bottom: 20px;
                    a{
                        text-align: center;display: block;color: #fff;font-size: 14px;font-weight: bold;border-radius: 5px;padding: 15px 70px;
                        background: #335c7d;
                    }
                }
                li{
                    font-size: 14px;
                    a{
                        height: 36px;line-height: 36px;color: #224e73;text-align: center;width: 208px;border-bottom: #f0f5f7 1px solid;
                        display: block;
                    }
                    a:hover{
                        color: #349cd8;
                    }
                }
            }
        }
        .mainsub{
            margin: 0px 340px 0px 30px;padding-top: 30px;
            .herp1{
                width: 570px;
            }
        }
    }
}
</style>
