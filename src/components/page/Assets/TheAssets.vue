<template>
    <div class="content-option">
        <div class="content-option-left">
            <div class="filter-search">
                <div class="icon-search-content icon-content"></div>
                <input class="input-search" ref="txtSearch" type="text" placeholder="Tìm kiếm theo tài sản">
            </div>
            <div class="filter-assets">
                <BaseCombobox :url="'http://localhost:14537/api/FixedAssetCategorys'"
                    :propValue="'FixedAssetCategoryCode'" :propText="'FixedAssetCategoryName'"
                    :placText="'Loại tài sản'">
                </BaseCombobox>
            </div>
            <div class="filter-assets">
                <BaseCombobox :url="'http://localhost:14537/api/Departments'" :propValue="'DepartmentCode'"
                    :propText="'DepartmentName'" :placText="'Bộ phận sử dụng'">
                </BaseCombobox>
            </div>
        </div>
        <div class="content-option-right">
            <button class="btn" id="btnAdd" @click="showDetail(true)">
                <div class="btn-add button__icon">Thêm tài sản</div>
            </button>
            <div class="btn-export-excel icon-content"><span class="tooltip">Xuất file excel</span> </div>
            <div class="btn-delete icon-content" @click="showDialogDeleteList"><span class="tooltip">Xóa</span> </div>
        </div>
    </div>
    <div class="content-table">
        <table class="table-data">
            <thead class="table-header">
                <tr>
                    <th>
                        <input type="checkbox" name="" id="" class="ckb ckb-primary" v-model="isSelect"
                            @click="selectAllRows">
                    </th>
                    <th>STT<span class="tooltip">Số thứ tự</span> </th>
                    <th style="width:150px">Mã tài sản</th>
                    <th>Tên tài sản</th>
                    <th>Loại tài sản</th>
                    <th>Bộ phận sử dụng</th>
                    <th>Ngày mua</th>
                    <th class="number-right">Số lượng</th>
                    <th class="number-right">Nguyên giá</th>
                    <th class="number-right">HM/KH lũy kế <span class="tooltip">Hao mòn/Khấu hao lũy kế</span></th>
                    <th class="number-right">Giá trị còn lại</th>
                    <th style="padding-left:20px">Chức năng</th>
                </tr>
            </thead>
            <tbody class="table-body">
                <tr class="tbody-tr" v-for="(asset, index ) in assets" :key="asset.fixedAssetId"
                    :class="{ 'bgblue': checkActive(asset.fixedAssetId) }"
                    @click="btnRowActiveOnClick(asset, $event, index)" @dblclick="rowOnDblClick(asset)">
                    <td>
                        <input type="checkbox" name="" id="" class="ckb ckb-primary" :value="asset.fixedAssetId"
                            v-model="selected">
                    </td>
                    <td style="text-align:center">{{ index + 1 }}</td>
                    <td>{{ asset.fixedAssetCode }}</td>
                    <td>{{ asset.fixedAssetName }}</td>
                    <td>{{ asset.fixedAssetCategoryName }}</td>
                    <td>{{ asset.departmentName }}</td>
                    <td style="padding-left:unset">{{ formatDate(asset.purchaseDate) }}</td>
                    <td class="number-right">{{ formatPrice(asset.quantity) }}</td>
                    <td class="number-right">{{ formatPrice(asset.cost) }}</td>
                    <td class="number-right">{{ formatPrice(1000000) }}</td>
                    <td class="number-right">{{ formatPrice(1000000) }}</td>

                    <td class="table-option">
                        <div @click="rowOnDblClick(asset)" class="table-eidt icon-content icon-pading"><span
                                class="tooltip">Chi tiết</span></div>
                        <div @click="duplicateAssets(asset)" class="table-replication icon-content icon-pading"><span
                                class="tooltip">Nhân bản</span></div>
                        <div @click="showDialogDelete(asset)" class="table-delete icon-content icon-pading"><span
                                class="tooltip">Xóa </span></div>
                    </td>
                </tr>
                <tr class="table-summary">
                    <td colspan="7">
                    </td>
                    <td class="number-right font-bold">{{ formatPrice(total.totalQuantity) }}</td>
                    <td class="number-right font-bold">{{ formatPrice(total.totalCost) }}</td>
                    <td class="number-right font-bold">18.123.000</td>
                    <td class="number-right font-bold">18.123.000</td>
                    <td>
                        <div></div>
                    </td>
                </tr>
            </tbody>
            <TheAssetDetail v-if="showDetailParent" :showDetailChil="showDetailParent" :showDetailFunction="showDetail"
                :assetSelected="assetSelected" />
            <BaseLoading v-if="isShowLoading"></BaseLoading>
        </table>
        <div class="table-footer">
            <td colspan="12" class="td-footer">
                <div class="paging">
                    <div class="total-record">Tổng số: <strong>{{ totalRecord }}</strong> bản ghi</div>
                    <div class="page-record">
                        <select name="" id="">
                            <option value="">5</option>
                            <option value="">10</option>
                            <option value="">15</option>
                        </select>
                    </div>
                    <div class="table__paging--center">
                        <div class="paging__button"><i class="fa-solid fa-angles-left"></i><span class="tooltip">Về
                                trang đầu</span></div>
                        <div class="paging__button paging__button--prev icon-content"><span class="tooltip">Trang
                                trước</span></div>
                        <div class="paging__button--group">
                            <div class="paging__number paging__number--selected">1</div>
                            <div class="paging__number">2</div>
                            <div class="paging__number">...</div>
                            <div class="paging__number">10</div>
                        </div>
                        <div class="paging__button paging__button--next icon-content"><span class="tooltip">Trang
                                sau</span></div>
                        <div class="paging__button"><i class="fa-solid fa-angles-right"></i><span class="tooltip">Đến
                                trang cuối</span></div>
                    </div>
                </div>
            </td>
        </div>
    </div>
    <div v-if="isDelete" id="dlg-warning" class="dialog dialog--warning">
        <div class="dialog__content ">
            <div class="dialog__container">
                <div class="icon-warning-dialog icon-content"></div>
                <div class="dialog__body">
                    <i style="color: yellow" class="fa-solid fa-2xl fa-triangle-exclamation"></i>
                    <div class="dialog__msg-item">
                        {{ errMessWarning }}
                    </div>
                </div>
            </div>
            <div class="dialog__footer">
                <button @click="btnDeleteOnClick" type="submit" id="btnSave" class="btn-dialog btn"
                    style="color: #fff">Xóa</button>
                <button id="btnClose" @click="hideDialogDelete"
                    class="btn-dialog btn btn-cancel-dialog-asset warning">Không</button>
            </div>
        </div>
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
        fetch(`http://localhost:14537/api/FixedAssets?keyword=${this.paging.keyWord}&departmentID=${this.paging.departmentID}&fixedAssetCategoryID=${this.paging.fixedAssetCategoryID}&pageSize=${this.paging.pageSize}&pageNumber=${this.paging.pageNumber}`, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                this.assets = data.data;
                this.totalRecord = data.totalCount;
                for (let asset of this.assets) {
                    this.total.totalCost += Number(asset.cost);
                    this.total.totalQuantity += Number(asset.quantity);
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
            errMessWarning: '',
            isDelete: false,
            isSelect: false,
            isShowLoading: false,
            showDetailParent: false,

            assets: [],
            assetSelected: {},
            selected: [],

            indexRecord: {
                indexOld: 0,
                firstIndex: 0,
                lastIndex: 0,
            },

            total: {
                totalRecord: 0,
                totalQuantity: 0,
                totalCost: 0,
                totalAtrophy: 0,
                totalResidualValue: 0,
            },

            paging: {
                keyWord: '',
                departmentID: '',
                fixedAssetCategoryID: '',
                pageSize: 10,
                pageNumber: 1,
            }
        }
    },
    methods: {
        // chức năng format dữ liệu
        formatPrice, formatDate,

        showDialogDeleteList() {
            try {
                if (this.selected.length > 0) {
                    this.errMessWarning = `${this.selected.length} tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách ?`;
                    this.isDelete = true;
                }
            } catch (error) {
                console.log(error);
            }
        },
        btnDeleteOnClick() {
            try {
                this.isShowLoading = true;
                if (this.selected.length == 1) {
                    fetch(`http://localhost:14537/api/FixedAssets/${this.selected[0]}`, { method: 'DELETE' })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            this.isShowLoading = false;
                            this.isDelete = false;
                            location.reload()
                        });
                    }else {
                        this.isDelete = false;
                    }
            } catch (error) {
                console.log(error);
            }
        },

        showDialogDelete(asset) {
            try {
                if (this.selected.length == 1) {
                    this.errMessWarning = `Bạn có muốn xóa tài sản ${asset.fixedAssetCode} - ${asset.fixedAssetName} ?`;
                    this.isDelete = true;
                }
            } catch (error) {
                console.log(error);
            }
        },

        hideDialogDelete() {
            try {
                this.isDelete = false;
            } catch (error) {
                console.log(error);
            }
        },
        //chức năng mở dialog thêm mới
        showDetail(isShow) {
            try {
                this.showDetailParent = isShow;
                this.assetSelected = {
                    fixedAssetId: '00000000-0000-0000-0000-000000000000',
                    fixedAssetCode: '',
                    fixedAssetName: '',
                    departmentID: '',
                    fixedAssetCategoryID: '',
                    quantity: 0,
                    cost: 0,
                    depreciationRate: 0,
                    purchaseDate: '',
                    productionDate: '',
                    trackedYear: '',
                    lifeTime: 0,
                    depreciationValue: 0,
                    createdBy: "TVTOAN",
                    createdDate: new Date(),
                    modifiedBy: "TVTOAN",
                    modifiedDate: new Date(),
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

        // chọn tất cả bản ghi
        selectAllRows() {
            try {
                this.selected = [];
                if (!this.isSelect) {
                    for (let i in this.assets) {
                        this.selected.push(this.assets[i].fixedAssetId);
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
                    this.selected.push(asset.fixedAssetId);
                    if (this.selected.length == this.assets.length) {
                        this.isSelect = true;
                    }
                } else if (e.shiftKey) {
                    // Giữ shift chọn nhiều bản ghi
                    this.selected.push(asset.fixedAssetId);
                    this.lastIndex = index;
                    if (this.firstIndex > this.lastIndex) {
                        this.firstIndex = this.lastIndex;
                        this.lastIndex = this.indexOld;
                    }
                    for (let index = this.firstIndex; index <= this.lastIndex; index++) {
                        this.selected.push(this.assets[index].fixedAssetId);
                    }
                    var newArr = [...new Set(this.selected)];
                    this.selected = newArr
                } else {
                    //click để chọn nhiều bản ghi
                    this.selected = [];
                    this.firstIndex = index;
                    this.indexOld = this.firstIndex;
                    this.selected.push(asset.fixedAssetId);
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