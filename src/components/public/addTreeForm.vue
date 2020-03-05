<!--
 * @Description: 添加节点
 * @Author: sdt
 * @Date: 2019-09-19 14:40:50
 * @LastEditTime: 2020-01-17 11:22:45
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <a-modal
      title="添加节点"
      :visible="addTreeFormVisible"
      @ok="handleAddTree"
      @cancel="closeAddTree"
      okText="确认"
      cancelText="取消"
    >
      <a-form :form="form">
        <a-form-item
          label="父节点"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            :disabled="true"
            v-decorator="[`pid`, {rules:[{required: true, message: '请输入父节点'}]}]"
            placeholder="请输入父节点"
            style="width:356px;"
          />
        </a-form-item>
        <a-form-item
          label="节点名称"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[`value`, {rules:[{required: true, message: '请输入节点名称'}]}]"
            placeholder="请输入节点名称"
            style="width:356px;"
          />
        </a-form-item>
        <!-- <a-form-item
          label="键值"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[`key`, {rules:[{required: true, message: '请输入键值'}]}]"
            placeholder="请输入键值"
            style="display:inline-block;width:356px;"
          />
          <a-tooltip
            placement="right"
            trigger="click"
            title="节点的标识，可以是英文或者数字"
            style="display:inline-block"
          >
            <a-icon type="question-circle" class="tipicon" />
          </a-tooltip>
        </a-form-item> -->
        <a-form-item
          label="排序"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[`seq`, {rules:[{required: true, message: '请输入排序'}]}]"
            placeholder="请输入排序"
            oninput="value=value.replace(/[^\d]/g,'')"
            style="width:356px;"
          />
          <a-tooltip
            placement="right"
            trigger="click"
            title="排序序号越小,下拉选项越上方"
            style="display:inline-block"
          >
            <a-icon type="question-circle" class="tipicon" />
          </a-tooltip>
        </a-form-item>
        <!-- <a-form-item
          label="是否置顶"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-checkbox @change="onCheckBoxChange" />
        </a-form-item>-->
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
  name: "addTreeForm",
  data() {
    return {
      form: this.$form.createForm(this),
      formItemLayout
    };
  },
  props: {
    addTreeFormVisible: {
      type: Boolean,
      default() {
        return false;
      }
    },
    addtreeFields: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    handleAddTree(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit("handleAddTree", values);
        }
      });
    },
    closeAddTree(e) {
      if (e.target.className !== "ant-modal-wrap ") {
        this.$emit("closeAddTree");
      }
      // this.$emit("closeAddTree");
    },
    onCheckBoxChange(e) {
      // console.log(e);
    }
  },
  watch: {
    addtreeFields: {
      handler() {
        this.form = this.$form.createForm(this, {
          mapPropsToFields: () => {
            let fieldObj = {};
            fieldObj["pid"] = this.$form.createFormField({
              value: this.addtreeFields["pid"]
            });
            fieldObj["seq"] = this.$form.createFormField({
              value: 10
            });
            return fieldObj;
          }
        });
      },
      deep: true,
      immediate: true
    },
    addTreeFormVisible(v) {
      if (v) {
        this.form.resetFields();
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.tipicon {
  cursor: pointer;
  color: #1890ff;
  margin-left: 10px;
}
</style>