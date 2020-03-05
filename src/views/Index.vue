<template>
  <a-layout>
    <a-layout-sider>
      <SiderComponent :collapsed="collapsed"></SiderComponent>
    </a-layout-sider>

    <a-layout>
      <a-layout-header style="background:#fff;">
        <HeaderComponent></HeaderComponent>
      </a-layout-header>
      <a-layout>
        <a-layout-content>
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          备案号：
          <a
            href="http://www.beian.miit.gov.cn"
            target="_blank"
            class="provider"
          >粤ICP备18156081号-1</a>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import HeaderComponent from "../components/layout/Header.vue";
import SiderComponent from "../components/layout/Sider.vue";
import auth from "@/auth";
import UserService from "@/services/UserService";
const UserServiceApi = new UserService();
export default {
  components: {
    HeaderComponent,
    SiderComponent
  },
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    // 判断是否是登录成功之后进入系统的
    hasLogin() {
      let loginUrl = "";
      loginUrl =
        window.location.href.indexOf("dev") !== -1
          ? "http://dev.work.bdlifescience.com"
          : window.location.href.indexOf("test") !== -1
          ? "http://test.work.bdlifescience.com"
          : "http://work.bdlifescience.com";
      let prevLink = document.referrer;
      if (prevLink.indexOf(loginUrl) !== -1 && prevLink !== "") {
        return;
      } else {
        // console.log(localStorage.getItem('token'), auth.isLogin())
        if (!auth.isLogin()) {
          window.location.href = `${loginUrl}/login`;
        }
      }
    }
  },
  beforeCreate() {
    UserServiceApi.getUser("/user/api/navigation", {}, "").then(res => {
      // console.log(res)
      res.data.forEach(v => {
        if (v.enName == "admin") {
          v.roles.forEach(i => {
            localStorage.setItem("BD_ADMIN_ROLE", i.code);
          });
        }
      });
    });
  },
  mounted: function() {
    this.hasLogin();
  }
};
</script>

<style scoped>
#components-layout-demo-basic {
  text-align: center;
}

.ant-layout-header {
  background: white;
}
#components-layout-demo-basic .ant-layout-footer {
  line-height: 1.5;
}
.ant-layout-sider {
  background: #001529;
  /* line-height: 120px; */
}
#components-layout-demo-basic .ant-layout-content {
  background-color: rgb(244, 246, 247);
  line-height: 120px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
.provider {
  color: rgba(0, 0, 0, 0.65);
}
.provider:hover,
.provider:active,
.provider:focus,
.provider:visited {
  text-decoration: none;
}
</style>

<style>
.ant-layout-sider-trigger {
  background-color: white;
  color: #2c3e50;
  /* border-right: 1px solid rgb(216, 216, 216); */
}
/* .ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left{
  border-right: none;
  overflow: visible;
  padding-bottom: 50px;
} */
</style>
