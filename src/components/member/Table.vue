<template>
    <div  class="user-information user-box-con-1 user-information-detail user-information-detail-show">
        <table>
            <tbody>
                <tr>
                    <td class="user-info-label">用户名</td>
                    <td class="user-info-value ">{{infoData.username}}</td>
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
                    <td class="user-info-value ">{{infoData.real_name}}</td>
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
                    <td class="user-info-value ">{{infoData.identity_number}}</td>
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
                    <td class="user-info-value ">{{infoData.mobile}}</td>
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
</template>

<script>
export default {
    props:['infoData']
}
</script>
<style lang="scss" scoped>
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
.user-portrait {
    width: 120px;
    height: 120px;
    border: 1px solid #e4e4e4;
    border-radius: 3px;
    position: absolute;
    top:40px;
    left: 20px;
    cursor: pointer;
}
.user-information-detail {
    border-top: 1px solid #e0e0e0;
}
.form-warm-prompt-1 {
    clear: both;
    background: none repeat scroll 0 0 #fffadc;
    border: 1px solid #e3b367;
    padding: 10px 20px;
    line-height: 24px;
    color: #666;
    font-size: 12px;
}
</style>