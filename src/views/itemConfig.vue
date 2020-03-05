<!--
 * @Description: 项目配置
 * @Author: sdt
 * @Date: 2019-09-17 14:04:17
 * @LastEditTime: 2019-12-03 14:54:25
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div class="config">
    <div class="config_search">
      <div style="float:left;">
        <a-input placeholder="项目名称" class="config_search_input" v-model="searchValue" />
        <a-button type="primary" @click="searchProject">查询</a-button>
        <a-button @click="searchReset">重置</a-button>
      </div>
    </div>
    <div class="item_list">
      <a-row>
        <a-col :xxl="4" :xl="5" :lg="7" :md="10" :sm="6" :xs="6" class="item_col" @click="addItem">
          <div class="add_item">
            <span class="add_item_img">
              <img src="../assets/addItem.png" alt />
            </span>
            <p>新建项目</p>
          </div>
        </a-col>
        <a-col
          :xxl="4"
          :xl="5"
          :lg="7"
          :md="10"
          :sm="6"
          :xs="6"
          v-for="(item, index) in itemLists"
          :key="index"
          class="item_col"
          @click="toDetail(item.uuid)"
        >
          <div>
            <span class="item_img">
              <img :src="item.pic" alt />
            </span>
            <p class="item_brif">
              <span>{{item.title}}</span>
            </p>
          </div>
        </a-col>
      </a-row>
    </div>
    <!-- 分页 -->
    <!-- <div class="config_page">
      <a-pagination
        :total="total"
        showSizeChanger
        showQuickJumper
        class="config_pagination"
        @change="pageChange"
        @showSizeChange="onShowSizeChange"
      />
    </div> -->
  </div>
</template>

<script>
import BaseService from "@/services/BaseService";
const BaseServiceApi = new BaseService();
export default {
  name: "itemConfig",
  data() {
    return {
      itemLists: [
        {
          title: "test",
          pic: require("../assets/addItem.png"),
          uuid: 1
        },
        {
          title: "test",
          pic: require("../assets/addItem.png"),
          uuid: 2
        },
        {
          title: "test",
          pic: require("../assets/addItem.png"),
          uuid: 3
        },
        {
          title: "test",
          pic: require("../assets/addItem.png"),
          uuid: 4
        },
        {
          title: "test",
          pic: require("../assets/addItem.png"),
          uuid: 5
        }
      ],
      // 搜索
      searchValue: "",
      total: 0
    };
  },
  methods: {
    goto(path, name, params) {
      this.$router.push({ path: path, name: name, params: params });
    },
    // 添加项目
    addItem() {
      this.$router.push({
        path: "/manage/item/itemtab",
        name: "itemtab",
        params: { type: "product", flag: "add" }
      });
    },
    // 跳转详情页
    toDetail(id) {
      this.$router.push({
        path: `/manage/item/itemtab`,
        name: "itemtab",
        params: { type: "product", flag: "detail", id: id }
      });
    },
    // 搜索
    searchProject() {
      let searchParams = { name: this.searchValue };
      // console.log(this.searchValue);
      this.getData(searchParams);
    },
    // 重置搜索
    searchReset() {
      this.searchValue = "";
      this.getData();
    },
    // 获取数据
    getData(params = {}) {
      BaseServiceApi.getApi(`/v1/project/list`, params).then(res => {
        if (res.ret === 0) {
          this.itemLists = [];
          res.data.list.forEach(v => {
            this.itemLists.push({
              title: v.name,
              pic: v.pic,
              uuid: v.uuid
            });
          });
          this.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 分页触发事件
    pageChange(page, pageSize) {
      // console.log(page, pageSize);
      this.getData({ page: page, pageSize: pageSize });
    },
    // 分页数触发事件
    onShowSizeChange(current, pageSize) {
      // console.log(current, pageSize)
      this.getData({ pageSize: pageSize });
    }
  },
  mounted() {
    this.getData();
  },
  watch: {
    $route: {
      immediate: true,
      handler: function(v) {
        // console.log(v);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.config {
  padding: 30px 70px;
}
.config_search {
  height: 60px;
}
.config_search_input {
  width: 200px;
}
.item_list {
  margin-top: 20px;
}
.item_col {
  height: 285px;
  margin: 0 10px;
  // padding: 30px;
  // margin-right: 30px;
  margin-bottom: 40px;
  cursor: pointer;
  div {
    border: 1px solid #ddd;
    width: 200px;
    margin: 0 auto;
    height: 285px;
  }
}
.item_col:nth-child(5) {
  // margin-right: 0;
}
.add_item {
  p {
    font-weight: 600;
    height: 65px;
    line-height: 65px;
  }
  img {
    width: 100%;
  }
}
.item_img {
  height: 220px;
  display: block;
  border-bottom: 1px solid #ddd;
  img {
    width: 100%;
    height: 100%;
  }
}
.add_item_img {
  height: 220px;
  display: block;
  padding-top: 22px;
}
.item_brif {
  height: 65px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}
.item_brif span {
  text-align: left;
  padding: 3px;
}

.ant-col-4 {
  padding-left: 0;
  padding-right: 0;
}
.config_pagination {
  float: right;
}
</style>