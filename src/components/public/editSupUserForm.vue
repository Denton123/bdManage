<!--
 * @Description: In User Settings Edit
 * @Author: sdt
 * @Date: 2019-09-17 10:50:17
 * @LastEditTime: 2020-01-03 11:20:19
 * @LastEditors: Please set LastEditors
 -->


<template>
  <a-modal
    title="编辑用户"
    :visible="editSupUserFormVisible"
    @ok="handleEditSupUser"
    @cancel="closeEditSupUser"
    okText="确认"
    cancelText="取消"
  >
    <a-form :form="form">
      <!-- 账号 -->
      <a-form-item label="账号" v-bind="formItemLayout">
        <a-input v-decorator="[`account`]" placeholder="请输入账号" :disabled="true" />
      </a-form-item>
      <!-- 用户名 -->
      <a-form-item
        label="用户名"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[`name`,  {rules:[{max:20, message: '用户名不大于20个字符'}]}]"
          placeholder="请输入用户名"
        />
      </a-form-item>
      <!-- 密码 -->
      <a-form-item
        label="更新密码"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[`pwd`,{ rules: [{ type: 'string', min:6, max:20, whitespace:true, message: '请输入6-20位密码' }] }]"
          placeholder="请输入密码"
          type="password"
        />
      </a-form-item>
      <!-- 确认密码 -->
      <a-form-item
        label="确认密码"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="['pwd1',{ rules: [{ type: 'string', min:6, max:20, whitespace:true, message: '请输入6-20位密码' }] }]"
          placeholder="请输入确认密码"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>

      <!-- 性别 -->
      <a-form-item
        label="性别"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-radio-group v-decorator="['gender']">
          <a-radio value="1">男</a-radio>
          <a-radio value="2">女</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 }
};
export default {
  name: "editUserForm",
  props: {
    editSupUserFormVisible: {
      type: Boolean,
      default() {
        return false;
      }
    },
    editUserFields: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      formItemLayout,
      form: this.$form.createForm(this)
    };
  },
  methods: {
    handleEditSupUser(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.gender === undefined) {
            values.gender = 0;
          }
          delete values.account;
          this.$emit("handleEditSupUser", values);
        }
      });
    },
    closeEditSupUser(e) {
      if (e.target.className !== "ant-modal-wrap ") {
        this.$emit("closeEditSupUser");
        this.form.resetFields();
      }
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    name(rule, value, callback) {
      if (value !== "" && value !== null && value !== undefined) {
        let bol = value.length < 20;
        if (!bol) {
          callback(new Error("姓名长度不大于20个字符"));
        } else {
          callback();
        }
      }
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value !== form.getFieldValue("pwd")) {
        callback("两个密码不一致");
      } else if ((value !== "" && value.length <= 6) || value.length > 20) {
        callback("密码长度为6到20个字符");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (this.confirmDirty) {
        form.validateFields(["pwd1"], { force: true });
        callback();
      } else if ((value !== "" && value.length <= 6) || value.length > 20) {
        callback("密码长度为6到20个字符");
      }
    },
    handle() {
      return false;
    }
  },
  watch: {
    editUserFields: {
      handler() {
        let nameArr = ["account", "name", "gender", "type"];
        this.form = this.$form.createForm(this, {
          mapPropsToFields: () => {
            let fieldObj = {};
            nameArr.forEach(v => {
              // console.log(v);
              fieldObj[v] = this.$form.createFormField({
                value: this.editUserFields[v]
              });
            });
            return fieldObj;
          }
        });
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
</style>