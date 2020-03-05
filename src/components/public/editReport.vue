<!--
 * @Description: 新建报告
 * @Author: sdt
 * @Date: 2020-02-12 16:22:18
 * @LastEditTime: 2020-02-13 10:34:34
 * @LastEditors: Please set LastEditors
 -->

<template>
  <a-form :form="form" class="form test">
    <a-form-item
      label="检测方法"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      enctype="multipart/form-data"
       maxlength="50"
    >
      <a-input v-decorator="[`deteMethod`]" placeholder="请输入产品名称" style="width:562px;" />
    </a-form-item>
    <a-form-item
      label="检测范围"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-textarea v-decorator="[`deteRange`]" maxlength="200" placeholder="请输入产品描述" />
    </a-form-item>
    <a-form-item
      label="报告说明"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-textarea v-decorator="[`reportDesc`]" maxlength="500" placeholder="请输入报告说明" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" class="fr" @click="editReport">保存</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};
export default {
  name: "editReport",
  data() {
    return {
      formItemLayout,
      form: this.$form.createForm(this),
      loading: false,
      imageUrl: "",
      file: {},
      previewVisible: false,
      previewImage: ""
    };
  },
  props: {
    editReportFields: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    // 选择图片
    previewPic(srcPic, event) {
      let file = event.target.files[0];
      this.file = file;
      if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          this.imageUrl = e.target.result;
        };
      }
    },
    // 选择图片
    selectPic(event) {
      let obj = document.getElementById("addinput");
      obj.click();
    },
    // 提交表单
    editReport(e) {
      console.log(e)
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          this.$emit("editReport", values);
        }
      });
    },
    // 预览
    handlePreview(e) {
      e.stopPropagation();
      this.previewImage = this.imageUrl;
      this.previewVisible = true;
    },
    // 取消预览
    handleCancel() {
      this.previewVisible = false;
    },
    // 删除图片
    handleRemove(e) {
      let obj = document.getElementById("addinput");
      obj.click();
      // e.stopPropagation();
      // let that = this;
      // this.$confirm({
      //   title: "确定删除产品图片吗?",
      //   okText: "确定",
      //   okType: "danger",
      //   cancelText: "取消",
      //   onOk() {
      //     that.imageUrl = "";
      //     console.log("OK");
      //   },
      //   onCancel() {
      //     console.log("Cancel");
      //   }
      // });
    }
  },
  watch: {
    editReportFields: {
      handler() {
        // console.log(this.editId);
        // if (this.editId !== "") {
        let nameArr = ["deteMethod", "deteRange", "reportDesc"];
        this.form = this.$form.createForm(this, {
          mapPropsToFields: () => {
            let fieldObj = {};
            nameArr.forEach(v => {
              fieldObj[v] = this.$form.createFormField({
                value: this.editReportFields[v]
              });
            });
            return fieldObj;
          }
        });
        // }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  width: 80%;
  padding-left: 50px;
}
.upload {
  width: 128px;
  height: 128px;
  text-align: center;
  vertical-align: middle;
  background-color: #fafafa;
  border: 1px dashed #d9d9d9;
}

.upload i {
  margin-top: 24px;
  font-size: 32px;
  color: #999;
}

.upload .ant-upload-text {
  color: #666;
}
.upload img {
  width: 100%;
  height: 100%;
}
.tipicon {
  cursor: pointer;
  color: #1890ff;
  margin-left: 10px;
}
.hasPic {
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
}
.hasPic:hover {
  .pic_mask {
    display: block;
    transition: all 0.6s;
  }
}
.pic_mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  line-height: 128px;
  display: none;
  .pic_mask_icon {
    color: #fff;
    font-size: 20px;
  }
}
</style>