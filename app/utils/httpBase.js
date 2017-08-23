import axios from 'axios'
import {hashHistory} from 'react-router'

let httpProcessor = function(method, url, data){
  let config = {
    url: url,
    data: data || null,
    method: method,
    baseURL: HTTP_BASE_URL,
    timeout: 10000
    // withCredentials: true
  };

  return new Promise(function(resolve, reject){
    axios(config).then(res => {
      if (res.status == 0) {
        // business data correct
        resolve(res);
      }else{
        // business data error
        reject(res);
      }
    }).catch(err => {
      hashHistory.push('/error');
      // if (err.response) {
      //   // response error
      // }else if (err.request) {
      //   // request error, such as timeout etc..
      // }else{
      //
      // }
    })
  });
}

export default httpProcessor;
