
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
                            <input tabindex="1" id="txtFixedAssetCode" ref="txtId" name-property="mã tài sản"
                                type="text" class="input" placeholder="Nhập mã tài sản" required v-model="asset.CustomerCode">
                        </div>
                        <div class="col" style="grid-column: span 2;">
                            <label>Tên tài sản (<span class="input--required">*</span>)</label>
                            <input tabindex="2" id="txtFixedAssetName" name-property="tên tài sản" type="text"
                                class="input" placeholder="Nhập tên tài sản" v-model="asset.fixedAssetName" @blur="checkRequired(this.$refs['txtFixedAssetName'])">
                        </div>
                        <div class="col">
                            <label>Mã bộ phận sử dụng (<span class="input--required">*</span>)</label>
                            <BaseComboboxForm :url="'https://cukcuk.manhnv.net/api/v1/Positions'"
                                :propValue="'PositionId'" :propText="'PositionCode'"
                                :placText="'Chọn mã bộ phận sử dụng'" :propName="'PositionName'" :tabIndex="3"
                                v-on:getNameDepartment="getNameDepartment">
                            </BaseComboboxForm>
                        </div>
                        <div class="col" style="grid-column: span 2;">
                            <label>Tên bộ phận sử dụng </label>
                            <input id="txtPositionName" type="text" class="input" disabled v-model="idepartmentName">
                        </div>
                        <div class="col">
                            <label>Mã loại tài sản (<span class="input--required">*</span>)</label>
                            <BaseComboboxForm :url="'https://cukcuk.manhnv.net/api/v1/Departments'"
                                :propValue="'DepartmentId'" :propText="'DepartmentCode'"
                                :placText="'Chọn mã loại tài sản'" :propName="'DepartmentName'"
                                v-on:getNameCategory="getNameCategory" :tabIndex="4">
                            </BaseComboboxForm>
                        </div>
                        <div class="col" style="grid-column: span 2;">
                            <label>Tên loại tài sản</label>
                            <input id="txtFixedAssetCategoryName" type="text" class="input" disabled
                                v-model="nameCategory">
                        </div>
                        <div class="col">
                            <label>Số lượng (<span class="input--required">*</span>)</label>
                            <div class="input-updown">
                                <input tabindex="5" id="txtQuantity" name-property="số lượng" type="number"
                                    class="input input-number" v-model="asset.Quantity" min="1">
                                <div class="btn-updown-number">
                                    <div @click="incrementNumber" class="icon-up-number icon-content"></div>
                                    <div @click="decrementNumber" class="icon-down-number icon-content"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <label>Nguyên giá (<span class="input--required">*</span>)</label>
                            <input tabindex="6" id="txtCost" name-property="nguyên giá" type="text"
                                class="input number-right" v-model="asset.Cost">
                        </div>
                        <div class="col">
                            <label>Tỉ lệ hao mòn (%) (<span class="input--required">*</span>)</label>
                            <input tabindex="7" id="txtDepreciationRate" name-property="tỉ lệ hao mòn"
                                type="text" class="input number-right" v-model="asset.depreciationRate"
                                @change="depreciationValueChang">
                        </div>
                        <div class="col" id="valid-date-use">
                            <label>Ngày mua (<span class="input--required">*</span>)</label>
                            <input tabindex="8" id="txtPurchaseDate" type="date" class="input" name-property="ngày mua"
                             v-model="asset.purchaseDate">
                        </div>
                        <div class="col" id="valid-date-buy">
                            <label>Ngày sử dụng (<span class="input--required">*</span>)</label>
                            <input tabindex="9" id="txtProductionDate" type="date" class="input"
                                name-property="ngày sử dụng" v-model="asset.productionDate">
                        </div>

                        <div class="col input-updown">
                            <label>Năm theo dõi</label>
                            <input id="txtTrackedYear" name-property="" type="text" class="input number-right"
                                v-model="asset.trackedYear" disabled>
                        </div>
                        <div class="col">
                            <label>Số năm sử dụng (<span class="input--required">*</span>)</label>
                            <div class="input-updown">
                                <input tabindex="10" id="txtLifeTime" name-property="số năm sử dụng"
                                    type="number" class="input input-number" v-model="asset.lifeTime" min="1">
                                <div class="btn-updown-number">
                                    <div @click="incrementYear" class="icon-up-number icon-content"></div>
                                    <div @click="decrementYear" class="icon-down-number icon-content"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <label>Giá trị hao mòn năm(<span class="input--required">*</span>)</label>
                            <input tabindex="11" id="txtAssetName" name-property="giá trị hao mòn năm"
                                type="text" class="input number-right" v-model="asset.depreciationValue">
                        </div>
                    </div>

                </div>
                <div class="dialog_footer">
                    <button tabindex="13" id="btnClose" class="btn-dialog btn btn-cancel-dialog-asset"
                        @click="showDetailFunction(false)" style="background-color:#fff"
                        @keydown.tab.prevent="processTags">Hủy</button>
                    <button type="submit" tabindex="12" id="btnSave" @click="btnSaveOnClick(asset)" class="btn-dialog btn btn-save-dialog-asset"
                        style="color: #fff">Lưu</button>
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

        validate () {
            try {
                let res = this.asset;
                if(res.fixedAssetName) {
                    this.isValid = true;
                }
            } catch (error) {
                console.log(error);
            }
        },

        checkRequired (result) {
            if(!result.fixedAssetName) {
                result.classList.add("border-red");
            }
        },


        //Tính giá trị hao mòn
        depreciationValueChang() {
            try {
                this.depreciationValue = this.Cost * (this.depreciationRate / 100);
            } catch (error) {
                console.log(error);
            }
        },

        btnSaveOnClick() {
            try {
                console.log("success");
            } catch (error) {
                console.log(error);
            }
        },

        //valid số lượng
        incrementNumber() {
            this.Quantity++
        },
        decrementNumber() {
            this.Quantity = this.Quantity === 1 ? 1 : this.Quantity - 1;
        },

        //valid số năm sử dụng
        incrementYear() {
            this.lifeTime++;
        },
        decrementYear() {
            this.lifeTime = this.lifeTime === 1 ? 1 : this.lifeTime - 1;
        },

        // lấy ra năm hiện tại
        printYear() {
            return new Date().getFullYear();
        },

        // Tự động điền tên bộ phận sử dụng
        getNameDepartment(name) {
            this.departmentName = name
        },

        // Tự động điền tên loại tài sản
        getNameCategory(name) {
            this.nameCategory = name
        },

        // Vòng lặp focus
        processTags() {
            this.$refs.txtId.focus()
        },
    },
    watch: {

    },
    created() {
        this.asset = this.assetSelected;
    },
    data() {
        return {
            isValid: false,
            asset: {
                fixedAssetCode: '',
                fixedAssetName: '',
                departmentID: '',
                departmentCode: '',
                departmentName: '',
                fixedAssetCategoryID: '',
                fixedAssetCategoryCode: '',
                fixedAssetCategoryName: '',
                purchaseDate: Date,
                Cost: 0,
                Quantity: 1,
                depreciationRate: 0,
                trackedYear: 1,
                lifeTime: 1,
                createdBy: 'TVTOAN',
                modifiedBy: '',
                productionDate: Date,
                nameCategory: '',
                depreciationValue: 0,
            },
            fixedAssetCode: '',
            fixedAssetName: '',
            departmentID: '',
            departmentCode: '',
            departmentName: '',
            fixedAssetCategoryID: '',
            fixedAssetCategoryCode: '',
            fixedAssetCategoryName: '',
            purchaseDate: Date,
            Cost: 0,
            Quantity: 1,
            depreciationRate: 0,
            trackedYear: 1,
            lifeTime: 1,
            createdBy: 'TVTOAN',
            modifiedBy: '',
            productionDate: Date,
            nameCategory: '',
            depreciationValue: 0,
        };
    },
    mounted: function () {
        // gán curYear bằng năm hiện tại
        this.trackedYear = this.printYear();
        // vòng lặp focus trong form
        this.$refs.txtId.focus();
    }
};
</script>
<style scoped>
@import url(../../../style/page/asstes.css);
@import url(../../../style/base/icon.css);
@import url(../../../style/base/comboboxform.css);
@import url(../../../style/base/input.css);
</style>