<template>
    <div class="content-option">
        <div class="content-option-left">
            <div class="filter-search">
                <div class="icon-search-content icon-content"></div>
                <input class="input-search" ref="txtSearch" type="text" placeholder="Tìm kiếm theo tài sản">
            </div>
            <div class="filter-assets">
                <BaseCombobox :url="'http://localhost:14537/api/FixedAssetCategorys'" :propValue="'fixedAssetCategoryCode'"
                    :propText="'fixedAssetCategoryName'" :placText="'Loại tài sản'">
                </BaseCombobox>
            </div>
            <div class="filter-assets">
                <BaseCombobox :url="'http://localhost:14537/api/Departments'" :propValue="'departmentCode'"
                    :propText="'departmentName'" :placText="'Bộ phận sử dụng'">
                </BaseCombobox>
            </div>
        </div>
        <div class="content-option-right">
            <button class="btn" id="btnAdd" @click="showDetail(true)">
                <div class="btn-add button__icon">Thêm tài sản</div>
            </button>
            <div class="btn-export-excel icon-content"><span class="tooltip">Xuất file excel</span> </div>
            <div class="btn-delete icon-content"><span class="tooltip">Xóa</span> </div>
        </div>
    </div>
    <div class="content-table">
        <table class="table-data">
            <thead class="table-header">
                <tr>
                    <th>
                        <input type="checkbox" name="" id="" class="ckb ckb-primary" v-model="isSelect" @click="selectAllRows">
                    </th>
                    <th>STT<span class="tooltip">Số thứ tự</span> </th>
                    <th style="width:150px">Mã tài sản</th>
                    <th>Tên tài sản</th>
                    <th>Loại tài sản</th>
                    <th>Bộ phận sử dụng</th>
                    <th>Ngày mua</th>
                    <th class="number-right">Số lượng</th>
                    <th class="number-right">Nguyên giá</th>
                    <th class="number-right">HM/KH lũy kế <span class="tooltip">Hao mòn/ Khấu hao</span></th>
                    <th class="number-right">Giá trị còn lại</th>
                    <th style="padding-left:20px">Chức năng</th>
                </tr>
            </thead>
            <tbody class="table-body">
                <tr class="tbody-tr" v-for="(asset, index ) in assets" :key="asset.CustomerId"
                    :class="{ 'bgblue': checkActive(asset.CustomerId) }"
                    @click="btnRowActiveOnClick(asset, $event, index)" @dblclick="rowOnDblClick(asset)">
                    <td>
                        <input type="checkbox" name="" id="" class="ckb ckb-primary" :value="asset.CustomerId"
                            v-model="selected">
                    </td>
                    <td style="text-align:center">{{ index + 1 }}</td>
                    <td>{{ asset.CustomerCode }}</td>
                    <td>{{ asset.FullName }}</td>
                    <td>{{ asset.FullName }}</td>
                    <td class="number-right">{{ asset.FullName }}</td>
                    <td style="padding-left:unset">{{ formatDate(asset.DateOfBirth) }}</td>
                    <td class="number-right">20.000.000</td>
                    <td class="number-right">1.432.000</td>
                    <td class="number-right">1.000.000</td>
                    <td class="number-right">18.123.000</td>

                    <td class="table-option">
                        <div @click="rowOnDblClick(asset)" class="table-eidt icon-content icon-pading"><span
                                class="tooltip">Chi tiết</span></div>
                        <div @click="duplicateAssets()" class="table-replication icon-content icon-pading"><span
                                class="tooltip">Nhân bản</span></div>
                        <div @click="deleteAsset()" class="table-delete icon-content icon-pading"><span
                                class="tooltip">Xóa </span></div>
                    </td>
                </tr>
                <tr class="table-summary">
                    <td colspan="7">
                    </td>
                    <td class="number-right font-bold">{{ formatPrice(totalQuantity) }}</td>
                    <td class="number-right font-bold">{{ formatPrice(totalQuantity) }}</td>
                    <td class="number-right font-bold">18.123.000</td>
                    <td class="number-right font-bold">18.123.000</td>
                    <td>
                        <div></div>
                    </td>
                </tr>
                <tr class="table-footer">
                    <td colspan="12" class="td-footer">
                        <div class="paging">
                            <div class="total-record">Tổng số: <strong>200</strong> bản ghi</div>
                            <div class="page-record">
                                <select name="" id="">
                                    <option value="">5</option>
                                    <option value="">10</option>
                                    <option value="">15</option>
                                </select>
                            </div>
                            <div class="table__paging--center">
                                <div class="paging__button"><i class="fa-solid fa-angles-left"></i></div>
                                <div class="paging__button paging__button--prev icon-content"></div>
                                <div class="paging__button--group">
                                    <div class="paging__number paging__number--selected">1</div>
                                    <div class="paging__number">2</div>
                                    <div class="paging__number">...</div>
                                    <div class="paging__number">10</div>
                                </div>
                                <div class="paging__button paging__button--next icon-content"></div>
                                <div class="paging__button"><i class="fa-solid fa-angles-right"></i></div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
            <TheAssetDetail v-if="showDetailParent" :showDetailChil="showDetailParent" :showDetailFunction="showDetail"
                :assetSelected="assetSelected" />
            <BaseLoading v-if="isShowLoading"></BaseLoading>
        </table>
    </div>
