<!--
 * @Description: 数字字典
 * @Author: sdt
 * @Date: 2019-09-18 10:24:30
 * @LastEditTime: 2020-02-20 17:54:09
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div class="tree_wrap">
    <a-row>
      <a-col :span="6">
        <div class="tree_list">
          <a-input placeholder="过滤字典" @pressEnter="handleSearch" v-model="searchValue" />
          <div>
            <div
              v-for="(item,index) in lists"
              :key="index"
              class="listItem"
              @click="choseItem(item.id,item.title)"
              :class="{active:item.id==current}"
            >{{item.title}}</div>
          </div>
        </div>
      </a-col>
      <a-col :span="16" class="tree">
        <h2 class="treeTitle">{{treeTitle}}</h2>
        <el-tree
          :data="treeData"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :render-content="renderContent"
          @node-collapse="collapseNode"
           :default-expanded-keys="userExpand"
           @node-expand="clickNode"
        ></el-tree>
      </a-col>
    </a-row>
    <add-tree
      :addTreeFormVisible="addTreeFormVisible"
      @handleAddTree="handleAddTree"
      @closeAddTree="closeAddTree"
      :addtreeFields="addtreeFields"
    />
    <edit-tree
      :editTreeFormVisible="editTreeFormVisible"
      @handleEditTree="handleEditTree"
      @closeEditTree="closeEditTree"
      :editTreeFields="editTreeFields"
    />
  </div>
</template>

