<template>
    <div class="wrapper-content about">
        <el-tabs tab-position="left" @tab-click="handleClick" :value="active">
            <el-tab-pane v-for="(item, index) in getAboutUs.rows"  :key="index"  :label="item.title">
                <Title :infoTitle="item.title"/>
                <div class="html-content" v-html="curAboutData"></div>
                <div class="to-index">
                    <router-link to="/" tag="a">返回首页>></router-link>
                </div>
            </el-tab-pane>
        </el-tabs>        
    </div>
</template>

<script>
import { mapActions ,mapGetters } from "vuex";
import Title from '@/components/about/Title'

export default {
    name:'about',
    components:{ Title },
    data() {
        return {
            curAboutData: '',
            active: '',
        }
    },
    created() {
        if(this.getAboutQuery.title != '') {
            this.readArticles(this.getAboutQuery.id, this.getAboutQuery.title)
        }
        this.active = this.getAboutQuery.active       
    },
    methods: {
        ...mapActions(['getReadArticles']),      
        handleClick(tab, event) {
            this.$store.commit('ABOUT_QUERY', {id: '', title: tab.label, active: tab.index})
        },
        readArticles(id,title){
            this.getReadArticles({id:id, title:title}).then((res) => {
                if(res.code == 200) {
                    this.curAboutData = res.data.content
                }
            })
        }
    },
    computed: {
        ...mapGetters(['getAboutUs', 'getAboutQuery']),
    },
    watch:{
        'getAboutQuery':{
            handler() {
                this.active = this.getAboutQuery.active
                this.readArticles(this.getAboutQuery.id, this.getAboutQuery.title)
            },
            deep: true
        }
    },
}
</script>

<style lang="scss" scope>
    .html-content{
        padding: 20px 0;
    }
    .to-index{
        padding-bottom: 40px;text-align: right;    
        a{
            color: #e25353;
        }
    }
    .tabs {
        min-height: 800px;
        background-color: #fff !important;
        margin-right: 0 !important;
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
</style>

<style lang="scss" >
.about{
    .el-tabs__content {
        background-color: #fff;
        min-height: 800px !important;
        padding:0 40px ;
    }
}
</style>
