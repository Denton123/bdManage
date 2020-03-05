<!--
 * @Description: 新建项目
 * @Author: sdt
 * @Date: 2019-09-18 16:23:28
 * @LastEditTime: 2019-09-29 15:40:38
 * @LastEditors: Please set LastEditors
 -->
<template>
  <a-form :form="form" class="form">
    <a-form-item
      label="产品名称"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      enctype="multipart/form-data"
    >
      <a-input
        v-decorator="[`name`, {rules:[{required: true, message: '请输入产品名称'}]}]"
        placeholder="请输入产品名称"
        style="width:400px;"
      />
    </a-form-item>
    <a-form-item
      label="产品价格"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[`orgPrice`, {rules:[{required: true, message: '请输入产品价格'},]}]"
        placeholder="元"
        style="width:400px;"
        oninput="value= value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''"
      />
      <a-tooltip placement="right" trigger="click" title="产品价格即下单时实付价格">
        <a-icon type="question-circle" class="tipicon" />
      </a-tooltip>
    </a-form-item>
    <a-form-item
      label="产品折扣价格"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[`price`, {rules:[{required: true, message: '请输入产品折扣价格'}]}]"
        placeholder="元"
        style="width:400px;"
        oninput="value= value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''"
      />
      <a-tooltip placement="right" trigger="click" title="产品打折价格即未打折前的产品价格，页面显示的划线价格">
        <a-icon type="question-circle" class="tipicon" />
      </a-tooltip>
    </a-form-item>
    <a-form-item
      label="产品图片"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <div class="upload" v-decorator="[`pic`, {rules:[{required: true, message: '请选择产品图片'}]}]">
        <div v-if="imageUrl" class="hasPic">
          <img :src="imageUrl" />
          <div class="pic_mask">
            <a-icon
              type="zoom-in"
              class="pic_mask_icon"
              style="margin-right: 5px;"
              @click="handlePreview"
            />
            <a-icon type="edit" class="pic_mask_icon" @click="handleRemove" />
          </div>
        </div>
        <div v-else @click="selectPic">
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">Upload</div>
        </div>
        <input
          type="file"
          @change="previewPic($event.currentTarget, $event)"
          hidden="hidden"
          id="addinput"
        />
      </div>
    </a-form-item>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img style="width: 100%" :src="previewImage" />
    </a-modal>
    <a-form-item
      label="产品描述"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-textarea
        v-decorator="[`brief`, {rules:[{required: true, message: '请输入产品描述'}]}]"
        maxlength="500"
        placeholder="请输入产品描述"
      />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" class="fr" @click="addProject">下一步</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};
export default {
  name: "addProjectForm",
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
    addProject(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          values.pic = this.file;
          this.$emit("addProject", values);
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