</template>
<script>
import TheAssetDetail from "./TheAssetsDetail.vue"
import { formatPrice, formatDate } from "../../common/TheCommon"
import BaseLoading from '../../base/BaseLoading.vue'

export default ({
    name: "AssetList",
    components: { TheAssetDetail, BaseLoading },
    props: [],
    created() {
        this.isShowLoading = true;
        //gọi api lấy dữ liệu
        fetch("https://cukcuk.manhnv.net/api/v1/Customers", { method: "GET" })
            .then(res => res.json())
            .then(data => {
                this.assets = data;

                // Lấy tổng số lượng
                for (let item of this.assets) {
                    this.totalQuantity += Number(item.PhoneNumber)
                }

                this.isShowLoading = false;
            });
    },
    mounted: function () {
        // vòng lặp focus trong form
        this.$refs.txtSearch.focus();
    },
    data() {
        return {
            indexOld: 0,
            firstIndex: 0,
            lastIndex: 0,
            isShowLoading: false,
            showDetailParent: false,
            assets: [],
            assetSelected: {},
            isSelect: false,
            selected: [],
            totalQuantity: 0,
            totalCost: 0,
            totalAtrophy: 0,
            totalResidualValue: 0,
        }
    },
    methods: {
        formatPrice, formatDate,
        //chức năng mở dialog thêm mới
        showDetail(isShow) {
            try {
                this.showDetailParent = isShow;
                this.assetSelected = {
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
                depreciationValue: 0,

                };
            } catch (error) {
                console.log(error);
            }
        },

        //chức năng db click 1 bản ghi
        rowOnDblClick(asset) {
            try {
                this.assetSelected = asset;
                this.showDetailParent = true;
            } catch (error) {
                console.log(error);
            }
        },

        // xóa 1 hoặc nhiều bản ghi
        deleteAssets(listId) {
            try {
                console.log(listId);
            } catch (error) {
                console.log(error);
            }
        },

        // chọn tất cả bản ghi
        selectAllRows() {
            try {
                this.selected = [];
                if (!this.isSelect) {
                    for (let i in this.assets) {
                        this.selected.push(this.assets[i].CustomerId);
                    }
                }
            } catch (error) {
                console.log();
            }
        },

        //chức năng active 1 bản ghi
        btnRowActiveOnClick(asset, e, index) {
            try {
                if (e.ctrlKey) {
                    // Ctrl chọn nhiều bản
                    this.selected.push(asset.CustomerId);
                    if (this.selected.length == this.assets.length) {
                        this.isSelect = true;
                    }
                } else if (e.shiftKey) {
                    // Giữ shift chọn nhiều bản ghi
                    this.selected.push(asset.CustomerId);
                    this.lastIndex = index;
                    if (this.firstIndex > this.lastIndex) {
                        this.firstIndex = this.lastIndex;
                        this.lastIndex = this.indexOld;
                    }
                    for (let index = this.firstIndex; index <= this.lastIndex; index++) {
                        this.selected.push(this.assets[index].CustomerId);
                    }
                    var newArr = [...new Set(this.selected)];
                    this.selected = newArr
                } else {
                    //click để chọn nhiều bản ghi
                    this.selected = [];
                    this.firstIndex = index;
                    this.indexOld = this.firstIndex;
                    this.selected.push(asset.CustomerId);
                    this.isSelect = false;
                }
            } catch (error) {
                console.log(error);
            }
        },

        // active những row có id trong mảng
        checkActive(rowActive) {
            try {
                for (let asset of this.selected) {
                    if (rowActive == asset) {
                        return rowActive;
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
    }
})
</script>
<style scoped>
@import url(../../../style/page/asstes.css);
@import url(../../../style/layout/header.css);
@import url(../../../style/base/combobox.css);
@import url(../../../style/base/tool-tip.css);
</style>