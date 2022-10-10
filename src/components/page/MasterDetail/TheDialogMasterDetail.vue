<template>
    <div id="dlgAssetDetail" class="dialog">
        <div class="frame_dialog-input">
            <div class="dialog_header-base">
                <div class="dialog_header-left">
                    <h4 style="margin: unset">{{title}}</h4>
                </div>
                <div class="btn-header-right" @click="showDetailFunction(false)">
                    <i class="fa-solid fa-xmark fa-xl"></i>
                    <div class="btn-close-dialog btn-cancel-dialog">
                        <span class="tooltip">Đóng</span>
                    </div>
                </div>
            </div>
            <div class="dialog_content-base">
                <div class="row" role="row">
                    <div class="col-title" style="grid-column: span 3;">
                        <h5 style="font-weight: 700"> Thông tin chứng từ </h5>
                    </div>
                    <div class="col-base">
                        <label>Mã chứng từ <span class="input--required">*</span></label>
                        <input tabindex="1" ref="voucherCode" v-model="assetIncrement.voucherCode"
                            name-property="mã tài sản" type="text" class="input" placeholder="Nhập mã chứng từ" required
                            maxlength="20">
                    </div>
                    <div class="col-base" id="valid-date-use">
                        <label>Ngày bắt đầu sử dụng <span class="input--required">*</span></label>
                        <datepicker class="" format="dd/MM/yyyy" v-model="assetIncrement.voucherDate"
                            placeholder="DD-MM-YYYY" :hideInput="false" ref="txtProductionDate" tabindex=""
                            :typeable="true">
                        </datepicker>
                    </div>
                    <div class="col-base" id="valid-date-use">
                        <label>Ngày ghi tăng <span class="input--required">*</span></label>
                        <datepicker class="" format="dd/MM/yyyy" v-model="assetIncrement.incrementDate"
                            placeholder="DD-MM-YYYY" :hideInput="false" ref="txtProductionDate" tabindex=""
                            :typeable="true">
                        </datepicker>
                    </div>
                    <div class="col-base" style="grid-column: span 3;">
                        <label> Ghi chú </label>
                        <input tabindex="2" ref="txtFixedAssetName" v-model="assetIncrement.description" type="text"
                            class="input" placeholder="Nhập ghi chú" maxlength="255">
                    </div>
                    <div class="col-title" style="grid-column: span 3;">
                        <h5 style="font-weight: 700"> Thông tin chi tiết </h5>
                    </div>
                    <div class="col-base" style="grid-column: span 3;">
                        <div class="header-table-base">
                            <div class="">
                                <div class="form-search-table-base">
                                    <div class="form-search__icon icon-small"></div>
                                    <input class="form-search__input" ref="txtSearch" type="text"
                                        placeholder="Tìm kiếm theo tài sản">
                                </div>
                            </div>
                            <div class="header-table-right">
                                <div class="form-option-base"
                                    style="  box-shadow:0 2px 6px rgba(0, 0, 0, .16); width:90px">
                                    <button tabindex="13" id="btnClose" class="btn btn-cancel-dialog-asset">Chọn tài
                                        sản</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-base" style="grid-column: span 3; height: 200px;">
                        <TableBase :voucherID="assetIncrement.voucherID"></TableBase>
                    </div>
                </div>
            </div>
            <div class="dialog_footer">
                <button tabindex="13" id="btnClose" class="btn-dialog btn btn-cancel-dialog-asset">Hủy</button>
                <button type="submit" tabindex="12" id="btnSave" class="btn-dialog btn" style="color: #fff"
                    @click="btnSaveOnClick">Lưu</button>
            </div>
        </div>
    </div>
    <BaseLoading v-if="isShowLoading"></BaseLoading>

</template>

<script>
import Datepicker from 'vuejs3-datepicker';
import TableBase from '../../base/BaseTableFixedAsset.vue'
import { EndPoint } from '../../common/TheConst'
import axios from 'axios'
import BaseLoading from '../../base/BaseLoading.vue'
import { uuid } from 'vue-uuid'

export default {

    components: { Datepicker, TableBase, BaseLoading },
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
        isFormAdd: {
            type: Boolean,
            default: false,
        },
        title: String,
    },
    created() {
        if (this.assetIncrementSelected.voucherCode != '') {
            axios.get(`${EndPoint.END_POINT_FIXED_ASSET_INCREMENT}/${this.assetIncrementSelected.voucherID}`)
                .then(res => {
                    this.assetIncrement.voucherID = res.data[0].VoucherID;
                    this.assetIncrement.voucherCode = res.data[0].VoucherCode;
                    this.assetIncrement.voucherDate = res.data[0].VoucherDate;
                    this.assetIncrement.incrementDate = res.data[0].IncrementDate;
                    this.assetIncrement.description = res.data[0].Description;
                    this.assetIncrement.price = res.data[0].Price
                })
        } else {
            axios.get(`${EndPoint.END_POINT_FIXED_ASSET_INCREMENT}/new-code`)
            .then(res => {
                this.assetIncrement.voucherCode = res.data
            })
            this.assetIncrement = this.assetIncrementSelected;
        }
    },
    data() {
        return {
            isShowLoading: false,

            assetIncrement: {},

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
        * Chức năng thêm chứng từ
        * TVTOAN (26/07/2022)
        */
        btnSaveOnClick() {
            if (this.isFormAdd == true) {
                this.isShowLoading = true;
                const dataInsert = {
                    "voucherID": uuid.v1(),
                    "voucherCode": this.assetIncrement.voucherCode.toString(),
                    "voucherDate": this.assetIncrement.voucherDate,
                    "incrementDate": this.assetIncrement.incrementDate,
                    "description": this.assetIncrement.description,
                    "createdBy": "TVTOAN",
                    "createdDate": new Date(),
                    "modifiedBy": "TVTOAN",
                    "modifiedDate": new Date(),
                    "price": this.assetIncrement.price,
                };
                axios.post(`${EndPoint.END_POINT_FIXED_ASSET_INCREMENT}`, dataInsert)
                    .then(res => {
                        if (res.status == '200') {
                            this.resApi = res;
                            this.showDetailFunction(false);
                            this.assetIncrement = {};
                            this.getData(this.paging);
                            this.$emit('activeAssetNew', res.data.voucherID);
                        } else {
                            this.showToastFail();
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
            }if(this.isFormUpdate == true) {
                this.isShowLoading = true;
                const dataUpdate = {
                    "voucherID": uuid.v1(),
                    "voucherCode": this.assetIncrement.voucherCode.toString(),
                    "voucherDate": this.assetIncrement.voucherDate,
                    "incrementDate": this.assetIncrement.incrementDate,
                    "description": this.assetIncrement.description,
                    "createdBy": "TVTOAN",
                    "createdDate": new Date(),
                    "modifiedBy": "TVTOAN",
                    "modifiedDate": new Date(),
                    "price": this.assetIncrement.price,
                };
                axios.put(`${EndPoint.END_POINT_FIXED_ASSET_INCREMENT}/${this.assetIncrement.voucherID}`, dataUpdate)
                    .then(res => {
                        if (res.status == '201') {
                            this.resApi = res;
                            this.showDetailFunction(false);
                            this.assetIncrement = {};
                            this.getData(this.paging);
                            this.$emit('activeAssetNew', res.data.voucherID);
                        } else {
                            this.showToastFail();
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
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