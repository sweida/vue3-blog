//导入封装的axios请求方法
import request from "@/http/requestMethod";

// 获取网站信息
export const getWebInfo = (params) =>
  request({
    method: "GET",
    url: "/api/webinfo/read",
    params,
  });

// 获取已学得技能
export const getSkills = (data) =>
  request({
    method: "POST",
    url: "/api/ad",
    data,
  });

// 友链
export const getLinks = (data) =>
  request({
    method: 'POST',
    url: '/api/link/list',
    data: data
  })