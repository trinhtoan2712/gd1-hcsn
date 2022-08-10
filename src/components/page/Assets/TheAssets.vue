<template>
    <div class="content-option">
        <div class="content-option-left">
            <div class="filter-search">
                <div class="icon-search-content icon-content"></div>
                <input class="input-search" type="text" placeholder="Tìm kiếm theo tài sản">
            </div>
            <div class="filter-assets">
                <BaseCombobox :url="'https://cukcuk.manhnv.net/api/v1/Positions'" :propValue="'PositionId'"
                    :propText="'PositionName'" :placText="'Loại tài sản'">
                </BaseCombobox>

            </div>
            <div class="filter-assets">
                <BaseCombobox :url="'https://cukcuk.manhnv.net/api/v1/Positions'" :propValue="'PositionId'"
                    :propText="'PositionName'" :placText="'Bộ phận sử dụng'">
                </BaseCombobox>
            </div>
            <div></div>
        </div>
        <div class="content-option-right">
            <button class="btn" id="btnAdd">
                <div class="btn-add button__icon" @click="showDetail(true)">Thêm tài sản</div>
            </button>
            <div class="btn-export-excel icon-content"></div>
            <div class="btn-delete icon-content"></div>
        </div>
    </div>
    <div class="content-table">
        <table class="table-data">
            <thead class="table-header">
                <tr>
                    <th>
                        <input type="checkbox" name="" id="" disabled>
                    </th>
                    <th>STT</th>
                    <th style="width:150px">Mã tài sản</th>
                    <th>Tên tài sản</th>
                    <th>Loại tài sản</th>
                    <th>Bộ phận sử dụng</th>
                    <th class="number-right">Số lượng</th>
                    <th class="number-right">Nguyên giá</th>
                    <th class="number-right">HM/KH lũy kế</th>
                    <th class="number-right">Giá trị còn lại</th>
                    <th style="padding-left:20px">Chức năng</th>
                </tr>
            </thead>
            <tbody class="table-body" style="  overflow-y: auto;">
                <tr class="tbody-tr" v-for="(cus, index ) in assets" :key="cus.CustomerId">
                    <td><input type="checkbox" name="" id="" class="input-tbody"></td>
                    <td>{{ index + 1 }}</td>
                    <td>{{ cus.CustomerCode }}</td>
                    <td>{{ cus.FullName }}</td>
                    <td>{{ cus.Gender }}</td>
                    <td>{{ cus.Address }}</td>
                    <td class="number-right">12</td>
                    <td class="number-right">20.000.000</td>
                    <td class="number-right">1.432.000</td>
                    <td class="number-right">18.123.000</td>
                    <td class="table-option">
                        <div class="table-eidt icon-content"></div>
                        <div class="table-replication icon-content"></div>
                    </td>
                </tr>
                <tr class="table-footer">
                    <td colspan="6">
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
                                <div class="paging__button paging__button--prev icon-content"></div>
                                <div class="paging__button--group">
                                    <div class="paging__number paging__number--selected">1</div>
                                    <div class="paging__number">2</div>
                                    <div class="paging__number">...</div>
                                    <div class="paging__number">10</div>
                                </div>
                                <div class="paging__button paging__button--next icon-content"></div>
                            </div>
                        </div>
                    </td>
                    <td class="number-right font-bold">12</td>
                    <td class="number-right font-bold">20.000.000</td>
                    <td class="number-right font-bold">1.432.000</td>
                    <td class="number-right font-bold">18.123.000</td>
                    <td>
                        <div></div>
                    </td>
                </tr>
            </tbody>
            <TheAssetDetail v-if="showDetailParent" 
            :showDetailChil="showDetailParent" 
            :showDetailFunction="showDetail"
            :assetSelected="assetSelected"/>
            <BaseLoading v-if="isShowLoading"></BaseLoading>
        </table>
    </div>
</template>
<script>
import TheAssetDetail from "./TheAssetsDetail.vue"
import BaseLoading from '../../base/BaseLoading.vue'
import BaseCombobox from '../../base/BaseCombobox.vue'

export default ({
    name: "AssetList",
    component: { TheAssetDetail, BaseLoading, BaseCombobox },
    props: [],
    created() {
        //gọi api lấy dữ liệu
        this.isShowLoading = true;
        fetch("https://cukcuk.manhnv.net/api/v1/Customers", { method: "GET" })
            .then(res => res.json())
            .then(data => {
                this.assets = data;
                this.isShowLoading = false;
            })
    },
    data() {
        return {
            isShowLoading: false,
            showDetailParent: false,
            assetSelected: {},
            assets: []
        }
    },
    method: {
        showDetail(isShow) {
            this.showDetailParent = isShow;
        },
        rowOnDblClick(ass) {
            this.assetSelected = ass;
            this.showDetailParent = true;
        },
    }
})
</script>
<style scoped>
@import url(../../../style/page/asstes.css);
@import url(../../../style/layout/header.css);
@import url(../../../style/base/combobox.css);
</style>