<script>
import BaseService from "@/services/BaseService";
const BaseServiceApi = new BaseService();
let id = 1000;
// import { mockData } from "@/utils/mock.js";
import addTree from "@/components/public/addTreeForm";
import editTree from "@/components/public/editTreeForm";
export default {
  data() {
    return {
      isAllExpand:true,
      userExpand: [],
      current: 0,
      lists: [
        // {
        //   title: "样本类型"
        // },
        // {
        //   title: "运输条件"
        // },
        // {
        //   title: "快递公司列表"
        // },
        // {
        //   title: "组别"
        // },
        // {
        //   title: "采购途径"
        // },
        // {
        //   title: "校准结构"
        // },
        // {
        //   title: "储存条件"
        // },
        // {
        //   title: "厂家"
        // }
      ],
      // data: JSON.parse(JSON.stringify(data)),
      treeData: [],
      treeTitle: "样本类型",
      addTreeFormVisible: false,
      addtreeFields: {},
      editTreeFormVisible: false,
      editTreeFields: {},
      searchValue: "",
      editId: "",
      chnNumChar: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
      chnUnitSection: ["", "万", "亿", "万亿", "亿亿"],
      chnUnitChar: ["", "十", "百", "千"],
      topId: '',
      test: []
    };
  },
  components: {
    addTree,
    editTree
  },
  methods: {
    clickNode(node){
      // console.log(node)
      this.test.push(node.id)
      // console.log(this.test)
    },
    collapseNode(node){
      console.log(node)
    },
    renderContent(h, { node, data, store }) {
      return (
        <div class="treeitem">
          <span class="fl" style="width:75%;text-align:left;">
            <a-tag color={this.color(node.data.level)}>
              {this.levelText(node.data.level)}
            </a-tag>
            <span class="treeValue">{node.data.value}</span>
          </span>
          <span class="custom-tree-node fr" style="width:calc(25% - 10px);text-align:right;">
            <a-icon
              type="plus"
              v-show={node.data.status == 1}
              on-click={() => this.append(node, data)}
              style="margin-right:10px;"
            />
            <a-icon
              type="form"
              class="articleEditIcon"
              v-show={node.data.status == 1}
              on-click={() => this.edit(data, node)}
              style="margin-right:10px;"
            />
            <a-icon
              type="delete"
              on-click={() => this.remove(node, data)}
              v-show={node.childNodes.length == 0}
            />
            <a-tag
              size="large"
              class="treeStatus"
              on-click={() => this.status(node, data)}
              v-show={node.childNodes.length == 0}
              color={node.data.status === 1 ? "red" : "green"}
            >
              {node.data.status === 1 ? "停用" : "启用"}
            </a-tag>
          </span>
        </div>
      );
    },
    // 转化为中文
    SectionToChinese(section) {
      var strIns = "",
        chnStr = "";
      var unitPos = 0;
      var zero = true;
      while (section > 0) {
        var v = section % 10;
        if (v === 0) {
          if (!zero) {
            zero = true;
            chnStr = this.chnNumChar[v] + chnStr;
          }
        } else {
          zero = false;
          strIns = this.chnNumChar[v];
          // console.log(strIns);
          strIns += this.chnUnitChar[unitPos];
          chnStr = strIns + chnStr;
        }
        unitPos++;
        section = Math.floor(section / 10);
      }
      return chnStr;
    },
    // 数字转化为中文
    NumberToChinese(num) {
      var unitPos = 0;
      var strIns = "",
        chnStr = "";
      var needZero = false;

      if (num === 0) {
        return this.chnNumChar[0];
      }

      while (num > 0) {
        var section = num % 10000;
        if (needZero) {
          chnStr = this.chnNumChar[0] + chnStr;
        }
        strIns = this.SectionToChinese(section);
        strIns +=
          section !== 0 ? this.chnUnitSection[unitPos] : this.chnUnitSection[0];
        chnStr = strIns + chnStr;
        // console.log(strIns, chnStr);
        needZero = section < 1000 && section > 0;
        num = Math.floor(num / 10000);
        unitPos++;
      }
      return chnStr;
    },
    color(num) {
      switch (num) {
        case 1:
          return "#FF9999";
          break;
        case 2:
          return "#FFCC99";
          break;
        case 3:
          return "#FFFF99";
          break;
        case 4:
          return "#CCFF99";
          break;
        case 5:
          return "#99FF99";
          break;
        case 6:
          return "#99CCFF";
          break;
        case 7:
          return "#99FFCC";
          break;
        case 8:
          return "#5CFFFF";
          break;
        case 9:
          return "#1FFFFF";
          break;
        case 10:
          return "#FF99CC";
          break;
      }
    },
    levelText(num) {
      const text = this.NumberToChinese(num);
      return `${text}级`;
    },
    // 添加树模态框
    append(node, data) {
      // console.log(node.parent, data);
      // console.log(node.parent.data.length);
      // const newChild = { id: id++, value: "testtest", children: [] };
      // if (!data.children) {
      //   this.$set(data, "children", []);
      // }
      // data.children.push(newChild);
      // const parentValue =
      //   node.parent.data.length !== undefined
      //     ? node.parent.data[0].value
      //     : node.parent.data.value;
      // const parentId =
      //   node.parent.data.length !== undefined
      //     ? node.parent.data[0].id
      //     : node.parent.data.id;
      this.addTreeFormVisible = true;
      this.addtreeFields = Object.assign({}, this.addtreeFields, {
        pid: data.value,
        id: data.id
      });
      // this.$set(this.addtreeFields, "pid", data.value);
      // this.$set(this.addtreeFields, "id", data.id);
      // this.addTreeFormVisible = true;
    },
    // 弹出修改tree模态框
    edit(data, node) {
      console.log(node.parent, data);
      const parentValue =
        node.parent.data.length !== undefined
          ? node.parent.data[0].value
          : node.parent.data.value;
      const parentId =
        node.parent.data.length !== undefined
          ? node.parent.data[0].id
          : node.parent.data.id;
      this.editTreeFields = data;
          this.editTreeFields.parentId = this.topId

      this.$set(this.editTreeFields, "pid", parentValue);
      this.editTreeFormVisible = true;
      this.editId = data.id;
    },
    // 启用/禁用
    status(node, data) {
      // console.log(node, data.status, data.id);
      let params = data.status == 1 ? 2 : 1;
      let text = data.status == 1 ? "停用" : "启用";
      let that = this;
      this.$confirm({
        title: `确定${text}此节点吗?`,
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          BaseServiceApi.postApi(`/v1/dict/status/${data.id}`, {
            status: params
          }).then(res => {
            if (res.ret === 0) {
              if (data.status == 1) {
                that.$message.success("停用成功");
                that.getTreeData(that.current);
              } else {
                that.$message.success("启用成功");
                that.getTreeData(that.current);
              }
            } else {
              that.$message.error(res.msg);
            }
          });
        },
        onCancel() {
          return;
        }
      });
    },
    // 删除节点
    remove(node, data) {
      var that = this;
      // console.log(node, data);
      // const parent = node.parent;
      // const children = parent.data.children || parent.data;
      // const index = children.findIndex(d => d.id === data.id);
      // children.splice(index, 1);
      this.$confirm({
        title: "确定删除此节点吗?",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          BaseServiceApi.postApi(`/v1/dict/del/${node.data.id}`).then(res => {
            if (res.ret === 0) {
              that.$message.success("删除节点成功");
              that.getTreeData(that.current);
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
    // 切换左边导航
    choseItem(id, title) {
      this.current = id;
      this.treeTitle = title;
      // index改为uuid
      this.getTreeData(id);
      this.topId = id
    },
    // 获取tree数据
    getTreeData(id) {
      BaseServiceApi.getApi(`/v1/dict/list/${id}`).then(res => {
        if (res.ret === 0) {
          this.treeData = [];
          this.treeData = res.data;
          console.log(this.treeData)
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 添加节点
    handleAddTree(values) {
      // console.log(values);
      values.pid = this.addtreeFields.id;
      this.addTreeFormVisible = false;
      BaseServiceApi.postApi(`/v1/dict/add/${values.pid}`, values).then(res => {
        if (res.ret === 0) {
          this.$message.success("添加子节点成功");
          this.getTreeData(this.current);
          this.isAllExpand = false
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 关闭节点弹窗
    closeAddTree() {
      this.addTreeFormVisible = false;
    },
    // 修改节点
    handleEditTree(values) {
      this.editTreeFormVisible = false;
      delete values.pid;
      values.id = this.editId;
      BaseServiceApi.postApi(`/v1/dict/edit/${this.editId}`, values).then(
        res => {
          if (res.ret === 0) {
            this.$message.success("修改节点成功");
            this.getTreeData(this.current);
          } else {
            this.$message.error(res.msg);
          }
        }
      );
    },
    // 关闭修改树
    closeEditTree() {
      this.editTreeFormVisible = false;
    },
    // 搜索
    handleSearch(e) {
      const value = e.target.value;
      if (value !== "") {
        BaseServiceApi.getApi(`/v1/dict/find`, { value: value }).then(res => {
          if (res.ret === 0) {
            this.lists = [];
            res.data[0].forEach(v => {
              this.lists.push({
                title: v.value,
                id: v.id,
                key: v.key
              });
            });
            this.current = this.lists[0].id;
            this.getTreeData(this.current);
          } else {
            this.$message.error(res.msg);
          }
        });
      } else {
        this.getParentTree();
      }
    },
    // 获取父节点树
    getParentTree() {
      BaseServiceApi.getApi(`/v1/dict/list`).then(res => {
        if (res.ret === 0) {
          this.lists = [];
          res.data.forEach(v => {
            this.lists.push({
              title: v.value,
              id: v.id,
              key: v.key
            });
          });
          this.current = this.lists[0].id;
          this.getTreeData(this.current);
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  },
  mounted() {
    this.getParentTree();
  }
};
</script>

<style lang="scss">
.tree_wrap {
  height: calc(100vh - 65px);
  margin: 20px 0 0 20px;
  .tree_list {
    border: 1px solid #ddd;
    height: calc(100vh - 65px);
    background-color: #fff;
    border-radius: 0.125rem;
    border-top: none;
    .ant-input {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-left: none;
      border-right: none;
    }
  }
  .listItem {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
    cursor: pointer;
  }
  .active {
    background-color: #3399ff;
    color: #fff;
  }
  .tree {
    height: calc(100vh - 65px);
    overflow: scroll;
    background-color: #fff;
    margin-left: 30px;
    border-radius: 0.125rem;
    border: 1px solid #ddd;
    padding: 10px;
    .treeTitle {
      font-size: 16px;
      text-align: left;
    }
  }
  .treeStatus {
    width: 64px;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    text-align: center;
    vertical-align: bottom;
    margin-left: 10px;
  }.el-tree-node__content {
  height: 50px;
  border-bottom: 1px solid #ddd;
  // padding-right: 10px;
}
.treeitem {
  width: 96%;
}
.custom-tree-node {
  float: right;
  // padding-right: 10px;
}
.ant-tag-has-color {
  color: #8a8b8e;
  
}
.treeValue{
  width: calc(100% - 50px);
  // border: 1px solid;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
}
}


</style>
