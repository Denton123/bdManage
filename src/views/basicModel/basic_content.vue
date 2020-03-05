<!--
 * @Description: 一级页面中间模块架构
 * @Author: sdt
 * @Date: 2019-07-10 10:18:11
 * @LastEditTime: 2019-11-13 17:55:02
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div class="basic_content">
    <basic-model :models="mds()" />
  </div>
</template>

<script>
import BasicModel from "./basic_model";
import msg from "./basicMsg/message";
export default {
  name: "BasicContent",
  data() {
    let modelObj = {};
    Object.assign(modelObj, msg);
    return {
      models: modelObj
    };
  },
  components: {
    BasicModel
  },
  methods: {
    mds() {
      let type = this.$route.params.model;
      return this.models[type];
    }
  },
  mounted() {
    window.document.title = "后台管理系统";
  }
};
</script>

<style lang="scss" scoped>
.basic_content {
  height: calc(100vh - 85px);
  // margin: 20px;
  background-color: #ffffff;
  overflow: auto;
  padding-bottom: 100px;
  margin: 20px 0 0 20px;
}
</style>




