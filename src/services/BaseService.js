import axios from 'axios'
import auth from '../auth.js'
const Host = '/admin/api'
    // const Host = '/v1'
export default class BaseService {
    constructor() {
        this.Request = axios.create({
                withCredentials: true
            })
            // 拦截处理token不自动更新问题
        this.Request.interceptors.request.use(
                function(config) {
                    const role = localStorage.getItem('BD_ADMIN_ROLE')
                    config.headers.UserRole = role
                    config.headers.Host = 'http://dev.work.bdlifescience.com'
                    console.log(config)
                    return config
                },
                function(error) {
                    return Promise.reject(error)
                }
            )
            // 拦截response
        this.Request.interceptors.response.use(
            function(config) {
                if (config.data.msg == '请先登录') {
                    auth.logout()
                    let loginUrl = "";
                    loginUrl =
                        window.location.href.indexOf("dev") !== -1 ?
                        "http://dev.work.bdlifescience.com" :
                        window.location.href.indexOf("test") !== -1 ?
                        "http://test.work.bdlifescience.com" :
                        "http://work.bdlifescience.com";
                    window.location.href = `${loginUrl}/login`
                }
                return config
            },
            function(config) {
                return config
            }
        )
    }

    throwReqError(resp) {
        const error = new Error(resp.statusText)
        error.resp = resp
        throw error
    }

    checkStatus(resp) {
        if ((resp.status >= 200) && (resp.status < 400)) {
            return resp.data
        }
        this.throwReqError(resp)
    }

    procReqError(err) {
        if (err.toString().indexOf('401') > -1) {
            // localStorage.removeItem(auth.jwt.token)
            auth.logout()
            let loginUrl = "";
            loginUrl =
                window.location.href.indexOf("dev") !== -1 ?
                "http://dev.work.bdlifescience.com" :
                window.location.href.indexOf("test") !== -1 ?
                "http://test.work.bdlifescience.com" :
                "http://work.bdlifescience.com";
            window.location.href = `${loginUrl}/login`
            return {
                ret: 1,
                msg: '请先登录',
            }
        } else if (err.toString().indexOf('400') > -1) {
            return {
                ret: 1,
                msg: '请求错误、稍后重试',
            }
        } else if (err.toString().indexOf('403') > -1) {
            return {
                ret: 1,
                msg: '没有权限',
            }
        } else if (err.toString().indexOf('404') > -1) {
            return {
                ret: 1,
                msg: '请求的页面不存在',
            }
        } else if (err.toString().indexOf('500') > -1) {
            return {
                ret: 1,
                msg: '服务器异常、稍后重试',
            }
        }
    }

    procRequest(req) {
        return req.then(this.checkStatus).catch(this.procReqError)
    }

    downloadApi(url, data = {}) {
        url = Host + url
        const link = document.createElement('a');
        link.target = '_blank'
        let test = ''
        for (let i in data) {
            if (data[i] !== undefined) {
                test += `${i}=${data[i]}&&`
            }
        }
        test = test.slice(0, test.length - 2)
        link.href = `${url}?${test}`;
        document.body.appendChild(link);
        link.click();
    }

    getApi(url, data) {
        url = Host + url
        return this.procRequest(this.Request.get(url, {
            params: data
        }))
    }

    postApi(url, data) {
        url = Host + url
        return this.procRequest(this.Request.post(url, data))
    }

    putApi(url, data) {
        url = Host + url
        return this.procRequest(this.Request.put(url, data))
    }

    deleteApi(url) {
        url = Host + url
        return this.procRequest(this.Request.delete(url))
    }

    getUser(url, data, host) {
        url = host + url
        return this.procRequest(this.Request.get(url, data))
    }
}