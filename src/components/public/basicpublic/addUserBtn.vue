<!--
 * @Description: 创建用户按钮
 * @Author: sdt
 * @Date: 2019-09-16 10:39:18
 * @LastEditTime: 2019-09-24 15:00:05
 * @LastEditors: Please set LastEditors
 -->


<template>
  <el-button type="success" size="small" @click="addUser" style="font-size:14px;">创建用户</el-button>
</template>
<script>
export default {
  name: "createUser",
  methods: {
    addUser() {
      this.$emit("addUser");
    }
  }
};
</script>
<style lang="scss">
</style>
