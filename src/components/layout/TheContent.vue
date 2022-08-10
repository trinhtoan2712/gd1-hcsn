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
                <div class="header-notify icon-content padding"></div>
                <div class="header-system icon-content padding"></div>
                <div class="header-support icon-content padding"></div>
                <div class="header-user icon-content padding"></div>
                <div class="header-arrow icon-content padding"></div>
            </div>
        </div>
        <router-view></router-view>
    </section>

</template>

<script>
export default {
    name: 'App',
    components: {
    },
}
</script>

<style scoped>
@import url(../../style/layout/content.css);
@import url(../../style/layout/header.css);
</style>