<template>
    <div class="content-option">
        <div class="content-option-left">
            <div class="filter-search">
                <div class="icon-search-content icon-content"></div>
                <input class="input-search" ref="txtSearch" type="text" v-model="paging.keyWord"
                    placeholder="Tìm kiếm theo tài sản" v-on:keyup="btnSearch(paging.keyWord, $event)">
            </div>
            <div class="filter-assets">
                <BaseCombobox :url="'http://localhost:14537/api/FixedAssetCategorys'"
                    :propValue="'FixedAssetCategoryCode'" :propText="'FixedAssetCategoryName'"
                    :propID="'FixedAssetCategoryID'" :placText="'Loại tài sản'"
                    v-on:filterByCategoryID="filterByCategoryID">
                </BaseCombobox>
            </div>
            <div class="filter-assets">
                <BaseCombobox :url="'http://localhost:14537/api/Departments'" :propValue="'DepartmentCode'"
                    :propID="'DepartmentID'" :propText="'DepartmentName'" :placText="'Bộ phận sử dụng'"
                    v-on:filterByDepartmentID="filterByDepartmentID">
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
    <div class="content-table" :class="{tablenodatasize: assets.length < 1}">
        <table class="table-data">
            <thead class="table-header" v-if="assets.length > 0">
                <tr>
                    <th>
                        <input type="checkbox" name="" class="ckb ckb-primary" v-model="isSelect"
                            @click="selectAllRows">
                    </th>
                    <th>STT<span class="tooltip">Số thứ tự</span> </th>
                    <th>Mã tài sản</th>
                    <th>Tên tài sản</th>
                    <th>Loại tài sản</th>
                    <th>Bộ phận sử dụng</th>
                    <th>Ngày mua</th>
                    <th class="number-right">Số lượng</th>
                    <th class="number-right">Nguyên giá</th>
                    <th class="number-right">HM/KH lũy kế <span class="tooltip">Hao mòn/Khấu hao lũy kế</span></th>
                    <th class="number-right">Giá trị còn lại</th>
                    <th style="padding: 0px 10px">Chức năng</th>
                </tr>
            </thead>
            <tbody class="table-body">
                <v-contextmenu ref="contextmenu">
                    <v-contextmenu-item>
                        <div class="menu__context">
                            <span @click="rowOnDblClick(asset)">Sửa tài sản</span>
                        </div>
                    </v-contextmenu-item>
                    <v-contextmenu-item>
                        <div class="menu__context">
                            <span @click="showDialogDelete(asset)">Xóa tài sản</span>
                        </div>
                    </v-contextmenu-item>
                    <v-contextmenu-item>
                        <div class="menu__context">
                            <span @click="duplicateAssets(asset)">Nhân bản</span>
                        </div>
                    </v-contextmenu-item>
                </v-contextmenu>

                <tr class="tbody-tr" v-for="(asset, index ) in assets" :key="asset.fixedAssetId"
                    v-contextmenu:contextmenu :class="{'bgblue': checkActive(asset.fixedAssetId) }"
                    @click="btnRowActiveOnClick(asset, $event, index)" @dblclick="rowOnDblClick(asset)">
                    <td>
                        <input type="checkbox" name="" id="" class="ckb ckb-primary" :value="asset.fixedAssetId" v-model="selected">
                    </td>
                    <td style="text-align:center">{{ index + 1 }}</td>
                    <td>{{ asset.fixedAssetCode }}</td>
                    <td class="text-hide">
                        <p>{{ asset.fixedAssetName }}</p>
                    </td>
                    <td class="text-hide">
                        <p>{{ asset.fixedAssetCategoryName }}</p>
                    </td>
                    <td class="text-hide">
                        <p>{{ asset.departmentName }}</p>
                    </td>
                    <td style="padding-left:unset">{{ formatDate(asset.purchaseDate) }}</td>
                    <td class="number-right">{{ formatPrice(asset.quantity) }}</td>
                    <td class="number-right">{{ formatPrice(asset.cost) }}</td>
                    <td class="number-right">{{ formatPrice(asset.atrophy) }}</td>
                    <td class="number-right">{{ formatPrice(asset.residualValue) }}</td>

                    <td class="table-option">
                        <div @click="rowOnDblClick(asset)" class="table-eidt icon-pading icon-small"><span class="tooltip">Sửa tài sản</span></div>
                        <div @click="duplicateAssets(asset)" class="table-replication icon-content icon-pading icon-small"><span class="tooltip">Nhân bản</span></div>
                        <div @click="showDialogDelete(asset)" class="table-delete icon-content icon-pading icon-small"><span class="tooltip">Xóa </span></div>
                    </td>
                </tr>
                <tr >
                    <td colspan="12" class="table__nodata" v-if="assets.length < 1"> </td>
                </tr>
                <tr class="table-summary" v-if="assets.length > 0">
                    <td colspan="7">
                    </td>
                    <td class="number-right font-bold">{{ formatPrice(total.totalQuantity) }}</td>
                    <td class="number-right font-bold">{{ formatPrice(total.totalCost) }}</td>
                    <td class="number-right font-bold">{{formatPrice(total.totalAtrophy)}}</td>
                    <td class="number-right font-bold">{{formatPrice(total.totalResidualValue)}}</td>
                    <td>

                    </td>
                </tr>
            </tbody>
            <TheAssetDetail @updateMessage="updateMessage" v-if="showDetailParent" :showDetailChil="showDetailParent"
                :showDetailFunction="showDetail" :assetSelected="assetSelected" :getData="getData"
                :isDuplicate="isDuplicate" v-on:returnIsDuplicate="returnIsDuplicate" :title="title"
                v-on:activeAssetNew="activeAssetNew" />
            <BaseLoading v-if="isShowLoading"></BaseLoading>
        </table>
    </div>
    <div class="table-footer" v-if="assets.length > 0">
        <div class="paging">
            <div class="total-record">Tổng số: <strong>{{ totalRecord }}</strong> bản ghi</div>
            <div class="page-record">
                <select name="" id="" @change="selectPageSize($event)">
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                </select>
            </div>
            <div class="table__paging--center">
                <div @click="onClickFirstPage" class="paging__button"><i class="fa-solid fa-angles-left"></i><span
                        class="tooltip">Về trang đầu</span></div>
                <div @click="onClickPreviousPage" class="paging__button paging__button--prev icon-content"><span
                        class="tooltip">Trang trước</span></div>
                <div class="paging__button--group">
                    <div :class="{ selected: page.isDisabled }" @click="onClickPage(page.name)" class="paging__number"
                        v-for="page in pages" :key="page.name">{{ page.name }}</div>
                </div>
                <div @click="onClickNextPage" class="paging__button paging__button--next icon-content"><span
                        class="tooltip">Trang sau</span></div>
                <div @click="onClickLastPage" class="paging__button"><i class="fa-solid fa-angles-right"></i><span
                        class="tooltip">Đến trang cuối</span></div>
            </div>
        </div>
    </div>
    <div v-if="isDelete" id="dlg-warning" class="dialog dialog--warning">
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
                <button @click="btnDeleteOnClick" type="submit" id="btnSave" class="btn-dialog btn"
                    style="color: #fff">Xóa</button>
                <button id="btnClose" @click="hideDialogDelete"
                    class="btn-dialog btn btn-cancel-dialog-asset warning">Không</button>
            </div>
        </div>
    </div>

    <div v-if="isMessDelete" id="dlg-warning" class="dialog dialog--warning">
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
                <button @click="hideDialogDelete" type="submit" id="btnSave" class="btn-dialog btn"
                    style="color: #fff">Đồng ý</button>
            </div>
        </div>
    </div>

    <div id="snackbar" :class="{ show: isShowToastSuccess }" v-on:updateMessage="updateMessage">
        <i class="fa-solid fa-circle-check icon-toast fa-2xl"></i>
        <div>{{ toastMess }}</div>
    </div>
