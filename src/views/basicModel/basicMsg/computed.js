/*
 * @Description: 一级模块需要监听的数据文件
 * @Author: sdt
 * @Date: 2019-07-10 11:05:45
 * @LastEditTime: 2019-09-20 16:15:30
 * @LastEditors: Please set LastEditors
 */

export default {
    computed: {
        theads() {
            return this.models.theads
        },
        props() {
            return this.models.props
        },
        key(){
            return this.models.key
        },
        width() {
            return this.models.width
        },
        searchComponent() {
            return this.models.searchComponent
        },
        typeComponent() {
            return this.models.typeComponent
        },
        tableOperation() {
            return this.models.tableOperation
        },
        submitComponent() {
            return this.models.submitComponent
        },
        addComponent() {
            return this.models.addComponent
        },
        newComponent() {
            return this.models.newComponent
        },
        exportComponent() {
            return this.models.exportComponent
        },
        fixed() {
            return this.models.fixed
        },
        newUserForm(){
            return this.models.newUserForm
        },
        editUserForm(){
            return this.models.editUserForm
        },
        authForm(){
            return this.models.authForm
        },
        editUserFields(){
            return this.modes.editUserFields
        }
    }
}