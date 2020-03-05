<!--
 * @Description: 新建用户弹出框
 * @Author: sdt
 * @Date: 2019-09-16 13:44:55
 * @LastEditTime: 2020-03-02 10:06:22
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div>
    <a-modal
      title="新建用户"
      :visible="newUserFormVisible"
      @ok="handleNewUser"
      @cancel="closeNewUser"
      okText="确认"
      cancelText="取消"
    >
      <a-form :form="form">
        <!-- 手机号码 -->
        <a-form-item label="手机号码" v-bind="formItemLayout">
          <a-input
            v-decorator="[
              'mobile',
              {
                rules: [
                  { required: true, message: '请输入11位手机号码' },
                  { validator: phone }
                ]
              }
            ]"
            placeholder="请输入手机号码"
            id="mobile"
          />
        </a-form-item>
        <!-- 名称 -->
        <a-form-item
          label="用户名"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'name',
              {
                rules: [
                  { required: true, message: '请输入用户名' },
                  { validator: name }
                ]
              }
            ]"
            placeholder="请输入用户名 "
            id="name"
          />
        </a-form-item>

        <!-- 邮件地址 -->
        <a-form-item label="邮件地址" v-bind="formItemLayout">
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入邮件地址!'
                  },
                  { validator: email }
                ]
              }
            ]"
            placeholder="请输入邮件地址"
            id="email"
          />
        </a-form-item>
        <!-- 密码 -->
        <a-form-item label="密码" v-bind="formItemLayout">
          <a-input
            v-decorator="[
              'pwd',
              {
                rules: [
                  { required: true, message: '请输入密码' },
                  { validator: validateToNextPassword }
                ]
              }
            ]"
            placeholder="请输入密码"
            type="password"
            id="pwd"
          />
        </a-form-item>
        <!-- 确认密码 -->
        <a-form-item label="确认密码" v-bind="formItemLayout">
          <a-input
            v-decorator="[
              'pwd1',
              {
                rules: [
                  { required: true, message: '请输入确认密码' },
                  { validator: compareToFirstPassword }
                ]
              }
            ]"
            placeholder="请输入确认密码"
            type="password"
            id="pwd1"
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
  name: "newUserForm",
  props: {
    newUserFormVisible: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      formItemLayout,
      // form: this.$form.createForm(this),
      confirmDirty: false
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleNewUser(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.$emit("handleNewUser", values);
        }
      });
    },
    closeNewUser(e) {
      if (e.target.className !== "ant-modal-wrap ") {
        this.$emit("closeNewUser");
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
    phone(rule, value, callback) {
      if (value !== "" && value !== null && value !== undefined) {
        value = value.trim();
        let bol = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/.test(
          value
        );
        if (!bol) {
          callback(new Error("请输入正确的联系方式"));
        } else {
          callback();
        }
      }
    },
    email(rule, value, callback) {
      // console.log(rule);
      if (value !== "" && value !== null && value !== undefined) {
        value = value.trim();
        let bol =
          value.length < 32 &&
          /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
            value
          );
        if (!bol) {
          callback(new Error("请输入正确的邮件地址"));
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
  },
  watch: {
    newUserFormVisible(v) {
      if (v) {
        this.form.resetFields();
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