</template>
<script>
import TheAssetDetail from "./TheAssetsDetail.vue"
import { formatPrice, formatDate } from "../../common/TheCommon"
import BaseLoading from '../../base/BaseLoading.vue'
import { directive, Contextmenu, ContextmenuItem } from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";
import axios from 'axios'


export default ({
    directives: {
        contextmenu: directive,
    },
    name: "AssetList",
    components: {
        TheAssetDetail, BaseLoading, [Contextmenu.name]: Contextmenu,
        [ContextmenuItem.name]: ContextmenuItem
    },
    emits: ["updateMessage"],
    props: [],
    created() {
        /**
         * Gọi hàm getData để lấy dữ liệu.
         * TVTOAN (31/07/2022)
         */
        this.getData(this.paging);
    },
    mounted: function () {
        /**
         * Vòng lặp focus trong dialog.
         * TVTOAN (31/07/2022)
         */
        this.$refs.txtSearch.focus();
    },

    beforeMount() {
        /**
         * Thêm sự kiện handleKeydown cho window sau khi component được biên soạn.
         * TVTOAN (08/08/2022)
         */
        window.addEventListener('keydown', this.handleKeydown, null);
    },

    beforeUnmount() {
        /**
         * Hủy sự kiện handleKeydown cho window.
         * TVTOAN (08/08/2022)
         */
        window.removeEventListener('keydown', this.handleKeydown);
    },

    data() {
        return {
            // Dữ liệu bool
            isShowToastSuccess: false,
            isMessDelete: false,
            isShowToastFail: false,
            isDelete: false,
            isSelect: false,
            isShowLoading: false,
            showDetailParent: false,

            title: '',
            toastMess: '',
            errMessWarning: '',
            curIndex: 0,

            //Đối tượng và mảng
            assets: [],
            assetSelected: {},
            selected: [],

            //Index
            indexRecord: {
                indexOld: 0,
                firstIndex: 0,
                lastIndex: 0,
            },

            // Dữ liệu cho bảng
            total: {
                totalRecord: 0,
                totalQuantity: 0,
                totalCost: 0,
                totalAtrophy: 0,
                totalResidualValue: 0,
            },

            // Dữ liệu cho api phân trang
            paging: {
                keyWord: '',
                departmentID: '',
                fixedAssetCategoryID: '',
                pageSize: 15,
                pageNumber: 1,
                totalPage: 0,
                maxVisibleButtons: 5,
            }
        }
    },

    computed: {
        /**
        * Lấy trang đầu tiên.
        * TVTOAN (06/08/2022)
        */
        startPage() {
            if (this.paging.pageNumber === 1) {
                return 1;
            }
            if (this.paging.pageNumber === this.paging.totalPage) {
                return this.paging.totalPage;
            }
            return this.paging.pageNumber - 1;
        },

        /**
        * Lấy mảng gồm tên và attr btn.
        * TVTOAN (06/08/2022)
        */
        pages() {
            const range = [];
            for (let i = this.startPage; i <= Math.min(this.startPage + this.paging.maxVisibleButtons - 1, this.paging.totalPage); i += 1) {

                range.push({
                    name: i,
                    isDisabled: i === this.paging.pageNumber
                });
            }
            return range;
        },
    },

    methods: {
        /**
        * Tính ra đã sử dụng được bao nhiêu năm.
        * TVTOAN (11/09/2022)
        */
        getAtrophy(curDate, productDate, ) {
            try {
                let productYear = productDate.slice(0, 4);
                return Number(curDate) - Number(productYear);
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * di chuyển lên , xuống dòng dữ liệu bằng phím.
        * TVTOAN (08/08/2022)
        */
        handleKeydown(e) {
            var startIndex = 0;
            var endIndex = this.assets.length - 1;
            switch (e.keyCode) {
                case 38:
                    if (this.selected.length == 0) {
                        this.selected.push(this.assets[endIndex].fixedAssetId);
                        this.checkActive(this.assets[endIndex].fixedAssetId);
                    } else {
                        this.curIndex--;
                        if (this.curIndex < startIndex) {
                            this.curIndex = endIndex;
                        }
                        this.selected = [];
                        this.selected.push(this.assets[this.curIndex].fixedAssetId);
                        this.checkActive(this.assets[this.curIndex].fixedAssetId);
                    }
                    break;
                case 40:
                    if (this.selected.length == 0) {
                        this.selected.push(this.assets[startIndex].fixedAssetId);
                        this.checkActive(this.assets[startIndex].fixedAssetId);
                    } else {
                        this.curIndex++;
                        if (this.curIndex > endIndex) {
                            this.curIndex = startIndex;
                        }
                        this.selected = [];
                        this.selected.push(this.assets[this.curIndex].fixedAssetId);
                        this.checkActive(this.assets[this.curIndex].fixedAssetId);
                    }
                    break;
            }
        },

        /**
        * Về trang đầu.
        * TVTOAN (06/08/2022)
        */
        onClickFirstPage() {
            this.paging.pageNumber = 1;
            this.getData(this.paging);
        },

        /**
        * Lùi 1 trang.
        * TVTOAN (06/08/2022)
        */
        onClickPreviousPage() {
            if (this.paging.pageNumber > 1) {
                this.paging.pageNumber -= 1;
                this.getData(this.paging);
            }
        },

        /**
        *  Chọn trang muốn đến.
        * TVTOAN (06/08/2022)
        */
        onClickPage(page) {
            this.paging.pageNumber = page;
            this.getData(this.paging);
        },

        
        /**
        * Tiến 1 trang.
        * TVTOAN (06/08/2022)
        */
        onClickNextPage() {
            if (this.paging.pageNumber < this.paging.totalPage) {
                this.paging.pageNumber += 1;
                this.getData(this.paging);
            }
        },

        /**
        * Đến trang cuối.
        * TVTOAN (06/08/2022)
        */
        onClickLastPage() {
            this.paging.pageNumber = this.paging.totalPage;
            this.getData(this.paging);
        },

        /**
        * Tìm kiếm.
        * TVTOAN (06/08/2022)
        */
        btnSearch(key, e) {
            if (e.keyCode === 13) {
                this.paging.keyWord = key;
                this.getData(this.paging);
            }
        },
 
        /**
        * Lọc theo id phòng ban.
        * TVTOAN (02/08/2022)
        */
        filterByDepartmentID(id) {
            this.paging.departmentID = id;
            this.getData(this.paging);
        },

        /**
        * Lọc theo loại tài sản.
        * TVTOAN (02/08/2022)
        */
        filterByCategoryID(id) {
            this.paging.fixedAssetCategoryID = id;
            this.getData(this.paging);
        },

        /**
        * Chọn số bản ghi hiển thị trên 1 trang.
        * TVTOAN (06/08/2022)
        */
        selectPageSize(e) {
            this.paging.pageSize = e.target.value;
            this.getData(this.paging);
        },

        /**
        * Tự động active bản ghi vừa thêm mới.
        * TVTOAN (06/08/2022)
        */
        activeAssetNew(id) {
            this.selected = [],
                this.selected.push(id);
            this.checkActive(id);
        },

        /**
        * Gọi api filter.
        * TVTOAN (25/07/2022)
        */
        getData(paging) {
            this.isShowLoading = true;
            //gọi api lấy dữ liệu
            fetch(`http://localhost:14537/api/FixedAssets?keyword=${paging.keyWord}&departmentID=${paging.departmentID}&fixedAssetCategoryID=${paging.fixedAssetCategoryID}&pageSize=${paging.pageSize}&pageNumber=${paging.pageNumber}`, { method: "GET" })
                .then(res => res.json())
                .then(data => {
                    this.isShowLoading = true;
                    setTimeout(() => this.isShowLoading = false, 500);
                    this.totalRecord = data.totalCount;
                    this.total.totalCost = 0;
                    this.total.totalQuantity = 0;
                    this.total.totalAtrophy = 0;
                    this.total.totalResidualValue = 0;
                    this.assets = data.data;
                    for (let asset of this.assets) {
                        this.total.totalCost += Number(asset.cost);
                        this.total.totalQuantity += Number(asset.quantity);
                        asset.atrophy = this.getAtrophy(asset.trackedYear, asset.productionDate) * asset.depreciationValue;
                        asset.residualValue = asset.cost - asset.atrophy;
                        this.total.totalAtrophy +=asset.atrophy;
                        this.total.totalResidualValue +=asset.residualValue;
                    }
                    this.paging.totalPage = Math.ceil(data.totalCount / this.paging.pageSize);                
                });
                this.pages;
        },

        /**
        * Hàm format dữ liệu.
        * TVTOAN (01/08/2022)
        */
        formatPrice, formatDate,

        /**
        * Hiển thị cảnh báo khi xóa tài sản.
        * TVTOAN (02/08/2022)
        */
        showDialogDeleteList() {
            try {
                if (this.selected.length > 0) {
                    this.errMessWarning = `${this.selected.length} tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách ?`;
                    this.isDelete = true;
                    this.isMessDelete = false;
                } else {
                    this.errMessWarning = `Vui lòng chọn ít nhất 1 bản ghi`;
                    this.isMessDelete = true;
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Hàm xóa tài sản
        * TVTOAN (02/08/2022)
        */
        btnDeleteOnClick() {
            try {
                this.isShowLoading = true;
                if (this.selected.length == 1) {
                    fetch(`http://localhost:14537/api/FixedAssets/${this.selected[0]}`, { method: 'DELETE' })
                        .then(res => {
                            if (res.status == 200) {
                                this.isDelete = false;
                                this.getData(this.paging);
                                this.toastMess = 'Xóa thành công !!!';
                                this.isShowToastSuccess = true;
                                this.selected = [];
                                setTimeout(() => this.isShowToastSuccess = false, 3000);
                            } else {
                                this.toastMess = `Xóa không thành công`
                                this.isShowToastSuccess = true;
                            }
                        })
                }
                if (this.selected.length > 0) {
                    let body = [];
                    this.selected.map(function (value, key) {
                        body.push(value);
                        console.log(key);
                    })
                    const requestOptions = {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    };
                    fetch(`http://localhost:14537/api/FixedAssets/`, requestOptions)
                        .then(res => {
                            if (res.status == 200) {
                                this.isDelete = false;
                                this.getData(this.paging);
                                this.toastMess = `Xóa ${this.selected.length} tài sản thành công`;
                                this.selected = [];
                                this.isShowToastSuccess = true
                                setTimeout(() => this.isShowToastSuccess = false, 500);
                            } else {
                                this.toastMess = `Xóa không thành công`
                                this.isShowToastSuccess = true;
                            }
                        })
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Hiển thị dialog cảnh báo xóa tài sản.
        * TVTOAN (02/08/2022)
        */
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
        
        /**
        * Cập nhật thông báo.
        * TVTOAN (02/08/2022)
        */
        updateMessage(mes) {
            this.toastMess = mes;
            this.isShowToastSuccess = true;
            setTimeout(() => this.isShowToastSuccess = false, 3000);
        },

        /**
        * Ẩn dialog cảnh báo xóa tài sản.
        * TVTOAN (02/08/2022)
        */
        hideDialogDelete() {
            try {
                this.isDelete = false;
                this.isMessDelete = false;
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Chức năng mở dialog thêm mới
        * TVTOAN (26/07/2022)
        */
        showDetail(isShow) {
            try {
                this.showDetailParent = isShow;
                this.title = "Thêm tài sản";
                this.assetSelected = {
                    fixedAssetId: '00000000-0000-0000-0000-000000000000',
                    fixedAssetCode: '',
                    fixedAssetName: '',
                    departmentID: '',
                    fixedAssetCategoryID: '',
                    quantity: 1,
                    Cost: 1,
                    depreciationRate: 0,
                    purchaseDate: '',
                    productionDate: '',
                    trackedYear: '',
                    lifeTime: 1,
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

        /**
        * Chức năng double click 1 bản ghi
        * TVTOAN (26/07/2022)
        */
        rowOnDblClick(asset) {
            try {
                this.title = "Sửa tài sản";
                this.assetSelected = asset;
                this.showDetailParent = true;            
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Chức năng nhân bản
        * TVTOAN (26/07/2022)
        */
        duplicateAssets(asset) {
            try {
                this.title = "Nhân bản tài sản";
                this.assetSelected = asset;
                this.isDuplicate = true;
                axios.get("http://localhost:14537/api/FixedAssets/new-code")
                    .then(res => { this.assetSelected.fixedAssetCode = res.data });
                this.showDetailParent = true;
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Nhận lại trạng thái
        * TVTOAN (26/07/2022)
        */
        returnIsDuplicate(bool) {
            this.isDuplicate = bool;
        },

        /**
        * Chức năng chọn tất cả bản ghi.
        * TVTOAN (26/07/2022)
        */
        selectAllRows() {
            try {
                this.selected = [];
                if (!this.isSelect) {
                    for (let i in this.assets) {
                        this.selected.push(this.assets[i].fixedAssetId);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Chức năng active 1 bản ghi
        * TVTOAN (26/07/2022)
        */
        btnRowActiveOnClick(asset, e, index) {
            try {
                this.curIndex = index;
                if (e.ctrlKey) {
                    // Ctrl chọn nhiều bản ghi
                    let isInArr = this.btnRowUnActive(asset.fixedAssetId);
                    if (isInArr != true) {
                        this.selected.push(asset.fixedAssetId);
                    }
                    if (this.selected.length == this.assets.length) {
                        this.isSelect = true;
                    }
                    var newArrCtrl = [...new Set(this.selected)];
                    this.selected = newArrCtrl
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
                    if (this.selected.length == this.assets.length) {
                        this.isSelect = true;
                    }
                } else {
                    //click để chọn bản ghi
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

        /**
        // Nếu đã active mà click thì sẽ bỏ active
        * TVTOAN (26/08/2022)
        */
        btnRowUnActive (id) {
            try {
                let isInArray = this.selected.includes(id);
                if(isInArray == true) {
                    var value = this.selected.indexOf(id);
                    this.selected.splice(value, 1);
                }
                return isInArray;
            } catch (error) {
                console.log(error);
            }
        },

        /**
        // Active những row có id trong mảng
        * TVTOAN (26/07/2022)
        */
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