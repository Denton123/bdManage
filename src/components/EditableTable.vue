<template>
  <div>
    <div v-if="loading">
      <a-spin />
    </div>
    <div v-else>
      <a-table
        :columns="tableInfo.columns"
        :dataSource="tableData"
        rowKey="uuid"
        bordered
        style="margin-top:12px;"
        @change="pageChange"
        :pagination="pagination"
        :scroll="{ y: 515 }"
      >
        <!-- 状态 -->
        <template slot="gender" slot-scope="text">
          <span>{{ text == 1 ? "男" : text == 2 ? "女" : "" }}</span>
        </template>
        <!-- 状态 -->
        <template slot="status" slot-scope="text">
          <a-tag :color="text == 1 ? 'green' : 'red'">{{
            text == 1 ? "启用" : "停用"
          }}</a-tag>
        </template>
        <!-- 角色类型 -->
        <template slot="type" slot-scope="text">
          <span>{{ text == 1 ? "超级管理员" : "普通管理员" }}</span>
        </template>
        <!-- 角色 -->
        <template slot="role" slot-scope="text">
          <span v-html="roleText(text)"></span>
        </template>

        <template slot="operate" slot-scope="record">
          <div class="editable-row-operations">
            <span v-for="(item, index) in tableInfo.operates" :key="index">
              <span v-if="record.editable">
                <span>
                  <a @click="evt => saveRow(evt, record.serial, record)">{{
                    item.editSubmitTitle
                  }}</a>
                  <a @click="() => cancelRow(record.serial, record.id)">{{
                    item.editCancelTitle
                  }}</a>
                </span>
              </span>
              <span v-else>
                <span v-if="item.action == 'edit' && record.baseStatus !== 2">
                  <a @click="evt => editRow(record.uuid)">{{ item.title }}</a>
                </span>

                <span v-if="item.action == 'auth' && record.status == 1">
                  <a @click="() => auth(record.uuid)">{{ item.title }}</a>
                </span>
                <span v-if="item.action == 'stop'">
                  <a
                    @click="
                      evt => switchRow(record.uuid, record.status, record.name)
                    "
                    >{{ record.status == 1 ? "停用" : "启用" }}</a
                  >
                </span>
              </span>
            </span>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import BaseService from "@/services/BaseService";
const BaseServiceApi = new BaseService();

const cloneDeep = require("clone-deep");
export default {
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      }
    },
    tableInfo: {
      type: Object,
      default() {
        return {};
      }
    },
    pagination: {
      type: Object,
      default() {
        return {
          total: 0,
          pageSize: 20,
          showSizeChanger: true,
          showQuickJumper: true
        };
      }
    },
    loading: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      isScroll: false,
      singlecount: 1,
      checkcount: 1,
      dataArray: this.tableData,
      tableScroll: {},
      stopvisible: false
    };
  },
  watch: {
    $route: {
      handler: function(route) {}
    },
    tableData: {
      handler(val, oldVal) {},
      deep: true
    }
  },
  methods: {
    // 页数切换
    pageChange(page) {
      this.$emit("on-action", { action: "pageChange", page });
      // this.doRefresh();
    },
    // 编辑行
    editRow(id) {
      this.$emit("on-action", { action: "editRow", id });
    },
    // 启用禁用
    switchRow(id, status, name) {
      this.$emit("on-action", { action: "switch", id, status, name });
    },
    // 状态文字转化
    statusText(text) {
      switch (text) {
        case 1:
          return `<a-tag color="red">停用</a-tag>`;
          break;
        case 2:
          return `<a-tag color="green">正常</a-tag>`;
          break;
      }
    },
    // 授权
    auth(sno) {
      this.$emit("on-action", { action: "auth", sno });
    },
    roleText(text) {
      let desc = "";
      text.forEach(v => {
        desc += v.name + "，";
      });
      desc = desc.substring(0, desc.length - 1);
      return desc;
    }
  },
  created: function() {},
  mounted() {}
};
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>

<style lang="scss">
// .ant-select-dropdown {
//   width: auto !important;
// }
.ant-calendar-picker {
  width: 100%;
}
.ant-table td {
  word-break: break-all;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 10px 10px;
}
.ant-table-bordered.ant-table-fixed-header .ant-table-placeholder {
  border: 1px solid #e8e8e8;
  width: calc(100% - 16px);
  border-top: none;
}
</style>
