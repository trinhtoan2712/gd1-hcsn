<template>
    <div class="content-table-base" :class="{tablenodatasize: assets.length < 1}" >
        <table class="table-data noselect">
            <thead class="table-header">
                <tr>
                    <th style="width:50px" v-if="isShowCheckBox">
                        <input type="checkbox" name="" class="ckb ckb-primary" v-model="isSelect"
                            @click="selectAllRows">
                    </th>
                    <th style="width:40px;text-align: center;">STT<span class="tooltip">Số thứ tự</span> </th>
                    <th style="width:200px">Mã tài sản</th>
                    <th style="width:200px">Tên tài sản</th>
                    <th style="width:200px" v-if="isShowAllColumn">Loại tài sản</th>
                    <th style="width:200px">Bộ phận sử dụng</th>
                    <th style="width:100px" class="number-right" v-if="isShowAllColumn">Số lượng</th>
                    <th style="width:200px; padding-left:50px" class="number-right">Nguyên giá</th>
                    <th style="width:200px" class="number-right">Hao mòn năm</th>
                    <th style="width:200px" class="number-right">Giá trị còn lại</th>
                    <th v-if="isShowFunction" style="padding: 0px 10px">Chức năng</th>
                </tr>
            </thead>
            <tbody class="table-body">
                <tr class="tbody-tr" v-for="(asset, index ) in assets" :key="asset.fixedAssetId"
                    v-contextmenu:contextmenu :class="{'bgblue': checkActive(asset.fixedAssetId) }"
                    @click="btnRowActiveOnClick(asset, $event, index)" @dblclick="rowOnDblClick(asset)">
                                        <td v-if="isShowCheckBox" > 
                        <input type="checkbox" name="" id="" class="ckb ckb-primary" :value="asset.fixedAssetId"
                            v-model="selected">
                    </td>
                    <td style="text-align:center">{{ index + 1 }}</td>
                    <td>{{ asset.fixedAssetCode }}</td>
                    <td class="text-hide">
                        <p>{{ asset.fixedAssetName }}</p>
                    </td>
                    <td v-if="isShowAllColumn" class="text-hide">
                        <p>{{ asset.fixedAssetCategoryName }}</p>
                    </td>
                    <td class="text-hide">
                        <p>{{ asset.departmentName }}</p>
                    </td>
                    <td v-if="isShowAllColumn" class="number-right">{{ asset.quantity }}</td>
                    <td class="number-right">{{ formatPrice(asset.cost) }}</td>
                    <td class="number-right">{{ formatPrice(asset.depreciationValue) }}</td>
                    <td class="number-right">{{ formatPrice(asset.residualValue) }}</td>

                    <td class="table-option" v-if="isShowFunction">
                        <div @click="rowOnDblClick(asset)" class="table-eidt icon-pading icon-small"><span
                                class="tooltip">Sửa (Ctrl + C)</span></div>
                        <div @click="btnDeleteOnClick(asset,index)" class="table-delete icon-small icon-pading">
                            <span class="tooltip">Xóa (Delete)</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="12" class="table__nodata" v-if="assets.length < 1"> </td>
                </tr>
            </tbody>
            <BaseLoading v-if="isShowLoading"></BaseLoading>
        </table>
    </div>
    <div class="table-footer-base" v-if="assets.length > 0">
        <table>
            <tr class="table-summary-base" v-if="assets.length > 0 || isShowSummary">
                <td style="width:240px !important; padding-left: 5px;"><span v-if="isShowQuantityRecords">Đã chọn: <strong>{{selected.length}}</strong> bản ghi</span></td>
                <td style="width:200px !important"></td>
                <td style="width:200px !important"></td>
                <td style="width:200px !important"></td>
                <td v-if="isShowAllColumn" style="width:50px !important; padding-right: 5px;" class="number-right font-bold">{{ total.totalQuantity }}</td>
                <td style="width:120px !important; padding-right: 5px;" class="number-right font-bold">{{ formatPrice(total.totalCost) }}</td>
                <td class="number-right font-bold">{{formatPrice(total.totalAtrophy)}}</td>
                <td class="number-right font-bold" >{{formatPrice(total.totalResidualValue)}}</td>
            </tr>
        </table>
        <div class="paging-base" v-if="isShowPaging">
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
                    <div class="" v-if="pages.length > 2">...</div>
                    <div class="paging__number" @click="onClickPage(paging.totalPage)">{{paging.totalPage}}</div>
                </div>
                <div @click="onClickNextPage" class="paging__button paging__button--next icon-content"><span
                        class="tooltip">Trang sau</span></div>
                <div @click="onClickLastPage" class="paging__button"><i class="fa-solid fa-angles-right"></i><span
                        class="tooltip">Đến trang cuối</span></div>
            </div>
        </div>
    </div>
    <TheDialogUpdateBudgetAsset v-if="isShowDialogAssetBudget" :showDetailChil="isShowDialogAssetBudget"
        :showDetailFunction="showDetail" :title="title" :assetSelected="assetSelected" v-on:arrayById="arrayById" v-on:totalById="totalById"/>
