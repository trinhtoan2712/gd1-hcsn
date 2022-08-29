
<template>
    <div id="dlgAssetDetail" class="dialog">
        <div class="frame_dialog">
            <div class="dialog_header">
                <div v-if="isFormAdd" class="dialog_header-left">
                    <h4 style="margin: unset">Thêm tài sản</h4>
                </div>
                <div v-if="!isFormAdd" class="dialog_header-left">
                    <h4 style="margin: unset">Sửa tài sản</h4>
                </div>
                <div class="btn-header-right" @click="showDetailFunction(false)">
                    <div class="btn-close-dialog icon-content btn-cancel-dialog"><span class="tooltip">Đóng</span>
                    </div>
                </div>
            </div>
            <div class="dialog_content">
                <div class="row" role="row">
                    <div class="col">
                        <label>Mã tài sản (<span class="input--required">*</span>)</label>
                        <input tabindex="1" id="txtFixedAssetCode" ref="txtAssetCode" name-property="mã tài sản"
                            type="text" class="input" placeholder="Nhập mã tài sản" required
                            v-model="asset.fixedAssetCode" @blur="checkValidate(this.$refs['txtAssetCode'])">
                    </div>
                    <div class="col" style="grid-column: span 2;">
                        <label>Tên tài sản (<span class="input--required">*</span>)</label>
                        <input tabindex="2" id="txtFixedAssetName" ref="txtFixedAssetName" name-property="tên tài sản"
                            type="text" class="input" placeholder="Nhập tên tài sản" v-model="asset.fixedAssetName"
                            @blur="checkValidate(this.$refs['txtFixedAssetName'])">
                    </div>
                    <div class="col">
                        <label>Mã bộ phận sử dụng (<span class="input--required">*</span>)</label>
                        <BaseComboboxForm :url="'http://localhost:14537/api/Departments'" :propValue="'DepartmentID'"
                            :propText="'DepartmentCode'" :placText="'Chọn mã loại tài sản'" :propName="'DepartmentName'"
                            v-on:getNameDepartment="getNameDepartment" :tabIndex="4" :valDefault="asset.departmentCode">
                        </BaseComboboxForm>
                    </div>
                    <div class="col" style="grid-column: span 2;">
                        <label>Tên bộ phận sử dụng </label>
                        <input id="txtDepartmentName" type="text" class="input input-disable" disabled
                            v-model="asset.departmentName">
                    </div>
                    <div class="col">
                        <label>Mã loại tài sản (<span class="input--required">*</span>)</label>
                        <BaseComboboxForm :url="'http://localhost:14537/api/FixedAssetCategorys'"
                            :propValue="'FixedAssetCategoryID'" :propText="'FixedAssetCategoryCode'"
                            :placText="'Chọn mã bộ phận sử dụng'" :propName="'FixedAssetCategoryName'"
                            :valDefault="asset.fixedAssetCategoryCode" v-on:getNameCategory="getNameCategory"
                            :tabIndex="3">
                        </BaseComboboxForm>
                    </div>
                    <div class="col" style="grid-column: span 2;">
                        <label>Tên loại tài sản</label>
                        <input id="txtFixedAssetCategoryName" type="text" class="input input-disable" disabled
                            v-model="asset.fixedAssetCategoryName">
                    </div>
                    <div class="col">
                        <label>Số lượng (<span class="input--required">*</span>)</label>
                        <div class="input-updown">
                            <input tabindex="5" id="txtQuantity" name-property="số lượng" type="number"
                                class="input input-number" v-model="asset.quantity" min="1" ref="txtQuantity"
                                @blur="checkValidate(this.$refs['txtQuantity'])">
                            <div class="btn-updown-number">
                                <div @click="incrementNumber" class="icon-up-number icon-content"></div>
                                <div @click="decrementNumber" class="icon-down-number icon-content"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <label>Nguyên giá (<span class="input--required">*</span>)</label>
                        <input tabindex="6" id="txtCost" name-property="nguyên giá" type="text"
                            @change="depreciationValueChange" class="input number-right" @input="formatInputNumber()"
                            v-model="asset.cost" ref="txtCost" @blur="checkValidate(this.$refs['txtCost'])">
                    </div>
                    <div class="col">
                        <label>Tỉ lệ hao mòn (%) (<span class="input--required">*</span>)</label>
                        <input tabindex="7" id="txtDepreciationRate" name-property="tỉ lệ hao mòn" type="text"
                            class="input number-right" v-model="asset.depreciationRate"
                            @change="depreciationValueChange()" ref="txtDepreciationRate"
                            @blur="checkValidate(this.$refs['txtDepreciationRate'])">
                    </div>
                    <div class="col" id="valid-date-use">
                        <label>Ngày mua (<span class="input--required">*</span>)</label>
                        <input tabindex="8" id="txtPurchaseDate" type="date" class="input" name-property="ngày mua"
                            v-model="asset.purchaseDate" ref="txtPurchaseDate"
                            @blur="checkValidate(this.$refs['txtPurchaseDate'])">
                    </div>
                    <div class="col" id="valid-date-buy">
                        <label>Ngày sử dụng (<span class="input--required">*</span>)</label>
                        <input tabindex="9" id="txtProductionDate" type="date" class="input"
                            name-property="ngày sử dụng" v-model="asset.productionDate" ref="txtProductionDate"
                            @blur="checkValidate(this.$refs['txtProductionDate'])">
                    </div>

                    <div class="col input-updown">
                        <label>Năm theo dõi</label>
                        <input id="txtTrackedYear" name-property="" type="text" class="input number-right input-disable"
                            v-model="asset.trackedYear" disabled>
                    </div>
                    <div class="col">
                        <label>Số năm sử dụng (<span class="input--required">*</span>)</label>
                        <div class="input-updown">
                            <input tabindex="10" id="txtLifeTime" name-property="số năm sử dụng" type="number"
                                class="input input-number" v-model="asset.lifeTime" min="1" ref="txtLifeTime"
                                @blur="checkValidate(this.$refs['txtLifeTime'])">
                            <div class="btn-updown-number">
                                <div @click="incrementYear" class="icon-up-number icon-content"></div>
                                <div @click="decrementYear" class="icon-down-number icon-content"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <label>Giá trị hao mòn năm(<span class="input--required">*</span>)</label>
                        <input tabindex="11" id="txtdepreciationValue" name-property="giá trị hao mòn năm" type="text"
                            class="input number-right" v-model="asset.depreciationValue" @input="formatInputNumber()"
                            ref="txtdepreciationValue" @blur="checkValidate(this.$refs['txtdepreciationValue'])">
                    </div>
                </div>

            </div>
            <div class="dialog_footer">
                <button tabindex="13" id="btnClose" class="btn-dialog btn btn-cancel-dialog-asset"
                    @click="showDialogWarning()"
                    @keydown.tab.prevent="processTags">Hủy</button>
                <button type="submit" tabindex="12" id="btnSave" @click="btnSaveOnClick(asset)" class="btn-dialog btn"
                    style="color: #fff">Lưu</button>
            </div>
        </div>
    </div>
    <div v-if="isCancel" id="dlg-warning" class="dialog dialog--warning">
        <div class="dialog__content ">
            <div class="dialog__container">
                <div class="icon-warning-dialog icon-content"></div>
                <div class="dialog__body">
                    <i style="color: yellow" class="fa-solid fa-2xl fa-triangle-exclamation"></i>
                    <div class="dialog__msg-item">
                        {{errMessWarning}}
                    </div>
                </div>
            </div>
            <div class="dialog__footer">
                <button type="submit" id="btnSave" class="btn-dialog btn" style="color: #fff" @click="showDetailFunction(false)">Hủy bỏ</button>
                <button @click="hideDialogWarning()" id="btnClose" class="btn-dialog btn btn-cancel-dialog-asset">Không</button>
            </div>
        </div>
    </div>
    <div v-if="isSave" id="dlg-warning" class="dialog dialog--warning">
        <div class="dialog__content ">
            <div class="dialog__container">
                <div class="icon-warning-dialog icon-content"></div>
                <div class="dialog__body">
                    <i style="color: yellow" class="fa-solid fa-2xl fa-triangle-exclamation"></i>
                    <div class="dialog__msg-item">
                        {{errMessWarning}}
                    </div>
                </div>
            </div>
            <div class="dialog__footer">
                <button type="submit" id="btnSave" class="btn-dialog btn" style="color: #fff" @click="hideDialogValid()">Đồng ý</button>
            </div>
        </div>
    </div>
    <BaseLoading v-if="isShowLoading"></BaseLoading>

