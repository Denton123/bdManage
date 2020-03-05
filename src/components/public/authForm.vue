<!--
 * @Description: 用户授权
 * @Author: sdt
 * @Date: 2019-09-16 16:57:30
 * @LastEditTime: 2020-03-03 17:16:34
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div class="auth">
    <a-modal
      :title="authForm.authFormTitle"
      :visible="authForm.authFormVisible"
      @ok="handleAuthUser"
      @cancel="closeAuthUser"
      okText="确认"
      cancelText="取消"
      :width="isDev ? '750px' : '666px'"
    >
      <span class="authtip">提示:您目前在对{{ authuser }}用户进行功能授权</span>
      <el-transfer
        filterable
        :filter-method="filterMethod"
        filter-placeholder="角色"
        v-model="value"
        :data="data"
        :titles="['角色列表', '已授权角色列表']"
        @change="handleAuthChange"
        @left-check-change="handleLeft"
      ></el-transfer>
    </a-modal>
  </div>
</template>

<script>
import BaseService from "@/services/BaseService";
const BaseServiceApi = new BaseService();

export default {
  name: "authForm",
  props: {
    authForm: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      isDev: false,
      data: [],
      value: [],
      // 需要被提交的数据
      submitKeys: [],
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      },
      authuser: ""
    };
  },
  methods: {
    // 提交授权
    handleAuthUser() {
      if (this.authForm.key == "super" && this.submitKeys.length == 0) {
        this.$message.error("管理员角色不为空");
      } else {
        let params;
        // console.log(params,' params',this.data)
        this.data.forEach(v => {
          this.submitKeys.forEach((item, index) => {
            if (item == v.key && v.disabled) {
              this.submitKeys.splice(index, 1);
            }
          });
        });
        params = {
          role: this.submitKeys
        };
        BaseServiceApi.postApi(
          `/v1/${this.authForm.postRole}/${this.authForm.userId}`,
          params
        ).then(res => {
          if (res.ret === 0) {
            this.$message.success("授权成功");
            this.$parent.getData();
            this.$emit("handleAuthUser");
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
    // 取消授权
    closeAuthUser(e) {
      if (e.target.className !== "ant-modal-wrap ") {
        this.$emit("closeAuthUser");
      }
      // this.$emit("closeAuthUser");
    },
    // 获取穿梭框数据
    generateData() {
      this.data = [];
      BaseServiceApi.getApi(`/v1/${this.authForm.getAllRoleUrl}`).then(res => {
        if (res.ret === 0) {
          // console.log(res.data);
          res.data.forEach((role, index) => {
            this.data.push({
              label:
                this.authForm.key == "super"
                  ? role.name
                  : `${role.name}（${role.terminal}）`,
              key: this.authForm.key == "super" ? role.type : role.uuid,
              code: role.code
            });
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 获取用户角色
    getUserRoles() {
      this.value = [];
      BaseServiceApi.getApi(
        `/v1/${this.authForm.getUserRoleUrl}/${this.authForm.userId}`
      ).then(res => {
        if (res.ret === 0) {
          let checkRoles = [];
          this.authForm.key == "super"
            ? checkRoles.push(res.data.type)
            : res.data.role.forEach(v => {
                checkRoles.push(v.uuid);
              });
          this.value = checkRoles;
          this.submitKeys = checkRoles;
          this.authuser =
            this.authForm.key == "super" ? res.data.name : res.data.user.name;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 穿梭框改变
    handleAuthChange(value, direction, movedKeys) {
      this.submitKeys = value;
      // console.log(this.submitKeys, '穿梭框改变')
      // console.log(value, direction, movedKeys);
      if (this.authForm.key == "normal") {
        let model = [];
        if (direction == "left") {
          this.data.forEach(v => {
            movedKeys.forEach(y => {
              if (y == v.key) {
                model.push(v.code.split("_")[1]);
              }
            });
          });
          this.data.forEach(i => {
            model.forEach(k => {
              if (i.code.split("_")[1] == k) {
                i.disabled = false;
              }
            });
          });
        }
      }
    },
    handleLeft(key, value) {
      // console.log(key, value, this.data);
      // console.log(this.authForm.key, "key");
      if (this.authForm.key == "normal") {
        // 单选
        let model;
        this.data.forEach(v => {
          if (value[0] == v.key) {
            model = v.code.split("_");
          }
        });
        if (model[1] !== "DAS") {
          this.data.forEach(i => {
            if (!key.includes(value[0])) {
              if (i.code.split("_")[1] == model[1] && i.key !== value[0]) {
                i.disabled = false;
              }
            } else {
              if (i.code.split("_")[1] == model[1] && i.key !== value[0]) {
                i.disabled = true;
              }
            }
          });
        }
        // 多选
        // let arr = [];
        // this.data.forEach(item => {
        //   if (item.code.split("_")[1] !== "DAS") {
        //     arr.push(item.code.split("_")[1]);
        //   }
        // });
        // const set = new Set(arr);
        // console.log([...set]);
        // arr = [...set];
        // this.data.forEach((v) => {
        //   arr.forEach(i => {
        //     if (v.code.indexOf(i) !== -1) {

        //     }
        //   });
        // });
      }
      // console.log("key:", key, "value", value);
    }
  },
  mounted() {
      if(window.location.href.indexOf("dev") !== -1) {
          this.isDev = true
      } else {
          this.isDev = false
      }
  },
  watch: {
    "authForm.authFormVisible"(v) {
      if (v) {
        this.generateData();
        this.getUserRoles();
        this.$nextTick(() => {
          let dom = document.getElementsByClassName("el-checkbox__label");
          // console.log(dom[0].previousSibling);
          dom[0].previousSibling.style.display = "none";
          // console.log(dom[0]);
          // console.log(dom[0].innerText);
        });
      }
    },
    $route: {
      handler: function(route) {
          console.log(route)
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style lang="scss">
.auth {
  // width: 648px;
}

//   .ant-modal{
//   width: 648px !important;
// }
.authtip {
  color: red;
  display: block;
  margin-bottom: 20px;
}

.ant-modal-body {
  padding: 20px 12px !important;
}

.el-transfer-panel {
  width: 272px;
}

// .el-transfer-panel .el-transfer-panel__header .el-checkbox__input{
//   display: none;
// }
</style>
