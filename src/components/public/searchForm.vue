<!--
 * @Description: 基础模块搜索
 * @Author: sdt
 * @Date: 2019-07-10 13:40:08
 * @LastEditTime: 2019-09-27 11:01:52
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div id="search-form" v-if="searchComponent.length !== 0">
    <a-form :form="form" @submit="handleSearch" layout="inline" :class="{'user': isUser}">
      <a-form-item v-for="(item, index) in searchComponent" :key="index">
        <!-- 输入框 -->
        <a-input
          v-if="item.type=='text'"
          :placeholder="item.placeholder"
          v-decorator="[`${item.name}`]"
        />

        <!-- 下拉选择 -->
        <a-select
          v-else-if="item.type === 'select'"
          v-decorator="[`${item.name}`]"
          style="width:174px;"
          :placeholder="item.placeholder"
          :allowClear="true"
          @change="selectChange($event, item.name)"
        >
          <a-select-option
            v-for="(selectItem, index) in item.options"
            :key="index"
            :value="selectItem.key"
          >{{selectItem.value}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="margin-right:16px;">查询</a-button>
        <a-button @click="handleReset">重置</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "SearchForm",
  data() {
    return {
      form: this.$form.createForm(this),
      isUser: false,
      params: {}
    };
  },
  props: {
    searchComponent: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    // 查询操作
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.params = values
          this.$emit("handleSearch", values);
        }
      });
    },
    // 重置
    handleReset() {
      this.form.resetFields();
      this.$emit("handleReset");
    },
    // 清空select之后
    selectChange(e, name) {
      if (e == undefined) {
        this.params[`${name}`] = undefined
        this.$parent.getData(this.params)
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.isUser = route.params.model == "user" ? true : false;
        this.form.resetFields();
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.user {
  width: 600px;
}
</style>


