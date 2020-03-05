<!--
 * @Description: 一级页面中间内容基础模块组件
 * @Author: sdt
 * @Date: 2019-07-10 10:48:44
 * @LastEditTime: 2020-01-03 14:12:38
 * @LastEditors: Please set LastEditors
 -->

 <template>
  <div class="basic-model">
    <router-view />
    <!-- 搜索&操作 -->
    <div class="basic-operate" v-if="models.key">
      <search-form
        :searchComponent="searchComponent"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
        class="search-form"
        :test="test"
      />
      <div class="operate-btn fr" :class="{'user': isUser}">
        <component
          v-for="(typeOperate,index) in typeComponent"
          :key="index"
          :is="typeOperate.component"
          :params="typeOperate.params"
          @addUser="addUser"
        />
      </div>
    </div>
    <!-- 数据列表 -->
    <div class="basic-table" v-if="models.key">
      <EditableTableComponent
        :tableInfo="tableInfo"
        :tableData="tableData"
        @on-action="doAction"
        :pagination="pagination"
        :loading="loading"
      />
    </div>
    <new-user
      v-if="models.key"
      :newUserFormVisible="newUserFormVisible"
      @handleNewUser="handleNewUser"
      @closeNewUser="closeNewUser"
    />
    <new-sup
      v-if="models.key"
      :newSupUserFormVisible="newSupUserFormVisible"
      @handleNewSupUser="handleNewSupUser"
      @closeNewSupUser="closeNewSupUser"
    />
    <edit-user
      v-if="models.key"
      :editUserFormVisible="editUserFormVisible"
      @handleEditUser="handleEditUser"
      @closeEditUser="closeEditUser"
      :editUserFields="models.editUserFields"
    />
    <edit-sup
      v-if="models.key"
      :editSupUserFormVisible="editSupUserFormVisible"
      @handleEditSupUser="handleEditSupUser"
      @closeEditSupUser="closeEditSupUser"
      :editUserFields="models.editUserFields"
    />
    <auth-form
      v-if="models.key"
      :authForm="authForm"
      @handleAuthUser="handleAuthUser"
      @closeAuthUser="closeAuthUser"
    />
  </div>
</template>

<script>
import SearchForm from "@/components/public/searchForm";
import computed from "./basicMsg/computed";
import msg from "./basicMsg/message";
import EditableTableComponent from "@/components/EditableTable.vue";
import moment from "moment";

import newUser from "@/components/public/newUserForm";
import newSup from "@/components/public/newSupUserForm";
import editUser from "@/components/public/editUserForm";
import editSup from "@/components/public/editSupUserForm";
import authForm from "@/components/public/authForm";

import BaseService from "@/services/BaseService";
const BaseServiceApi = new BaseService();

