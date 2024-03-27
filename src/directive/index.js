// 图片自动添加静态资源地址
import ImgSrc from './imgSrc';
import highlight from './highlight';

export default function registerDirectives (app) {
  ImgSrc(app);
  highlight(app);
}
