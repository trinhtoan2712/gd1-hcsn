<template v-if="!!assets">
  <div class="container">
    <div class="header-masterdetail pading-left pading-right">
      <div class="header-masterdetail-left">
        <h3>Ghi tăng tài sản</h3>
      </div>
      <div class="header-masterdetail-right">
        <button class="btn" style="margin-right: 16px" id="btnAdd" @click="showDetail(true)">
          <div class="btn-add">Thêm</div>
          <!-- <span class="tooltip">Ctrl + I</span> -->
        </button>
        <button class="btn-unknow" id="" @click="btnClickChangeLayout">
          <div class="btn-unknow-icon1 icon-content"></div>
          <div class="btn-unknow-icon2 icon-content"></div>
          <span class="tooltip">Đổi layout</span>
          <!-- <span class="tooltip">Ctrl + I</span> -->
        </button>
      </div>
    </div>
    <splitpanes class="main-masterdetail pading-left pading-right pading-bottom default-theme" horizontal>
      <pane style="background: #fff;" :size="paneTopSize">
        <div class="header-table">
          <div class="header-table-left">
            <div class="form-search" style="width:269px">
              <div class="form-search__icon icon-small"></div>
              <input style="width:100%" v-on:keyup="btnSearch(paging.keyWord, $event)" class="form-search__input" ref="txtSearch"
                type="text" placeholder="Tìm kiếm theo số chứng từ và nội dung" v-model="paging.keyWord" />
            </div>
          </div>
          <div class="header-table-right">
            <div class="form-option">
              <div style="margin-right:10px" class="btn-delete icon-content"
                @click="showDialogDeleteList(assetIncrement)" v-if="selected.length > 1"><span
                  class="tooltip">Xóa</span></div>
              <div style="margin-right:10px" class="btn-export">
                <div class="icon-export icon-small"></div>
                <div class="icon-3dot icon-small"></div>
                <span class="tooltip">Xuất excel</span>
              </div>
            </div>
          </div>
        </div>
        <div class="container-table">
          <table class="data-table noselect">
            <thead class="data-table__thead">
              <tr>
                <th style="width:30px">
                  <input type="checkbox" name="" class="ckb ckb-primary" v-model="isSelect" @click="selectAllRows" />
                </th>
                <th style="width:30px; text-align: center;">STT<span class="tooltip">Số thứ tự</span></th>
                <th style="width:100px">Số chứng từ</th>
                <th style="width:120px; text-align:center">Ngày chứng từ</th>
                <th style="width:120px; text-align:center">Ngày ghi tăng</th>
                <th style="width:100px" class="number-right">Tổng nguyên giá</th>
                <th>Nội dung</th>
                <th style="text-align:center">Chức năng</th>
              </tr>
            </thead>
            <tbody class="data-table__tbody">
              <tr class="tr-tbody" v-for="(assetIncrement, index) in assetsIncrement"
                @dblclick="rowOnDblClick(assetIncrement)" :key="assetIncrement.voucherID"
                @click="btnRowActiveOnClick(assetIncrement, $event, index)"
                :class="{ bgblue: checkActive(assetIncrement.voucherID) }">
                <td>
                  <input type="checkbox" name="" id="" class="ckb ckb-primary" :value="assetIncrement.voucherID"
                    v-model="selected" />
                </td>
                <td style="text-align: center">{{ index + 1 }}</td>
                <td style="color: #1aa4c8" @click="rowOnDblClick(assetIncrement)">{{ assetIncrement.voucherCode }}</td>
                <td style="text-align: center">{{ formatDate(assetIncrement.voucherDate)}}</td>
                <td style="text-align: center">{{ formatDate(assetIncrement.incrementDate) }}</td>
                <td class="number-right">{{ formatPrice(Number(assetIncrement.price)) }}</td>
                <td class="text-hide-base">
                  <p>{{ assetIncrement.description }}</p>
                </td>
                <td class="table-option">
                  <div class="table-eidt icon-pading icon-small" @click="rowOnDblClick(assetIncrement)">
                    <span class="tooltip">Sửa (Ctrl + C)</span>
                  </div>
                  <div class="table-replication icon-content icon-pading icon-small">
                    <span class="tooltip">Nhân bản </span>
                  </div>
                  <div class="table-delete icon-small icon-pading" @click="showDialogDeleteList(assetIncrement)">
                    <span class="tooltip">Xóa (Delete)</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="12" class="table__nodata" v-if="assetsIncrement.length < 1"> </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="footer-table">
          <table>
            <tr class="summary-table">
              <td style="width:30px"></td>
              <td style="width:30px"></td>
              <td style="width:100px"></td>
              <td style="width:120px"></td>
              <td style="width:120px"></td>
              <td style="width:112px" class="number-right"><strong>{{formatPrice(totalCost)}}</strong></td>
              <td></td>
              <td></td>
            </tr>
          </table>
          <div class="paging-table">
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
      </pane>
      <pane style="z-index: 9; background: #fff" :size="paneBottomSize">
        <div class="table-detail">
          <div class="table-detail__header">
            <span class="content-title">Danh sách tài sản</span>
            <div @click="btnShowFullAsset">
              <div style="padding-left: 12px;" class="icon-change-layout icon-content"></div>
            </div>
          </div>
          <TableBase v-if="isShowDetail" :listSelected="selected" :isShowFunction="false" :isShowPaging="false"
            :isShowSummary="true" :voucherID="this.selected[0]" v-on:listFixedAssetId="getListFixedAssetId" />
        </div>
      </pane>
    </splitpanes>
    <div class="asset-masterdetail"></div>
  </div>
  <div v-if="isDelete" id="dlg-warning" class="dialog dialog--warning">
    <div class="dialog__content">
      <div class="dialog__container">
        <div class="icon-warning-dialog icon-content"></div>
        <div class="dialog__body">
          <i style="color: #eddc1f" class="fa-solid fa-3x fa-triangle-exclamation"></i>
          <div class="dialog__msg-item">
            <span v-html="errMessWarning"></span>
          </div>
        </div>
      </div>
      <div class="dialog__footer">
        <button @click="btnDeleteOnClick" type="submit" id="btnSave" class="btn-dialog btn" style="color: #fff">
          Xóa
        </button>
        <button id="btnClose" @click="hideDialogDelete" class="btn-dialog btn btn-cancel-dialog-asset warning">
          Không
        </button>
      </div>
    </div>
  </div>
  <div v-if="isMessDelete" id="dlg-warning" class="dialog dialog--warning">
    <div class="dialog__content">
      <div class="dialog__container">
        <div class="icon-warning-dialog icon-content"></div>
        <div class="dialog__body">
          <i style="color: #eddc1f" class="fa-solid fa-3x fa-triangle-exclamation"></i>
          <div class="dialog__msg-item">
            <span v-html="errMessWarning"></span>
          </div>
        </div>
      </div>
      <div class="dialog__footer">
        <button @click="hideDialogDelete" type="submit" id="btnSave" class="btn-dialog btn" style="color: #fff">
          Đồng ý
        </button>
      </div>
    </div>
  </div>
  <TheDialogMasterDetail @updateMessage="updateMessage" v-if="isShowDialogDetail" :showDetailChil="isShowDialogDetail" :showDetailFunction="showDetail"
    :assetIncrementSelected="assetIncrementSelected" :title="title" :isFormAdd="isFormAdd" :isFormUpdate="isFormUpdate"
    v-on:activeAssetNew="activeAssetNew" :getData="getData" />
  <BaseLoading v-if="isShowLoading"></BaseLoading>
  <div id="snackbar" :class="{ show: isShowToastSuccess }" v-on:updateMessage="updateMessage">
    <i class="fa-solid fa-circle-check icon-toast fa-2xl"></i>
    <div>{{ toastMess }}</div>
  </div>