import auth from "@/auth";
const cloneDeep = require("clone-deep");
export default {
  name: "BasicModel",
  data() {
    return {
      // 表格列
      columns: [],
      // 列表数据
      tableData: [
        // {
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },
        // {
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },
        // {
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },
        // {
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },
        // {
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },
        // {
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },
        // {
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },
        // {
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },
        // {
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },{
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },
        // {
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },{
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },{
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },{
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },{
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },{
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },{
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },{
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },{
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },{
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },{
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },{
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },{
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },{
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },{
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },{
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },{
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // },{
        //   id: 6,
        //   serial: 1,
        //   account: "99AAA",
        //   name: "4",
        //   type: "2",
        //   key: 7,
        //   status: 4
        // }
      ],
      fields: {
        name: "xiaoming",
        phone: "15626204923"
      },
      rowSelectedFlag: 0,
      pagination: {},
      pageSize: 20,
      // 列表信息
      tableInfo: {
        rowSelection: false,
        operates: [],
        columns: [],
        slotCols: []
      },
      // 表格表单
      tableForm: [],
      // 总计金额

      loading: false,
      searchParams: {},
      currentPage: 1,
      pageParams: {},
      newUserFormVisible: false,
      newSupUserFormVisible: false,
      editUserFormVisible: false,
      editSupUserFormVisible: false,
      authId: 0,
      isUser: false,
      test: {
        account: ""
      }
    };
  },
  props: {
    models: {
      type: Object,
      default() {
        return {
          // 表格头
          theads: [],
          // 表格字段
          props: [],
          // 表格列宽度
          width: [],
          fixed: [],
          // 搜索
          searchComponent: [],
          key: "",
          // 操作按钮
          typeComponent: [],
          tableOperation: [],
          submitComponent: [],
          addComponent: [],
          newComponent: [],
          exportComponent: [],
          authForm: {},
          editId: "",
          editUserFields: {
            pwd: "y76235",
            pwd1: "3y87jerjg",
            account: "sdt"
          }
        };
      }
    }
  },
  components: {
    SearchForm,
    EditableTableComponent,
    newUser,
    editUser,
    authForm,
    newSup,
    editSup
  },
  mixins: [computed],
  methods: {
    // 表格头数据处理
    handleTableData(route) {
      // console.log(this.theads, this.tableInfo);
      this.tableInfo.columns = [];
      this.theads &&
        this.theads.forEach(v => {
          this.tableInfo.columns.push({
            title: v
          });
        });

      for (let i in this.props) {
        if (this.props[i] !== "operate") {
          this.tableInfo.columns[i].dataIndex = this.props[i];
        }
        this.tableInfo.columns[i].scopedSlots = {
          customRender: `${this.props[i]}`
        };
      }
      if (this.fixed) {
        for (let i in this.fixed) {
          if (this.fixed[i] !== null) {
            this.tableInfo.columns[i].fixed = this.fixed[i];
          }
        }
      }

      if (this.width) {
        for (let i in this.width) {
          this.tableInfo.columns[i].width = this.width[i];
        }
      }
      const { rowSelection, operates, slotCols } = this.tableOperation;
      this.tableInfo.operates = operates;
      this.tableInfo.slotCols = slotCols;
      this.tableInfo.rowSelection = rowSelection;
    },
    // 表格操作
    doAction(data) {
      switch (data.action) {
        case "pageChange":
          this.pageChange(data.page);
          break;
        case "switch":
          this.switchRow(data.id, data.status, data.name);
          break;
        case "editRow":
          this.editRow(data.id);
          break;
        case "auth":
          this.showAuth(data.sno);
      }
    },
    // 编辑行
    editRow(id) {
      // console.log(id, this.models);
      this.editId = id;
      // console.log(data, this.editUserForm);
      if (this.models.key == "user") {
        this.editUserFormVisible = true;
      } else {
        this.editSupUserFormVisible = true;
      }
      BaseServiceApi.getApi(`/v1/${this.models.getDetUrl}/${id}`).then(res => {
        if (res.ret === 0) {
          if (res.data.user) {
            this.models.editUserFields = res.data.user;
            this.models.editUserFields.pwd = res.data.user.password;
            this.models.editUserFields.pwd1 = res.data.user.password;
          } else {
            this.models.editUserFields = res.data;
          }
          this.models.editUserFields = res.data.user ? res.data.user : res.data;
          // console.log(this.models.editUserFields);
          // 性别转为字符串
          this.models.editUserFields.gender = this.models.editUserFields.gender.toString();
          this.models.editUserFields.pwd = this.models.editUserFields.password;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 跳转路由
    goto(path) {
      this.$router.push({ path: path });
    },
    // 新建模态框
    showNewModal() {
      this.newformVisible = true;
    },
    // 关闭新建模态框
    newFormCancel() {
      this.newformVisible = false;
    },
    // 批量添加
    batchAdd(params) {
      this.goto(`/erp/${params.prevKey}/${params.key}?type=add`);
    },
    // 获取数据
    getData(params = {}, searchParams = {}) {
      BaseServiceApi.getApi(
        `/v1/${this.models.getUrl}`,
        params,
        this.searchParams
      ).then(res => {
        if (res.ret === 0) {
          this.tableData = res.data.list;
          this.tableData = this.tableData.map((item, index) => {
            item.serial = (this.currentPage - 1) * this.pageSize + index + 1;
            return item;
          });
          this.$set(this.pagination, "total", res.data.total);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleReset() {
      this.getData();
      this.searchParams = {};
      // console.log(this.searchParams)
      this.$set(this.pagination, "current", 1);
    },
    // 搜索
    handleSearch(params) {
      this.searchParams = params;
      let pageParams = { pageSize: this.pageSize };
      // const search = { ...this.searchParams, ...pageParams };
      const search = { ...this.searchParams };
      // console.log(search, this.currentPage, this.pageSize)
      this.getData(search);
      this.$set(this.pagination, "current", 1);
    },
    // 页数搜索
    pageChange(pagination) {
      // console.log(pagination);
      const { current } = pagination;
      this.pageSize = pagination.pageSize;
      const page = { page: current };
      const params = { ...this.searchParams };
      const pageSize = { pageSize: pagination.pageSize };
      const search = Object.assign(page, params, pageSize);
      // console.log(search, params, "search");
      this.getData(search);
      this.$set(this.pagination, "current", current);
      this.$set(this.pagination, "pageSize", pagination.pageSize);
      this.currentPage = pagination.current;
      this.pageParams = { page: current };
      // console.log(this.test.account);
    },
    // 后台管理系统
    // 停用启用操作
    switchRow(id, status, name) {
      let params = status == 1 ? 2 : 1;
      // console.log(id, status);
      let text = status == 1 ? "停用" : "启用";
      let that = this;
      this.$confirm({
        title: `确定${text}${name}账号？`,
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          BaseServiceApi.postApi(`/v1/${that.models.statusUrl}/${id}`, {
            status: params
          }).then(res => {
            if (res.ret === 0) {
              if (status == 1) {
                that.$message.success("停用成功");
                that.getData();
                this.$set(this.pagination, "current", 1);
              } else {
                that.$message.success("启用成功");
                that.getData();
                this.$set(this.pagination, "current", 1);
              }
            } else {
              that.$message.error(res.msg);
            }
          });
        },
        onCancel() {
          // console.log("Cancel");
        }
      });
    },
    // 新增用户
    handleNewUser(params) {
      BaseServiceApi.postApi(`/v1/user/add`, params).then(res => {
        if (res.ret === 0) {
          this.$message.success("新增成功");
          this.newUserFormVisible = false;
          this.getData();
          this.$set(this.pagination, "current", 1);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    addUser() {
      if (this.models.key == "user") {
        this.newUserFormVisible = true;
      } else {
        this.newSupUserFormVisible = true;
      }
    },
    closeNewUser() {
      this.newUserFormVisible = false;
    },
    // 新增管理员
    handleNewSupUser(params) {
      // this.getData()

      // this.currentPage = 1
      // console.log(this.currentPage, 'currentPage')
      BaseServiceApi.postApi(`/v1/adminUser/add`, params).then(res => {
        if (res.ret === 0) {
          this.$message.success("新增成功");
          this.newSupUserFormVisible = false;
          this.getData();
          this.$set(this.pagination, "current", 1);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    closeNewSupUser() {
      this.newSupUserFormVisible = false;
    },
    closeEditUser() {
      this.editUserFormVisible = false;
    },
    // 修改用户
    handleEditUser(params) {
      BaseServiceApi.postApi(`/v1/user/edit/${this.editId}`, params).then(
        res => {
          if (res.ret === 0) {
            this.$message.success("保存成功");
            this.editUserFormVisible = false;
            this.getData();
            this.$set(this.pagination, "current", 1);
          } else {
            this.$message.error(res.msg);
          }
        }
      );
    },
    closeEditSupUser() {
      this.editSupUserFormVisible = false;
    },
    // 修改管理员
    handleEditSupUser(values) {
      BaseServiceApi.postApi(`/v1/adminUser/edit/${this.editId}`, values).then(
        res => {
          if (res.ret === 0) {
            this.$message.success("保存成功");
            this.editSupUserFormVisible = false;
            this.getData();
            this.$set(this.pagination, "current", 1);
          } else {
            this.$message.error(res.msg);
          }
        }
      );
    },
    handleAuthUser() {
      this.authForm.authFormVisible = false;
    },
    closeAuthUser() {
      this.authForm.authFormVisible = false;
    },
    showAuth(sno) {
      this.authForm.authFormVisible = true;
      this.authForm.userId = sno;
    }
  },
  mounted() {
    // if (auth.getLoginSession().type === "2") {
    //   this.$router.push("/manage/list/user");
    // } else if (auth.getLoginSession().type === "1") {
    //   this.$router.push("/manage/list/superuser");
    // } else {
    //   this.$routr.push("/login");
    // }
    if (this.models.getUrl) {
      this.getData();
    }
    this.handleTableData(this.$route);
    // this.goto("/manage/list/superuser");
    // this.isFLoat = Object.keys(this.$route.query).length !== 0 ? true : false;

    this.$set(this.pagination, "showQuickJumper", true);
    this.$set(this.pagination, "showSizeChanger", true);
    // this.$set(this.pagination, "pageSize", 20);
  },
  watch: {
    $route: {
      handler: function(route) {
        this.isUser = route.params.model == "user" ? true : false;
        this.currentPage = 1;
        this.pagination = {};
        this.tableData = [];
        this.searchParams = {};
        // console.log(this.searchParams);
        if (this.models.getUrl) {
          this.getData();
        }
        this.$set(this.pagination, "current", 1);
        this.$set(this.pagination, "pageSize", 20);
        this.$set(this.pagination, "showQuickJumper", true);
        this.$set(this.pagination, "showSizeChanger", true);
        // this.handleTab(route);
        this.handleTableData(route);
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="scss">
.basic-model {
  .basic {
    &-tab {
      text-align: left;
    }
    &-operate {
      margin-left: 20px;
      padding-top: 10px;
    }
    &-search {
      // margin-bottom: 20px;
      display: inline-block;
    }
  }
  .operate-btn {
    // line-height: 32px;
    display: inline-block;
    // display: flex;
    vertical-align: text-top;
    margin-top: 3px;
  }
  .displayR {
    float: right;
    display: flex;
    white-space: nowrap;
    overflow: hidden;
  }
  .displayF {
    display: flex;
    white-space: nowrap;
    overflow: hidden;
  }
  .mt55 {
    margin-top: 55px;
  }
  .ant-table-thead > tr > th {
    font-weight: bold;
    background-color: #eef1f6;
  }
  .ant-table {
    color: #000;
  }
  .search-form {
    display: inline-block;
  }
  .basic-operate {
    text-align: left;
    padding-right: 0.625rem;
  }
  .user {
    .el-button {
      margin-top: 48px;
    }
  }
}
</style>

 
