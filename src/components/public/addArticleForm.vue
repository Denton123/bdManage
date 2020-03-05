<!--
 * @Description: 新增报告表单
 * @Author: sdt
 * @Date: 2019-09-18 09:35:37
 * @LastEditTime: 2019-12-03 15:35:30
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div>
    <a-modal
      title="添加新报告类型"
      :visible="addFormVisible"
      @ok="handleAddArticle"
      @cancel="closeAddArticle"
      okText="确认"
      cancelText="取消"
    >
      <span class="addTip">该入口添加的报告类型均为手工报告，文描提示：“该入口添加报告类型为人工编辑报告，若需要添加自动生成报告类型请联系运维人员”</span>
      <a-form :form="form">
        <a-form-item
          label="报告名称"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[`name`, {rules:[{required: true, message: '请输入报告名称'}]}]"
            placeholder="请输入报告名称"
            style="width:360px;"
          />
        </a-form-item>
        <a-form-item
          label="报告描述"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-textarea
            v-decorator="[`brief`, {rules:[{required: true, message: '请输入报告描述'}]}]"
            maxlength="500"
            placeholder="请输入报告描述"
            style="width:360px;"
          />
        </a-form-item>
        <a-form-item
          label="前景图"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <div
            class="upload"
            v-decorator="[`fgPic`, {rules:[{required: true, message: '请选择前景图'}]}]"
          >
            <div v-if="fgPic" class="hasPic">
              <img :src="fgPic" />
              <div class="pic_mask">
                <a-icon
                  type="zoom-in"
                  class="pic_mask_icon"
                  style="margin-right: 5px;"
                  @click="handleAddPreview($event,'fgPic')"
                />
                <a-icon
                  type="edit"
                  class="pic_mask_icon"
                  @click="handleAddRemove('fgAddinput')"
                />
              </div>
            </div>
            <div v-else @click="selectAddfgPic">
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Upload</div>
            </div>
            <input
              type="file"
              @change="previewAddfgPic($event.currentTarget, $event)"
              hidden="hidden"
              id="fgAddinput"
            />
          </div>
        </a-form-item>
        <a-form-item
          label="背景图"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <div
            class="upload"
            v-decorator="[`bgPic`, {rules:[{required: true, message: '请选择背景图'}]}]"
          >
            <div v-if="bgPic" class="hasPic">
              <img :src="bgPic" />
              <div class="pic_mask">
                <a-icon
                  type="zoom-in"
                  class="pic_mask_icon"
                  style="margin-right: 5px;"
                  @click="handleAddPreview($event,'bgPic')"
                />
                <a-icon
                  type="edit"
                  class="pic_mask_icon"
                  @click="handleAddRemove('bgAddinput')"
                />
              </div>
            </div>
            <div v-else @click="selectAddbgPic">
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Upload</div>
            </div>
            <input
              type="file"
              @change="previewAddbgPic($event.currentTarget, $event)"
              hidden="hidden"
              id="bgAddinput"
            />
          </div>
        </a-form-item>

        <a-form-item
          label="排序"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[`seq`, {rules:[{required: true, message: '请输入排序'}]}]"
            placeholder="请输入排序"
            oninput="value=value.replace(/[^\d]/g,'')"
            style="width:360px;"
          />
          <a-tooltip
            placement="right"
            trigger="click"
            title="排序将影响报告的排序"
            style="display:inline-block"
          >
            <a-icon type="question-circle" class="tipicon" />
          </a-tooltip>
        </a-form-item>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleAddCancel">
          <img style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
export default {
  name: "addArticle",
  data() {
    return {
      name: "addArticle",
      formItemLayout,
      form: this.$form.createForm(this),
      loading: false,
      previewVisible: false,
      previewImage: "",
      bgPic: "",
      fgPic: "",
      bgfile: {},
      fgfile: {}
    };
  },
  props: {
    addFormVisible: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  methods: {
    previewAddfgPic(srcPic, event) {
      let file = event.target.files[0];
      this.fgfile = file;
      if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          this.fgPic = e.target.result;
        };
      }
    },
    // 选择图片
    previewAddbgPic(srcPic, event) {
      let file = event.target.files[0];
      this.bgfile = file;
      if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          this.bgPic = e.target.result;
          // flag == 'bgPic' ? this.bgPic = e.target.result :  this.fgPic = e.target.result
          // this.imageUrl = e.target.result;
        };
      }
    },
    // 选择图片
    selectAddfgPic(event) {
      let obj = document.getElementById("fgAddinput");
      obj.click();
    },
    // 选择图片
    selectAddbgPic(event) {
      let obj = document.getElementById("bgAddinput");
      obj.click();
    },
    // 提交表单
    handleAddArticle(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          values.fgPic = this.fgfile;
          values.bgPic = this.bgfile;
          this.$emit("handleAddArticle", values);
          // this.form.resetFields();
        }
      });
    },
    closeAddArticle(e) {
      if (e.target.className !== "ant-modal-wrap ") {
        this.$emit("closeAddArticle");
      }
      // this.form.resetFields();
    },
    // 预览
    handleAddPreview(e, flag) {
      e.stopPropagation();
      this.previewVisible = true;
      this.previewImage = this[`${flag}`];
    },
    // 取消预览
    handleAddCancel() {
      this.previewVisible = false;
    },
    // 删除图片
    handleAddRemove(flag) {
      // e.stopPropagation();
      // let that = this;
      // this.$confirm({
      //   title: "确定删除产品图片吗?",
      //   okText: "确定",
      //   okType: "danger",
      //   cancelText: "取消",
      //   onOk() {
      //     that[`${flag}`] = "";
      //     console.log("OK");
      //   },
      //   onCancel() {
      //     console.log("Cancel");
      //   }
      // });
      let obj = document.getElementById(flag);
      obj.click();
    }
  },
  watch: {
    addFormVisible(v) {
      if (v) {
        this.form.resetFields();
        this.bgPic = "";
        this.fgPic = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.addTip {
  color: red;
  margin-bottom: 10px;
  display: block;
  font-size: 12px;
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
