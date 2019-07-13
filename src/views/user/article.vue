<template>
    <div class="wrapper-content">
        <div class="header">&nbsp;&nbsp;&nbsp;首页 &gt; {{title}}</div>
        <el-tabs tab-position="left"  @tab-click="handleClick" :value="active">
            <el-tab-pane v-for="(item,index) in aboutData" :key="index" :label="item.label">
                <Title :infoTitle="item.label"/>
                <div class="article" v-if="showList">
                    <ul >
                        <li class="changecolor" v-for="(item,index) in articleData.rows" :key="index">
                            <a @click="infoData(item.id, item.title)" href="javascript:void(0);" class="changecolor-a" :title="item.title">{{item.title}}</a>
                            <span class="release-time">{{(item.create_time).split(" ")[0]}}</span>
                        </li>
                    </ul>
                    <div class="list_bottom">
                        <div class="list_bottom_right">
                            <ul>
                                共<span>{{articleData.total}}</span> 条{{articleData.page}} 页&nbsp;当前第&nbsp;1&nbsp;页&nbsp;&nbsp; <a href="#" class="prevnext delcolor">首页</a> <a href="javascript:void(0);" class="prevnext delcolor">上一页</a> <a href="javascript:void(0);" class="prevnext delcolor">下一页</a>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="content" v-else v-html="infoContent"></div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Title from '@/components/about/Title'
import { mapGetters, mapActions } from "vuex";

export default {
    name:'about',
    components:{ Title },
    data() {
        return {
            aboutData:[
                {label:'网站公告', name: 'announcement'},
                {label:'股市行情', name: 'stock_market'},
                {label:'配资百科', name: 'encyclopedias'}
            ],
            articleData: [], // 列表
            showList: true, // 内容列表开关
            infoContent: '', // 内容
            title: this.$route.query.title,
            active: this.$route.query.active || 0,
        }
    },
    created() {
        this.showArticleData(this.title)
        if(this.$route.query.showList != undefined) {
            let id = this.$route.query.id
            this.showList = false
            this.getReadArticles({id: id, title: this.title}).then((res) => {
                if(res.code == 200) {
                    this.infoContent = res.data.content
                }
            })
        }
        // console.log(this.showList)
        // console.log(this.$route.query.showList)
    },
    methods: {
        ...mapActions(['getReadArticles']),
        handleClick(tab, event) {
            this.showList = true
            this.title = tab.label
            this.showArticleData(tab.label)
        },
        // 点击列表显示内容
        infoData(id, title) {
            this.showList = false
            this.getReadArticles({id: id, title: title}).then((res) => {
                if(res.code == 200) {
                    this.infoContent = res.data.content
                }
            })
        },
        showArticleData(target) {
            if(target == '网站公告') {
                this.articleData = this.getAnnouncement
            }else if(target == '股市行情') {
                this.articleData = this.getStockInfo
            }else {
                this.articleData = this.getEncyclopedias
            }
        }
    },
    computed:{
        ...mapGetters(['getStockInfo', 'getEncyclopedias', 'getAnnouncement']),
    } 
}
</script>

<style lang="scss" scope>
    .article{
        padding: 10px;
    }
    .tabs {
        min-height: 800px;
        background-color: #fff !important;
        margin-right: 0 !important;
    }
    .header {
        height: 50px;
        font-size: 16px;
    }
    .el-tabs--left {
        border: 1px solid #eae5e5;
    }
    .el-tabs__active-bar {
            right: auto!important;
            left: 0 !important;
    }
    .el-tabs--left .el-tabs__header.is-left {
        float: left;
        margin-bottom: 0;
        margin-right: 0 !important;
    }
    .is-active {
        background-color: #fff !important;
        color:  #000!important;
    }

    .el-tabs__active-bar {
        background-color:#b31d23 !important;
    }
    .el-tabs__content {
        background-color: #fff !important;
        min-height: 800px!important;
        padding:20px 40px ;
    }
    .el-tabs__nav-wrap::after {
        position: relative;
    }
    .el-tabs__item:hover{
       background-color:#b31d23 !important;
       color: #fff!important;
    }
    .changecolor {
        background: rgb(255, 255, 255);
        color: rgb(115, 114, 114);
        height: 37px;
        line-height: 37px;
        border-bottom: 1px dotted #d1d1d1;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .changecolor:hover{
        background: rgb(248,248,248)
    }
    .changecolor-a{
        color: #333;font: 14px/28px "SimSun";
    }
    .release-time{
        color: #ccc;
    }
    .list_bottom {
        margin-top: 20px;
    }
</style>