</template>

<script>
import TheDialogUpdateBudgetAsset from '../page/MasterDetail/TheDialogUpdateBudgetAsset.vue'
import { formatPrice, formatDate } from "../common/TheCommon";
import BaseLoading from '../base/BaseLoading.vue';
import { directive, Contextmenu, ContextmenuItem } from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";
import { EndPoint } from "../common/TheConst";
import axios from "axios";

export default ({
    directives: {
        contextmenu: directive,
    },
    name: "TableBase",
    components: {
        BaseLoading, [Contextmenu.name]: Contextmenu,
        [ContextmenuItem.name]: ContextmenuItem, TheDialogUpdateBudgetAsset
    },
    emits: ["updateMessage", "listUpdate", "listAssetSelected", "listDelete", "idFixedAssettDelete", "listFixedAssetId"],
    props: {
        listSelected: [],
        keyWord: String,
        listAsset: [],
        isShowQuantityRecords: Boolean,
        isShowCheckBox: Boolean,
        isShowPaging: Boolean,
        isShowSummary: Boolean,
        isShowFunction: Boolean,
        voucherID: String,
        isShowAllColumn: Boolean,
    },
    created() {
        if(this.voucherID == 'getAll') {
                this.getAllData(this.paging)
            }
            else {
                this.getData(this.pagingByVoucherID)
            }
        // else {
        //     // array từ cache để làm form sửa và thêm.
        //     this.assets = this.arrayFixedAsset;
        //     this.totalRecord = this.assets.length;
        //     this.resetTotal()
        //     for (let asset of this.assets) {
        //         asset.atrophy = this.getAtrophy(asset.trackedYear, asset.productionDate) * asset.depreciationValue;
        //         asset.residualValue = asset.cost - asset.atrophy;
        //         this.total.totalCost += asset.cost;
        //         this.total.totalAtrophy += asset.atrophy
        //     }
        //     this.total.totalResidualValue = this.total.totalCost - this.total.totalAtrophy
        //     this.paging.totalPage = Math.ceil(this.asset.length / this.paging.pageSize);
        // }

    },

    watch: {
        keyWord: function (newValue) {
            this.paging.keyWord = newValue;
            this.getAllData(this.paging)
        },

        voucherID: function (newValue) {
            if(newValue == 'getAll') {
                this.getAllData(this.paging)
            }
            if (newValue != 'getAll') {
                this.getData(this.pagingByVoucherID)
            }

        },
        listAsset: function (newValue) {
            let result  = this.assets.concat(newValue)
            let newListCtrl = [...new Set(result)];
            this.assets=newListCtrl;
        }
    },
    unmounted() {
        /**
         * Hủy sự kiện handleKeydown cho window.
         * TVTOAN (08/08/2022)
         */
        window.removeEventListener('keydown', this.handleKeydown);
    },

    data() {
        return {
            // Dữ liệu bool
            isShowDialogAssetBudget: false,
            isShowToastSuccess: false,
            isMessDelete: false,
            isShowToastFail: false,
            isDelete: false,
            isSelect: false,
            isShowLoading: false,
            showDetailParent: false,

            JWToken: '',
            title: '',
            toastMess: '',
            errMessWarning: '',
            curIndex: 0,

            //Đối tượng và mảng
            assets: [],
            assetSelected: {},
            selected: [],
            listAssetSelected: [],
            assetCurrent: {},
            listFixedAssetId: [],
            listDelete: [],
            listUpdate: [],

            //Index
            indexRecord: {
                indexOld: 0,
                firstIndex: 0,
                lastIndex: 0,
            },

            // Dữ liệu cho bảng
            total: {
                totalRecord: 0,
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
                maxVisibleButtons: 3,
            },

            // Dữ liệu cho api phân trang
            pagingByVoucherID: {
                keyWord: '',
                departmentID: '',
                fixedAssetCategoryID: '',
                pageSize: 9999,
                pageNumber: 1,
                totalPage: 0,
                maxVisibleButtons: 3,
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
            for (let i = this.startPage; i <= Math.min(this.startPage + this.paging.maxVisibleButtons - 1, this.paging.totalPage - 1); i += 1) {

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
        * Lấy tổng tiền từ các nguồn vốn
        * TVTOAN (11/09/2022)
        */
        totalById(total) {
            this.assetCurrent.cost = total;
            this.$emit("listUpdate", this.assets)
        },

        /**
        * Lấy thông tin từ các nguồn vốn
        * TVTOAN (11/09/2022)
        */
        arrayById(array) {
            this.assetCurrent.fixedAssetBudget = array;
            this.$emit("listUpdate", this.assets)
        },

        /**
        * Tính ra đã sử dụng được bao nhiêu năm.
        * TVTOAN (11/09/2022)
        */
        getAtrophy(curDate, productDate,) {
            try {
                let productYear = productDate.slice(0, 4);
                return Number(curDate) - Number(productYear);
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Phím tắt.
        * TVTOAN (08/08/2022)
        */
        eventKeyPage(e) {
            try {
                if (e.keyCode == 73 && e.ctrlKey) {
                    this.showDetail(true);
                }
                if (e.keyCode == 67 && e.ctrlKey) {
                    if (this.selected.length == 1) {
                        this.rowOnDblClick(this.assetCurrent)
                    }
                }
                if (e.keyCode == 68 && e.ctrlKey) {
                    if (this.selected.length == 1) {
                        this.duplicateAssets(this.assetCurrent)
                    }
                }
                if (e.keyCode == 46) {
                    if (this.selected.length > 0) {
                        this.showDialogDeleteList(this.assetCurrent);
                    }
                }
                if (this.isDelete == true) {
                    if (e.keyCode == 13) {
                        this.btnDeleteOnClick()
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * di chuyển lên , xuống dòng dữ liệu bằng phím.
        * TVTOAN (08/08/2022)
        */
        handleKeydown(e) {
            try {
                var startIndex = 0;
                var endIndex = this.assets.length - 1;
                switch (e.keyCode) {
                    case 38:
                        if (this.selected.length == 0) {
                            this.assetCurrent = this.assets[endIndex]
                            this.selected.push(this.assets[endIndex].fixedAssetId);
                            this.checkActive(this.assets[endIndex].fixedAssetId);
                        } else {
                            this.curIndex--;
                            if (this.curIndex < startIndex) {
                                this.curIndex = endIndex;
                            }
                            this.selected = [];
                            this.assetCurrent = this.assets[this.curIndex]
                            this.selected.push(this.assets[this.curIndex].fixedAssetId);
                            this.checkActive(this.assets[this.curIndex].fixedAssetId);
                        }
                        break;
                    case 40:
                        if (this.selected.length == 0) {
                            this.assetCurrent = this.assets[startIndex]
                            this.selected.push(this.assets[startIndex].fixedAssetId);
                            this.checkActive(this.assets[startIndex].fixedAssetId);
                        } else {
                            this.curIndex++;
                            if (this.curIndex > endIndex) {
                                this.curIndex = startIndex;
                            }
                            this.selected = [];
                            this.assetCurrent = this.assets[this.curIndex]
                            this.selected.push(this.assets[this.curIndex].fixedAssetId);
                            this.checkActive(this.assets[this.curIndex].fixedAssetId);
                        }
                        break;
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Về trang đầu.
        * TVTOAN (06/08/2022)
        */
        onClickFirstPage() {
            this.paging.pageNumber = 1;
            this.getAllData(this.paging)

        },

        /**
        * Lùi 1 trang.
        * TVTOAN (06/08/2022)
        */
        onClickPreviousPage() {
            if (this.paging.pageNumber > 1) {
                this.paging.pageNumber -= 1;
                this.getAllData(this.paging)
            }

        },

        /**
        *  Chọn trang muốn đến.
        * TVTOAN (06/08/2022)
        */
        onClickPage(page) {
            this.paging.pageNumber = page;
            this.getAllData(this.paging)

        },


        /**
        * Tiến 1 trang.
        * TVTOAN (06/08/2022)
        */
        onClickNextPage() {
            if (this.paging.pageNumber < this.paging.totalPage) {
                this.paging.pageNumber += 1;
                this.getAllData(this.paging)
            }
        },

        /**
        * Đến trang cuối.
        * TVTOAN (06/08/2022)
        */
        onClickLastPage() {
            this.paging.pageNumber = this.paging.totalPage;
            this.getAllData(this.paging)
        },

        /**
        * Tìm kiếm.
        * TVTOAN (06/08/2022)
        */
        btnSearch(key, e) {
            try {
                if (e.keyCode === 13) {
                    this.paging.keyWord = key;
                    this.getAllData(this.paging)
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Chọn số bản ghi hiển thị trên 1 trang.
        * TVTOAN (06/08/2022)
        */
        selectPageSize(e) {
            try {
                this.paging.pageSize = e.target.value;
                this.getAllData(this.paging);
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Tự động active bản ghi vừa thêm mới.
        * TVTOAN (06/08/2022)
        */
        activeAssetNew(id) {
            try {
                this.selected = [],
                    this.selected.push(id);
                this.checkActive(id);
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Gọi api filter.
        * TVTOAN (25/07/2022)
        */
        getData(paging) {
            try {
                //gọi api lấy dữ liệu truyền lại cái domain lúc đầu vào đây
                axios.get(`${EndPoint.END_POINT_FIXED_ASSET_INCREMENT_DETAIL_GETONE}?voucherId=${this.voucherID}&pageSize=${paging.pageSize}&pageNumber=${paging.pageNumber}`)
                    .then(data => {
                        this.totalRecord = data.data.totalCount;
                        this.resetTotal()
                        this.assets = data.data.data;
                        if(this.listSelected.length == 1) {
                            this.listFixedAssetId = [];
                        }
                        for (let asset of this.assets) {
                            asset.atrophy = this.getAtrophy(asset.trackedYear, asset.productionDate) * asset.depreciationValue;
                            asset.residualValue = asset.cost - asset.atrophy;
                            this.listFixedAssetId.push(asset.fixedAssetID);
                        }
                        this.total.totalCost = data.data.totalCost;
                        this.total.totalAtrophy += data.data.totalAtrophy;
                        this.total.totalResidualValue = data.data.totalCost - data.data.totalAtrophy
                        this.paging.totalPage = Math.ceil(data.data.totalCount / this.paging.pageSize);
                        this.$emit("listFixedAssetId", this.listFixedAssetId);
                    });
                this.pages;
            } catch (error) {
                console.log(error);
            }
        },

/**
        * Gọi api filter.
        * TVTOAN (25/07/2022)
        */
        getAllData(paging) {
            try {
                //gọi api lấy dữ liệu truyền lại cái domain lúc đầu vào đây
                axios.get(`${EndPoint.END_POINT_FIXED_ASSET}?keyword=${paging.keyWord}&departmentID=${paging.departmentID}&fixedAssetCategoryID=${paging.fixedAssetCategoryID}&pageSize=${paging.pageSize}&pageNumber=${paging.pageNumber}&status=0`)
                    .then(data => {
                        this.totalRecord = data.data.totalCount;
                        this.resetTotal()
                        this.assets = data.data.data;
                        for (let asset of this.assets) {
                            asset.atrophy = this.getAtrophy(asset.trackedYear, asset.productionDate) * asset.depreciationValue;
                            asset.residualValue = asset.cost - asset.atrophy;
                        }
                        this.total.totalCost = data.data.totalCost;
                        this.total.totalQuantity = data.data.totalQuantity;
                        this.total.totalAtrophy += data.data.totalAtrophy;
                        this.total.totalResidualValue = data.data.totalCost - data.data.totalAtrophy
                        this.paging.totalPage = Math.ceil(data.data.totalCount / this.paging.pageSize);
                    });
                    this.pages;
            } catch (error) {
                console.log(error);
            }
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
        showDialogDeleteList(asset) {
            try {
                if (this.selected.length > 0) {
                    if (this.selected.length == 1) {
                        this.errMessWarning = `Bạn có muốn xóa tài sản <b> ${asset.fixedAssetCode} - ${asset.fixedAssetName} </b>?`;
                    } else {
                        this.errMessWarning = `${this.selected.length} tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách ?`;
                    }
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
        * Hàm reset total về 0
        * TVTOAN (02/08/2022)
        */
        resetTotal() {
            this.total.totalCost = 0;
            this.total.totalAtrophy = 0;
            this.total.totalResidualValue = 0;
        },

        /**
        * Hàm xóa tài sản
        * TVTOAN (02/08/2022)
        */
        btnDeleteOnClick(asset,index) {
            try {
                this.listDelete.push(asset.fixedAssetId || asset.fixedAssetID);
                this.assets.splice(index, 1);
                this.$emit("idFixedAssettDelete", asset.fixedAssetId || asset.fixedAssetID);
                this.$emit("listDelete", this.listDelete);
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Cập nhật thông báo.
        * TVTOAN (02/08/2022)
        */
        updateMessage(mes) {
            try {
                this.toastMess = mes;
                this.isShowToastSuccess = true;
                setTimeout(() => this.isShowToastSuccess = false, 3000);
            } catch (error) {
                console.log(error);
            }
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
                this.isShowDialogAssetBudget = isShow;
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
                    depreciationValue: 1,
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
                this.title = `Sửa tài sản ${asset.fixedAssetName}`;
                this.assetSelected = asset;
                this.isShowDialogAssetBudget = true;
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
                this.listAssetSelected = [];
                if (!this.isSelect) {
                    for (let i in this.assets) {
                        this.selected.push(this.assets[i].fixedAssetId);
                        this.listAssetSelected.push(this.assets[i]);
                    }
                }
                this.$emit("listAssetSelected", this.listAssetSelected);
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
                        this.listAssetSelected.push(asset);
                        this.selected.push(asset.fixedAssetId);
                    }
                    if (this.selected.length == this.assets.length) {
                        this.isSelect = true;
                    }
                    var newListCtrl = [...new Set(this.listAssetSelected)];
                    this.listAssetSelected = newListCtrl;
                    var newArrCtrl = [...new Set(this.selected)];
                    this.selected = newArrCtrl
                } else if (e.shiftKey) {
                    // Giữ shift chọn nhiều bản ghi
                    this.selected.push(asset.fixedAssetId);
                    this.listAssetSelected.push(asset);
                    this.lastIndex = index;
                    if (this.firstIndex > this.lastIndex) {
                        this.firstIndex = this.lastIndex;
                        this.lastIndex = this.indexOld;
                    }
                    for (let index = this.firstIndex; index <= this.lastIndex; index++) {
                        this.selected.push(this.assets[index].fixedAssetId);
                        this.listAssetSelected.push(this.assets[index]);
                    }
                    var newArr = [...new Set(this.selected)];
                    var newList = [...new Set(this.listAssetSelected)];
                    this.listAssetSelected = newList;
                    this.selected = newArr;
                    if (this.selected.length == this.assets.length) {
                        this.isSelect = true;
                    }
                } else {
                    //click để chọn bản ghi
                    this.assetCurrent = asset;
                    this.selected = [];
                    this.listAssetSelected = [];
                    this.firstIndex = index;
                    this.indexOld = this.firstIndex;
                    this.selected.push(asset.fixedAssetId);
                    this.listAssetSelected.push(asset);
                    this.isSelect = false;
                }
                this.$emit("listAssetSelected", this.listAssetSelected);
            } catch (error) {
                console.log(error);
            }
        },

        /**
        // Nếu đã active mà click thì sẽ bỏ active
        * TVTOAN (26/08/2022)
        */
        btnRowUnActive(id) {
            try {
                let isInArray = this.selected.includes(id);
                if (isInArray == true) {
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

<style scope>
@import url(../../style/base/assetbase.css);
</style>