
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
                    <div class="btn-close-dialog icon-content btn-cancel-dialog-asset"><span class="tooltip">Đóng</span>
                    </div>
                </div>
            </div>
            <div class="dialog_content">
                <div class="row" role="row">
                    <div class="col">
                        <label>Mã tài sản (<span class="input--required">*</span>)</label>
                        <input tabindex="1" id="txtFixedAssetCode" ref="txtAssetCode" name-property="mã tài sản"
                            type="text" class="input" placeholder="Nhập mã tài sản" required
                            v-model="asset.CustomerCode" @blur="checkValidate(this.$refs['txtAssetCode'])">
                    </div>
                    <div class="col" style="grid-column: span 2;">
                        <label>Tên tài sản (<span class="input--required">*</span>)</label>
                        <input tabindex="2" id="txtFixedAssetName" ref="txtFixedAssetName" name-property="tên tài sản" type="text" class="input"
                            placeholder="Nhập tên tài sản" v-model="asset.fixedAssetName"
                            @blur="checkValidate(this.$refs['txtFixedAssetName'])">
                    </div>
                    <div class="col">
                        <label>Mã bộ phận sử dụng (<span class="input--required">*</span>)</label>
                        <BaseComboboxForm :url="'https://cukcuk.manhnv.net/api/v1/Positions'" :propValue="'PositionId'"
                            :propText="'PositionCode'" :placText="'Chọn mã bộ phận sử dụng'" :propName="'PositionName'"
                            :tabIndex="3" v-on:getNameDepartment="getNameDepartment">
                        </BaseComboboxForm>
                    </div>
                    <div class="col" style="grid-column: span 2;">
                        <label>Tên bộ phận sử dụng </label>
                        <input id="txtPositionName" type="text" class="input input-disable" disabled
                            v-model="departmentName">
                    </div>
                    <div class="col">
                        <label>Mã loại tài sản (<span class="input--required">*</span>)</label>
                        <BaseComboboxForm :url="'https://cukcuk.manhnv.net/api/v1/Departments'"
                            :propValue="'DepartmentId'" :propText="'DepartmentCode'" :placText="'Chọn mã loại tài sản'"
                            :propName="'DepartmentName'" v-on:getNameCategory="getNameCategory" :tabIndex="4">
                        </BaseComboboxForm>
                    </div>
                    <div class="col" style="grid-column: span 2;">
                        <label>Tên loại tài sản</label>
                        <input id="txtFixedAssetCategoryName" type="text" class="input input-disable" disabled
                            v-model="categoryName">
                    </div>
                    <div class="col">
                        <label>Số lượng (<span class="input--required">*</span>)</label>
                        <div class="input-updown">
                            <input tabindex="5" id="txtQuantity" name-property="số lượng" type="number"
                                class="input input-number" v-model="asset.Quantity" min="1" ref="txtQuantity" @blur="checkValidate(this.$refs['txtQuantity'])">
                            <div class="btn-updown-number">
                                <div @click="incrementNumber" class="icon-up-number icon-content"></div>
                                <div @click="decrementNumber" class="icon-down-number icon-content"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <label>Nguyên giá (<span class="input--required">*</span>)</label>
                        <input tabindex="6" id="txtCost" name-property="nguyên giá" type="text"
                           @change="depreciationValueChange" class="input number-right" @input="formatInputNumber()" v-model="Cost" ref="txtCost" @blur="checkValidate(this.$refs['txtCost'])">
                    </div>
                    <div class="col">
                        <label>Tỉ lệ hao mòn (%) (<span class="input--required">*</span>)</label>
                        <input tabindex="7" id="txtDepreciationRate" name-property="tỉ lệ hao mòn" type="text"
                            class="input number-right" v-model="depreciationRate"
                            @change="depreciationValueChange()" ref="txtDepreciationRate" @blur="checkValidate(this.$refs['txtDepreciationRate'])">
                    </div>
                    <div class="col" id="valid-date-use">
                        <label>Ngày mua (<span class="input--required">*</span>)</label>
                        <input tabindex="8" id="txtPurchaseDate" type="date" class="input" name-property="ngày mua"
                            v-model="asset.purchaseDate" ref="txtPurchaseDate" @blur="checkValidate(this.$refs['txtPurchaseDate'])">
                    </div>
                    <div class="col" id="valid-date-buy">
                        <label>Ngày sử dụng (<span class="input--required">*</span>)</label>
                        <input tabindex="9" id="txtProductionDate" type="date" class="input"
                            name-property="ngày sử dụng" v-model="asset.productionDate" ref="txtProductionDate" @blur="checkValidate(this.$refs['txtProductionDate'])">
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
                                class="input input-number" v-model="asset.lifeTime" min="1" ref="txtLifeTime" @blur="checkValidate(this.$refs['txtLifeTime'])">
                            <div class="btn-updown-number">
                                <div @click="incrementYear" class="icon-up-number icon-content"></div>
                                <div @click="decrementYear" class="icon-down-number icon-content"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <label>Giá trị hao mòn năm(<span class="input--required">*</span>)</label>
                        <input tabindex="11" id="txtdepreciationValue" name-property="giá trị hao mòn năm" type="text" 
                            class="input number-right" v-model="depreciationValue" @input="formatInputNumber()" ref="txtdepreciationValue" @blur="checkValidate(this.$refs['txtdepreciationValue'])">
                    </div>
                </div>

            </div>
            <div class="dialog_footer">
                <button tabindex="13" id="btnClose" class="btn-dialog btn btn-cancel-dialog-asset"
                    @click="showDetailFunction(false)" style="background-color:#fff"
                    @keydown.tab.prevent="processTags">Hủy</button>
                <button type="submit" tabindex="12" id="btnSave" @click="btnSaveOnClick(asset)" class="btn-dialog btn"
                    style="color: #fff">Lưu</button>
            </div>
        </div>
    </div>

