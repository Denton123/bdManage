/*
 * @Description: 一级模块数据
 * @Author: sdt
 * @Date: 2019-09-16 10:39:18
 * @LastEditTime: 2020-01-16 10:20:09
 * @LastEditors: Please set LastEditors
 */
import addUserBtn from '@/components/public/basicpublic/addUserBtn'
import {
    roleOption
} from '@/utils/utils'
// console.log(roleOption)
export default {
    // 超管列表
    // superuser: {
    //     tab: '超管列表',
    //     key: 'superuser',
    //     getUrl: 'adminUser/list',
    //     getDetUrl: 'adminUser/detail',
    //     statusUrl: 'adminUser/status',
    //     width: [100, 100, 100, 100, 100, 100],
    //     theads: ['序号', '操作', '账号', '用户名','角色', '用户状态'],
    //     props: ['serial', 'operate', 'account', 'name','type', 'status'],
    //     tableOperation: {
    //         rowSelection: false,
    //         operates: [{
    //                 title: '授权',
    //                 action: 'auth'
    //             },
    //             {
    //                 title: '编辑',
    //                 action: 'edit'
    //             }, {
    //                 title: '停用',
    //                 action: 'stop'
    //             }
    //         ]
    //     },
    //     searchComponent: [
    //         {
    //             type: 'text',
    //             placeholder: '账号',
    //             name: 'account'
    //         },
    //         {
    //             type: 'text',
    //             placeholder: '用户名',
    //             name: 'name'
    //         },
    //         {
    //             type: 'select',
    //             placeholder: '状态',
    //             name: 'status',
    //             options: [{
    //                 key: '1',
    //                 value: '正常',
    //             }, {
    //                 key: '2',
    //                 value: '停用'
    //             }]
    //         },
    //         {
    //             type: 'select',
    //             placeholder: '角色',
    //             name: 'type',
    //             options: [{
    //                 key: '1',
    //                 value: '超管',
    //             }, {
    //                 key: '2',
    //                 value: '普通管理员'
    //             }]
    //         },
    //     ],
    //     typeComponent: [{
    //         component: addUserBtn,
    //     }],
    //     authForm: {
    //         key: 'super',
    //         authFormTitle: '用户授权',
    //         authFormVisible: false,
    //         getAllRoleUrl: 'adminUser/role/list',
    //         getUserRoleUrl: 'adminUser/detail',
    //         postRole: 'adminUser/authority'
    //     },
    //     editUserFields: {}
    // },
    // 用户列表
    user: {
        tab: '用户列表',
        key: 'user',
        getUrl: 'user/list',
        getDetUrl: 'user/detail',
        statusUrl: 'user/status',
        width: [100, 100, 100, 100, 100, 100, 100, 100],
        theads: ['序号', '操作', '手机号', '姓名', '性别', '邮箱', '角色', '用户状态'],
        // props: ['serial', 'operate', 'phone', 'name', 'sex', 'email', 'role', 'status'],
        props: ['serial', 'operate', 'mobile', 'name', 'gender', 'email', 'role', 'status'],
        tableOperation: {
            rowSelection: false,
            operates: [{
                    title: '授权',
                    action: 'auth'
                },
                {
                    title: '编辑',
                    action: 'edit'
                }, {
                    title: '停用',
                    action: 'stop'
                }
            ]
        },
        searchComponent: [{
                type: 'text',
                placeholder: '手机号',
                name: 'mobile'
            }, {
                type: 'text',
                placeholder: '姓名',
                name: 'name'
            }, {
                type: 'text',
                placeholder: '邮箱',
                name: 'email'
            },
            {
                type: 'select',
                placeholder: '状态',
                name: 'status',
                options: [{
                    key: '1',
                    value: '正常',
                }, {
                    key: '2',
                    value: '停用'
                }]
            },
            {
                type: 'select',
                placeholder: '角色',
                name: 'uuid',
                options: roleOption
            },
        ],
        typeComponent: [{
            component: addUserBtn,
        }],
        authForm: {
            key: 'normal',
            authFormTitle: '用户授权',
            authFormVisible: false,
            getAllRoleUrl: 'user/role/allList',
            getUserRoleUrl: 'user/detail',
            postRole: 'user/authority'
        },
        editUserFields: {}
    },
}