<template>
    <div class="container">
        <div class="header-masterdetail pading-left pading-right">
            <div class="header-masterdetail-left">
                <h3>Ghi tăng tài sản</h3>
            </div>
            <div class="header-masterdetail-right">
                <button class="btn" style="margin-right:16px" id="btnAdd">
                    <div class="btn-add">Thêm </div>
                    <!-- <span class="tooltip">Ctrl + I</span> -->
                </button>
                <button class="btn-unknow" id="">
                    <div class="btn-unknow-icon1 icon-content"> </div>
                    <div class="btn-unknow-icon2 icon-content"> </div>
                    <!-- <span class="tooltip">Ctrl + I</span> -->
                </button>
            </div>
        </div>
        <splitpanes class="main-masterdetail pading-left pading-right pading-bottom default-theme" horizontal style="height: 82vh">
                <pane>
                    <span>1</span>
                </pane>
                <pane>
                    <span>2</span>
                </pane>
        </splitpanes>
        <div class="asset-masterdetail"></div>
    </div>
</template>

<script>
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

export default ({
    components: { Splitpanes, Pane },
    data() {
        return {
        }
    },
    methods: {

    }
})
</script>

<style scoped>
@import url(../MasterDetail/masterdetail.css);
</style>