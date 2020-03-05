import Vue from 'vue'
import Router from 'vue-router'

const Index = () =>
    import ( /* webpackChunkName: "ERP" */ './views/Index.vue')
const Login = () =>
    import ( /* webpackChunkName: "Login" */ './views/Login.vue')
const BasicContent = () =>
    import ( /* webpackChunkName: "BasicContent" */ './views/basicModel/basic_content.vue')
    // const PersonalCenter = () => import( /* webpackChunkName: "PersonalCenter" */ './views/personalCenter.vue')
    // const ChangeName = () => import( /* webpackChunkName: "ChangeName" */ './views/changeName.vue')
    // const ChangePwd = () => import( /* webpackChunkName: "ChangePwd" */ './views/changePwd.vue')
const itemConfig = () =>
    import ( /* webpackChunkName: "itemConfig" */ './views/itemConfig.vue')
const itemTab = () =>
    import ( /* webpackChunkName: "itemtab" */ './views/itemTab.vue')
const Tree = () =>
    import ( /* webpackChunkName: "tree" */ './views/tree.vue')

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: '/admin',
    routes: [{
            path: '/',
            name: 'index',
            component: Index,
            redirect: '/manage/list/user',
            meta: {
                title: '首页',
                checkLogin: true,
            },
            children: [{
                    path: '/:lead/:sublead/:model',
                    name: 'BasicContent',
                    component: BasicContent,
                    props: true,
                    meta: {
                        checkLogin: true,
                    },
                    children: [{
                            path: '/manage/item/itemconfig',
                            name: 'itemconfig',
                            component: itemConfig,
                            meta: {
                                checkLogin: true,
                            },
                        }, {
                            path: '/manage/item/itemtab',
                            name: 'itemtab',
                            component: itemTab,
                            meta: {
                                checkLogin: true,
                            },
                        },
                        // {
                        //   path: '/admin/personalCenter',
                        //   name: 'personalCenter',
                        //   component: PersonalCenter,
                        //   meta: {
                        //     checkLogin: true,
                        //   },
                        // }, {
                        //   path: '/admin/changeName',
                        //   name: 'changeName',
                        //   component: ChangeName,
                        //   meta: {
                        //     checkLogin: true,
                        //   },
                        // }, {
                        //   path: '/admin/changePwd',
                        //   name: 'changePwd',
                        //   component: ChangePwd,
                        //   meta: {
                        //     checkLogin: true,
                        //   },
                        // }
                    ]
                }, {
                    path: '/manage/dictionary',
                    name: 'tree',
                    component: Tree,
                    meta: {
                        checkLogin: true,
                    },
                },
                // {
                //     path: '/manage/group',
                //     name: 'group',
                //     component: group,
                //     meta: {
                //         checkLogin: true,
                //     },

                // },
                // {
                //   path: '/erp/EditTable',
                //   component: EditTable,
                // },

            ]
        },
        {
            path: '/login',
            component: Login,
            meta: {
                title: '登录',
                checkLogin: false,
            }
        },
    ]
})