<template>
  <div class="combobox">
    <div v-if="isShowIcon" class="icon-filter-combobox"></div>
    <input :placeholder="placText" type="text" class="input combobox__input" v-model="text" @input="inputOnChange"
      @keydown="selecItemUpDown" />
    <button class="button combobox__button" @click="btnSelectDataOnClick($event)" @keydown="selecItemUpDown"
      tabindex="-1">
      <i class="fa-solid fa-chevron-down fa-xs"></i>
    </button>
    <div v-show="isShowListData" class="combobox__data" ref="combobox__data" v-clickoutside="hideListData">
      <a class="combobox__item" v-for="(item, index) in dataFilter" :class="{
        'combobox__item--focus': index == indexItemFocus,
        'combobox__item--selected': index == indexItemSelected,
      }" :key="item[this.propValue]" :ref="'toFocus_' + index" :value="item[this.propValue]"
        @click="itemOnSelect(item, index)" @focus="saveItemFocus(index)" @keydown="selecItemUpDown(index)"
        @keyup="selecItemUpDown(index)" tabindex="1">
        <div class="combobox__item-icon">
          <i v-show="index == indexItemSelected" class="fa-solid fa-check"></i>
        </div>
        <div class="comboxbox__text">
          <p class="text-ellipsis">{{ item[this.propText] }}
            <!-- <span class="text-ellipsis align-middle" v-tooltip :style="{ 'width': 150 + 'px' }">{{ item[this.propText] }}</span> -->
          </p>
        </div>
      </a>
      <slot></slot>
    </div>
  </div>
</template>
<script>

import tooltipMixin from "../common/tooltipMixin";

/**
 * Click bên ngoài combobox để ẩn.
 * TVTOAN (31/07/2022)
 */
const clickoutside = {
  mounted(el, binding) {
    el.outsideOnClick = (event) => {
      // Nếu element hiện tại không phải là element đang click vào
      // Hoặc element đang click vào không phải là button trong combobox hiện tại thì ẩn đi.
      if (
        !(
          (
            el === event.target || // click phạm vi của combobox__data
            el.contains(event.target) || //click vào element con của combobox__data
            el.previousElementSibling.contains(event.target)
          ) //click vào element button trước combobox data (nhấn vào button thì hiển thị)
        )
      ) {
        // Thực hiện sự kiện tùy chỉnh:
        binding.value(event, el);
        // vnode.context[binding.expression](event); // vue 2
      }
    };
    document.body.addEventListener("click", el.outsideOnClick);
  },
  beforeUnmount: (el) => {
    document.body.removeEventListener("click", el.outsideOnClick);
  },
};
export default {
  directives: {
    clickoutside,
  },
  mixins: [tooltipMixin],
  props: {
    isShowIcon: Boolean,
    placText: String,
    value: null,
    url: String,
    propValue: String,
    propID:String,
    propText: String,
    valDefault: String,
    index: Number,
    isLoadData: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    saveItemFocus(index) {
          if(this.indexItemFocus == index) {
            this.indexItemFocus = index
          }else {
            this.indexItemFocus = null;
          }
    },
    hideListData() {
      this.isShowListData = false;
    },
    btnSelectDataOnClick(e) {
      if (e.keyCode === 13) {
        this.isShowListData = !this.showListData;
      }
      this.isShowListData = !this.showListData;
    },

    itemOnSelect(item, index) {
      if(this.indexItemSelected == index) {
        this.text = '';
        this.indexItemSelected = null;
        this.isShowListData = false;
        this.$emit('filterByDepartmentID', '')
        this.$emit('filterByCategoryID', '')
      }else {
        this.text = item[this.propText];
        this.indexItemSelected = index;
        this.isShowListData = false;
        this.$emit('filterByDepartmentID', item[this.propID])
        this.$emit('filterByCategoryID', item[this.propID])
        this.$emit('getIdAndName', item[this.propText], item[this.propValue], this.index)
      }
    },

    inputOnChange() {
      var me = this;
      // Thực hiện lọc các phần tử phù hợp trong data:
      this.dataFilter = this.data.filter((e) => {
        return e[me.propText].includes(me.text);
      });
      this.isShowListData = true;
    },
    selecItemUpDown() {
      var me = this;
      var keyCode = event.keyCode;
      var elToFocus = null;
      switch (keyCode) {
        case 27:
          this.isShowListData = false;
          break;
        case 40:
          this.isShowListData = true;
          elToFocus = this.$refs[`toFocus_${me.indexItemFocus + 1}`];
          if (
            this.indexItemFocus == null ||
            !elToFocus ||
            elToFocus.length == 0
          ) {
            this.indexItemFocus = 0;
          } else {
            this.indexItemFocus += 1;
          }
          break;
        case 38:
          this.isShowListData = true;
          elToFocus = this.$refs[`toFocus_${me.indexItemFocus - 1}`];
          if (
            this.indexItemFocus == null ||
            !elToFocus ||
            elToFocus.length == 0
          ) {
            this.indexItemFocus = this.dataFilter.length - 1;
          } else {
            this.indexItemFocus -= 1;
          }
          break;
        case 13:
          elToFocus = this.$refs[`toFocus_${me.indexItemFocus}`];
          if (elToFocus && elToFocus.length > 0) {
            elToFocus[0].click();
            this.isShowListData = false;
          }
          break;
        default:
          break;
      }
    },
  },
  created() {
    // Thực hiện lấy dữ liệu từ api:
    if (this.url) {
      fetch(this.url)
        .then((res) => res.json())
        .then((res) => {
          this.data = res;
          this.dataFilter = res;
          this.text = this.valDefault;
        })
        .catch((res) => {
          console.log(res);
        });
    }
  },
  data() {
    return {
      textPlac: this.textPlac,
      data: [],
      dataFilter: [],
      text: null,
      //   value: null,
      isShowListData: false,
      focus: false,
      indexItemFocus: null,
      indexItemSelected: null,
      maxIndexItemFocus: 0,
    };
  },
};
</script>