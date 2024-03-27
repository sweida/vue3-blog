//导入封装的axios请求方法
import request from "@/http/requestMethod";

// 获取网站信息
export const MessageList = (params) =>
  request({
    method: "POST",
    url: "/api/message/list",
    params,
  });