</template>
<script>
import { formatPrice, formatDate, formatNumber } from "../../common/TheCommon"
// import Datepicker from 'vuejs3-datepicker';
import axios from 'axios'
import BaseLoading from '../../base/BaseLoading.vue'

export default {
    components: { BaseLoading },
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
        // Nếu rỗng thì thêm class viền đỏ
        checkValidate(valInput) {
            if (!valInput.value) {
                valInput.classList.add("border-red");
            }
            else {
                valInput.classList.remove("border-red");
            }
        },

        // gọi hàm format tiền và ngày tháng
        formatPrice, formatDate, formatNumber,

        //Tính giá trị hao mòn
        depreciationValueChange() {
            try {
                this.asset.depreciationValue = (this.asset.cost).replace(/[^0-9]/g, '') * (this.asset.depreciationRate / 100);
                this.asset.depreciationValue = formatPrice(this.asset.depreciationValue)
            } catch (error) {
                console.log(error);
            }
        },

        //format input number
        formatInputNumber() {
            try {
                this.asset.cost = formatPrice(this.asset.cost)
                this.asset.quantity = formatPrice(this.asset.quantity)
                this.asset.depreciationValue = formatPrice(this.asset.depreciationValue)
            } catch (error) {
                console.log(error);
            }
        },

        //valid số lượng
        incrementNumber() {
            try {
                this.asset.quantity++
            } catch (error) {
                console.log(error);
            }
        },
        decrementNumber() {
            try {
                this.asset.quantity = this.asset.quantity === 1 ? 1 : this.asset.quantity - 1;
            } catch (error) {
                console.log(error);
            }
        },

        //valid số năm sử dụng
        incrementYear() {
            try {
                this.asset.lifeTime++;
            } catch (error) {
                console.log(error);
            }
        },
        decrementYear() {
            try {
                this.asset.lifeTime = this.asset.lifeTime === 1 ? 1 : this.asset.lifeTime - 1;
            } catch (error) {
                console.log(error);
            }
        },

        // lấy ra năm hiện tại
        printYear() {
            try {
                return new Date().getFullYear();
            } catch (error) {
                console.log(error);
            }
        },

        // Tự động điền tên bộ phận sử dụng
        getNameDepartment(name, id) {
            this.asset.departmentName = name;
            this.asset.departmentID = id;
        },

        // Tự động điền tên loại tài sản
        getNameCategory(name, id) {
            this.asset.fixedAssetCategoryName = name;
            this.asset.fixedAssetCategoryID = id;
        },

        // Vòng lặp focus
        processTags() {
            this.$refs.txtAssetCode.focus()
        },

        validDateAsset(asset) {
            if (!asset.fixedAssetId || !asset.fixedAssetCode || !asset.fixedAssetName || !asset.departmentID || !asset.fixedAssetCategoryID || !asset.purchaseDate || !asset.cost || !asset.quantity || !asset.depreciationRate || !asset.trackedYear || !asset.lifeTime || !asset.depreciationValue) {
                this.isValid = false;
                console.log(this.isValid);
            }else {
                this.isValid = true;
                console.log(this.isValid);
            }
        },
        showDialogWarning() {
            try {
                this.isCancel = true;
                this.errMessWarning = "Bạn có muốn hủy bỏ khai báo tài sản này không ?"
            } catch (error) {
                console.log(error);
            }
        },

        hideDialogWarning() {
            try {
                this.isCancel = false;
            } catch (error) {
                console.log(error);
            }
        },

        hideDialogValid() {
            try {
                this.isSave = false;
            } catch (error) {
                console.log(error);
            }
        },

        // Lưu thông tin tài sản
        btnSaveOnClick(asset) {
            try {

                this.validDateAsset(asset);
                if(this.isValid) {
                    this.isShowLoading = true;
                    const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        "fixedAssetId": "00000000-0000-0000-0000-000000000000",
                        "fixedAssetCode": asset.fixedAssetCode,
                        "fixedAssetName": asset.fixedAssetName,
                        "departmentID": asset.departmentID,
                        "fixedAssetCategoryID":asset.fixedAssetCategoryID ,
                        "purchaseDate":"2022-08-28T06:48:27.824Z",
                        "cost": formatNumber(asset.cost),
                        "quantity": asset.quantity,
                        "depreciationRate": asset.depreciationRate,
                        "trackedYear": asset.trackedYear,
                        "lifeTime": asset.lifeTime,
                        "createdBy":"TVTOAN",
                        "createdDate": "2022-08-28T06:48:27.824Z",
                        "modifiedBy": "",
                        "modifiedDate": "",
                        "productionDate": "2022-08-28T06:48:27.824Z",
                        "depreciationValue": formatNumber(asset.depreciationValue)
                    })
                };
                fetch("http://localhost:14537/api/FixedAssets", requestOptions)
                    .then(res => res.json())
                    .then(data => { this.resApi = data.data })
                    location.reload();
                    this.asset = {};
                }else {
                    this.isSave = true;
                    this.errMessWarning = "Vui lòng nhập đầy đủ thông tin";
                }
            } catch (error) {
                console.log(error);
            }
        },

    },
    watch: {
        'asset.fixedAssetName': function (newValue, oldValue) {
            if (this.isFormAdd == true) {
                if (!newValue) {
                    this.isValid = false;
                } else {
                    this.isValid = true;
                    this.errMessWarning = "Bạn có muốn hủy bỏ chỉnh sửa tài sản này ?";
                }
            }
            if(this.isFormAdd == false) {
                if(newValue != oldValue && newValue) {
                    this.isChange = true;
                    this.isValid = true;
                    this.errMessWarning = "Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này ?";
                } else {
                    this.isChange = false;
                    this.isValid = false;
                    this.errMessWarning = "Bạn có muốn hủy bỏ chỉnh sửa tài sản này ?";
                }
            }
        }
    },
    created() {
        this.asset = this.assetSelected;
        //gọi api lấy dữ liệu
        axios.get("http://localhost:14537/api/FixedAssets/new-code")
            .then(res => {
                if (this.asset.fixedAssetCode) {
                    this.isFormAdd = false
                    return null;
                }
                else {
                    this.isFormAdd = true
                    this.asset.fixedAssetCode = res.data
                }
            });
    },
    data() {
        return {
            isShowLoading: false,
            isSave:false,
            isCancel: false,
            isChange: false,
            isFormAdd: true,
            isValid: false,
            isWarning: false,
            asset: {},
            fixedAssetCategoryName: '',
            departmentName: '',
            errMessWarning: '',
            resApi: {},
        };
    },
    mounted: function () {
        // gán curYear bằng năm hiện tại
        this.asset.trackedYear = this.printYear();

        // gọi hàm format number
        this.formatInputNumber();

        // auto focus trong form
        this.$refs.txtAssetCode.focus();
    }
};
</script>
<style scoped>
@import url(../../../style/page/asstes.css);
@import url(../../../style/base/icon.css);
@import url(../../../style/base/comboboxform.css);
@import url(../../../style/base/input.css);
@import url(../../../style/base/datepicker.css);
@import url(../../../style/base/warning-cancel.css);
@import url(../../../style/base/warning-delete.css);
</style>