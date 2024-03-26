// const defaultErrorImg = require("@/assets/errorImg.jpg");

import defaultErrorImg from '@/assets/errorImg.jpg'

const staticUrl = import.meta.env.VITE_APP_STATIC_URL

/**
 * 检测图片是否存在
 * @param url
 */
let imageIsExist = function (url) {
  return new Promise(resolve => {
    var img = new Image();
    img.onload = function () {
      if (this.complete == true) {
        resolve(true);
        img = null;
      }
    };
    img.onerror = function () {
      resolve(false);
      img = null;
    };
    img.src = url;
  });
};

//全局注册自定义指令，用于判断当前图片是否能够加载成功，可以加载成功则赋值为img的src属性，否则使用默认图片
/**
 * error-img 错误图片地址
*/
export default function (app) {
  app.directive("imgSrc", async (el, binding) => {

    let imgURL = binding.value; //获取图片地址
    //获取错误图片地址，如果没有则获取默认的
    let errorImg = el.getAttribute("error-img") || defaultErrorImg;
    let totalImgUrl = staticUrl + imgURL

    if (imgURL) {
      // 是否http开头
      let isHttp = imgURL.indexOf('http')
      if (isHttp > -1) {
        let exist = await imageIsExist(imgURL);
        if (exist) {
          el.setAttribute("src", imgURL);
        } else {
          el.setAttribute("src", errorImg);
          el.setAttribute("img-data", totalImgUrl);
        }
      } else {
        let exist = await imageIsExist(totalImgUrl);
        if (exist) {
          el.setAttribute("src", totalImgUrl);
        } else {
          el.setAttribute("src", errorImg);
          el.setAttribute("img-data", totalImgUrl);
        }
      }
    } else {
      el.setAttribute("src", errorImg);
      el.setAttribute("img-data", totalImgUrl);
    }
  })
}
