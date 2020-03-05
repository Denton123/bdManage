import BaseService from "@/services/BaseService";
const BaseServiceApi = new BaseService();
let roleOption = []
// 获取所有角色option
function getOptions() {
  BaseServiceApi.getApi(`/v1/user/role/allList`).then(res => {
    if (res.ret === 0) {
      res.data.forEach(v => {
        roleOption.push({
          key: v.uuid,
          value: v.name
        })
      })
    }
  });
  //   roleOption = [{
  //     key: '1',
  //     value: '超管',
  // }, {
  //     key: '2',
  //     value: '普通管理员'
  // }]
}
getOptions()
export {
  roleOption
}