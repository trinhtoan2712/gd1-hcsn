<template>
  <div class="comboboxform">
    <input type="text" class="input comboboxform__input" v-model="text" @input="inputOnChange()"
    @blur="checkValidate(this.$refs['txtDepartmentCode'])"  ref="txtDepartmentCode"
      @keydown="selecItemUpDown" :placeholder="placText" :tabindex="tabIndex" :class="{'border-red': !this.validInput || !this.isValidCbb}"/>
    <button class="button comboboxform__button" @click="btnSelectDataOnClick($event)" @keydown="selecItemUpDown"
      tabindex="-1">
      <i class="fa-solid fa-chevron-down fa-xs"></i>
    </button>
    <div v-show="isShowListData" class="comboboxform__data" ref="comboboxform__data" v-clickoutside="hideListData">
      <a class="comboboxform__item" v-for="(item, index) in dataFilter" :class="{
        'comboboxform__item--focus': index == indexItemFocus,
        'comboboxform__item--selected': index == indexItemSelected,
      }" :key="item[this.propValue]" :ref="'toFocus_' + index" :value="item[this.propValue]"
        @click="itemOnSelect(item, index)" @focus="saveItemFocus(index)" @keydown="selecItemUpDown(index)"
        @keyup="selecItemUpDown(index)" tabindex="1">
        <div class="comboboxform__item-icon">
        </div>
        <p class="text-ellipsis">{{ item[this.propText] }}
            <!-- <span class="text-ellipsis align-middle" v-tooltip :style="{ 'width': 150 + 'px' }">{{ item[this.propText] }}</span> -->
          </p>
      </a>
      <slot></slot>
    </div>
  </div>
</template>
<script>
/**
 * Click bên ngoài combobox để ẩn.
 * TVTOAN (31/07/2022)
 */
const clickoutside = {
  mounted(el, binding) {
    el.outsideOnClick = (event) => {
      // Nếu click ko đúng element hiện tại
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
  props: {
    placText: String,
    tabIndex: Number,
    value: null,
    url: String,
    propName: String,
    propValue: String,
    propText: String,
    valDefault: String,
    validInput: Boolean,
    isLoadData: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    checkValidate(valInput) {
            if (!valInput.value || !this.isValidCbb) {
                valInput.classList.add("border-red");
            }
            else {
                valInput.classList.remove("border-red");
            }
        },
    saveItemFocus(index) {
      this.indexItemFocus = index;
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
      this.text = item[this.propText];
      this.valueInput = item[this.propName];
      this.indexItemSelected = index;
      this.isShowListData = false;
      this.isValidCbb = true;
      this.$emit('validCombobox', true);
      this.$emit('getNameDepartment', this.valueInput, item[this.propValue])
      this.$emit('getNameCategory', this.valueInput, item[this.propValue])
    },
    inputOnChange() {
      var me = this;
      var validBy = '';
      let arrBool = [];
      this.dataFilter = this.data.filter((e) => {
        let valueCode = e[me.propText].includes(me.text);
        validBy = e.DepartmentCode || e.FixedAssetCategoryCode;
        if(validBy == this.text) {
          arrBool.push(true);
          this.$emit('getNameDepartment', e[me.propName], e[me.propValue]);
          this.$emit('getNameCategory', e[me.propName], e[me.propValue]);
          this.isValidCbb = true;
          this.$emit('validCombobox', this.isValidCbb);
        }else {
          arrBool.push(false);
          let isValid = arrBool.includes(true);
          if(isValid == false) {
            this.isValidCbb = false;
            this.$emit('validCombobox', this.isValidCbb);
          }
        }
        return valueCode;
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
      data: [],
      dataFilter: [],
      valueInput: '',
      text: null,
      isShowListData: false,
      focus: false,
      indexItemFocus: null,
      indexItemSelected: null,
      maxIndexItemFocus: 0,
      isValidCbb: true,
    };
  },
};
</script>