<!--
 * @Description: 修改用户名
 * @Author: your name
 * @Date: 2019-07-16 13:42:43
 * @LastEditTime: 2020-01-16 13:18:22
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div class="changeName">
    <a-row>
      <a-col :lg="{span:10, offset:7}">
        <div>
          <a-form :form="form" class="textleft" @submit="handleSubmit">
            <a-form-item label="性别" :label-col="{ span: 6 }" :wrapper-col="{ span: 6 }">
              <a-radio-group v-decorator="[
                    'gender'
                  ]">
                <a-radio value="1">男</a-radio>
                <a-radio value="2">女</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="用户名" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
              <a-input
                maxlength="16"
                v-decorator="[
                    'name',{ initialValue: username },
                    { rules: [{ required: true, type: 'string',  max: 16, whitespace:true, message: '请输入用户名!' }] }
                  ]"
                placeholder="请输入用户名"
              />
            </a-form-item>
            <a-row>
              <a-col :lg="{span:6}" class="textright"></a-col>
              <a-col :lg="{span:18}" class="textleft" style="margin-bottom:100px;">
                <a-button type="primary" html-type="submit">确认</a-button>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import auth from "@/auth.js";
import UserService from "@/services/UserService";
const UserServiceApi = new UserService();
export default {
  name: "ChangeName",
  data() {
    return {
      form: this.$form.createForm(this),
      visible: false,
      getUserIcon: "",
      images: [],
      imgId: "",
      username: '222'
    };
  },
  computed: {},
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.gender == undefined) values.gender = 0;
          let form = {
            ...values
          };
          UserServiceApi.modifyInfo(form).then(res => {
            if (res.ret == 0) {
              localStorage.setItem(auth.session.name, form.name);
              localStorage.setItem(auth.session.gender, form.gender);
              this.$message.success("操作成功");
              this.goto("/admin/personalCenter");
            } else {
              this.$message.error("服务器未响应，请稍后再试");
              // this.goto("/erp/personalCenter");
            }
          });
        }
      });
    },
    goto(path) {
      this.$router.push({ path: path });
    }
  },
  mounted() {
    // this.getAccountImages();
    this.username = localStorage.getItem(auth.session.name);
    let img = localStorage.getItem(auth.session.gender);
    switch (img) {
      case "0":
        this.getUserIcon = require("../assets/user0.png");
        break;
      case "1":
        this.getUserIcon = require("../assets/user1.png");
        break;
      case "2":
        this.getUserIcon = require("../assets/user2.png");
    }

    // if (!auth.isLogin()) {
    //   // this.goto("/erp/purchase/dangerLine");
    // } else {
    // }
  },
  watch: {
  }
};
</script>

<style lang="scss">
.changeName {
  padding-top: 50px;
  .has-error .ant-form-explain,
  .has-error .ant-form-split {
    text-align: left;
  }
}
</style>

