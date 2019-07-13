import axios from "axios"
import Vue from "vue"
import store from '@/store';
import router from '@/router';
import {  Message } from 'element-ui'

let cancel,
    promiseArr = {};
const CancelToken = axios.CancelToken;
axios.defaults.maxRedirects = 8;
//请求拦截器
// axios.interceptors.request.use(
//   config => {
//     //发起请求时，取消掉当前正在进行的相同请求
//     if (promiseArr[config.url]) {
//       promiseArr[config.url]("操作取消");
//       promiseArr[config.url] = cancel;
//     } else {
//       promiseArr[config.url] = cancel;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

axios.defaults.baseURL = "/";
//设置默认请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.defaults.timeout = 25000;

let urlTimer = {};
export default {
  //get请求
  get(urlObj, param) {
    if (urlObj.isOpenLoading) {
        
    }
    return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: urlObj.url,
          params: param,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            "Format": "json"
          },
          cancelToken: new CancelToken(c => {
            cancel = c;
          })
        }).then(res => {
          // console.log(res)
          if (res && res.data) { 
            resolve(res && res.data);
          }else if(res) {
            resolve(res);
          }
        });
    });
  },
  //put请求
  put(urlObj, param ) {
    if (urlObj.isOpenLoading) {
    }
    return new Promise((resolve, reject) => {
      clearTimeout(urlTimer[urlObj.url]);
      urlTimer[urlObj.url] = setTimeout(function () {
        axios({
          method: "put",
          url: urlObj.url,
          data : param,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            "Format": "json"
          },
          cancelToken: new CancelToken(c => {
            cancel = c;
          })
        }).then(res => {
          if (res && res.data) { 
            resolve(res && res.data);
          }else if(res) {
            resolve(res);
          }
        });
      }, 500)

    });
  },
  //post请求
  post(urlObj, param, isChangeHeader = false) {
    if (urlObj.isOpenLoading) {
      // todo 待实现
    }
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: urlObj.url,
        data: param,
        headers: isChangeHeader == false ? { "Content-Type": "application/json;charset=UTF-8", "X-Requested-With": "XMLHttpRequest" } : { 'Content-Type': 'multipart/form-data' },
        cancelToken: new CancelToken(c => {
          cancel = c;
        })
      }).then(res => {
        if (res && res.data) { 
          resolve(res && res.data);
          if(res.code == 200 || res.data.code ) {
            Message.success('操作成功')
          }
        }else if(res) {
          resolve(res);
          if(res.code == 200) {
            Message.success('操作成功')
          }
        }
      });
    });
  }
};

//响应拦截器即异常处理
axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error && error.response) {
        switch (error.response.status) {
          case 400:
            error.message = "错误请求";
            Message.error(
              error.response.data.message
              ?error.response.data.message
              :error.message
              )
            break;
          case 401:
            error.message = "未授权，请重新登录";
            Message.error(error.message)
            store.commit('IS_LOGIN', false)
            router.push('/') 
            // window.location.reload();
            break;
          case 403:
            error.message = "拒绝访问";
            Message.error(error.message)
            break;
          case 404:
            error.message = "请求错误,未找到该资源";
            Message.error(error.message)
            break;
          case 405:
            error.message = "请求方法未允许";
            Message.error(error.message)
            break;
          case 408:
            error.message = "请求超时";
            Message.error(error.message)
            router.push('/page408')
            break;
          case 500:
            error.message = "服务器端出错";
            Message.error(error.message)
            break;
          case 501:
            error.message = "网络未实现";
            Message.error(error.message)
            break;
          case 502:
            error.message = "网络错误";
            Message.error(error.message)
            break;
          case 503:
            error.message = "服务不可用";
            Message.error(error.message)
            break;
          case 504:
            error.message = "网络超时";
            Message.error(error.message)
            break;
          case 505:
            error.message = "http版本不支持该请求";
            Message.error(error.message)
            break;
          default:
            error.message = `连接错误${error.response.status}`;
        }
      } else {
        if (error.message == "操作取消") {
          return Message.error(error.message)
        }
        else{
          error.msg = "请求超时,请刷新请重试";
          Message(error.msg )
        }
      }
      
      return Promise.resolve(error);
    }
  );