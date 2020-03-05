<!--
 * @Description: 项目tab
 * @Author: sdt
 * @Date: 2019-09-17 16:09:32
 * @LastEditTime: 2020-02-17 11:13:16
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="itemTab">
    <a-tabs class="tabs" @tabClick="handleTab" v-model="tabKey">
      <a-tab-pane tab="产品销售信息" key="product">
        <!-- 新增/编辑信息 -->
        <div class="addInfo">
          <add-project v-if="isShowAdd == 'add'" @addProject="addProject" />
          <!-- 产品信息 -->
          <div class="articles_detail" v-else-if="isShowAdd == 'detail'">
            <a-row v-for="(value, key) in detailLabel" :key="key" class="listItem">
              <a-col :span="4" style="text-align:right">
                <div>
                  {{value}}
                  <span class="required">*</span>：
                </div>
              </a-col>
              <a-col :span="20" class="desc_item">
                <span class="desc_pic" v-if="key=='pic'" @click="handlePreview(detailData[key])">
                  <img :src="detailData[key]" />
                </span>
                <p
                  v-else-if="key == 'status'"
                  :style="{ 'color': detailData[key] == 1 ? '#52c41a ': '#f5222d' }"
                >{{detailData[key] == 1 ? '启用' : '停用'}}</p>
                <p v-else>{{detailData[key] ?detailData[key] : '' }}</p>
              </a-col>
            </a-row>
            <div style="height: 60px;padding-top:20px;">
              <a-tag
                :color="detailData.status == 1 ? 'red' : 'green'"
                class="project_tag"
                size="large"
                type="primary"
                style="margin-left:10px;"
                @click="changeStatus(detailData.status)"
              >{{detailData.status == 1 ? '下架' : '上架'}}</a-tag>
              <a-button type="primary" @click="toEdit">修改</a-button>
            </div>
            <div></div>
          </div>
          <edit-project v-else :editProjectfields="editProjectfields" @editProject="editProject" />
        </div>
      </a-tab-pane>
      <a-tab-pane tab="搭配报告" :disabled="tabsdisabled" key="articles">
        <!-- 新增报告 -->
        <div class="addArticles">
          <div>
            <div>
              <span>已配置报告类型：</span>
              <a-icon type="plus-circle" style="cursor:pointer;" @click="addArticle" />
            </div>
            <!-- 报告列表 -->
            <a-list
              itemLayout="vertical"
              size="large"
              :dataSource="articlesList"
              class="artilesList"
              :pagination="listTotal !== 0 ?{total: listTotal, onChange:listPageChange, showSizeChanger:true, showQuickJumper:true,onShowSizeChange:listPageSizeChange, pageSize: listPageSize} : null"
            >
              <a-list-item slot="renderItem" slot-scope="item, index" key="item.title">
                <template slot="actions" v-for="(value, key) in artDetailLabel">
                  <span :key="key">
                    <span>{{value}}：</span>
                    <span
                      v-if="key=='status'"
                      :style="{ 'color': item[key] == 1 ? '#52c41a ': '#f5222d' }"
                    >{{item[key] == '1' ? '启用': '停用'}}</span>
                    <span v-else>{{item[key]}}</span>
                  </span>
                </template>
                <span slot="extra" style="display:inline-block;margin-right:10px;">
                  <span class="article_detail_pic" @click="handlePreview(item.fgPic)">
                    <img alt="logo" :src="item.fgPic" />
                  </span>
                  <span style="display:block;text-align:center;">前景图</span>
                </span>
                <span slot="extra" style="display:inline-block">
                  <span class="article_detail_pic" @click="handlePreview(item.bgPic)">
                    <img alt="logo" :src="item.bgPic" width="128" />
                  </span>
                  <span style="display:block;text-align:center;">背景图</span>
                </span>
                <a-list-item-meta :description="item.brif">
                  <span slot="title">
                    <span class="artile_detail_name">{{item.name}}</span>
                    <a-tag
                      :color="item.status == 1 ? 'red' : 'green'"
                      class="project_tag"
                      size="large"
                      type="primary"
                      style="margin-left:30px;margin-right:0;"
                      @click="changeArticleStatus(item.status, item.uuid)"
                    >{{item.status == 1 ? '下架' : '上架'}}</a-tag>
                    <a-button type="primary" @click="editArticle(item.uuid)" slot="actions">修改</a-button>
                    <a-button type="primary" @click="handleDelete(item.uuid)" slot="actions">删除</a-button>

                    <!-- <a-icon
                      type="form"
                      @click="editArticle(item.uuid)"
                      class="articleEditIcon"
                      slot="actions"
                    />-->
                    <!-- <a-icon
                      type="close"
                      class="articleEditIcon"
                      @click="handleDelete(item.uuid)"
                      slot="actions"
                    />-->
                  </span>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
          <add-article
            :addFormVisible="addFormVisible"
            @handleAddArticle="handleAddArticle"
            @closeAddArticle="closeAddArticle"
          />
          <edit-article
            :editFormVisible="editFormVisible"
            @handleEditArticle="handleEditArticle"
            @closeEditArticle="closeEditArticle"
            :editArticlefields="editArticlefields"
          />
        </div>
      </a-tab-pane>
      <a-tab-pane tab="产品报告信息" :disabled="tabsdisabled" key="report">
        <!-- 新增报告信息 -->
        <div class="addInfo">
          <editReport
            @editReport="editReport"
            :editReportFields="editReportFields"
            v-if="isShowAdd == 'add'"
          />
          <!-- 产品信息 -->
          <div class="articles_detail" v-else>
            <a-row v-for="(value, key) in reportLabel" :key="key" class="listItem">
              <a-col :span="4" style="text-align:right">
                <div>
                  {{value}}
                  ：
                </div>
              </a-col>
              <a-col :span="20" class="desc_item">
                <p>{{reportData[key] ?reportData[key] : '' }}</p>
              </a-col>
            </a-row>
            <div style="height: 60px;padding-top:20px;">
              <a-button type="primary" @click="toReportEdit">修改</a-button>
            </div>
            <div></div>
          </div>
          <!-- <edit-project v-else :editProjectfields="editProjectfields" @editProject="editProject" /> -->
        </div>
      </a-tab-pane>
    </a-tabs>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import BaseService from "@/services/BaseService";
