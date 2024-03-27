//导入封装的axios请求方法
import request from "@/http/requestMethod";

// 获取网站信息
export const MessageList = (data) =>
  request({
    method: "POST",
    url: "/api/message/list",
    data,
  });

export const MessageAdd = (data) =>
  request({
    method: "POST",
    url: "/api/message/add",
    data,
  });
