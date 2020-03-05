<template>
  <div style="height:65px;">
    <b class="system-logo">{{title}}</b>
    <a-row>
      <a-col :lg="{span:4, offset:0}">
        <div style="line-height:65px;;text-align:left;">
          <!-- <b>{{getBreadcrumb}}</b> -->
        </div>
      </a-col>

      <a-col :lg="{span:26, offset:0}" style="padding-right:5px;">
        <div style="line-height:65px;text-align:right;">
          <img :src="usericon" style="width:31px;height:31px;" />
          <div style="display:inline-block;line-height:65px;padding-left:12px;">{{ username }}</div>
          <!-- <div
            style="display:inline-block;line-height:65px;padding-left:12px;cursor:pointer;"
            @click="logout"
          >退出</div> -->
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
    import auth from "../../auth";
    import UserService from "@/services/UserService";
    const UserServiceApi = new UserService();
    import BaseService from "@/services/BaseService";
    const BaseServiceApi = new BaseService();
    export default {
        data() {
            return {
                username: "",
                usericon: "",
                title: ""
            };
        },
        computed: {
            // getBreadcrumb() {
            //   return this.$store.state.breadcrumb;
            // },
            // getUsername() {
            //   return localStorage.getItem(auth.session.name);
            // },
            // getUserIcon() {
            //   return localStorage.getItem(auth.session.hp);
            // }
        },
        methods: {
            goto(path, params) {
                this.$router.push({
                    path: path,
                    params: params
                });
            },
            handleUser(type) {
                // console.log(type)
                switch (type) {
                    case "0":
                        this.usericon = require("../../assets/user0.png");
                        break;
                    case "1":
                        this.usericon = require("../../assets/user1.png");
                        break;
                    case "2":
                        this.usericon = require("../../assets/user2.png");
                }
                // this.username = name;
            },
            // 设置头部标题
            handleTitle(route) {
                const model = route.params.model ?
                    route.params.model :
                    route.name;
                console.log(model, '===================')
                switch (model) {
                    case "superuser":
                        this.title = "超管列表";
                        break;
                    case "user":
                        this.title = "用户列表";
                        break;
                    case "itemconfig":
                        this.title = "项目配置";
                        break;
                    case "tree":
                        this.title = "数据字典";
                        break;
                    case 'personalCenter':
                        this.title = '个人中心'
                        break;
                    case 'changeName':
                        this.title = '修改资料'
                        break;
                    case 'changePwd':
                        this.title = '修改密码'
                        break;
                }
            }
        },
        mounted() {
            // this.username =
            //   localStorage.getItem(auth.session.name) !== ""
            //     ? localStorage.getItem(auth.session.name)
            //     : localStorage.getItem(auth.session.account);
            // console.log(this.username);
            // this.handleImg();
            this.handleTitle(this.$route);
        },
        beforeCreate() {
            BaseServiceApi.getUser("/user/api/getUserInfo", {}, "").then(res => {
                if (res.ret == 0) {
                    this.username = res.data.name;
                    this.handleUser(`${res.data.gender}`);
                }
            });
        },
        watch: {
            $route(v) {
                console.log(v)
                    // this.username =
                    // localStorage.getItem(auth.session.name) !== ""
                    //   ? localStorage.getItem(auth.session.name)
                    //   : localStorage.getItem(auth.session.account);
                    // this.handleImg();
                this.handleTitle(v);
            },
            deep: true,
            immediate: true
        }
    };
</script>

<style lang="scss">
    .system-logo {
        float: left;
        font-size: 18px;
    }
    
    .ant-layout-header {
        border-bottom: 1px solid rgb(216, 216, 216);
    }
</style>