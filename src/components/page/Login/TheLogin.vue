<template>
    <div id="frmLogin">
        <div class="login-page">
            <BaseLoading v-if="isShowLoading"></BaseLoading>
            <div class="snackbar" v-if="isShowWarningValidate">Vui lòng nhập đầy đủ thông tin đăng nhập</div>
            <div class="grid-login">
                <div class="half-ctn img-login">
                </div>
                <div class="half-ctn">
                    <div class="logo-misa"></div>
                    <div class="logo-text">
                        Đăng nhập để làm việc với <b>MISA QLTS</b>
                    </div>
                    <form class="grid-login-normal" @submit.prevent="login">
                            <div class="username-login">
                                <input id="iptUserName" class="input-login" v-model="dataLogin.userName"
                                    placeholder="Tên đăng nhập">
                            </div>
                            <div class="password-login login">
                                <input id="iptPassword" type="password" placeholder="Mật khẩu"
                                    v-model="dataLogin.userPass" class="input-login">
                                <i class="fa-sharp fa-solid fa-eye fa-xs"></i>
                            </div>
                            <div class="button-login" style="margin-top: 20px;">
                                <button class="button-login-form" id="login" style="">Đăng nhập</button>
                            </div>
                            <div class="btn-space">
                                <a class="forgot-password" id="open-forgot-password">Quên mật khẩu?</a>
                            </div>
                    </form>
                </div>
            </div>
            <div class="copy-right">
                Copyright © 2020 MISA JSC
            </div>
        </div>
    </div>
</template>

<script>
import BaseLoading from '../../base/BaseLoading.vue';
import {  EndPoint, NameCookie} from "../../common/TheConst";
import axios from 'axios';
export default {
    components: { BaseLoading },
    data() {
        return {
            isLogin: false,
            isShowWarningValidate: false,
            isShowLoading: false,
            dataLogin: {
                userName: '',
                userPass: ''
            },
            token: '',
        }
    },

    methods: {
        /**
        * Luu token vào cookie
        * TVTOAN (02/08/2022)
        */
        async setCookie(token) {
            document.cookie = `${NameCookie.NAME_TOKEN}= ${decodeURIComponent(token)};secure`;
            document.cookie = `${NameCookie.NAME_AUTH}= true;secure`;
        },
        
        /**
        * Xử lý sự kiện login
        * TVTOAN (02/08/2022)
        */
        login () {
            if(this.dataLogin.userName && this.dataLogin.userPass){
                this.isShowLoading = true;
                axios.post(EndPoint.END_POINT_TOKEN, this.dataLogin)
                .then(res => {
                    if(res.status == 200) {
                        this.token = res.data;
                        setTimeout(() => this.isShowLoading = false, 1000);
                        this.setCookie(this.token);
                        this.$router.push({ path: '/asset' });
                    }else{
                        this.isShowWarningValidate = true;
                        setTimeout(() => this.isShowWarningValidate = false, 3000);
                        document.cookie = `${NameCookie.NAME_AUTH}=` + NameCookie.EXPIRES;
                        this.isShowLoading = false;
                    }
                })
                setTimeout(() => this.isShowLoading = false, 500);
            }else {
                this.isShowWarningValidate = true;
                setTimeout(() => this.isShowWarningValidate = false, 3000);
                this.isShowLoading = false;
            }
        },
    }
}

</script>

<style scoped>
@import url(./login.css);
</style>