<template>
    <div class="user-info-box">
        <div class="user-box-2">
            <Title :infoTitle="infoTitle"/>
            <el-row class="user-box-con">
                <el-col >
                    <div class="user-information user-box-con-1 user-information-detail user-information-detail-show">
                        <div class="user-portrait" @click="showUpImg">
                            <img v-if="getUserInfo.portrait == null" class="user-img" src="../../assets/image/user_portrait.jpg" width="120" height="120">
                            <img v-else class="user-img" :src="getUserInfo.portrait" alt="" width="120" height="120">
                            <span class="top">修改头像</span>
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
                                            <span slot="content" v-if="getUserInfo.is_real_name">
                                                您已认证个人实名信息，如需修改请联系客服人员，
                                                <a class="a-style" :href="serviceQQ" target="_blank">在线客服</a>
                                            </span>
                                            <span slot="content" v-else>
                                                您未认证个人实名信息，
                                                <a class="a-style" href="javascript:void(0);" @click="goSafeSetting(2)">实名认证</a>
                                            </span>
                                            <div>
                                                <span :class="getUserInfo.is_real_name ? 'icon-check' : 'icon-no-check'"></span>
                                                <span class="icon-font">{{getUserInfo.is_real_name?'已认证':'未认证'}}</span>
                                            </div>
                                        </el-tooltip>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="user-info-label">身份证号码</td>
                                    <td class="user-info-value ">{{getUserInfo.identity_number}}</td>
                                    <td class="user-info-state">
                                        <el-tooltip effect="light" placement="left-start">
                                            <span slot="content" v-if="getUserInfo.is_real_name">
                                                您已绑定身份证，如需修改请联系客服人员，
                                                <a class="a-style" :href="serviceQQ" target="_blank">在线客服</a>
                                            </span>
                                            <span slot="content" v-else>
                                                您未绑定身份证，实名认证即可成功绑定身份证，
                                                <a class="a-style" href="javascript:void(0);" @click="goSafeSetting(2)">实名认证</a>
                                            </span>
                                            <div>
                                                <span :class="getUserInfo.is_real_name ? 'icon-check' : 'icon-no-check'"></span>
                                                <span class="icon-font">{{getUserInfo.is_real_name?'已绑定':'未绑定'}}</span>
                                            </div>
                                        </el-tooltip>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="user-info-label">手机号码</td>
                                    <td class="user-info-value ">{{getUserInfo.mobile}}</td>
                                    <td class="user-info-state">
                                        <el-tooltip effect="light" placement="left-start">
                                            <span slot="content">
                                                您已绑定手机号，
                                                <a class="a-style" href="javascript:void(0);" @click="goSafeSetting(1)">点击修改</a>
                                            </span>
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
                                <!-- <tr>
                                    <td class="user-info-label">出生日期</td>
                                    <td class="user-info-value ">{{getUserInfo.address}}</td>
                                </tr> -->
                                <tr>
                                    <td class="user-info-label">性别</td>
                                    <td class="user-info-value">{{getUserInfo.gender == true ? '男' : '女'}}</td>
                                </tr>
                                <tr>
                                    <td class="user-info-label">本人学历</td>
                                    <td class="user-info-value ">{{getUserInfo.education}}</td>
                                </tr>
                                <tr>
                                    <td class="user-info-label">省份</td>
                                    <td class="user-info-value ">{{getUserInfo.province}}</td>
                                </tr>
                                <tr>
                                    <td class="user-info-label">城市</td>
                                    <td class="user-info-value ">{{getUserInfo.city}}</td>
                                </tr>
                                <tr>
                                    <td class="user-info-label">地区</td>
                                    <td class="user-info-value ">{{getUserInfo.area}}</td>
                                </tr>
                                <tr>
                                    <td class="user-info-label">通讯地址</td>
                                    <td class="user-info-value">{{getUserInfo.address}}</td>
                                </tr>
                                <tr>
                                    <td class="user-info-label">婚姻状态</td>
                                    <td class="user-info-value">{{getUserInfo.marital_status == '1' ? '已婚' : '未婚'}}</td>
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
                                <tr>
                                    <td class="user-info-label">紧急联系人</td>
                                    <td class="user-info-value ">{{getUserInfo.emergency_name}}</td>
                                </tr>
                                <tr>
                                    <td class="user-info-label">紧急联系人手机</td>
                                    <td class="user-info-value ">{{getUserInfo.emergency_mobile}}</td>
                                </tr>
                                <tr>
                                    <td class="user-info-label">紧急联系人关系</td>
                                    <td class="user-info-value ">{{getUserInfo.emergency_relationship}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <el-form ref="editForm" label-width="266px" size="small "  v-if="edit" :model="editForm" >
                        <!-- <el-form-item label="出生日期((不可修改))" >
                            {{editForm.birthday}}
                        </el-form-item> -->
                        <el-form-item label="性别" >
                            <el-radio-group v-model="editForm.gender" >
                                <el-radio :label="true">男</el-radio>
                                <el-radio :label="false">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="本人学历" >
                            <el-select v-model="editForm.education"  placeholder="请选择">
                                <el-option
                                v-for="item in education"
                                :key="item.label"
                                :label="item.label"
                                :value="item.label">
                                </el-option>
                            </el-select>  
                        </el-form-item>
                        <el-form-item label="身份证所处地" >
                            <area-cascader type="text" :level="1" v-model="selectedCity" :data="pcaa"></area-cascader>
                        </el-form-item>                    
                        <el-form-item label="通讯地址" >
                            <el-input type="text" maxlength="100" show-word-limit v-model="editForm.address" placeholder="请输入通讯地址"></el-input>
                        </el-form-item>
                        <el-form-item label="婚姻状态" >
                            <el-radio-group v-model="editForm.marital_status" >
                                <el-radio label="1">已婚</el-radio>
                                <el-radio label="0">未婚</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="现就职于" >
                            <el-input maxlength="100" show-word-limit v-model="editForm.working_company" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="职位" >
                            <el-input maxlength="30" show-word-limit v-model="editForm.job" placeholder="请输入职位"></el-input>
                        </el-form-item>
                        <el-form-item label="月收入" >
                            <el-select v-model="editForm.monthly_income"   placeholder="请选择">
                                <el-option
                                v-for="item in education1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="紧急联系人" >
                            <el-input type="text" maxlength="12"  v-model="editForm.emergency_name" placeholder="请输入紧急联系人"></el-input>
                        </el-form-item>
                        <el-form-item label="紧急联系人手机" >
                            <el-input type="text" v-model="editForm.emergency_mobile" placeholder="请输入紧急联系人手机"></el-input>
                        </el-form-item>
                        <el-form-item label="紧急联系人关系" >
                            <el-input type="text" maxlength="30"  v-model="editForm.emergency_relationship" placeholder="请输入紧急联系人关系"></el-input>
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
        <div class="upImg-box" v-if="isShowUpImg">
            <div class="ps2-con">
                <div class="ps1-title">
                    <h2>上传头像</h2>
                    <p @click="closeUpImg">╳</p>
                </div>
                <div class="uploading-portrait-con">
                    <span class="input-box">
                        <span>上传图片</span>
                        <input id="pop_file" class="file" type="file" accept=".jpg,.jpeg,.png" v-on:change="uploadFile($event)" name="fileTrans" ref="file" value="" />
                    </span>                   
                    <img id="preview" src="" style="max-width: 100px;max-height: 100px;"/>
                </div>
                <div class="uploading-portrait-btn">
                    <p class="font">
                        您可以上传JPG、GIF或PNG文件<br>
                        上传图片最大500kb
                    </p>
                    <span @click="upPortrait">保存</span>
                    <span style="color: #666;background: #efefef;" @click="closeUpImg">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Title from '@/components/member/Title'
import Warm from '@/components/member/Warm'
import { mapGetters, mapActions } from "vuex";
import { pcaa } from 'area-data'; // v5 or higher

export default {
    components:{ Title ,Warm },
    inject: ['reload'],
    data() {
        return {
            selectedCity: [],
            pcaa: pcaa,
             editForm: {
                // birthday:'1984-09-16',
                gender: '',//性别
                education:'',//本人学历
                province: '',//省份
                city: '',//城市
                area: '',//地区
                address: '',//通讯地址
                marital_status:'',//婚姻
                working_company: '',//现就职于 
                job: '',//职位
                monthly_income:'',   //月收入
                emergency_name: '', //   紧急联系人 
                emergency_mobile: '', //   紧急联系人手机    
                emergency_relationship: '', //   紧急联系人关系         
            },
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
            isShowUpImg: false,
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
            this.edit = false
        },
        goSafeSetting(id) {
            this.$router.push({ path: '/member/safeSetting', query: { showId: id} })
        },
        showUpImg() {
            this.isShowUpImg = true
        },
        closeUpImg() {
            this.isShowUpImg = false
        },
        // 保存个人信息
        saveInfo() {
            let obj = {
                gender: this.editForm.gender,//性别
                education: this.editForm.education || this.getUserInfo.education,//本人学历                
                province: this.editForm.province || this.getUserInfo.province,//省份
                city: this.editForm.city || this.getUserInfo.city,//城市
                area: this.editForm.area || this.getUserInfo.area,//地区
                address: this.editForm.address || this.getUserInfo.address,//通讯地址
                marital_status: this.editForm.marital_status || this.getUserInfo.marital_status,//婚姻
                working_company:this.editForm.working_company || this.getUserInfo.working_company,//现就职于 
                job: this.editForm.job || this.getUserInfo.job, //职位
                monthly_income: this.editForm.monthly_income || this.getUserInfo.monthly_income, //月收入
                emergency_name: this.editForm.emergency_name || this.getUserInfo.emergency_name, //紧急联系人  
                emergency_mobile: this.editForm.emergency_mobile || this.getUserInfo.emergency_mobile, //紧急联系人手机            
                emergency_relationship: this.editForm.emergency_relationship || this.getUserInfo.emergency_relationship, //紧急联系人关系
            }
            this.getModifybasicdata(obj).then(res=>{
                if( res.code == 200){
                    this.$message.success(res.message)
                    Object.assign(this.$store.state.userInfo, obj)
                    this.reload()
                }   
            })
        },
        // 设置上传图片的显示
        uploadFile() {
            const file = document.getElementById('pop_file');
            const fileObj = file.files[0];
            const windowURL = window.URL || window.webkitURL;
            const img = document.getElementById('preview');
            if(file && fileObj) {
                const dataURl = windowURL.createObjectURL(fileObj);
                img.setAttribute('src',dataURl);
            }
        },
        // 上传图像
        upPortrait() {
            const oFiles = document.getElementById("pop_file")
            if(oFiles.value != '') {
                const fileSize = oFiles.files[0].size / 1024 
                if(fileSize > 500) {
                    this.$alert('上传图片要小于500kb!');
                }else {
                    let params = new FormData();
                    params.append('file',oFiles.files[0]);
                    this.portraitUpload(params).then((res) => {
                        if(res.code == 200) {
                            this.$store.commit('PORTRAIT', res.data.info)
                            this.reload()
                        }
                    })
                }
            }
        }
    },
    computed: {
        ...mapGetters(['getUserInfo', 'getSettingBase']),
        //温馨提示数组
        warmData(){
            return [
                '请您根据自身真实情况填写，出彩速配会对用户的所有资料进行严格保密。',
                `使用过程遇到问题，请联系客服，${this.getSettingBase.service_telephone}。`
            ]
        },
        //客服QQ
        serviceQQ() {
            if(this.getSettingBase.service_qq != undefined) {
                let qq = this.getSettingBase.service_qq.split('|')[0]
                return `https://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`
            }           
        }
    },
    watch: {
        'selectedCity': {
            handler(val, b) {
                this.editForm.province = val[0]
                this.editForm.city = val[1]
                this.editForm.area = val[2]
            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.input-box{
    display: inline-block;
    width: 80px;
    height: 30px;
    overflow: hidden;
    position: relative;
    background: #da4848;
    color: #fff;
    line-height: 30px;
    font-size: 12px;
    cursor: pointer;
    text-align: center;
}
.file {
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 30px;
    opacity: 0;
}
.upImg-box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;
    background: rgba(166,166,166,.3);
    .ps2-con{
        position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);background: #fff;border-radius: 5px;
        border: 1px solid #e0e0e0;background: #fff;margin: 5px;width: 450px;
        .ps1-title{
            border-bottom: 1px solid #e5e5e5;height: 40px;background: #f3f3f3;border-radius: 3px 3px 0 0;
            display: flex;justify-content: space-between;align-items: center;padding-left:10px;box-sizing: border-box;
            h2{
                text-indent: 15px;color: #333;font-size: 14px;font-weight: 700;
            }
            p{
                font-size: 20px;color: #8f8f8f;padding: 0 10px;cursor: pointer;
            }
        }
        .uploading-portrait-con{
            padding-top: 15px;padding-left: 15px;display: flex;align-items: center;justify-content: space-between;padding-right: 50px;
        }
        .uploading-portrait-btn{
            position: relative;
            padding-left: 295px;
            padding-bottom: 30px;
            padding-top: 10px;
            width: 140px;
            span{
                display: inline-block;
                padding:  0 15px;
                text-align: center;
                height: 24px;
                line-height: 24px;
                color: #fff;
                background: #fe7b20;
                cursor: pointer;
                margin-right: 5px;
            }
            .font{
                position: absolute;
                top: 22px;
                left: 22px;
                color: #666;
                line-height: 18px;
            }
        }
    }
}
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
.icon-no-check{
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    background: url(../../assets/image/user_sprite.png) no-repeat -34px -842px;
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
<style lang="scss">
.user-info-box{
    .area-select .area-selected-trigger{
        padding:0 0 0 10px
    }
    .area-select.large{
        width: 100%;
    }
}

</style>
