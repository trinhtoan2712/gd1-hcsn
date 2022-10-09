<template>
    <div class="container">
        <div class="header-masterdetail pading-left pading-right">
            <div class="header-masterdetail-left">
                <h3>Ghi tăng tài sản</h3>
            </div>
            <div class="header-masterdetail-right">
                <button class="btn" style="margin-right:16px" id="btnAdd" @click="showDetail(true)">
                    <div class="btn-add" >Thêm </div>
                    <!-- <span class="tooltip">Ctrl + I</span> -->
                </button>
                <button class="btn-unknow" id="">
                    <div class="btn-unknow-icon1 icon-content"> </div>
                    <div class="btn-unknow-icon2 icon-content"> </div>
                    <!-- <span class="tooltip">Ctrl + I</span> -->
                </button>
            </div>
        </div>
        <splitpanes class="main-masterdetail pading-left pading-right pading-bottom default-theme" horizontal
            style="height: 82vh; width: 97%;">
            <BaseLoading></BaseLoading>
            <pane style="background: #fff">
                <div class="header-table">
                    <div class="header-table-left">
                        <div class="form-search">
                            <div class="form-search__icon icon-small"></div>
                            <input class="form-search__input" ref="txtSearch" type="text"
                                placeholder="Tìm kiếm theo tài sản">
                        </div>
                    </div>
                    <div class="header-table-right">
                        <div class="form-option">
                            <div class="icon-export icon-small"></div>
                            <div class="icon-3dot icon-small"></div>
                        </div>
                    </div>
                </div>
                <div class="container-table">
                    <table class="data-table noselect">
                        <thead class="data-table__thead">
                            <tr>
                                <th>
                                    <input type="checkbox" name="" class="ckb ckb-primary">
                                </th>
                                <th>STT</th>
                                <th>Số chứng từ</th>
                                <th>Ngày chứng từ</th>
                                <th>Ngày ghi tăng</th>
                                <th class="number-right">Tổng nguyên giá</th>
                                <th>Nội dung</th>
                                <th style="padding: 0px 10px">Chức năng</th>
                            </tr>
                        </thead>
                        <tbody class="data-table__tbody">
                            <tr class="tr-tbody" v-for="(assetIncrement, index ) in assetsIncrement"
                                :key="assetIncrement.voucherID" @click="btnRowActiveOnClick(assetIncrement, $event, index)"
                                :class="{'bgblue': checkActive(assetIncrement.voucherID) }">
                                <td><input type="checkbox" name="" id="" class="ckb ckb-primary"></td>
                                <td style="text-align:center"> {{index + 1}} </td>
                                <td>{{assetIncrement.voucherCode}}</td>
                                <td>{{assetIncrement.voucherDate}}</td>
                                <td>{{assetIncrement.incrementDate}}</td>
                                <td class="number-right">{{assetIncrement.price}}</td>
                                <td class="text-hide-base">
                                    <p>{{ assetIncrement.description }}</p>
                                </td>
                                <td class="table-option">
                                    <div class="table-eidt icon-pading icon-small"><span class="tooltip">Sửa (Ctrl +
                                            C)</span></div>
                                    <div class="table-replication icon-content icon-pading icon-small"><span
                                            class="tooltip">Nhân
                                            bản </span></div>
                                    <div class="table-delete icon-small icon-pading"><span class="tooltip">Xóa
                                            (Delete)</span></div>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <div class="footer-table">
                    <table>
                        <tr class="summary-table">
                            <td class="number-right font-bold">100</td>
                            <td class="number-right font-bold">100</td>
                            <td class="number-right font-bold">100</td>
                            <td class="number-right font-bold">100</td>
                            <td>

                            </td>
                        </tr>
                    </table>
                    <div class="paging-table">
                        <div class="total-record">Tổng số: <strong>{{ totalRecord }}</strong> bản ghi</div>
                        <div class="page-record">
                            <select name="" id="">
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                            </select>
                        </div>
                        <div class="table__paging--center">
                            <div class="paging__button"><i class="fa-solid fa-angles-left"></i><span class="tooltip">Về
                                    trang đầu</span>
                            </div>
                            <div class="paging__button paging__button--prev icon-content"><span class="tooltip">Trang
                                    trước</span></div>

                            <div class="paging__button paging__button--next icon-content"><span class="tooltip">Trang
                                    sau</span></div>
                            <div class="paging__button"><i class="fa-solid fa-angles-right"></i><span
                                    class="tooltip">Đến trang cuối</span>
                            </div>
                        </div>
                    </div>
                </div>
            </pane>
            <pane style="z-index:9; background: #fff;">
                <div class="table-detail">
                    <div class="table-detail__header">
                        <span class="content-title">Danh sách tài sản</span>
                    </div>
                    <TableBase v-if="isShowDetail" :voucherID="this.selected[0]"/>
                </div>
            </pane>
        </splitpanes>
        <div class="asset-masterdetail"></div>
    </div>
    <TheDialogMasterDetail v-if="isShowDialogDetail" :showDetailChil="isShowDialogDetail" :showDetailFunction="showDetail" :title="title"/>
</template>

