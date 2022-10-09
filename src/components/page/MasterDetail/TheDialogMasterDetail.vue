<template>
    <div id="dlgAssetDetail" class="dialog">
        <div class="frame_dialog-input">
            <div class="dialog_header">
                <div class="dialog_header-left">
                    <h3 style="margin: unset">{{title}}</h3>
                </div>
                <div class="btn-header-right" @click="showDetailFunction(false)">
                    <i class="fa-solid fa-xmark fa-xl"></i>
                    <div class="btn-close-dialog btn-cancel-dialog">
                        <span class="tooltip">Đóng</span>
                    </div>
                </div>
            </div>
            <div class="dialog_content">
                <div class="row" role="row">
                    <div class="col">
                        <label>Mã chứng từ <span class="input--required">*</span></label>
                        <input tabindex="1" ref="txtAssetCode" name-property="mã tài sản" type="text" class="input"
                            placeholder="Nhập mã chứng từ" required maxlength="20">
                    </div>
                    <div class="col" id="valid-date-use">
                        <label>Ngày bắt đầu sử dụng <span class="input--required">*</span></label>
                        <datepicker class="" format="dd/MM/yyyy" placeholder="DD-MM-YYYY" :hideInput="false"
                            ref="txtProductionDate" tabindex="" :typeable="true">
                        </datepicker>
                    </div>
                    <div class="col" id="valid-date-use">
                        <label>Ngày ghi tăng <span class="input--required">*</span></label>
                        <datepicker class="" format="dd/MM/yyyy" placeholder="DD-MM-YYYY" :hideInput="false"
                            ref="txtProductionDate" tabindex="" :typeable="true">
                        </datepicker>
                    </div>
                    <div class="col" style="grid-column: span 3;">
                        <label> Ghi chú </label>
                        <input tabindex="2" ref="txtFixedAssetName" type="text" class="input" placeholder="Nhập ghi chú"
                            maxlength="255">
                    </div>
                    <div class="col" style="grid-column: span 3;">
                        <span style="font-weight: 700"> Thông tin chi tiết </span>
                    </div>
                    <div class="col" style="grid-column: span 3;">
                        <div class="header-table-base">
                            <div class="">
                                <div class="form-search-table-base">
                                    <div class="form-search__icon icon-small"></div>
                                    <input class="form-search__input" ref="txtSearch" type="text"
                                        placeholder="Tìm kiếm theo tài sản">
                                </div>
                            </div>
                            <div class="header-table-right">
                                <div class="form-option-base" style="  box-shadow:0 2px 6px rgba(0, 0, 0, .16); width:90px">
                                    <button tabindex="13" id="btnClose" class="btn btn-cancel-dialog-asset">Chọn tài sản</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col" style="grid-column: span 3; height: 200px;">
                        <TableBase></TableBase>
                    </div>
                </div>
            </div>
            <div class="dialog_footer">
                <button tabindex="13" id="btnClose" class="btn-dialog btn btn-cancel-dialog-asset">Hủy</button>
                <button type="submit" tabindex="12" id="btnSave" class="btn-dialog btn" style="color: #fff">Lưu</button>
            </div>
        </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs3-datepicker';
import TableBase from '../../base/BaseTableFixedAsset.vue'
export default {

    components: { Datepicker, TableBase },
    name: "TheAssetDetail",
    emits: ["getNameDepartment", "getNameCategory", "validCombobox", "updateMessage", "returnIsDuplicate", "activeAssetNew"],
    props: {
        getData: Function,
        showDetailFunction: Function,
        showDetailChil: {
            type: Boolean,
            default: false,
        },
        assetIncrementSelected: Object,
        isDuplicate: {
            type: Boolean,
            default: false,
        },
        title: String,
    },
}

</script>

<style>
@import url(../../../style/base/datepicker.css);
@import url(../../../style/base/input.css);
@import url(../../../style/base/tool-tip.css);
@import url(../../../style/page/asstes.css);
@import url(../../../components/page/MasterDetail/masterdetail.css);
</style>