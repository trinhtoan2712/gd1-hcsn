<template>
    <div id="dlgAssetDetail" class="dialog">
        <div class="frame_dialog-input">
            <div class="dialog_header-base">
                <div class="dialog_header-left">
                    <h4 style="margin: unset">Chọn tài sản</h4>
                </div>
                <div class="btn-header-right" @click="showDetailFunction(false)">
                    <i class="fa-solid fa-xmark fa-xl"></i>
                    <div class="btn-close-dialog btn-cancel-dialog">
                        <span class="tooltip">Đóng</span>
                    </div>
                </div>
            </div>
            <div class="dialog_content-base">
                <div class="" style="padding: 5px 11px">
                    <div class="form-search-table-base">
                        <div class="form-search__icon icon-small"></div>
                        <input style="width: 100%" class="form-search__input" ref="txtSearch" type="text" v-model="keyWord"
                            placeholder="Tìm kiếm theo mã tài sản và tên tài sản" v-on:keyup="btnSearch(keyWord, $event)">
                    </div>
                </div>
                <TableBase :isShowAllColumn="true" :isShowSummaryAll="true" :isShowCheckBox="true" :isShowQuantityRecords="true" :isShowSummary="true" :isShowPaging="true" :voucherID="isGetAll" v-on:listAssetSelected="listAssetSelected" :keyWord="keyWord"></TableBase>
            </div>
            <div class="dialog_footer">
                <button tabindex="13" @click="showDetailFunction(false)" id="btnClose" class="btn-dialog btn btn-cancel-dialog-asset">Hủy</button>
                <button type="submit" tabindex="12" id="btnSave" class="btn-dialog btn" style="color: #fff"
                    @click="btnSaveOnClick">Chọn</button>
            </div>
        </div>
    </div>

</template>

<script>
import TableBase from '../../base/BaseTableFixedAsset.vue'

export default {

    components: { TableBase },
    name: "TheDialogSelectAsset",
    emits: ["getNameDepartment", "getNameCategory", "validCombobox", "updateMessage", "returnIsDuplicate", "activeAssetNew"],
    props: {
        showDetailFunction: Function,
        showDetailChil: {
            type: Boolean,
            default: false,
        },
    },
    created() {
        
    },
    data() {
        return {
            isGetAll: 'getAll',
            keyWord: '',

            isShowLoading: false,
            isShowDialogDetail: false,
            assetIncrement: {},
            listAsset: [],

            paging: {
                keyWord: '',
                pageSize: 15,
                pageNumber: 1,
                totalPage: 0,
                maxVisibleButtons: 3,
            }
        }
    },
    methods: {
        /**
        * Tìm kiếm.
        * TVTOAN (06/08/2022)
        */
        btnSearch(key, e) {
            try {
                if (e.keyCode === 13) {
                    this.keyWord = key;
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Lấy danh sách tài sản đã chọn
        * TVTOAN (26/07/2022)
        */
        listAssetSelected(listAsset) {
            try {
                this.listAsset = listAsset;
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Chức năng mở dialog chọn tài sản
        * TVTOAN (26/07/2022)
        */
        showDetail(isShow) {
            try{
                this.isShowDialogDetail = isShow;
            }catch(error) {
                console.log(error)
            }
        },
        
        /**
        * Chức năng thêm chứng từ
        * TVTOAN (26/07/2022)
        */
        btnSaveOnClick() {
            try {
                this.$emit("addListAssetSelected", this.listAsset);
                this.showDetailFunction(false);
            } catch (error) {
                console.log(error);
            }
        },

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