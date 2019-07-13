<template>
    <div >
        <div class="user-box-2">
            <Title :infoTitle="infoTitle"/>
            <el-row class="user-box-con">
                <el-col >
                    <div class="user-information user-box-con-1 user-information-detail user-information-detail-show">
                        <div class="user-portrait">
                            <img class="user-img" src="../../assets/image/user_portrait.jpg" width="120" height="120"> 
                            <el-upload
                            class="avatar-uploader top"
                            :action="UploadAction"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                                修改头像
                            </el-upload>
                        </div>
                        <table class="name-table">
                            <tbody>
                                <tr>
                                    <td class="user-info-label">用户名</td>
                                    <td class="user-info-value ">{{getUserInfo.username}}</td>
                                    <td class="user-info-state">
                                        <el-tooltip effect="light" placement="left-start">
                                            <span slot="content">用户注册时填写的用户名，不可更改</span>
                                            <div>
                                                <span class="icon-check"></span>
                                                <span class="icon-font">详情</span>
                                            </div>
                                        </el-tooltip>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="user-info-label">真实姓名</td>
                                    <td class="user-info-value ">{{getUserInfo.real_name}}</td>
                                    <td class="user-info-state">
                                        <el-tooltip effect="light" placement="left-start">
                                            <span slot="content">您已认证个人实名信息，如需修改请联系客服人员，<a class="a-style" href="#">在线客服</a></span>
                                            <div>
                                                <span class="icon-check"></span>
                                                <span class="icon-font">已认证</span>
                                            </div>
                                        </el-tooltip>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="user-info-label">身份证号码</td>
                                    <td class="user-info-value ">{{getUserInfo.identity_number}}</td>
                                    <td class="user-info-state">
                                        <el-tooltip effect="light" placement="left-start">
                                            <span slot="content">您已绑定身份证，如需修改请联系客服人员，<a class="a-style" href="#">在线客服</a></span>
                                            <div>
                                                <span class="icon-check"></span>
                                                <span class="icon-font">已绑定</span>
                                            </div>
                                        </el-tooltip>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="user-info-label">手机号码</td>
                                    <td class="user-info-value ">{{getUserInfo.mobile}}</td>
                                    <td class="user-info-state">
                                        <el-tooltip effect="light" placement="left-start">
                                            <span slot="content">您已绑定手机号，<a class="a-style" href="#">点击修改</a></span>
                                            <div>
                                                <span class="icon-check"></span>
                                                <span class="icon-font">已认证</span>
                                            </div>
                                        </el-tooltip>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </el-col>
            </el-row>
            <el-row class="user-box-con-1">
                <el-col :span="11">
                    <div v-if="!edit" class="user-information user-box-con-1 user-information-detail user-information-detail-show">
                        <table>
                            <tbody>
                                <tr>
                                    <td class="user-info-label">出生日期</td>
                                    <td class="user-info-value ">{{getUserInfo.address}}</td>
                                </tr>
                                <tr>
                                    <td class="user-info-label">性别</td>
                                    <td class="user-info-value">{{getUserInfo.gender == true ? '男' : '女'}}</td>
                                </tr>
                                <tr>
                                    <td class="user-info-label">本人学历</td>
                                    <td class="user-info-value ">{{getUserInfo.education}}</td>
                                </tr>
                                <tr>
                                    <td class="user-info-label">通讯地址</td>
                                    <td class="user-info-value">{{getUserInfo.address}}</td>
                                </tr>
                                <tr>
                                    <td class="user-info-label">婚姻状态</td>
                                    <td class="user-info-value">{{getUserInfo.marital_status}}</td>
                                </tr>
                                <tr>
                                    <td class="user-info-label">现就职于</td>
                                    <td class="user-info-value ">{{getUserInfo.working_company}}</td>
                                </tr>
                                <tr>
                                    <td class="user-info-label">职位</td>
                                    <td class="user-info-value ">{{getUserInfo.job}}</td>
                                </tr>
                                <tr>
                                    <td class="user-info-label">月收入</td>
                                    <td class="user-info-value ">{{getUserInfo.monthly_income}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <el-form ref="editForm" label-width="266px" size="small "  v-if="edit" :model="editForm" >
                        <el-form-item label="出生日期((不可修改))" >
                            {{editForm.birthday}}
                        </el-form-item>
                        <el-form-item label="性别" >
                            <el-radio-group v-model="editForm.sex" >
                                <el-radio :label="true">男</el-radio>
                                <el-radio :label="false">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="本人学历" >
                            <el-select v-model="editForm.xueli"  placeholder="请选择">
                                <el-option
                                v-for="item in education"
                                :key="item.label"
                                :label="item.label"
                                :value="item.label">
                                </el-option>
                            </el-select>  
                        </el-form-item>
                        <el-form-item label="通讯地址" >
                            <el-input v-model="editForm.school" placeholder="请输入通讯地址"></el-input>
                        </el-form-item>
                        <el-form-item label="婚姻状态" >
                            <el-radio-group v-model="editForm.merriage" >
                                <el-radio  label="0">已婚</el-radio>
                                <el-radio  label="1">未婚</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="现就职于" >
                            <el-input   v-model="editForm.address" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="职位" >
                            <el-input  v-model="editForm.position" placeholder="请输入职位"></el-input>
                        </el-form-item>
                        <el-form-item label="月收入" >
                            <el-select v-model="editForm.shouru"   placeholder="请选择">
                                <el-option
                                v-for="item in education1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  >
                            <el-button size="mini" type="warning" @click="saveInfo">保存</el-button>
                            <el-button  size="mini" @click="resetForm()" type="info" plain>取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <Warm :warmData="warmData"/>
        </div>
    </div>
</template>

<script>
import Title from '@/components/member/Title'
import Warm from '@/components/member/Warm'
import { mapGetters, mapActions } from "vuex";
import {baseUrl} from "@/config/env";
export default {
    components:{ Title ,Warm },
    inject: ['reload'],
    data() {
        return {
            editForm: {
                birthday:'1984-09-16',
                xueli:'',
                shouru:'',
                address: '',
                school: '',
                position: '',
                merriage:'',
                sex: ''
            },
            imageUrl:'',
            UploadAction: baseUrl +'/index/member/portraitupload',
            education: [
                { label: '高中及以下' }, 
                { label: '大专' }, 
                { label: '本科' }, 
                { label: '研究生及以上' }
            ],
            education1: [
                { label: '1000元以下' }, 
                { label: '1000-2000元' }, 
                { label: '2000-5000元' }, 
                { label: '5000-10000元' }, 
                { label: '10000-20000元' }
            ],
            edit: false,
            infoTitle: {
                title:'个人中心',
                todu:{
                    title:'修改个人信息',
                }
            },
            //温馨提示数组
            warmData: [
                '请您根据自身真实情况填写，出彩速配会对用户的所有资料进行严格保密。',
                '使用过程遇到问题，请联系客服，400-8357-678。'
            ]
        }
    },
    methods:{
        ...mapActions(['getModifybasicdata','portraitUpload']),
        toDoMore() {
            const e  = this.edit
            this.edit = e == true? false : true
        },
        resetForm() {
            const obj = this.editForm
            Object.keys(obj).forEach(function(key){
                if(key =='birthday') return false
                obj[key] =  ''
            });
            this.editForm = obj
        },
        // 保存个人信息
        saveInfo() {
            let obj = {
                gender: this.editForm.sex,//性别
                marital_status: this.editForm.merriage,//婚姻
                emergency_mobile: '15854123584', //紧急联系人手机
                education: this.editForm.xueli,//本人学历
                address: this.editForm.school,//通讯地址
                working_company:this.editForm.address,//现就职于
                job: this.editForm.position, //职位
                monthly_income: this.editForm.shouru, //月收入
            }
            this.getModifybasicdata(obj)
            this.reload()
        },
        //上传头像
        uploadImg() {

            // this.portraitUpload()
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return  isLt2M;
        }
    },
    computed: {
        ...mapGetters(['getUserInfo'])
    },
    created() {

    },
    watch: {

    }
}
</script>

<style lang="scss" scoped>
.user-box-2{
    border: 1px solid #e0e0e0;
    border-radius: 3px;
    background: #fff;
}

.user-box-2 {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 3px;
}
.user-box-con {
    width: 964px;
    margin: 0 auto;

}
.user-box-con-1 {
    width: 964px;
    margin: 0 auto;
    padding: 30px 0;
}
.el-form-item {
    line-height: 40px !important;
    height: 40px !important;
}
.user-portrait {
    border: 1px solid #e4e4e4;
    border-radius: 3px;
    position: relative;
    float: left;

}
.user-portrait:hover{
    .top{
        display: block;
    }
}
.top {
    width: 120px;
    height: 120px;
    background:rgba(0,0,0,.5);
    display: none;
    text-align: center;
    float: left;
    position: absolute;
    color: #fff;
    top: 0;
    left: 0;
    cursor:pointer;
    line-height:120px
}
img {
    border: none;
    vertical-align: middle;
    z-index: 999;
}
.user-information {
    margin-top: 0;
    position: relative;
    padding-bottom: 20px;
}
.warm {
    clear: both;
    background: none repeat scroll 0 0 #fffadc;
    border: 1px solid #e3b367;
    padding: 10px 20px;
    line-height: 24px;
    color: #666;
    font-size: 12px;
    margin:0 auto; 
    margin-top:20px;
    .warm-title {
        color: #b73736;
        font-weight: 700;
    }
}
.icon-check{
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    background: url(../../assets/image/user_sprite.png) no-repeat -17px -842px;
}
.icon-font{
    display: inline-block;
}
.a-style{
    color: blue;
}

.user-info-label {
    text-align: right;
    color: #999;
    width: 236px;
    padding-right: 30px;
}

.name-table {
    .user-info-label {
        text-align: right;
        color: #999;
        width: 116px !important;
        padding-right: 30px;
    }
}
.user-information td {
    border: 0;
    height: 35px;
    line-height: 35px;
}

.user-info-state {
    color: #999;
    width: 70px;
}
.user-info-value {
    width: 375px;
}
img {
    border: none;
    vertical-align: middle;
}
.user-information {
    margin-top: 0;
    position: relative;
    padding-bottom: 20px;
}
.user-information-detail {
    border-top: 1px solid #e0e0e0;
}
</style>
