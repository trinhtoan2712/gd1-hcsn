<template>
    <section class="content">
        <div class="content-header">
            <div class="content-header-left">
                <p class="content-title">Danh sách tài sản</p>
            </div>
            <div class="content-header-right">
                <div class="header-department">
                    <p class="name-department">Sở tài chính</p>
                </div>
                <div class="header-year padding">
                    <div class="header-year-text">Năm</div>
                    <div class="header-year-num">2021</div>
                    <div class="header-year-btn">
                        <div class="btn-up icon-content"></div>
                        <div class="btn-down icon-content"></div>
                    </div>
                </div>
                <div class="header-notify icon-content padding"> <span class="tooltip">Thông báo</span> </div>
                <div class="header-system icon-content padding"><span class="tooltip">Hệ thống</span></div>
                <div class="header-support icon-content padding"><span class="tooltip">Hỗ trợ</span></div>
                <div class="info-user" @click="isOpenDropInfo = !isOpenDropInfo" :class="{ isActive: isOpenDropInfo }">
                    <div class="header-user icon-content padding"></div>
                    <div class="header-arrow icon-content"></div>
                    <span class="tooltip">Thông tin</span>
                </div>
                <div class="dropdown-list-item" v-if="isOpenDropInfo">
                    <div class="item-info">Thông tin</div>
                    <div class="item-info" @click="logout">Đăng xuất</div>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </section>

</template>

<script>
import { NameCookie} from "../common/TheConst";

export default {
    name: 'App',
    components: {
    },
    methods: {
        callToDropDownInfo() {
            this.isOpenDropInfo = false;
        },
        logout() {
            document.cookie = `${NameCookie.NAME_TOKEN}` +`=;${NameCookie.EXPIRES}`;
            document.cookie = `${NameCookie.NAME_AUTH}` +`=;${NameCookie.EXPIRES}`;
            this.$router.push({ path: '/login' })
        }
    },
    data() {
        return {
            isOpenDropInfo: false
        }
    }
}
</script>

<style scoped>
@import url(../../style/layout/content.css);
@import url(../../style/layout/header.css);
</style>