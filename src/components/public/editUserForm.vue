<!--
 * @Description: 编辑用户
 * @Author: sdt
 * @Date: 2019-09-16 16:17:19
 * @LastEditTime: 2020-01-03 17:19:43
 * @LastEditors: Please set LastEditors
 -->

<template>
  <a-modal
    title="编辑用户"
    :visible="editUserFormVisible"
    @ok="handleEditUser"
    @cancel="closeEditUser"
    okText="确认"
    cancelText="取消"
  >
    <a-form :form="form">
      <!-- 手机号码 -->
      <a-form-item label="手机号码" v-bind="formItemLayout">
        <a-input
          v-decorator="['mobile', {rules:[{required: true, message: '请输入11位手机号码'}, {validator:phone}]}]"
          placeholder="请输入手机号码"
          id="mobile"
        />
      </a-form-item>
      <!-- 姓名 -->
      <a-form-item
        label="姓名"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[`name`, {rules:[{required: true, message: '请输入姓名'}, {validator:name}]}]"
          placeholder="请输入姓名"
        />
      </a-form-item>

      <!-- 邮件地址 -->
      <a-form-item
        label="邮件地址"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
          'email',
          {
            rules: [ {
              required: true, message: '请输入邮件地址!',
            }, {validator:email}]
          }
        ]"
          placeholder="请输入邮件地址"
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
          v-decorator="[`pwd1`,{ rules: [{ type: 'string', min:6, max:20, whitespace:true, message: '请输入6-20位密码' }] }]"
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
    editUserFormVisible: {
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
    handleEditUser(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // if (values.pwd !== undefined && values.pwd1 !== undefined) {
          //   if (values.pwd !== values.pwd1) {
          //     this.$message.error("两次输入密码不匹配");
          //   }
          // }
          this.$emit("handleEditUser", values);
        }
      });
    },
    closeEditUser(e) {
      if (e.target.className !== "ant-modal-wrap ") {
        this.$emit("closeEditUser");
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
    email(rule, value, callback) {
      if (value !== "" && value !== null && value !== undefined) {
        value = value.trim();
        let bol =
          value.length < 32 &&
          /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
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
      if (value !== "" && value !== form.getFieldValue("pwd")) {
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
      } else {
        callback();
      }
    },
    phone(rule, value, callback) {
      if (value !== "" && value !== null && value !== undefined) {
        value = value.trim();
        let bol = /^(((13[0-9]{1})|(15[0-9]{1})|(166)|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/.test(
          value
        );
        if (!bol) {
          callback(new Error("请输入正确的联系方式"));
        } else {
          callback();
        }
      }
    }
  },
  watch: {
    editUserFields: {
      handler() {
        let nameArr = ["name", "mobile", "email", "gender"];
        this.form = this.$form.createForm(this, {
          mapPropsToFields: () => {
            let fieldObj = {};
            nameArr.forEach(v => {
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