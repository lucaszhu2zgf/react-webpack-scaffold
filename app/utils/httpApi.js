import httpBase from './httpBase.js'

export default {
  getUerInfo: function(){
    return httpBase('get', 'info')
  }
};