</template>
<script>
import { formatPrice, formatDate } from "../../common/TheCommon"
import axios from 'axios'
export default {
    components: {},
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
        Validation() {
            var field = this.asset;
            try {
                if (!field.fixedAssetCode || !field.fixedAssetName || !field.departmentID || !field.fixedAssetCategoryID || !field.purchaseDate || !field.Cost || !field.Quantity || !field.depreciationRate || !field.lifeTime || !field.productionDate || !field.depreciationValue) {
                    this.isValid = true;
                    this.errMess = 'Vui lòng nhập những trường còn thiếu !!!'
                }
            } catch (error) {
                console.log(error)
            }
        },
        checkValidate(valInput) {
            if (!valInput.value) {
                valInput.classList.add("border-red");
            }
            else {
                valInput.classList.remove("border-red");
            }
        },

        // gọi hàm format tiền và ngày tháng
        formatPrice, formatDate,

        //Tính giá trị hao mòn
        depreciationValueChange() {
            try {
                this.depreciationValue = (this.Cost).replace(/[^0-9]/g , '') * (this.depreciationRate / 100);
                this.depreciationValue = formatPrice(this.depreciationValue)
            } catch (error) {
                console.log(error);
            }
        },

        //format input number
        formatInputNumber() {
            try {
                this.Cost = formatPrice(this.Cost)
                this.asset.Quantity = formatPrice(this.asset.Quantity)
                this.depreciationValue = formatPrice(this.depreciationValue)
                this.asset.PhoneNumber = formatPrice(this.asset.PhoneNumber)
            } catch (error) {
                console.log(error);
            }
        },

        //Hủy khai báo tài sản
        btnCancelOnClick() {

        },

        // Lưu thông tin tài sản
        btnSaveOnClick() {
            try {
                console.log("success");
            } catch (error) {
                console.log(error);
            }
        },

        //valid số lượng
        incrementNumber() {
            try {
                this.asset.Quantity++
                console.log(this.asset.Quantity);
            } catch (error) {
                console.log(error);
            }
        },
        decrementNumber() {
            try {
                this.asset.Quantity = this.asset.Quantity === 1 ? 1 : this.asset.Quantity - 1;
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
        getNameDepartment(name) {
            this.departmentName = name
        },

        // Tự động điền tên loại tài sản
        getNameCategory(name) {
            this.categoryName = name
        },

        // Vòng lặp focus
        processTags() {
            this.$refs.txtAssetCode.focus()
        },
    },
    watch: {

    },
    created() {
        this.asset = this.assetSelected;
        //gọi api lấy dữ liệu
        axios.get("https://cukcuk.manhnv.net/api/v1/Customers/NewCustomerCode")
            .then(res => {
                if(this.asset.CustomerCode) {
                    this.isFormAdd = false
                    return null;
                }
                else{
                       this.isFormAdd = true
                    this.asset.CustomerCode = res.data
                }
            });
    },
    data() {
        return {
            isFormAdd: false,
            isValid: false,
            isWarning: false,
            asset: {
                CustomerCode: '',
                fixedAssetCode: '',
                fixedAssetName: '',
                departmentID: '',
                fixedAssetCategoryID: '',
                purchaseDate: Date,
                Cost: 0,
                Quantity: 1,
                depreciationRate: 0,
                trackedYear: 1,
                lifeTime: 1,
                createdBy: 'TVTOAN',
                modifiedBy: '',
                productionDate: Date,
                depreciationValue: this.depreciationValue,
            },

            depreciationRate: 0,
            Cost: 0,
            depreciationValue:'',

            categoryName: '',
            departmentName: '',
            errMess: '',
        };
    },
    mounted: function () {
        // gán curYear bằng năm hiện tại
        this.asset.trackedYear = this.printYear();
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
</style>