</template>

<script>
import TheDialogMasterDetail from "./TheDialogMasterDetail.vue";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import TableBase from "../../base/BaseTableFixedAsset.vue";
import { formatPrice, formatDate } from '../../common/TheCommon'
import BaseLoading from "../../base/BaseLoading.vue";
import { EndPoint,KeyCode,MessWarning, Notification, TitleDialog } from "../../common/TheConst";
import axios from "axios";

export default {
  components: {
    TheDialogMasterDetail,
    Splitpanes,
    Pane,
    TableBase,
    BaseLoading,
  },

  created() {
    this.getData(this.paging);
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
    formatDate,
    formatPrice,

    /**
    * Click đổi layout
    * TVTOAN (06/08/2022)
    */
    btnClickChangeLayout() {
      try {
        if (this.isLayoutIncrement == false) {
          this.isLayoutIncrement = true;
          this.paneTopSize = 100;
          this.paneBottomSize = 0;
        } else {
          this.isLayoutIncrement = false;
          this.paneTopSize = 62;
          this.paneBottomSize = 38;
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
            try {
                this.toastMess = mes;
                this.isShowToastSuccess = true;
                setTimeout(() => this.isShowToastSuccess = false, 3000);
            } catch (error) {
                console.log(error);
            }
        },

    /**
    * Click đổi layout
    * TVTOAN (06/08/2022)
    */
    btnShowFullAsset() {
      try {
        if (this.isLayoutAsset == false) {
          this.isLayoutAsset = true;
          this.paneTopSize = 0;
          this.paneBottomSize = 100;
        } else {
          this.isLayoutAsset = false;
          this.paneTopSize = 100;
          this.paneBottomSize = 0;
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
    * Chọn số bản ghi hiển thị trên 1 trang.
    * TVTOAN (06/08/2022)
    */
    selectPageSize(e) {
      try {
        this.paging.pageSize = e.target.value;
        this.getData(this.paging);
      } catch (error) {
        console.log(error);
      }
    },

    /**
    * Tìm kiếm.
    * TVTOAN (06/08/2022)
    */
    btnSearch(key, e) {
      try {
        if (e.keyCode == KeyCode.KEY_ENTER) {
          this.paging.keyWord = key;
          this.getData(this.paging);
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
    * Chức năng double click 1 bản ghi
    * TVTOAN (26/07/2022)
    */
    getListFixedAssetId(listId) {
      try {
        this.listFixedAssetId = [];
        for (let i = 0; i < listId.length; i++) {
          this.listFixedAssetId.push(listId[i]);
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
    * Chức năng chọn tất cả bản ghi
    * TVTOAN (26/07/2022)
    */
    selectAllRows() {
      try {
        this.selected = [];
        if (!this.isSelect) {
          for (let i in this.assetsIncrement) {
            this.selected.push(this.assetsIncrement[i].voucherID);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Chức năng double click 1 bản ghi
     * TVTOAN (26/07/2022)
     */
    rowOnDblClick(assetIncrement) {
      try {
        this.title = TitleDialog.UPDATE_ASSET_INCREMENT;
        this.isFormUpdate = true;
        this.assetIncrementSelected = assetIncrement;
        this.isShowDialogDetail = true;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Ẩn cảnh báo khi xóa tài sản.
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
     * Hiển thị cảnh báo khi xóa tài sản.
     * TVTOAN (02/08/2022)
     */
    showDialogDeleteList(assetIncrement) {
      try {
        if (this.selected.length > 0) {
          if (this.selected.length == 1) {
            this.errMessWarning = `Bạn có muốn xóa chứng từ <b> ${assetIncrement.voucherCode} </b>?`;
          } else {
            this.errMessWarning = `${this.selected.length} chứng từ đã được chọn. Bạn có muốn xóa các chứng từ này khỏi danh sách ?`;
          }
          this.isDelete = true;
          this.isMessDelete = false;
        } else {
          this.errMessWarning = MessWarning.NO_RECORD;
          this.isMessDelete = true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Chức năng xóa chứng từ
     * TVTOAN (26/07/2022)
     */
    btnDeleteOnClick() {
      try {
        if (this.selected.length == 1) {
          var listFixedAssetId = [];
          for (var i = 0; i < this.listFixedAssetId.length; i++) {
            listFixedAssetId.push(this.listFixedAssetId[i]);
          }
          axios
            .delete(`${EndPoint.END_POINT_FIXED_ASSET_INCREMENT}?recordID=${this.selected[0]}`)
            .then((res) => {
              if (res.status == 200) {
                axios.delete(`${EndPoint.END_POINT_FIXED_ASSET_INCREMENT_DETAIL_LIST}`, { data: listFixedAssetId })
                  .then(res => {
                    if (res.status == 200) {
                      axios.put(`${EndPoint.END_POINT_FIXED_ASSET}?status=0`, listFixedAssetId)
                        .then(res => {
                          if (res.status == 200) {
                            this.isDelete = false;
                            this.getData(this.paging);
                            this.toastMess = Notification.DELETE_SUCCESS;
                            this.isShowToastSuccess = true;
                            setTimeout(() => (this.isShowToastSuccess = false), 3000);
                          }
                        })
                    }
                  })
              } else {
                this.isDelete = false;
                this.toastMess = Notification.DELETE_FAIL;
                this.isShowToastSuccess = true;
              }
            });
        } else {
          let listVoucherID = [];
          let listFixedAssetID = [];
          for (let i = 0; i < this.selected.length; i++) {
            listVoucherID.push(this.selected[i]);
          }
          for (let i = 0; i < listVoucherID.length; i++) {
            axios.get(`${EndPoint.END_POINT_FIXED_ASSET_INCREMENT_DETAIL_GETONE}?voucherId=${listVoucherID[i]}&pageSize=${this.pagingByVoucherID.pageSize}&pageNumber=${this.pagingByVoucherID.pageNumber}`)
              .then(res => {
                this.assets = res.data.data;
                for (let asset of this.assets) {
                  listFixedAssetID.push(asset.fixedAssetID);
                }
                if (res.status == 200) {
                  axios
                    .delete(`${EndPoint.END_POINT_FIXED_ASSET_INCREMENT_DETAIL}`, { data: listVoucherID })
                    .then((res) => {
                      if(res.status == 200) {
                        axios.put(`${EndPoint.END_POINT_FIXED_ASSET}?status=0`, listFixedAssetID)
                        .then(res => {
                          if (res.status == 200) {
                            this.isDelete = false;
                            this.getData(this.paging);
                            this.toastMess = Notification.DELETE_SUCCESS;
                            this.isShowToastSuccess = true;
                            setTimeout(() => (this.isShowToastSuccess = false), 3000);
                          }
                        })
                      }
                    })
                }
              })
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Chức năng mở dialog thêm mới chứng từ
     * TVTOAN (26/07/2022)
     */
    showDetail(isShow) {
      try {
        this.isShowDialogDetail = isShow;
        this.title = TitleDialog.INSERT_ASSET_INCREMENT;
        this.isFormAdd = true;
        this.assetIncrementSelected = {
          voucherID: "00000000-0000-0000-0000-000000000000",
          voucherCode: "",
          voucherDate: new Date(),
          incrementDate: new Date(),
          description: "",
          price: "",
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
     * Chức năng lay danh sach bản ghi
     * TVTOAN (26/07/2022)
     */
    getData(paging) {
      try {
        this.isShowLoading = true;
        axios
          .get(
            `${EndPoint.END_POINT_FIXED_ASSET_INCREMENT_FILTER}?keyword=${paging.keyWord}&pageSize=${paging.pageSize}&pageNumber=${paging.pageNumber}`
          )
          .then((data) => {
            setTimeout(() => (this.isShowLoading = false), 500);
            this.assetsIncrement = data.data.data;
            this.totalRecord = data.data.totalCount;
            this.totalCost = data.data.totalCost;
            this.selected[0] = this.assetsIncrement[0].voucherID;
            this.isShowDetail = true;
            paging.totalPage = Math.ceil(data.data.totalCount / paging.pageSize);
          });
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
          this.selected = newArrCtrl;
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
          this.selected = newArr;
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

    /**
     * Tự động active bản ghi vừa thêm mới.
     * TVTOAN (06/08/2022)
     */
    activeAssetNew(id) {
      try {
        this.selected = [];
        this.selected.push(id);
        this.checkActive(id);
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      isLayoutIncrement: false,
      isLayoutAsset: false,
      paneTopSize: 62,
      paneBottomSize: 38,

      // Dữ liệu bool
      isShowDetail: false,
      isShowLoading: true,
      isShowToastSuccess: false,
      isMessDelete: false,
      isShowToastFail: false,
      isDelete: false,
      isSelect: false,
      isShowDialogDetail: false,
      isFormAdd: false,
      isFormUpdate: false,

      JWToken: "",
      title: "",
      toastMess: "",
      errMessWarning: "",
      curIndex: 0,

      //Đối tượng và mảng
      assetsIncrement: [],
      assetIncrementSelected: {},
      selected: [],
      assetIncrementCurrent: {},
      listFixedAssetId: [],

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
      pagingByVoucherID: {
        keyWord: '',
        departmentID: '',
        fixedAssetCategoryID: '',
        pageSize: 9999,
        pageNumber: 1,
        totalPage: 0,
        maxVisibleButtons: 3,
      },

      // Dữ liệu cho api phân trang
      paging: {
        keyWord: "",
        pageSize: 15,
        pageNumber: 1,
        totalPage: 0,
        maxVisibleButtons: 3,
      },
    };
  },
};
</script>

<style scoped>
@import url(../MasterDetail/masterdetail.css);
@import url(../../../style/base/toast.css);
</style>
