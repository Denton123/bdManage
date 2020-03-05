<template>
    <div>
        <div class="side_logo">
            <img src="../../assets/header_logo.png" alt />
            <h1>后台管理系统</h1>
        </div>
        <div style="text-align:left;">
            <a-menu mode="inline" theme="dark" :defaultSelectedKeys="defaultKey" :openKeys.sync="openKeys">
                <template v-for="subItem in menuItems">
                    <a-sub-menu v-if="subItem.hasOwnProperty('items')" :key="subItem.subKey">
                        <span slot="title">
                            <a-icon :type="subItem.icon" />
                            <span>{{subItem.subTitle}}</span>
                        </span>
                        <template>
                            <a-menu-item v-for="item in subItem.items" :key="item.key">
                                <router-link :to="item.path">
                                    <div>{{item.name}}</div>
                                </router-link>
                            </a-menu-item>
                        </template>
</a-sub-menu>
<a-menu-item :key="subItem.subKey" v-else>
    <router-link :to="subItem.path">
        <a-icon :type="subItem.icon" />
        <span>{{subItem.subTitle}}</span>
    </router-link>
</a-menu-item>
</template>
</a-menu>
</div>
</div>
</template>

<script>
    import auth from "@/auth";
    export default {
        props: ["collapsed"],
        data() {
            return {
                defaultKey: [],
                openKeys: [],
                menuItems: [
                    // {
                    //   subTitle: "超管列表",
                    //   subKey: "superuser",
                    //   path: "/manage/list/superuser",
                    //   icon: "user"
                    // },
                     {
                        subTitle: "用户列表",
                        subKey: "user",
                        path: "/manage/list/user",
                        icon: "team"
                    }, {
                        subTitle: "项目配置",
                        subKey: "itemconfig",
                        path: "/manage/item/itemconfig",
                        icon: "profile"
                    }, {
                        subTitle: "基本信息",
                        subKey: "dictionary",
                        icon: "branches",
                        items: [{
                            key: "dictionary",
                            name: "数据字典",
                            path: "/manage/dictionary"
                        }]
                    }
                ]
            };
        },
        methods: {},
        mounted: function() {
            if (auth.getLoginSession().type === "2") {
                this.menuItems.splice(0, 1);
            }
            let flag = this.$route.path.split("/");
            this.defaultKey.push(flag[flag.length - 1]);
            if (flag[flag.length - 1] == "dictionary") {
                this.openKeys.push("dictionary");
            } else {
                this.openKeys = [];
            }
        },
        watch: {
            $route(v) {
                this.defaultKey = [];
                let flag = this.$route.path.split("/");
                this.defaultKey.push(flag[flag.length - 1]);
                // console.log(this.defaultKey);
                if (flag[flag.length - 1] == "dictionary") {
                    this.openKeys.push("dictionary");
                } else {
                    this.openKeys = [];
                }
            }
        }
    };
</script>

<style>
    .ant-menu-inline .ant-menu-submenu-title {
        color: rgba(255, 255, 255, 0.65);
        font-weight: 500;
        font-size: 16px;
    }
    
    .ant-menu-item-group-title {
        color: rgba(255, 255, 255, 0.65);
        font-size: 14px;
        font-weight: 500;
    }
    
    .side_logo img {
        width: 100px;
        height: 80px;
    }
    
    .side_logo h1 {
        font-size: 20px;
        font-weight: 600;
        color: #fff;
    }
</style>