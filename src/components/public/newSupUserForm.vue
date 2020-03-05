<!--
 * @Description: 新建用户弹出框
 * @Author: sdt
 * @Date: 2019-09-16 13:44:55
 * @LastEditTime: 2020-01-03 11:20:33
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div>
    <a-modal
      title="新建用户"
      :visible="newSupUserFormVisible"
      @ok="handleNewUser"
      @cancel="closeNewUser"
      okText="确认"
      cancelText="取消"
    >
      <a-form :form="form">
        <!-- 账号 -->
        <a-form-item label="账号" v-bind="formItemLayout">
          <a-input
            v-decorator="[`account`, {rules:[{required: true, max:20,message: '请输入账号'}]}]"
            placeholder="请输入账号"
          />
        </a-form-item>
        <!-- 姓名 -->
        <a-form-item label="用户名" v-bind="formItemLayout">
          <a-input
            v-decorator="[`name`, {rules:[{max:20, message: '用户名不大于20个字符'}]}]"
            placeholder="请输入用户名"
          />
        </a-form-item>
        <!-- 密码 -->
        <a-form-item label="密码" v-bind="formItemLayout">
          <a-input
            v-decorator="[`pwd`, {rules:[{required: true, message: '请输入密码'}, {validator:validateToNextPassword}]}]"
            placeholder="请输入密码"
            type="password"
          />
        </a-form-item>
        <!-- 确认密码 -->
        <a-form-item label="确认密码" v-bind="formItemLayout">
          <a-input
            v-decorator="[`pwd1`, {rules:[{required: true, message: '请输入确认密码'}, {validator:compareToFirstPassword}]}]"
            placeholder="请输入确认密码"
            type="password"
            @blur="handleConfirmBlur"
          />
        </a-form-item>
        <!-- 性别 -->
        <a-form-item label="性别" v-bind="formItemLayout">
          <a-radio-group v-decorator="['gender']">
            <a-radio value="1">男</a-radio>
            <a-radio value="2">女</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 }
};
export default {
  name: "newSupUserForm",
  props: {
    newSupUserFormVisible: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      formItemLayout,
      form: this.$form.createForm(this),
      confirmDirty: false
    };
  },
  methods: {
    handleNewUser(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit("handleNewSupUser", values);
          this.form.resetFields();
        }
      });
    },
    closeNewUser(e) {
      if (e.target.className !== "ant-modal-wrap ") {
        this.$emit("closeNewSupUser");
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
      if (value && value !== form.getFieldValue("pwd")) {
        callback("两个密码不一致");
      } else if ((value !== "" && value.length < 6) || value.length > 20) {
        callback("密码长度为6到20个字符");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["pwd1"], { force: true });
        callback();
      } else if ((value !== "" && value.length < 6) || value.length > 20) {
        callback("密码长度为6到20个字符");
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>