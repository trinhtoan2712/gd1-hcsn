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
                    <div class="row" style="background-color: #fff; margin: 0px 10px; padding:0px 0px 5px 0px;">
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
                    </div>
                    <div class="col-title" style="grid-column: span 3;">
                        <h5 style="font-weight: 700"> Thông tin chi tiết </h5>
                    </div>
                    <div class="row"  style="background-color: #fff; margin:0px 10px 10px 10px;">
                        <div class="col-base" style="grid-column: span 3; padding-bottom: 0px;">
                            <div class="header-table-base">
                                <div class="">
                                    <div class="form-search-table-base">
                                        <div class="form-search__icon icon-small"></div>
                                        <input class="form-search__input" ref="txtSearch" type="text"
                                            placeholder="Tìm kiếm theo tài sản">
                                    </div>
                                </div>
                                <div class="header-table-right">
                                    <div class="-base"
                                        style="  box-shadow:0 2px 6px rgba(0, 0, 0, .16); width:90px;">
                                        <button @click="showDetail(true)" tabindex="13" id="btnClose" class="btn btn-cancel-dialog-asset" style="font-size:13px">
                                            Chọn tài sản
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-base" style="grid-column: span 3; height: 200px;">
                            <TableBase v-on:listUpdate="listUpdate" :voucherID="assetIncrement.voucherID" :listAsset="listAsset" :isShowFunction="true" v-on:listDelete="listDelete"  v-on:idFixedAssettDelete="idFixedAssettDelete"></TableBase>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="dialog_footer">
                <button tabindex="13" id="btnClose" class="btn-dialog btn btn-cancel-dialog-asset">Hủy</button>
                <button type="submit" tabindex="12" id="btnSave" class="btn-dialog btn" style="color: #fff"
                    @click="btnSaveOnClick(assetIncrement)">Lưu</button>
            </div>
        </div>
    </div>
    <TheDialogSelectAsset v-if="isShowDialogDetail" :showDetailChil="isShowDialogDetail"
        :showDetailFunction="showDetail" v-on:addListAssetSelected="addListAssetSelected"/>
           <BaseLoading v-if="isShowLoading"></BaseLoading>

</template>

<script>
import TheDialogSelectAsset from './TheDialogSelectAsset.vue';
import Datepicker from 'vuejs3-datepicker';
import TableBase from '../../base/BaseTableFixedAsset.vue'
import { EndPoint } from '../../common/TheConst'
import axios from 'axios'
import BaseLoading from '../../base/BaseLoading.vue'
import { uuid } from 'vue-uuid'

