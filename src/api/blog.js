//导入封装的axios请求方法
import request from "@/http/requestMethod";

// 获取网站信息
export const WebInfo = (params) =>
  request({
    method: "GET",
    url: "/api/webinfo/read",
    params,
  });

// 获取已学得技能
export const Skills = (data) =>
  request({
    method: "POST",
    url: "/api/ad",
    data,
  });

// 友链
export const Links = (data) =>
  request({
    method: 'POST',
    url: '/api/link/list',
    data: data
  })

// 获取文章列表
export const Articles = (data) =>
  request({
    method: "POST",
    url: "/api/article/list",
    data,
  });

// 文章详情
export const ArticleDetail = (data) =>
  request({
    method: "POST",
    url: "/api/article",
    data,
  });

// 点赞
export const ArticleLike = (data) =>
  request({
    method: "POST",
    url: "/api/article/like",
    data,
  });

// skill 分类
export const Classify = (data) =>
  request({
    method: "GET",
    url: "/api/article/classify",
    data,
  });
