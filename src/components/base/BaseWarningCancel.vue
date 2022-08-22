<template>
     <div id="dlg-warning" class="dialog dialog--warning">
        <div class="dialog__content ">
            <div class="dialog__container">
                <div class="icon-warning-dialog icon-content"></div>
                <div class="dialog__body">
                    <div class="dialog__msg-item">
                        Thông tin này không được phép để trống
                    </div>
                </div>
            </div>
            <div class="dialog__footer">
                <button id="btnOk" class="btn btn-cancel-dialog-warning" style="color: #fff;">Đồng ý</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    type: String,
    messsage: String,
  },
  methods: {
  },

  created() {
    
  },
  data() {
    return {
      
    };
  },
};
</script>

<style scoped>
@import url(../../style/base/warning-cancel.css);
</style>