// 手机验证

export let phone = (rule, value, callback) => {
    if (value !== '' && value !== null && value !== undefined) {
        let bol = (value.length === 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value)) || (value.length === 12 && /^(([0+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(value))
        if (!bol) {
            callback(new Error('请输入正确的联系方式'))
        } else {
            callback()
        }
    }
}

// 邮箱验证
export let email = (rule, value, callback) => {
    if (value !== '' && value !== null && value !== undefined) {
        let bol = (value.length < 32 && /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value))
        if (!bol) {
            callback(new Error('请输入正确的邮件地址'))
        } else {
            callback()
        }
    }
}

// 姓名长度检验
export let name = (rule, value, callback) => {
    if (value !== '' && value !== null && value !== undefined) {
        let bol = value.length < 10
        if (!bol) {
            callback(new Error('姓名长度不大于10个字符'))
        } else {
            callback()
        }
    }
}

// 姓名长度检验
export let comfirm = (rule, value, callback) => {
    // console.log(rule)
    const form = this.$form.createForm(this);
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
}