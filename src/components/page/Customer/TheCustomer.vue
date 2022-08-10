<template>

    <div class="content-table">
        <table class="table-data">
            <thead class="table-header">
                <tr>
                    <th>
                        <input type="checkbox" name="" id="" disabled>
                    </th>
                    <th>STT</th>
                    <th style="width:150px">Mã khách hàng</th>
                    <th>Tên khách hàng</th>
                    <th>Giới tính</th>
                    <th>Địa chỉ</th>
                    <th>Ngày sinh</th>
                    <th class="number-right">Số tiền ghi nợ</th>
                    <th class="number-right">Số tiền ghi nợ</th>
                    <th style="padding-left:20px">Chức năng</th>
                </tr>
            </thead>
            <tbody class="table-body" style="  overflow-y: auto;">
                <tr class="tbody-tr" v-for="(cus, index ) in customers" :key="cus.CustomerId">
                    <td><input type="checkbox" name="" id="" class="input-tbody"></td>
                    <td>{{ index + 1 }}</td>
                    <td>{{ cus.CustomerCode }}</td>
                    <td>{{ cus.FullName }}</td>
                    <td>{{ cus.Gender }}</td>
                    <td>{{ cus.Address }}</td>
                    <td>{{ cus.DateOfBirth }}</td>
                    <td class="number-right">{{ cus.DebitAmount }}</td>
                    <td class="number-right">{{ cus.DebitAmount }}</td>
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
                                    <option value="15"></option>
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
            <EmployeeDetail v-if="showDetailParent" :showDetailChil="showDetailParent" :showDetailFunction="showDetail"
                :customerSelected="customerSelected" />
            <BaseLoading v-if="isShowLoading"></BaseLoading>

        </table>

    </div>
</template>

<script>
import TheCustomerDetail from "./TheCustomerDetail.vue"
import BaseLoading from '../../base/BaseLoading.vue'
export default ({
    name: "CustomerList",
    component: { TheCustomerDetail, BaseLoading },
    props: [],
    created() {
        this.isShowLoading = true;
        fetch("https://cukcuk.manhnv.net/api/v1/Customers", { method: "GET" })
            .then(res => res.json())
            .then(data => {
                this.customers = data;
                this.isShowLoading = false;
            })
    },
    data() {
        return {
            isShowLoading: false,
            showDetailParent: false,
            customerSelected: {},
            customers: []
        }
    },
})
</script>

<style scoped>
@import url(../../../style/page/asstes.css);
</style>