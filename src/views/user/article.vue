<template>
    <div class="wrapper-content article">
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
                                共&nbsp;<span>{{articleData.total}}</span>&nbsp;条
                                {{sumPage}}&nbsp;页&nbsp;
                                当前第&nbsp;{{articleData.page}}&nbsp;页&nbsp;&nbsp;
                                <a @click="goPage('index')" href="javascript:void(0);" class="prevnext delcolor">首页&nbsp;</a> 
                                <a @click="goPage('prev')" href="javascript:void(0);" class="prevnext delcolor">&nbsp;上一页&nbsp;</a> 
                                <a @click="goPage('next')" href="javascript:void(0);" class="prevnext delcolor">&nbsp;下一页&nbsp;</a>
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
            infoContent: '', // 内容
            active: '',
            showList: true, // 内容列表开关
            title: '',
            page: 1,
            page_size: 20,
        }
    },
    created() {
        this.title = this.getArticleQuery.title
        this.showList = this.getArticleQuery.showList
        this.active = this.getArticleQuery.active
        this.showArticleData(this.title)
        if(this.showList == false) {
            this.readArticles(this.getArticleQuery.id, this.getArticleQuery.title)
        }    
    },
    methods: {
        ...mapActions(['getReadArticles', 'getAboutUsList']),
        // 获取内容
        readArticles(id,title){
            this.getReadArticles({id:id, title:title}).then((res) => {
                if(res.code == 200) {
                    this.infoContent = res.data.content
                }
            })
        },
        // 点击左边列表
        handleClick(tab, event) {
            this.showList = true
            this.title = tab.label
            this.active = tab.index
            this.showArticleData(tab.label)
            this.$store.commit('ARTICLE_QUERY', {title: tab.label, active: tab.index, id: '', showList: true})
        },
        // 点击列表显示内容
        infoData(id, title) {
            this.showList = false
            this.readArticles(id, title)
            this.$store.commit('ARTICLE_QUERY', {title: title, active: this.active, id: id, showList: false})
        },
        // 根据 title 显示列表内容 
        showArticleData(target) {
            if(target == '网站公告') {
                this.articleData = this.getAnnouncement
            }else if(target == '股市行情') {
                this.articleData = this.getStockInfo
            }else {
                this.articleData = this.getEncyclopedias
            }
        },
        getAboutUsListFun(page, page_size, category_identification) {
            this.getAboutUsList({
                page: page,
                page_size: page_size,
                category_identification: category_identification
            })
        },
        goPage(target) {
            let category_identification;
            if(this.title == '网站公告') {
                category_identification = 'announcement'
            }else if(this.title == '股市行情') {
                category_identification = 'stock_market'
            }else {
                category_identification = 'encyclopedias'
            }
            switch(target) {
                case 'index' : 
                    if(this.page != 1) {
                        this.page = 1
                        this.getAboutUsListFun(this.page, this.page_size, category_identification);
                    }
                    break;
                case 'prev' : 
                    if(this.page > 1) {
                        this.page -- 
                        this.getAboutUsListFun(this.page, this.page_size, category_identification);
                    }
                    break;
                case 'next' : 
                    if(this.page < this.sumPage) {
                        this.page ++ 
                        this.getAboutUsListFun(this.page, this.page_size, category_identification);
                    }
                    break;
            }
        }
    },
    computed:{
        ...mapGetters(['getStockInfo', 'getEncyclopedias', 'getAnnouncement', 'getArticleQuery']),
        // 计算共多少页
        sumPage() {
            return Math.ceil(this.articleData.total / 20)
        }
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
<style lang="scss">
.article{
    .el-tabs__content {
        background-color: #fff ;
        min-height: 800px !important;
        padding:20px 40px ;
    }
}
</style>