const BaseServiceApi = new BaseService();

import addArticle from "@/components/public/addArticleForm";
import editArticle from "@/components/public/editArticleForm";
import editProject from "@/components/public/editProjectForm";
import addProject from "@/components/public/addProjectForm";
import editReport from "@/components/public/editReport";

export default {
  name: "itemTab",
  data() {
    return {
      isShowOpe: true,
      isShowAdd: true,
      addFormVisible: false,
      editFormVisible: false,
      tabsdisabled: false,
      editArticlefields: {
        name: "基因报告"
      },
      previewVisible: false,
      previewImage: "",
      // 报告数据
      articlesList: [
        // {
        //   title: "报告篇",
        //   key: "1",
        //   fgPic: require("../assets/articles1.png"),
        //   bgPic: require("../assets/articles1.png"),
        //   brif:
        //     "描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述",
        //   seq: 1,
        //   status: 1
        // },
        // {
        //   title: "结果篇",
        //   key: "2",
        //   fgPic: require("../assets/articles1.png"),
        //   bgPic: require("../assets/articles1.png"),
        //   brif:
        //     "描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述",
        //   seq: 1,
        //   status: 1
        // }
      ],
      artDetailLabel: {
        seq: "排序",
        status: "状态"
      },
      itemVisible: true,
      isShow: 0,
      tabKey: "",
      detailLabel: {
        name: "产品名称",
        orgPrice: "产品价格",
        price: "产品折扣价格",
        brief: "产品描述",
        status: "产品状态",
        pic: "产品图片"
      },
      reportLabel: {
        deteMethod: "检测方法",
        deteRange: "检测范围",
        reportDesc: "报告说明"
      },
      detailData: {
        name: "KRA",
        orgPrice: "1800元",
        price: "2300元",
        brief: "产品折扣价格产品折扣价格产品折扣价格产品折扣价格产品折扣价格",
        pic: require("../assets/addItem.png"),
        status: 1
      },
      editId: "",
      editArticleId: "",
      editProjectfields: {
        // name: "项目1",
        // pic: require("../assets/addItem.png")
      },
      addId: "",
      // 报告list的分页
      listTotal: 0,
      listPageSize: 10,
      reportData: {
        deteMethod: "hhh",
        deteRange: "efji",
        reportDesc: "ehuh"
      },
      editReportFields: {
      },
      reportId: ''
    };
  },
  components: {
    addArticle,
    editArticle,
    editProject,
    addProject,
    editReport
  },
  methods: {
    toReportEdit(){
      // let id = this.$route.params.id;
      this.isShowAdd = "add";
      this.tabKey = 'report'
      this.getReportData()
    },
    getReportData() {
      let id = this.reportId !== '' ?  this.reportId : this.$route.params.id
      BaseServiceApi.getApi(`/v1/project/base/detail/${id}`).then(res => {
        if (res.ret === 0) {
          this.reportData = res.data;
          this.editReportFields =res.data
          // this.detailData["status"] = res.data.status == "1" ? "启用" : "停用";
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    editReport(values) {
      let id = this.reportId !== '' ?  this.reportId : this.$route.params.id
      // var formData = new FormData();
      // for (let i in values) {
      //   formData.append(i, values[i]);
      // }
      BaseServiceApi.postApi(`/v1/project/base/edit/${id}`, values).then(
        res => {
          if (res.ret === 0) {
            this.$message.success(res.msg);
            console.log(this.$route.params.id)
            if (this.$route.params.id) {
              this.isShowAdd = 'detail'
              this.getReportData()
            } else {
              setTimeout(() => {
                this.$router.push('/manage/item/itemconfig')
              }, 1000)
            }
          } else {
            this.$message.error(res.msg);
          }
        }
      );
    },
    // 报告分页切换
    listPageChange(page, pageSize) {
      // console.log(page, pageSize);
      this.getArticleData({ page: page, pageSize: pageSize });
    },
    // 报告页数切换
    listPageSizeChange(current, pageSize) {
      // console.log(current, pageSize);
      this.getArticleData({ page: current, pageSize: pageSize });
      this.listPageSize = pageSize;
    },
    handleSubmit() {},
    // 编辑报告
    editArticle(id) {
      // console.log(id, "编辑报告");
      this.editArticleId = id;
      this.editFormVisible = true;
      // 真正数据的id转为uuid
      BaseServiceApi.getApi(`/v1/project/report/detail/${id}`).then(res => {
        if (res.ret === 0) {
          this.editArticlefields = res.data;
          // this.detailData["status"] = res.data.status == "1" ? "启用" : "停用";
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    addArticle() {
      this.addFormVisible = true;
    },
    // 提交新增报告
    handleAddArticle(params) {
      // console.log(params);
      // console.log(this.addId, "addid");
      let uuid = this.editId == undefined ? this.addId : this.editId;
      var formData = new FormData();
      for (let i in params) {
        formData.append(i, params[i]);
      }
      // console.log(formData);
      BaseServiceApi.postApi(`/v1/project/report/add/${uuid}`, formData).then(
        res => {
          if (res.ret === 0) {
            this.$message.success("新增报告成功");
            this.getArticleData();
          } else {
            this.$message.error(res.msg);
          }
        }
      );
      this.addFormVisible = false;
    },
    // 关闭新增报告弹出框
    closeAddArticle() {
      this.addFormVisible = false;
    },
    // 提交修改报告弹出框
    handleEditArticle(params) {
      if (!params["fgPic"].size) {
        delete params.fgPic;
      }
      if (!params["bgPic"].size) {
        delete params.bgPic;
      }
      var formData = new FormData();
      for (let i in params) {
        formData.append(i, params[i]);
      }
      BaseServiceApi.postApi(
        `/v1/project/report/edit/${this.editArticleId}`,
        formData
      ).then(res => {
        if (res.ret === 0) {
          this.$message.success("修改报告成功");
          this.editFormVisible = false;
          this.getArticleData();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 关闭修改报告弹出框
    closeEditArticle() {
      this.editFormVisible = false;
    },
    // 删除报告
    handleDelete(id) {
      let that = this;
      this.$confirm({
        title: "确定删除此报告吗？",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          BaseServiceApi.postApi(`/v1/project/report/del/${id}`).then(res => {
            if (res.ret === 0) {
              that.$message.success("删除报告成功");
              that.getArticleData();
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
    // 点击tab
    handleTab(tab) {
      // this.$router.push(`/manage/item/itemtab?type=${tab}`);
      this.tabKey = tab;
      // console.log(this.editId, "编辑id");
      if (this.editId && this.tabKey == "articles") {
        this.getArticleData();
      } else if (this.editId && this.tabKey == "product") {
        this.getProjectDet();
      } else if (this.tabKey == "report") {
        // console.log(this.reportId, 'this.reportId')
        // console.log(this.$route, 'this.route')
        this.getReportData();
      }
      // console.log(tab, this.$route.params.id)
    },
    // 修改项目
    toEdit() {
      let id = this.$route.params.id;
      this.tabKey = "product";
      this.isShowAdd = "edit";
      this.editId = id;
      // console.log(this.editId, "editId", this.$route);
      // this.$router.push("/manage/item/itemtab");
      // this.tabKey = 'product'
    },
    // 新增项目表单
    addProject(params) {
      var formData = new FormData();
      for (let i in params) {
        formData.append(i, params[i]);
      }
      BaseServiceApi.postApi(`/v1/project/add`, formData).then(res => {
        if (res.ret === 0) {
          this.addId = res.data.uuid;
          this.$message.success(res.msg);
          this.tabsdisabled = false;
          this.tabKey = "articles";
          this.reportId = res.data.uuid
        } else {
          this.$message.error(res.msg);
        }
      });
      //  this.tabsdisabled = false;
          // this.tabKey = "articles";
      console.log(this.tabsdisabled, this.$route, this.isShowAdd);
    },
    // 编辑项目
    editProject(params) {
      var formData = new FormData();
      if (!params["pic"].size) {
        delete params.pic;
      }
      for (let i in params) {
        formData.append(i, params[i]);
      }
      BaseServiceApi.postApi(`/v1/project/edit/${this.editId}`, formData).then(
        res => {
          if (res.ret === 0) {
            this.$message.success("编辑项目成功");
            setTimeout(() => {
              this.isShowAdd = "detail";
              this.getProjectDet();
            }, 1000);
          } else {
            this.$message.error(res.msg);
          }
        }
      );
    },
    // 获取项目详情
    getProjectDet() {
      let uuid = this.$route.params.id;
      BaseServiceApi.getApi(`/v1/project/detail/${uuid}`).then(res => {
        if (res.ret === 0) {
          this.detailData = res.data;
          // this.detailData["status"] = res.data.status == "1" ? "启用" : "停用";
          this.editProjectfields = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 修改用户状态
    changeStatus(status) {
      // console.log(status);
      let params = status == 1 ? 2 : 1;
      let text = status == 1 ? "下架" : "上架";
      let that = this;
      this.$confirm({
        title: `确定${text}此产品吗?`,
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          BaseServiceApi.postApi(`/v1/project/status/${that.editId}`, {
            status: params
          }).then(res => {
            if (res.ret === 0) {
              if (status == 1) {
                that.$message.success("停用成功");
                that.getProjectDet();
              } else {
                that.$message.success("启用成功");
                that.getProjectDet();
              }
              that.getProjectDet();
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
    changeArticleStatus(status, id) {
      let params = status == 1 ? 2 : 1;
      let text = status == 1 ? "下架" : "上架";
      let that = this;
      this.$confirm({
        title: `确定${text}此报告吗?`,
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          BaseServiceApi.postApi(`/v1/project/report/status/${id}`, {
            status: params
          }).then(res => {
            if (res.ret === 0) {
              if (status == 1) {
                that.$message.success("下架成功");
                that.getArticleData();
              } else {
                that.$message.success("上架成功");
                that.getArticleData();
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
    // 获取报告数据
    getArticleData(params = {}) {
      let uuid = this.editId == undefined ? this.addId : this.editId;
      BaseServiceApi.getApi(`/v1/project/report/list/${uuid}`, params).then(
        res => {
          if (res.ret === 0) {
            // console.log(res.data);
            this.articlesList = res.data.list;
            this.listTotal = res.data.total;
          } else {
            this.$message.error(res.msg);
          }
        }
      );
    },
    // 预览
    handlePreview(img) {
      this.previewVisible = true;
      this.previewImage = img;
    },
    handleCancel() {
      this.previewVisible = false;
    }
  },
  mounted() {
    this.editId = this.$route.params.id;
    // console.log(this.$route);
    if (this.editId && this.tabKey == "product") {
      this.getProjectDet();
    }
    // console.log(this.editId, "editID", this.$route);
  },
  watch: {
    $route: {
      immediate: true,
      handler: function(v) {
        console.log(v);
        this.isShowAdd =
          v.params.flag == "add"
            ? "add"
            : v.params.flag == "detail"
            ? "detail"
            : "edit";
        this.tabsdisabled = this.$route.params.flag == "add" ? true : false;
        console.log(this.tabsdisabled);
        this.tabKey = this.$route.params.type;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.form {
  width: 80%;
  padding-left: 50px;
}
.itemTab {
  padding: 30px;
}
.tabs {
  text-align: left;
}
.upload {
  width: 128px;
  height: 128px;
  text-align: center;
  vertical-align: middle;
  background-color: #fafafa;
  border: 1px dashed #d9d9d9;
}

.upload i {
  margin-top: 24px;
  font-size: 32px;
  color: #999;
}

.upload .ant-upload-text {
  // margin-top: 8px;
  color: #666;
}
.upload img {
  width: 100%;
}
.tipicon {
  cursor: pointer;
  color: #1890ff;
  margin-left: 10px;
}
.nextBtn {
  float: right;
}
.artilesList {
  width: 900px;
  font-weight: 600;
  margin-left: 50px;
  margin-top: 15px;
  // .list_pic{
  //   width: 128px;
  //   height: 140px;
  //   display: inline-block;
  //   position: relative;
  //   .list_pic_mask{
  //     width: 100%;
  //     height: 100%;
  //     position: absolute;
  //     left: 0;
  //     top: 0;
  //     background-color: rgba(0, 0, 0, 0.4);
  //     z-index: 999;
  //     text-align: center;
  //     line-height: 200px;
  //   }
  // }
}
.article_detail_pic {
  width: 128px;
  height: 140px;
  display: inline-block;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
}
.articleItem {
  margin-bottom: 10px;
  width: 300px;
  // display: inline-block;
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  border-radius: 4px;
  padding: 10px;
}
.articleEditIcon {
  cursor: pointer;
  // font-size: 18px;
  margin-left: 15px;
  color: #1890ff;
}
.required {
  color: red;
}
.articles_detail {
  // border: 1px solid;
  width: 900px;
  // padding-top: 50px;
}
.listItem {
  margin-bottom: 15px;
}
.desc_item {
  padding-left: 10px;
  font-weight: 700;
  .desc_pic {
    width: 200px;
    height: 200px;
    display: inline-block;
    position: relative;
    border-radius: 3px;
    cursor: pointer;
    // .desc_pic_mask {
    //   width: 100%;
    //   height: 100%;
    //   position: absolute;
    //   left: 0;
    //   top: 0;
    //   background-color: rgba(0, 0, 0, 0.4);
    //   z-index: 999;
    //   text-align: center;
    //   line-height: 200px;
    //   cursor: pointer;
    //   border-radius: 3px;
    //   display: none;
    //   .pic_mask_icon {
    //     font-size: 32px;
    //     color: #fff;
    //   }
    // }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
// .desc_pic:hover {
//   .desc_pic_mask {
//     display: block;
//   }
// }
.project_tag {
  width: 64px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  text-align: center;
}
.ant-list-item-meta-content {
  margin-bottom: 30px;
}
.ant-list-item-meta-title > a:hover {
  color: rgba(0, 0, 0, 0.65);
}
.artile_detail_name {
  display: inline-block;
  width: 310px;
}
</style>