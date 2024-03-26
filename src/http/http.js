import axios from 'axios';

const service = axios.create({
  // baseURL: 'https://api.example.com', // 基础URL
  timeout: 60000, // 请求超时时间
  // 其他配置...
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 可以在这里添加例如token等请求头
    // config.headers['Authorization'] = 'Bearer yourToken';
    return config;
  },
  error => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做处理，例如只返回data部分
    return response.data;
  },
  error => {
    // 响应错误处理
    return Promise.reject(error);
  }
);

export default service;