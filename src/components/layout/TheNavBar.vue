<template>
    <div class="side-bar" v-bind:class="{open: isShowNavBar}">
        <div class="logo-details bx bx-menu" id="btn-open" @click="btnShowNavBarOnClick">
            <div class="logo_name">MISA QLTS</div>
            <span class="tooltip">Mở danh mục</span>
        </div>
        <ul class="nav-list">
            <li>
                <router-link to="/dashboard">
                    <div class="icon-dashboard icon-nav icon-navbar-active"></div>
                    <span class="links_name">Tổng quan</span>
                </router-link>
                <span class="tooltip">Tổng quan</span>
            </li>
            <li>
                <router-link to="/asset" class="btn-link" @click="showSideNav">
                    <div class="icon-assets icon-nav icon-navbar-active"></div>
                    <span class="links_name">Tài sản</span>
                    <div class="icon-drop icon-content"></div>
                </router-link>
                <ul class="sidenav-collapse" :class = "{show: isShowSideNav}">
                    <li>
                        <router-link to="/increment" class="sidenav-collapse-item">
                            <span style="color: #fff" class="">Ghi tăng</span>
                        </router-link>
                    </li>
                    <li>
                        <a to="/" class="sidenav-collapse-item">
                            <span style="color: #fff" class="">Thay đổi thông tin</span>
                        </a>
                    </li>
                    <li>
                        <a to="/" class="sidenav-collapse-item">
                            <span style="color: #fff" class="">Đánh giá lại</span>
                        </a>
                    </li>
                </ul>
                <span class="tooltip">Tài sản</span>
            </li>
            <li>
                <router-link to="/" class="btn-link">
                    <div class="icon-assets-htdb icon-nav icon-navbar-active"></div>
                    <span class="links_name">Tài sản HT-ĐB</span>
                    <div class="icon-drop icon-content"></div>
                </router-link>
                <span class="tooltip">Tài sản HT-ĐB</span>
            </li>
            <li>
                <a href="#" class="btn-link">
                    <div class="icon-tool icon-nav icon-navbar-active"></div>
                    <span class="links_name">Công cụ dụng cụ</span>
                    <div class="icon-drop icon-content"></div>
                </a>
                <span class="tooltip">Công cụ dụng cụ</span>
            </li>
            <li>
                <a href="#">
                    <div class="icon-category icon-nav icon-navbar-active"></div>
                    <span class="links_name">Danh mục</span>
                </a>
                <span class="tooltip">Danh mục</span>
            </li>
            <li>
                <a href="#" class="btn-link">
                    <div class="icon-search-nav icon-nav icon-navbar-active"></div>
                    <span class="links_name">Tra cứu</span>
                    <div class="icon-drop icon-content"></div>
                </a>
                <span class="tooltip">Tra cứu</span>
            </li>
            <li>
                <a href="#" class="btn-link">
                    <div class="icon-report icon-nav icon-navbar-active"></div>
                    <span class="links_name">Báo cáo</span>
                    <div class="icon-drop icon-content"></div>
                </a>
                <span class="tooltip">Báo cáo</span>
            </li>
        </ul>
        <div v-if="isShowNavBar" class="bottom-nav" id="">

            <button class="btn-close-nav icon-nav icon-navbar-active" id="btn-close"
                @click="btnHideNavBarOnClick">
                <span class="tooltip">Đóng danh mục</span>
</button>
        </div>
    </div>
</template>

<script>
export default ({
    data() {
        return {
            isShowNavBar: false,
            isShowSideNav:false
        }
    },
    methods: {
        showSideNav() {
            try {
                this.isShowSideNav = !this.isShowSideNav
            } catch (error) {
                console.log(error);
            }
        },

        //hàm ẩn hiện navbar
        btnShowNavBarOnClick() {
            try {
                this.isShowNavBar = true;
            } catch (error) {
                console.log(error);
            }
        },
        btnHideNavBarOnClick() {
            try {
                this.isShowNavBar = false;
            } catch (error) {
                console.log(error);
            }
        }
    }
})
</script>

<style scoped>
@import url(../../style/layout/navbar.css);
</style>