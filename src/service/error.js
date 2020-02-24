/**
 * @Date:   2018-01-09T13:26:09+08:00
 * @Last modified time: 2018-06-13T13:46:55+08:00
 */
import { Toast } from 'mint-ui'
// import store from '@/store'

/**
 *  ajax错误处理
 * @param  {[number]} error [http错误状态码]
 */
export const catchError = function(error) {
  console.dir(error)
  if (error.response) {
    switch (error.response.status) {
      case 400:
        if(error.response.data.length > 0) {
          Toast(error.response.data[0].message || '请求参数异常')
        } else {
          Toast('请求参数异常')
        }
        break
      case 401:
        Toast(error.response.data.msg || '密码错误或账号不存在！')
        // store.commit('REMOVE_TOKEN')
        // location.reload()
        break
      case 403:
        Toast(error.response.data.msg || '无访问权限，请联系企业管理员')
        break
      case 404:
        Toast(error.response.data.msg || '请求资源不存在')
        break
      default:
        Toast(error.response.data.msg || '服务端异常，请联系技术支持')
    }
  } else {
    Toast(error.message || '操作超时，请联系技术支持')
  }
  return Promise.reject(error)
}