<script>
import TheDialogMasterDetail from './TheDialogMasterDetail.vue'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import TableBase from '../../base/BaseTableFixedAsset.vue'
import { formatPrice, formatDate } from "../../common/TheCommon";
import BaseLoading from '../../base/BaseLoading.vue';
import { directive, Contextmenu, ContextmenuItem } from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";
import { EndPoint} from "../../common/TheConst"; //, NameCookie, FullUrl 
import axios from "axios";

export default ({
    directives: {
        contextmenu: directive,
    },
    components: {TheDialogMasterDetail,
        Splitpanes, Pane, TableBase, BaseLoading, [Contextmenu.name]: Contextmenu,
        [ContextmenuItem.name]: ContextmenuItem
    },

    created() {
        this.getData(this.paging);
    },
    formatDate,formatPrice,
    methods: {
        /**
        * Chức năng mở dialog thêm mới chứng từ
        * TVTOAN (26/07/2022)
        */
        showDetail(isShow) {
            try {
                this.isShowDialogDetail = isShow;
                this.title = "Thêm chứng từ ghi tăng";
                this.assetIncrementSelected = {
                    // fixedAssetId: '00000000-0000-0000-0000-000000000000',
                    // fixedAssetCode: '',
                    // fixedAssetName: '',
                    // departmentID: '',
                    // fixedAssetCategoryID: '',
                    // quantity: 1,
                    // Cost: 1,
                    // depreciationRate: 0,
                    // purchaseDate: '',
                    // productionDate: '',
                    // trackedYear: '',
                    // lifeTime: 1,
                    // depreciationValue: 1,
                    // createdBy: "TVTOAN",
                    // createdDate: new Date(),
                    // modifiedBy: "TVTOAN",
                    // modifiedDate: new Date(),
                };
            } catch (error) {
                console.log(error);
            }
        },

        /**
        * Chức năng lay danh sach bản ghi
        * TVTOAN (26/07/2022)
        */
        getData(paging) { 
            try {
                this.isShowLoading = true;
                axios.get(`${EndPoint.END_POINT_FIXED_ASSET_INCREMENT}?keyword=${paging.keyWord}&pageSize=${paging.pageSize}&pageNumber=${paging.pageNumber}`)
                    .then(data => {
                        this.isShowLoading = true;
                        setTimeout(() => this.isShowLoading = false, 500);
                        this.assetsIncrement = data.data.data;
                        this.totalRecord = data.data.totalCount;
                        this.selected[0] = this.assetsIncrement[0].voucherID;
                        this.isShowDetail = true;
                    })
            } catch (error) {
                console.log(error);
            }
        },
        
        /**
        * Chức năng active 1 bản ghi
        * TVTOAN (26/07/2022)
        */
        btnRowActiveOnClick(assetIncrement, e, index) {
            try {
                this.curIndex = index;
                if (e.ctrlKey) {
                    // Ctrl chọn nhiều bản ghi
                    let isInArr = this.btnRowUnActive(assetIncrement.voucherID);
                    if (isInArr != true) {
                        this.selected.push(assetIncrement.voucherID);
                    }
                    if (this.selected.length == this.assetsIncrement.length) {
                        this.isSelect = true;
                    }
                    var newArrCtrl = [...new Set(this.selected)];
                    this.selected = newArrCtrl
                } else if (e.shiftKey) {
                    // Giữ shift chọn nhiều bản ghi
                    this.selected.push(assetIncrement.voucherID);
                    this.lastIndex = index;
                    if (this.firstIndex > this.lastIndex) {
                        this.firstIndex = this.lastIndex;
                        this.lastIndex = this.indexOld;
                    }
                    for (let index = this.firstIndex; index <= this.lastIndex; index++) {
                        this.selected.push(this.assetsIncrement[index].voucherID);
                    }
                    var newArr = [...new Set(this.selected)];
                    this.selected = newArr
                    if (this.selected.length == this.assetsIncrement.length) {
                        this.isSelect = true;
                    }
                } else {
                    //click để chọn bản ghi
                    this.assetIncrementCurrent = assetIncrement;
                    this.selected = [];
                    this.firstIndex = index;
                    this.indexOld = this.firstIndex;
                    this.selected.push(assetIncrement.voucherID);
                    this.isSelect = false;
                }
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
                for (let assetIncrement of this.selected) {
                    if (rowActive == assetIncrement) {
                        return rowActive;
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    data() {
        return {
            // Dữ liệu bool
            isShowDetail: false,
            isShowLoading: true,
            isShowToastSuccess: false,
            isMessDelete: false,
            isShowToastFail: false,
            isDelete: false,
            isSelect: false,
            showDetailParent: false,
            isShowDialogDetail: false,

            JWToken: '',
            title: '',
            toastMess: '',
            errMessWarning: '',
            curIndex: 0,

            //Đối tượng và mảng
            assetsIncrement: [],
            assetIncrementSelected: {},
            selected: [],
            assetIncrementCurrent: {},

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
                pageSize: 15,
                pageNumber: 1,
                totalPage: 0,
                maxVisibleButtons: 3,
            }
        }
    },

})
</script>

<style scoped>
@import url(../MasterDetail/masterdetail.css);
</style>