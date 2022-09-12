<template>
    <div id="dlgAssetDetail" class="dialog">
        <div class="frame_dialog">
            <div class="dialog_header">
                <div class="dialog_header-left">
                    <h3 style="margin: unset">{{title}}</h3>
                </div>            
                <div class="btn-header-right" @click="showDetailFunction(false)">
                    <i class="fa-solid fa-xmark fa-2xl"></i>
                    <div class="btn-close-dialog btn-cancel-dialog">
                        <span class="tooltip">Đóng</span>
                    </div>
                </div>
            </div>
            <div class="dialog_content">
                <div class="row" role="row">
                    <div class="col">
                        <label>Mã tài sản <span class="input--required">*</span></label>
                        <input tabindex="1" id="txtFixedAssetCode" ref="txtAssetCode" name-property="mã tài sản"
                            type="text" class="input" placeholder="Nhập mã tài sản" required
                            v-model="asset.fixedAssetCode" @blur="checkValidate('fixedAssetCode', this.$refs['txtAssetCode'])">
                            <div id="fixedAssetCode" class="title-valid">Mã tài sản không hợp lệ</div>

                    </div>
                    <div class="col" style="grid-column: span 2;">
                        <label>Tên tài sản <span class="input--required">*</span></label>
                        <input tabindex="2" id="txtFixedAssetName" ref="txtFixedAssetName" name-property="tên tài sản"
                            type="text" class="input" placeholder="Nhập tên tài sản" v-model="asset.fixedAssetName"
                            @blur="checkValidate('fixedAssetName', this.$refs['txtFixedAssetName'])">
                            <div id="fixedAssetName" class="title-valid">Tên tài sản không hợp lệ</div>

                    </div>
                    <div class="col">
                        <label>Mã bộ phận sử dụng <span class="input--required">*</span></label>
                        <BaseComboboxForm :url="'http://localhost:14537/api/Departments'" :propValue="'DepartmentID'"
                            :propText="'DepartmentCode'" :placText="'Chọn mã loại tài sản'" :propName="'DepartmentName'"
                            :tabIndex="3" :valDefault="asset.departmentCode" v-on:getNameDepartment="getNameDepartment"
                            v-on:validCombobox="validCombobox">
                        </BaseComboboxForm>
                    </div>
                    <div class="col" style="grid-column: span 2;">
                        <label>Tên bộ phận sử dụng </label>
                        <input id="txtDepartmentName" type="text" class="input input-disable" disabled
                            v-model="asset.departmentName">
                    </div>
                    <div class="col">
                        <label>Mã loại tài sản <span class="input--required">*</span></label>
                        <BaseComboboxForm :url="'http://localhost:14537/api/FixedAssetCategorys'"
                            :propValue="'FixedAssetCategoryID'" :propText="'FixedAssetCategoryCode'"
                            :placText="'Chọn mã bộ phận sử dụng'" :propName="'FixedAssetCategoryName'" :tabIndex="4"
                            :valDefault="asset.fixedAssetCategoryCode" v-on:getNameCategory="getNameCategory"
                            v-on:validCombobox="validCombobox">
                        </BaseComboboxForm>
                    </div>
                    <div class="col" style="grid-column: span 2;">
                        <label>Tên loại tài sản</label>
                        <input id="txtFixedAssetCategoryName" type="text" class="input input-disable" disabled
                            v-model="asset.fixedAssetCategoryName">
                    </div>
                    <div class="col">
                        <label>Số lượng <span class="input--required">*</span></label>
                        <div class="input-updown">
                            <input tabindex="5" id="txtQuantity" name-property="số lượng" type="number"
                                class="input input-number" v-model="asset.quantity" min="1" ref="txtQuantity"
                                @blur="checkValidate('quantity', this.$refs['txtQuantity'])">
                            <div class="btn-updown-number">
                                <div @click="incrementNumber" class="icon-up-number icon-content"></div>
                                <div @click="decrementNumber" class="icon-down-number icon-content"></div>
                            </div>
                        </div>
                        <div id="quantity" class="title-valid">Số lượng không hợp lệ</div>
                    </div>
                    <div class="col">
                        <label>Nguyên giá <span class="input--required">*</span></label>
                        <input tabindex="6" id="txtCost" name-property="nguyên giá" type="text" 
                            @change="depreciationValueChange" class="input number-right" @input="formatInputNumber()"
                            v-model="asset.cost" ref="txtCost" @blur="checkValidate('cost', this.$refs['txtCost'])">
                            <div id="cost" class="title-valid">Nguyên giá không hợp lệ</div>
                    </div>
                    <div class="col">
                        <label>Tỉ lệ hao mòn (%) <span class="input--required">*</span></label>
                        <input tabindex="7" id="txtDepreciationRate" name-property="tỉ lệ hao mòn" type="text"
                            class="input number-right" v-model="asset.depreciationRate"
                            @change="depreciationValueChange()" ref="txtDepreciationRate"
                            @blur="checkValidate('depreciationRate' ,this.$refs['txtDepreciationRate'])">
                            <div id="depreciationRate" class="title-valid">Tỉ lệ hao mòn không hợp lệ</div>
                    </div>
                    <div class="col" id="valid-date-use">
                        <label>Ngày mua <span class="input--required">*</span></label>
                        <datepicker class="" format="dd/MM/yyyy" v-model="asset.purchaseDate" placeholder="DD-MM-YYYY"
                            :hideInput="false" ref="txtProductionDate" tabindex="9"
                            @input="formatInputNumber()"
                            :typeable="true">
                        </datepicker>
                    </div>
                    <div class="col" id="valid-date-buy">
                        <label>Ngày sử dụng <span class="input--required">*</span></label>
                        <datepicker class="" format="dd/MM/yyyy" v-model="asset.productionDate" placeholder="DD-MM-YYYY"
                            :hideInput="false" ref="txtProductionDate" tabindex="9"
                            :typeable="true">
                        </datepicker>
                    </div>
                    <div class="col input-updown">
                        <label>Năm theo dõi</label>
                        <input id="txtTrackedYear" name-property="" type="text" class="input number-right input-disable"
                            v-model="asset.trackedYear" disabled>
                    </div>
                    <div class="col">
                        <label>Số năm sử dụng <span class="input--required">*</span></label>
                        <div class="input-updown">
                            <input tabindex="10" id="txtLifeTime" name-property="số năm sử dụng" type="number"
                                class="input input-number" v-model="asset.lifeTime" min="1" ref="txtLifeTime"
                                @blur="checkValidate('lifeTime', this.$refs['txtLifeTime'])">
                            <div class="btn-updown-number">
                                <div @click="incrementYear" class="icon-up-number icon-content"></div>
                                <div @click="decrementYear" class="icon-down-number icon-content"></div>
                            </div>
                        </div>
                        <div id="lifeTime" class="title-valid">Số năm sử dụng không hợp lệ</div>
                    </div>
                    <div class="col">
                        <label>Giá trị hao mòn năm <span class="input--required">*</span></label>
                        <input tabindex="11" id="txtdepreciationValue" name-property="giá trị hao mòn năm" type="text"
                            class="input number-right" v-model="asset.depreciationValue" ref="txtdepreciationValue"
                            @blur="checkValidate('depreciationValue', this.$refs['txtdepreciationValue'])">
                            <div id="depreciationValue" class="title-valid">Giá trị hao mòn không hợp lệ</div>
                    </div>
                </div>

            </div>
            <div class="dialog_footer">
                <button tabindex="13" id="btnClose" class="btn-dialog btn btn-cancel-dialog-asset"
                    @click="showDialogWarning()" @keydown.tab.prevent="processTags">Hủy</button>
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
                    <i style="color: #C4D106" class="fa-solid fa-3x fa-triangle-exclamation"></i>
                    <div class="dialog__msg-item">
                        {{ errMessWarning }}
                    </div>
                </div>
            </div>
            <div class="dialog__footer">
                <button type="submit" id="btnSave" class="btn-dialog btn" style="color: #fff"
                    @click="showDetailFunction(false)">Hủy bỏ</button>
                <button @click="hideDialogWarning()" id="btnClose"
                    class="btn-dialog btn-cancel-dialog-asset">Không</button>
            </div>
        </div>
    </div>

    <div v-if="isShowChangeMess" id="dlg-warning" class="dialog dialog--warning">
        <div class="dialog__content ">
            <div class="dialog__container">
                <div class="icon-warning-dialog icon-content"></div>
                <div class="dialog__body">
                    <i style="color: #C4D106" class="fa-solid fa-3x fa-triangle-exclamation"></i>
                    <div class="dialog__msg-item">
                        {{ errMessWarning }}
                    </div>
                </div>
            </div>
            <div class="dialog__footer">
                <button type="submit" id="btnSave" class="btn-dialog btn" style="color: #fff" @click="btnSaveOnClick(asset)">Lưu</button>
                <button @click="noSaveDataChange(false)" id="btnClose" class="btn-dialog btn-cancel-dialog-asset border-blue">Không lưu</button> 
                <button @click="hideDialogWarning()" id="btnClose" class="btn-dialog btn-cancel-dialog-asset">Hủy bỏ</button>
            </div>
        </div>
    </div>

    <div v-if="isSave" id="dlg-warning" class="dialog dialog--warning">
        <div class="dialog__content ">
            <div class="dialog__container">
                <div class="icon-warning-dialog icon-content"></div>
                <div class="dialog__body">
                    <i style="color: #C4D106" class="fa-solid fa-3x fa-triangle-exclamation"></i>
                    <div class="dialog__msg-item">
                        {{ errMessWarning }}
                    </div>
                </div>
            </div>
            <div class="dialog__footer">
                <button type="submit" id="btnSave" class="btn-dialog btn" style="color: #fff"
                    @click="hideDialogValid()">Đồng ý</button>
            </div>
        </div>
    </div>
    <BaseLoading v-if="isShowLoading"></BaseLoading>
