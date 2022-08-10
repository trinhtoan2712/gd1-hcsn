
<template>
    <div id="dlgAssetDetail" class="dialog">
        <div class="frame_dialog">
            <div class="dialog_header">
                <div class="dialog_header-left">
                    <h4 style="margin: unset">Thêm tài sản</h4>
                </div>
                <div class="btn-header-right" @click="showDetailFunction(false)">
                    <div class="btn-close-dialog icon-content btn-cancel-dialog-asset"></div>
                </div>
            </div>
            <div class="dialog_content">
                <div class="row" role="row">
                    <div class="col">
                        <label>Mã tài sản (<span class="input--required">*</span>)</label>
                        <input tabindex="1" id="txtAssetCode" required name-property="mã tài sản" type="text"
                            class="input" placeholder="Nhập mã tài sản">
                    </div>
                    <div class="col" style="grid-column: span 2;">
                        <label>Tên tài sản (<span class="input--required">*</span>)</label>
                        <input tabindex="2" id="txtAssetName" name-property="tên tài sản" required type="text"
                            class="input" placeholder="Nhập tên tài sản">
                    </div>
                    <div class="col">
                        <label>Mã bộ phận sử dụng (<span class="input--required">*</span>)</label>
                        <div class="input-dropdown">
                            <input tabindex="3" id="txtAssetName" required name-property="mã bộ phận tài sản"
                                type="text" class="input input-number" placeholder="Chọn mã bộ phận sử dụng">
                            <div class="icon-dropdown icon-content"></div>
                        </div>
                    </div>
                    <div class="col" style="grid-column: span 2;">
                        <label>Tên bộ phận sử dụng </label>
                        <input id="txtAssetName" type="text" class="input" disabled>
                    </div>
                    <div class="col">
                        <label>Mã loại tài sản (<span class="input--required">*</span>)</label>
                        <div class="input-dropdown">
                            <input tabindex="4" id="txtAssetName" required name-property="mã loại tài sản" type="text"
                                class="input input-number" placeholder="Chọn mã loại tài sản">
                            <div class="icon-dropdown icon-content"></div>
                        </div>
                    </div>
                    <div class="col" style="grid-column: span 2;">
                        <label>Tên loại tài sản</label>
                        <input id="txtAssetName" type="text" class="input" disabled>
                    </div>
                    <div class="col">
                        <label>Số lượng (<span class="input--required">*</span>)</label>
                        <div class="input-updown">
                            <input tabindex="5" id="txtAssetName" required name-property="số lượng" type="text"
                                class="input input-number" value="01">
                            <div class="icon-updown icon-content"></div>
                        </div>
                    </div>
                    <div class="col">
                        <label>Nguyên giá (<span class="input--required">*</span>)</label>
                        <input tabindex="6" id="txtAssetName" required name-property="nguyên giá" type="text"
                            class="input number-right" value="0">
                    </div>
                    <div class="col">
                        <label>Tỉ lệ hao mòn (%) (<span class="input--required">*</span>)</label>
                        <input tabindex="7" id="txtAssetName" required name-property="tỉ lệ hao mòn" type="text"
                            class="input number-right" placeholder="Nhập mã tài sản" value="0">
                    </div>
                    <div class="col" id="valid-date-use">

                    </div>
                    <div class="col" id="valid-date-buy">

                    </div>

                    <div class="col">
                        <label>Năm theo dõi</label>
                        <input id="txtAssetName" name-property="" type="text" class="input" disabled>
                    </div>
                    <div class="col">
                        <label>Số năm sử dụng (<span class="input--required">*</span>)</label>
                        <div class="input-updown">
                            <input tabindex="10" id="txtAssetName" required name-property="số năm sử dụng" type="text"
                                class="input input-number" value="0">
                            <div class="icon-updown icon-content"></div>
                        </div>
                    </div>
                    <div class="col">
                        <label>Giá trị hao mòn năm(<span class="input--required">*</span>)</label>
                        <input tabindex="11" id="txtAssetName" required name-property="giá trị hao mòn năm" type="text"
                            class="input number-right" value="0">
                    </div>
                </div>
            </div>
            <div class="dialog_footer">
                <button tabindex="13" id="btnClose" class="btn-dialog btn btn-cancel-dialog-asset"
                    style="background-color:#fff">Hủy</button>
                <button tabindex="12" id="btnSave" class="btn-dialog btn btn-save-dialog-asset" style="color: #fff"
                    @click="btnSaveOnClick">Lưu</button>
            </div>
        </div>
    </div>


</template>
<script>
export default {
    name: "TheAssetDetail",
    props: {
        showDetailFunction: Function,
        showDetailChil: {
            type: Boolean,
            default: false,
        },
        assetSelected: Object,
    },
    methods: {
        btnSaveOnClick() {
            console.log(this.asset.CustomerId);
        },
    },
    watch: {

    },
    created() {
        this.asset = this.assetSelected;
    },
    data() {
        return {
            customer: {},
        };
    },
};
</script>
<style scoped>
@import url(../../../style/page/asstes.css);
@import url(../../../style/base/comboboxform.css);
</style>