export default {

    components: { Datepicker, TableBase, BaseLoading ,TheDialogSelectAsset},
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
        isFormUpdate: {
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
                    this.assetIncrement.price = res.data[0].Price;
                    this.assetIncrement.createdDate = res.data[0].CreatedDate;
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
            totalIncrement: 0,
            isShowLoading: false,
            isShowDialogDetail: false,
            assetIncrement: {},
            listAsset: [],
            listDeleteDialog:[],
            listUpdateDialog:[],
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
        * Lấy danh sách tài có sửa nguồn vốn
        * TVTOAN (26/07/2022)
        */
        listUpdate(list) {
            try {
                this.totalIncrement = 0;
                this.listUpdateDialog = list;
                for (var i = 0; i < this.listUpdateDialog.length; i++) {
                    this.totalIncrement += Number(this.listUpdateDialog[i].cost);
                }
                console.log(this.totalIncrement);
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Lấy danh sách tài sản đã chọn
        * TVTOAN (26/07/2022)
        */
        addListAssetSelected(listAsset) {
            try {
                this.listAsset = listAsset;
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Xóa id khỏi danh sách thêm
        * TVTOAN (26/07/2022)
        */
        idFixedAssettDelete(id) {
            try {
                var newArr = this.listAsset.filter(item => item.fixedAssetId !== id);
                this.listAsset = newArr;
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Lấy danh sách tài sản xóa
        * TVTOAN (26/07/2022)
        */
        listDelete(listDelete) {
            try {
                this.listDeleteDialog = listDelete;
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Lấy danh sách tài sản xóa
        * TVTOAN (26/07/2022)
        */
        deleteFixedAssetIncrementDetail() {
            try {
                var listDeleteFixedAssetId = [];
                for(var i = 0; i < this.listDeleteDialog.length; i++) {
                    listDeleteFixedAssetId.push(this.listDeleteDialog[i]);
                }
                axios.delete(`${EndPoint.END_POINT_FIXED_ASSET_INCREMENT_DETAIL_LIST}`, { data: listDeleteFixedAssetId })
                .then(res => {
                  if (res.status == 200) {
                    axios.put(`${EndPoint.END_POINT_FIXED_ASSET}?status=0`, listDeleteFixedAssetId)
                  }
                })
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Tạo data để thêm chi tiết chứng từ
        * TVTOAN (26/07/2022)
        */
        insertIncrementDetail(voucherId) {
            try{                
                var dataInsertIncrementDetail = [];
                for(let i = 0; i < this.listAsset.length; i++) {
                    dataInsertIncrementDetail.push({
                        "budgetID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        "fixedAssetID": this.listAsset[i].fixedAssetId,
                        "voucherID":voucherId,
                    })
                }
                return dataInsertIncrementDetail;
            }catch(error) {
                console.log(error)
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
        btnSaveOnClick(assetIncrement) {
            if (this.isFormAdd == true) {
                this.isShowLoading = true;
                const dataInsert = {
                    "voucherID": uuid.v1(),
                    "voucherCode": assetIncrement.voucherCode.toString(),
                    "voucherDate": assetIncrement.voucherDate,
                    "incrementDate": assetIncrement.incrementDate,
                    "description": assetIncrement.description,
                    "createdBy": "TVTOAN",
                    "createdDate": new Date(),
                    "modifiedBy": "TVTOAN",
                    "modifiedDate": new Date(),
                    "price": this.totalIncrement.toString(),
                };
                let result = this.insertIncrementDetail(dataInsert.voucherID);
                if(result.length > 0) {
                    axios.post(`${EndPoint.END_POINT_FIXED_ASSET_INCREMENT}`, dataInsert)
                    .then(res => {
                        if (res.status == '200') {
                            this.resApi = res;
                            this.showDetailFunction(false);
                            axios.post(`${EndPoint.END_POINT_FIXED_ASSET_INCREMENT_DETAIL_LIST}`, result)
                            .then(res => {
                                console.log(res);
                                var listFixedAssetId = [];
                                for(var i = 0; i < result.length; i++) {
                                    listFixedAssetId.push(result[i].fixedAssetID);
                                }
                                axios.put(`${EndPoint.END_POINT_FIXED_ASSET}?status=1`, listFixedAssetId)
                                .then(res => {
                                    console.log(res);
                                })
                            })
                            this.assetIncrement = {};    
                            this.getData(this.paging);
                            this.$emit('activeAssetNew', dataInsert.voucherID);

                        } else {
                            this.showToastFail();
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
                }else {
                    console.log("rỗng");
                }

            }if(this.isFormUpdate == true){
                this.isShowLoading = true;
                const dataUpdate = {
                    "voucherID": assetIncrement.voucherID,
                    "voucherCode": assetIncrement.voucherCode.toString(),
                    "voucherDate": assetIncrement.voucherDate,
                    "incrementDate": assetIncrement.incrementDate,
                    "description": assetIncrement.description,
                    "createdBy": "TVTOAN",
                    "createdDate": assetIncrement.createdDate,
                    "modifiedBy": "TVTOAN",
                    "modifiedDate": new Date(),
                    "price": this.totalIncrement.toString(),
                };
                this.deleteFixedAssetIncrementDetail();
                axios.put(`${EndPoint.END_POINT_FIXED_ASSET_INCREMENT}?recordID=${this.assetIncrement.voucherID}`, dataUpdate)
                    .then(res => {
                        if (res.status == '201') {
                            this.resApi = res;
                            this.showDetailFunction(false);
                            let result = this.insertIncrementDetail(dataUpdate.voucherID);
                            if(result.length > 0) {
                            axios.post(`${EndPoint.END_POINT_FIXED_ASSET_INCREMENT_DETAIL_LIST}`, result)
                            .then(res => {
                                console.log(res);
                                var listFixedAssetId = [];
                                for(var i = 0; i < result.length; i++) {
                                    listFixedAssetId.push(result[i].fixedAssetID);
                                }
                                axios.put(`${EndPoint.END_POINT_FIXED_ASSET}?status=1`, listFixedAssetId)
                                .then(res => {
                                    console.log(res);
                                })
                            })}
                            this.assetIncrement = {};
                            this.getData(this.paging);
                            this.$emit('activeAssetNew', dataUpdate.voucherID);
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