</template>
<script>
import { formatPrice, formatDate, formatNumber, formatInputDate } from "../../common/TheCommon"
import Datepicker from 'vuejs3-datepicker';
import axios from 'axios'
import BaseLoading from '../../base/BaseLoading.vue'
import { uuid } from 'vue-uuid'


export default {
    components: { BaseLoading, Datepicker },
    name: "TheAssetDetail",
    emits: ["getNameDepartment", "getNameCategory", "validCombobox", "updateMessage", "returnIsDuplicate", "activeAssetNew"],
    props: {
        getData: Function,
        showDetailFunction: Function,
        showDetailChil: {
            type: Boolean,
            default: false,
        },
        assetSelected: Object,
        isDuplicate: {
            type: Boolean,
            default: false,
        },
        title: String,
    },
    methods: {
        /**
        * Nếu rỗng thì thêm class viền đỏ và hiện thông báo
        * TVTOAN (26/07/2022)
        */
        checkValidate(idTitle, valInput) {
            if (!valInput.value) {
                valInput.classList.add("border-red"); 
                document.getElementById(idTitle).classList.add('title-invalid')
            }
            else {
                valInput.classList.remove("border-red");
                document.getElementById(idTitle).classList.remove('title-invalid')
            }
        },

        /**
        * Hàm format
        * TVTOAN (26/07/2022)
        */
        formatPrice, formatDate, formatNumber, formatInputDate,

        /**
        * Hàm tính giá trị hao mòn
        * TVTOAN (26/07/2022)
        */
        depreciationValueChange() {
            try {
                this.asset.depreciationValue = (this.asset.cost).replace(/[^0-9]/g, '') * (this.asset.depreciationRate / 100);
                this.asset.depreciationValue = formatPrice(this.asset.depreciationValue)
            } catch (error) {
                console.log(error);
            }
        },
        
        /**
        * Hàm format khi nhập input number
        * TVTOAN (26/07/2022)
        */
        formatInputNumber() {
            try {
                this.asset.cost = formatPrice(this.asset.cost)
                this.asset.quantity = formatPrice(this.asset.quantity)
                this.asset.depreciationValue = formatPrice(this.asset.depreciationValue)
            } catch (error) {
                console.log(error);
            }
        },

        
        /**
        * Hàm tăng giảm số lượng
        * TVTOAN (26/07/2022)
        */
        incrementNumber() {
            try {
                this.asset.quantity++
            } catch (error) {
                console.log(error);
            }
        },
        decrementNumber() {
            try {
                this.asset.quantity = this.asset.quantity < 2 ? 1 : this.asset.quantity - 1;
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Hàm tăng giảm năm sử dụng
        * TVTOAN (26/07/2022)
        */
        incrementYear() {
            try {
                this.asset.lifeTime++;
            } catch (error) {
                console.log(error);
            }
        },
        decrementYear() {
            try {
                this.asset.lifeTime = this.asset.lifeTime < 2 ? 1 : this.asset.lifeTime - 1;
            } catch (error) {
                console.log(error);
            }
        },
        
        /**
        * Hàm lấy ra năm hiện tại
        * TVTOAN (26/07/2022)
        */
        printYear() {
            try {
                return new Date().getFullYear();
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Chọn mã loại phòng ban tự chọn tên loại phòng ban
        * TVTOAN (26/07/2022)
        */
        getNameDepartment(name, id) {
            this.asset.departmentName = name;
            this.asset.departmentID = id;
        },

        /**
        * Chọn mã loại phòng ban tự chọn tên loại tài sản
        * TVTOAN (26/07/2022)
        */
        getNameCategory(name, id) {
            this.asset.fixedAssetCategoryName = name;
            this.asset.fixedAssetCategoryID = id;
        },

        /**
        * Nhận kết quả từ hàm valid combobox
        * TVTOAN (26/07/2022)
        */
        validCombobox(isValidCbb) {
            if (isValidCbb == true) {
                this.isValidCbb = true;
            } else {
                this.isValidCbb = false;
            }
        },

        /**
        * Hiện thông báo thành công
        * TVTOAN (26/07/2022)
        */
        showToastSuccess() {
            this.$emit('updateMessage', "Lưu thông tin thành công");
        },

        /**
        * Hiện thông báo không thành công
        * TVTOAN (26/07/2022)
        */
        showToastFail() {
            this.$emit('updateMessage', "Lưu thông tin không thành công");
        },

        /**
        * Vòng lặp focus
        * TVTOAN (26/07/2022)
        */
        processTags() {
            this.$refs.txtAssetCode.focus()
        },

        /**
        * Kiểm tra dữ liệu có rỗng hay không
        * TVTOAN (26/07/2022)
        */
        validDateAsset(asset) {
            if (!asset.fixedAssetId || !asset.fixedAssetCode || !asset.fixedAssetName || !asset.departmentID || !asset.fixedAssetCategoryID || !asset.purchaseDate || !asset.cost || !asset.quantity || !asset.depreciationRate || !asset.trackedYear || !asset.lifeTime || !asset.depreciationValue || !asset.productionDate) {
                this.isValid = false;
            } else {
                this.isValid = true;
            }
        },

        /**
        * Hiện thông báo khi hủy bỏ khai báo tài sản
        * TVTOAN (26/07/2022)
        */
        showDialogWarning() {
            try {
                if (this.isChange == true) {
                    this.isShowChangeMess = true;
                    this.errMessWarning = "Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này ?"
                } else {
                    this.isCancel = true;
                    this.errMessWarning = "Bạn có muốn hủy bỏ khai báo tài sản này không ?"
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Ẩn dialog cảnh báo
        * TVTOAN (26/07/2022)
        */
        hideDialogWarning() {
            try {
                this.isCancel = false;
                this.isShowChangeMess = false;
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Ẩn dialog kiểm tra dữ liệu
        * TVTOAN (26/07/2022)
        */
        hideDialogValid() {
            try {
                this.isSave = false;
            } catch (error) {
                console.log(error);
            }
        },

        noSaveDataChange() {
            try {
                this.getData(this.paging);
                this.showDetailFunction(false);
            }catch(error) {
                console.log(error);
            }
        },
        
        /**
        * Lưu thông tin tài sản
        * TVTOAN (28/07/2022)
        */
        btnSaveOnClick(asset) {
            try {
                this.validDateAsset(asset);
                if (this.isFormAdd == true) {
                    if (this.isValid && this.isValidCbb) {
                        this.isShowLoading = true;
                        const dataInsert = {
                            "fixedAssetId": uuid.v1(),
                            "fixedAssetCode": asset.fixedAssetCode,
                            "fixedAssetName": asset.fixedAssetName,
                            "departmentID": asset.departmentID,
                            "fixedAssetCategoryID": asset.fixedAssetCategoryID,
                            "purchaseDate": asset.purchaseDate,
                            "cost": formatNumber(asset.cost),
                            "quantity": asset.quantity,
                            "depreciationRate": asset.depreciationRate,
                            "trackedYear": asset.trackedYear,
                            "lifeTime": asset.lifeTime,
                            "createdBy": "TVTOAN",
                            "createdDate": new Date(),
                            "modifiedBy": "TVTOAN",
                            "modifiedDate": new Date(),
                            "productionDate": asset.productionDate,
                            "depreciationValue": formatNumber(asset.depreciationValue)
                        };
                        axios.post("http://localhost:14537/api/FixedAssets", dataInsert)
                            .then(res => {
                                if (res.status == '200') {
                                    this.resApi = res;
                                    this.showToastSuccess();
                                    this.showDetailFunction(false);
                                    this.asset = {};
                                    this.getData(this.paging);
                                    this.$emit('activeAssetNew', res.data.fixedAssetId);
                                    this.isValidCbb = false;
                                } else {
                                    this.showToastFail();
                                }
                            }).catch((error) => {
                                if (error.response.data.errorCode == 3) {
                                    this.errMessWarning = "Mã tài sản đã tồn tại, đã sinh mã tài sản mới";
                                    axios.get("http://localhost:14537/api/FixedAssets/new-code")
                                        .then(res => { this.asset.fixedAssetCode = res.data });
                                }
                                if (error.response.data.errorCode == 2) {
                                    this.errMessWarning = "Dữ liệu không hợp lệ";
                                }
                                if (error.response.data.errorCode == 1) {
                                    this.errMessWarning = "Lỗi hệ thống, vui lòng liên hệ MISA";
                                }
                                this.isSave = true;
                            });
                    } else {
                        this.isSave = true;
                        if (!this.isValid) {
                            this.errMessWarning = "Vui lòng nhập đầy đủ thông tin";
                        }
                        if (!this.isValidCbb) {
                            this.errMessWarning = "Mã phòng ban hoặc mã tài sản không hợp lệ";
                        }
                    }
                } else {
                    if (this.isValid && this.isValidCbb) {
                        if (this.isChange) {
                            const dataUpdate = {
                                "fixedAssetId": asset.fixedAssetId,
                                "fixedAssetCode": asset.fixedAssetCode,
                                "fixedAssetName": asset.fixedAssetName,
                                "departmentID": asset.departmentID,
                                "fixedAssetCategoryID": asset.fixedAssetCategoryID,
                                "purchaseDate": asset.purchaseDate,
                                "cost": formatNumber(asset.cost),
                                "quantity": asset.quantity,
                                "depreciationRate": asset.depreciationRate,
                                "trackedYear": asset.trackedYear,
                                "lifeTime": asset.lifeTime,
                                "createdBy": asset.createdBy,
                                "createdDate": asset.createdDate,
                                "modifiedBy": "TVTOAN",
                                "modifiedDate": new Date(),
                                "productionDate": asset.productionDate,
                                "depreciationValue": formatNumber(asset.depreciationValue)
                            };
                            axios.put(`http://localhost:14537/api/FixedAssets/${asset.fixedAssetId}`, dataUpdate)
                                .then(res => {
                                    if (res.status == '200') {
                                        this.resApi = res;
                                        this.showToastSuccess();
                                        this.showDetailFunction(false);
                                        this.asset = {};
                                        this.getData(this.paging);
                                        this.isValidCbb = false;
                                    } else {
                                        this.showToastFail();
                                    }
                                }).catch((error) => {
                                    if (error.response.data.errorCode == 3) {
                                        this.errMessWarning = "Mã tài sản đã tồn tại, đã sinh mã tài sản mới";
                                        axios.get("http://localhost:14537/api/FixedAssets/new-code")
                                            .then(res => { this.asset.fixedAssetCode = res.data });
                                    }
                                    if (error.response.data.errorCode == 2) {
                                        this.errMessWarning = "Dữ liệu không hợp lệ";
                                    }
                                    if (error.response.data.errorCode == 1) {
                                        this.errMessWarning = "Lỗi hệ thống, vui lòng liên hệ MISA";
                                    }
                                    this.isSave = true;
                                });
                        } else {
                            this.showDetailFunction(false);
                            this.showToastSuccess();
                        }
                    } else {
                        this.isSave = true;
                        if (!this.isValid) {
                            this.errMessWarning = "Vui lòng nhập đầy đủ thông tin";
                        }
                        if (!this.isValidCbb) {
                            this.errMessWarning = "Mã phòng ban hoặc mã tài sản không hợp lệ";
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
    },

    watch: {
        /**
        * Kiểm tra fixedAssetId có thay đổi hay không
        * TVTOAN (03/08/2022)
        */
        'asset.fixedAssetId': function (newValue, oldValue) {
            if (this.isFormAdd == false) {
                if (newValue != oldValue) {
                    this.isChange = true;
                } else {
                    this.isChange = false;
                }
            }
        },

        /**
        * Kiểm tra fixedAssetCode có thay đổi hay không
        * TVTOAN (03/08/2022)
        */
        'asset.fixedAssetCode': function (newValue, oldValue) {
            if (this.isFormAdd == false) {
                if (newValue != oldValue) {
                    this.isChange = true;
                } else {
                    this.isChange = false;
                }
            }
        },

        /**
        * Kiểm tra fixedAssetName có thay đổi hay không
        * TVTOAN (03/08/2022)
        */
        'asset.fixedAssetName': function (newValue, oldValue) {
            if (this.isFormAdd == false) {
                if (newValue != oldValue) {
                    this.isChange = true;
                } else {
                    this.isChange = false;
                }
            }
        },

        /**
        * Kiểm tra departmentID có thay đổi hay không
        * TVTOAN (03/08/2022)
        */
        'asset.departmentID': function (newValue, oldValue) {
            if (this.isFormAdd == false) {
                if (newValue != oldValue) {
                    this.isChange = true;
                } else {
                    this.isChange = false;
                }
            }
        },

        /**
        * Kiểm tra fixedAssetCategoryID có thay đổi hay không
        * TVTOAN (03/08/2022)
        */
        'asset.fixedAssetCategoryID': function (newValue, oldValue) {
            if (this.isFormAdd == false) {
                if (newValue != oldValue) {
                    this.isChange = true;
                } else {
                    this.isChange = false;
                }
            }
        },
        
        /**
        * Kiểm tra purchaseDate có thay đổi hay không
        * TVTOAN (03/08/2022)
        */
        'asset.purchaseDate': function (newValue, oldValue) {
            if (this.isFormAdd == false) {
                if (newValue != oldValue) {
                    this.isChange = true;
                } else {
                    this.isChange = false;
                }
            }
        },
                
        /**
        * Kiểm tra cost có thay đổi hay không
        * TVTOAN (03/08/2022)
        */
        'asset.cost': function (newValue, oldValue) {
            if (this.isFormAdd == false) {
                if (newValue != oldValue) {
                    this.isChange = true;
                } else {
                    this.isChange = false;
                }
            }
        },

        /**
        * Kiểm tra quantity có thay đổi hay không
        * TVTOAN (03/08/2022)
        */
        'asset.quantity': function (newValue, oldValue) {
            if (this.isFormAdd == false) {
                if (newValue != oldValue) {
                    this.isChange = true;
                } else {
                    this.isChange = false;
                }
            }
        },

        /**
        * Kiểm tra depreciationRate có thay đổi hay không
        * TVTOAN (03/08/2022)
        */
        'asset.depreciationRate': function (newValue, oldValue) {
            if (this.isFormAdd == false) {
                if (newValue != oldValue) {
                    this.isChange = true;
                } else {
                    this.isChange = false;
                }
            }
        },
        
        /**
        * Kiểm tra trackedYear có thay đổi hay không
        * TVTOAN (03/08/2022)
        */
        'asset.trackedYear': function (newValue, oldValue) {
            if (this.isFormAdd == false) {
                if (newValue != oldValue) {
                    this.isChange = true;
                } else {
                    this.isChange = false;
                }
            }
        },
      
        /**
        * Kiểm tra lifeTime có thay đổi hay không
        * TVTOAN (03/08/2022)
        */
        'asset.lifeTime': function (newValue, oldValue) {
            if (this.isFormAdd == false) {
                if (newValue != oldValue) {
                    this.isChange = true;
                } else {
                    this.isChange = false;
                }
            }
        },

        /**
        * Kiểm tra productionDate có thay đổi hay không
        * TVTOAN (03/08/2022)
        */
        'asset.productionDate': function (newValue, oldValue) {
            if (this.isFormAdd == false) {
                if (newValue != oldValue) {
                    this.isChange = true;
                } else {
                    this.isChange = false;
                }
            }
        },

        /**
        * Kiểm tra depreciationValue có thay đổi hay không
        * TVTOAN (03/08/2022)
        */
        'asset.depreciationValue': function (newValue, oldValue) {
            if (this.isFormAdd == false) {
                if (newValue != oldValue) {
                    this.isChange = true;
                } else {
                    this.isChange = false;
                }
            }
        }
    },

    created() {
        /**
        * Gọi api new code để sinh mã tự động
        * TVTOAN (23/07/2022)
        */
        this.asset = this.assetSelected;
        //gọi api lấy dữ liệu
        axios.get("http://localhost:14537/api/FixedAssets/new-code")
            .then(res => {
                if (this.isDuplicate == true) {
                    this.isFormAdd = true;
                    this.asset.fixedAssetCode = res.data
                    this.isValidCbb = true;
                }
                else if (this.title == 'Sửa tài sản') {
                    this.isFormAdd = false;
                    this.isValidCbb = true;
                    this.$emit('returnIsDuplicate', false);
                }
                else {
                    this.isFormAdd = true
                    this.asset.fixedAssetCode = res.data
                    this.asset.purchaseDate = new Date();
                    this.asset.productionDate = new Date();
                }
            });
    },

    data() {
        return {
            paging: {
                keyWord: '',
                departmentID: '',
                fixedAssetCategoryID: '',
                pageSize: 15,
                pageNumber: 1,
                maxVisibleButtons: 5,
            },

            isShowChangeMess: false,
            isValidCbb: false,
            isShowLoading: false,
            isSave: false,
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
@import url(../../../style/base/toast.css);
</style>