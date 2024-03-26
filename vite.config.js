import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  server: {
    cors: true,
    port: 8888, // 端口号
    proxy: {
      '/api': {
        target: 'https://api.golang365.top/api/v2',
        changeOrigin: true,
        secure: false,  //关键参数，不懂的自己去查, 是否https接口
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  // server: {
  //   // 配置https代理与证书
  //   // https: {
  //   //   key: fs.readFileSync('cert/8982715__nsfocus.com.key'),
  //   //   cert: fs.readFileSync('cert/8982715__nsfocus.com.pem')
  //   // },// 是否开启 https
  //   open: false, // 是否自动在浏览器打开
  //   port: 8888, // 端口号
  //   host: "0.0.0.0",
  //   //这里的ip和端口是前端项目的;下面为需要跨域访问后端项目
  //   proxy: {
  //     '/api/': {   // '/api'是代理标识，用于告诉node，url前面是/api的就是使用代理的
  //       target: 'https://api.golang365.top/api/v2',//这里填入你要请求的接口的前缀
  //       ws: false,//代理websocked
  //       changeOrigin: true,  //是否跨域
  //       secure: true,  //是否https接口
  //       // pathRewrite:{  // pathRewrite 的作用是把实际Request Url中的'/api'用""代替
  //       //   "^/": "/"
  //       // },
  //       //   headers: {
  //       //     referer: 'https://uat.nsfocus.com/api/input_suggest', //这里后端做了拒绝策略限制，请求头必须携带referer，否则无法访问后台
  //       //   }
  //     }
  //   }
  // },
  // build: {
  //   rollupOptions: {
  //     // 配置多页面
  //     input: {
  //       index: './index.html',
  //       manage: './manage.html',
  //     },
  //   },
  // },
})