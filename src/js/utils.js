
/**
 * 对象数组排序
 * @param {对象中需要比较的键} p 
 */
export const compare = p => { //这是比较函数
    return function(m,n){
        var a = m[p];
        var b = n[p];
        return b - a; //降序
    }
}

/**
 **格式化日期
 * formatDate(new Date().getTime());                          //2017-05-12
 * formatDate(new Date().getTime(),'YY年MM月DD日');            //2017年05月12日
 * formatDate(new Date().getTime(),'今天是YY/MM/DD hh:mm:ss'); //今天是2017/05/12 10:07:45
 */
export const formatDate = (time,format='YY-MM-DD') => {
    let date = new Date(time);
  
    let year = date.getFullYear(),
      month = date.getMonth()+1,//月份是从0开始的
      day = date.getDate(),
      hour = date.getHours(),
      min = date.getMinutes(),
      sec = date.getSeconds();
    let preArr = Array.apply(null,Array(10)).map(function(elem, index) {
      return '0'+index;
    });
  
    let newTime = format.replace(/YY/g,year)
      .replace(/MM/g,preArr[month]||month)
      .replace(/DD/g,preArr[day]||day)
      .replace(/hh/g,preArr[hour]||hour)
      .replace(/mm/g,preArr[min]||min)
      .replace(/ss/g,preArr[sec]||sec);
  
    return newTime;
  }

/**
 * 那地址栏参数
 * @param {地址栏字段} name 
 */
export const  getUrlKey = (name) => {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || ''
}