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
            <div class="dialog_content-base" style="background-color: #fff; height: 410px; position: relative;">
                <div class="row" role="row">
                    <div class="col" style="grid-column: span 3;">
                        <label>Bộ phận sử dụng </label>
                        <input id="txtDepartmentName" type="text" class="input inputdisable"
                            v-model="asset.departmentName" disabled>
                    </div>
                    <div class="col" style="grid-column: span 3;">
                        <h5 style="margin: 0">Nguyên giá </h5>
                    </div>
                </div>
                <div class="row" role="row">
                    <div class="col" style="grid-column: span 1.5; padding-bottom: unset !important">
                        <label> Nguồn hình thành </label>
                    </div>
                    <div class="col" style="grid-column: span 1; padding-bottom: unset !important">
                        <label style="padding-left: 66px"> Giá trị </label>
                    </div>
                    <div class="col" style="grid-column: span 0.5; padding-bottom: unset !important">
                    </div>
                </div>
                <div class="row" role="row" v-for="(assetBudget, index) in assetBudgets" :key="assetBudget.BudgetID">
                    <div class="col" style="grid-column: span 1.5; padding-right: unset !important; min-width: 234px">
                        <BaseCombobox :isShowIcon="false" :url="'http://localhost:14537/api/Budgets'"
                            v-on:getNameCategory="getNameCategory"
                            :propValue="'BudgetID'" :propText="'BudgetName'" :placText="'Chọn nguồn hình thành'" :index="index"
                            v-on:getIdAndName="getIdAndName"
                            :propName="'BudgetName'" :valDefault="assetBudget.BudgetName" :propID="'BudgetID'" v-model="assetBudget.BudgetName">
                        </BaseCombobox>
                    </div>
                    <div class="col" style="grid-column: span 0.5; padding-left: unset !important">
                        <input style="height: 36px; width: 69px" tabindex="6" id="txtCost" name-property="nguyên giá"
                            type="text" class="input number-right" v-model="assetBudget.BudgetCost" @blur="getTotal" @input="formatInputNumber()">
                    </div>
                    <div class="col"
                        style="grid-column: span 0.5; display: flex; flex-direction: row; align-items: center; padding-left: unset;">
                        <div @click="btnAddBudget()" class="icon-budget-plus icon-content" style="padding-right: 10px">
                        </div>
                        <div @click="btnRemoveBudget(assetBudget.BudgetID)" v-if="assetBudgets.length > 1" class="icon-budget-minus icon-content">
                        </div>
                    </div>
                </div>
                <div class="row" role="row" style="bottom: 0; position: absolute;bottom: 0;">
                    <div class="col" style="grid-column: span 1.5; padding-right: 10px !important; min-width: 135px">
                        <input style="height: 36px; width: 346px;" tabindex="6" id="txtCost" name-property="nguyên giá"
                            type="text" class="input inputdisable" placeholder="Tổng" disabled>
                    </div>
                    <div class="col" style="grid-column: span 0.5; padding-left: unset !important">
                        <input style="height: 36px; width:190px" tabindex="6" id="txtCost" name-property="nguyên giá"
                            type="text" class="input number-right" v-model="total">
                    </div>
                    <div class="col"
                        style="grid-column: span 0.5; display: flex; flex-direction: row; align-items: center; padding-left: unset;">
                    </div>
                </div>
            </div>
            <div class="dialog_footer">
                <button tabindex="13" id="btnClose" class="btn-dialog btn btn-cancel-dialog-asset">Hủy</button>
                <button @click="btnSaveOnClick()" type="submit" tabindex="12" id="btnSave" class="btn-dialog btn"
                    style="color: #fff">Chọn</button>
            </div>
        </div>
    </div>

</template>

<script>
import { uuid } from 'vue-uuid'
import {formatNumber, formatPrice} from '../../common/TheCommon'

export default {

    components: {},
    name: "TheDialogUpdateBudgetAsset",
    emits: [],
    props: {
        assetSelected: Object,
        title: String,
        showDetailFunction: Function,
        showDetailChil: {
            type: Boolean,
            default: false,
        },
    },
    created() {
        this.asset = this.assetSelected;
        this.assetBudgets = JSON.parse(this.asset.fixedAssetBudget);
        for(var i = 0; i < this.assetBudgets.length; i ++) {
            this.assetBudgets[i].BudgetCost = formatPrice(this.assetBudgets[i].BudgetCost);
        }
        this.total = formatPrice(this.asset.cost);
    },
    data() {
        return {
            total: 0,
            asset: {},
            assetBudgets: [],
        }
    },

    methods: {
        formatNumber, formatPrice,

        /**
        * Hàm format khi nhập input number
        * TVTOAN (26/07/2022)
        */
        formatInputNumber() {
            try {
                for(var i = 0; i < this.assetBudgets.length; i ++) {
                    this.assetBudgets[i].BudgetCost = formatPrice(this.assetBudgets[i].BudgetCost);
                    this.total = formatPrice(this.total);
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Lọc theo id phòng ban.
        * TVTOAN (02/08/2022)
        */
        getIdAndName(name, id, index) {
            try {
                this.assetBudgets[index].BudgetID = id;
                this.assetBudgets[index].BudgetName = name;
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Tăng bombobox và input
         * TVTOAN (31/07/2022)
         */
        btnAddBudget() {
            try {
                this.assetBudgets.push(
                    {
                        BudgetID: uuid.v1(),
                        BudgetName: '',
                        BudgetCost: ''
                    }
                )
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Giảm bombobox và input
         * TVTOAN (31/07/2022)
         */
        btnRemoveBudget(id) {
            try {
                var newArr = this.assetBudgets.filter(item => item.BudgetID !== id);
                this.assetBudgets = newArr;
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Giảm bombobox và input
         * TVTOAN (31/07/2022)
         */
        getTotal () {
            this.total = 0;
            for(var i = 0; i < this.assetBudgets.length; i ++) {
                this.assetBudgets[i].BudgetCost = formatNumber(this.assetBudgets[i].BudgetCost);
                this.assetBudgets[i].BudgetCost = Number(this.assetBudgets[i].BudgetCost);
                this.total += this.assetBudgets[i].BudgetCost;
                this.assetBudgets[i].BudgetCost = formatPrice(this.assetBudgets[i].BudgetCost);
            }
            this.total = formatPrice(this.total);
        },  

        /**
         * Lưu thông tin nguồn vốn
         * TVTOAN (31/07/2022)
         */
        btnSaveOnClick() {
            try {
                for(var i = 0; i < this.assetBudgets.length; i ++) {
                    this.assetBudgets[i].BudgetCost = formatNumber(this.assetBudgets[i].BudgetCost);
                }
                this.total = formatNumber(this.total);
                var arrayById = JSON.stringify(this.assetBudgets)
                this.$emit("arrayById", arrayById);
                this.$emit("totalById", this.total);
                this.showDetailFunction(false)
            } catch (error) {
                console.log(error);
            }
        }

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