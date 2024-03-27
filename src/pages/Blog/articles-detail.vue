<template>
  <div class="detail higtlight" id="blog">
    <TextLoading :isLoading="isLoading">
      <div class="title-box">
        <h1>{{ detail.title }}</h1>
        <div class="post-box">
          <div>
            <i class="iconfont lv-icon-kalendar"></i>
            {{ detail.created_at.substring(0, 10) }}
          </div>
          <div class="tag-box" v-if="detail.tags && detail.tags.length">
            <i class="iconfont lv-icon-biaoqian6"></i>
            <span v-for="(tagli, index) in detail.tags" :key="index">
              {{ tagli }}
            </span>
          </div>
          <div><i class="iconfont lv-icon-huore"></i>{{ detail.view_count }}热度</div>
        </div>
      </div>

      <section class="article">
        <div v-html="compiledMarkdown" v-highlight></div>

        <!-- 许可 -->
        <div class="posmition">
          <p>文章版权所有：<a href="https://github.com/sweida" target="_black">九歌</a>，采用 <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh" target="_black">知识共享署名-非商业性使用 4.0
              国际许可协议</a> 进行许可。</p>
          <p>欢迎分享，转载务必保留出处及原文链接 <a :href="href" target="_blank">{{ href }}</a></p>
        </div>

        <!-- 点赞 -->
        <div :class="{ hasclick: state.hasClick }" class="giveLike animate03" @click="giveLike">
          <i class="iconfont lv-icon-yijin13-zan"></i>
          <span>{{ detail.like }}</span>
        </div>

        <!-- 上一篇和下一篇 -->
        <div class="nextBox">
          <p class="goArticle" @click="goArticle(prevArticle)">
            <Icon type="md-arrow-round-back" />
            <span>{{ prevArticle ? prevArticle.title : '无' }}</span>
          </p>
          <p class="goArticle" @click="goArticle(nextrAticle)">
            <span>{{ nextrAticle ? nextrAticle.title : '无' }}</span>
            <Icon type="md-arrow-round-forward" />
          </p>
        </div>
      </section>

    </TextLoading>


  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ArticleDetail, ArticleLike } from '@/api/blog'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isLoading = ref(true)
const href = ref(window.location.href)
const state = reactive({
  hasClick: false
})
const detail = ref({})
// 上下篇文章
const prevArticle = ref({})
const nextrAticle = ref({})

// 文章详情
const getArticleDetail = () => {
  ArticleDetail({ id: route.params.id }).then(res => {
    isLoading.value = false
    detail.value = res.data
    prevArticle.value = res.data.prevArticle[0]
    nextrAticle.value = res.data.nextrAticle[0]
  })
}

// 点赞文章
const giveLike = () => {
  let param = {
    id: detail.value.id
  }
  if (!state.hasClick) {
    ArticleLike(param).then(res => {
      detail.value.like += 1
      state.hasClick = true
    }).catch(() => { })
  }
}

// 跳转上下一篇文章
const goArticle = (article) => {
  if (article) {
    isLoading.value = true
    router.push(`/articles/${article.id}`)
    state.hasclick = false
  }
}

onMounted(() => {
  getArticleDetail()
})
</script>

<!-- <script>
import { ref, reactive, onMounted } from 'vue'
import { ArticleDetail } from '@/api/blog'

export default {
  setup() {
    const getArticleDetail = () => {
      ArticleDetail().then(res => {

      })
    }


  }
}
// import { mapGetters } from "vuex"
// import marked from 'marked'
// import 'style/message.styl'

// export default {
//   data () {
//     return {
//       text_loading: true,
//       show: true,
//       loading: true,
//       checked: true,
//       hasclick: false,
//       detail: [],
//       commentList: [],
//       prevArticle: {},
//       nextrAticle: {},
//       comment: {
//         content: '',
//         name: '',
//         article_id: ''
//       },
//       pageModel: {
//         page: 1,
//         sumCount: 10
//       },
//       page: 2,
//       hasMore: true,
//       href: '',
//       progress: ''
//     }
//   },
//   computed: {
//     ...mapGetters([
//       'user'
//     ]),
//     compiledMarkdown: function () {
//       return marked(this.detail.content, { sanitize: false })
//     }
//   },
//   mounted () {
//     // window.addEventListener('scroll',this.handleScroll)
//   },
//   destroyed () {
//     // window.removeEventListener('scroll',this.handleScroll)
//   },
//   created () {
//     this.href = window.location.href
//     this.getDetail()
//   },
//   watch: {
//     $route (to, from) {
//       this.getDetail()
//     }
//   },
//   methods: {
//     // 页面很卡顿，暂时去掉
//     // handleScroll() {
//     //   const top = document.documentElement.scrollTop;
//     //   // body高度 减去 body可见高度
//     //   let bodyHeight = document.body.scrollHeight - document.body.offsetHeight
//     //   this.progress = (top / bodyHeight) * 100
//     // },
//     getDetail () {
//       this.$api.ArticleDetial(this.$route.params).then(res => {
//         this.text_loading = false
//         this.detail = res.data
//         this.detail.created_at = this.detail.created_at.substring(0, 10).replace(/-/g, "/")
//         this.comment.article_id = this.detail.id
//         this.prevArticle = res.data.prevArticle[0]
//         this.nextrAticle = res.data.nextrAticle[0]

//         // 有评论是才请求这个接口
//         if (this.detail.comment) {
//           this.getComment()
//         }
//       }).catch(() => { })
//     },
//     // 跳转上下一篇文章
//     goArticle (article) {
//       if (article) {
//         this.text_loading = true
//         this.$router.push(`/blog/${article.id}`)
//         this.hasclick = false
//       }
//     },
//     // 点赞
//     giveLike () {
//       let param = {
//         id: this.detail.id
//       }
//       if (!this.hasclick) {
//         this.$api.ArticleLike(param).then(res => {
//           this.detail.like += 1
//           this.hasclick = true
//         }).catch(() => { })
//       }
//     },
//     // 获取评论
//     getComment () {
//       let param = {
//         article_id: this.detail.id,
//         ...this.pageModel,
//       }
//       this.$post('/apis/comment/read', param).then(res => {
//         this.commentList = res.data.data
//         this.pageModel.sumCount = res.data.total

//         this.commentList.forEach(item => {
//           item.content = marked(item.content, { sanitize: false })
//         })
//         this.loading = false
//       }).catch(() => { })
//     },
//     // 提交评论
//     submitComment () {
//       this.$post('/apis/comment/add', this.comment).then(res => {
//         this.comment.content = ''
//         this.detail.comment += 1
//         this.$Message.success(res.message)
//         this.getComment()
//       }).catch(() => { })
//     },
//     // 评论分页
//     selectRoleList () {
//       this.getComment()
//     },
//     // 删除自己的留言
//     deleteComment (item) {
//       this.$post('/apis/comment/delete', { id: item.id }).then(res => {
//         this.commentList.splice(this.commentList.indexOf(item), 1)
//         this.$Message.success(res.message)
//         this.detail.comment -= 1
//       }).catch(() => { })
//     }
//   }
// }
</script> -->


<style scoped lang="less">
.title-box {
  margin: 20px auto 40px;

  h1 {
    font-size: 3em;
    padding: 0 0 50px;
    color: #22292f;
    line-height: 1.15;
    font-family: monospace;
  }

  .post-box {
    border-top: 1px solid #b8c2cc;
    background: #f8fafc;
    border-bottom: 1px solid #b8c2cc;
    padding: 7px 15px;
    display: flex;
    font-weight: 600;
    color: #606f7b;
    font-family: auto;
    flex-wrap: wrap;
    line-height: 28px;

    >div {
      margin-right: 20px;
    }
  }
}

.more {
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
}

.none {
  font-size: 14px;
  text-align: center;
}

.detail {
  width: 100%;
  max-width: 840px;
  margin: auto;
  padding: 50px 15px 70px;
  font-size: 16px;
  color: #444;
}

.giveLike {
  display: flex;
  margin: 25px auto;
  background: #f7576c;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  color: #fff;
  font-size: 14px;

  i {
    font-size: 34px;
  }
}

.giveLike.hasclick,
.giveLike.hasclick:hover {
  background: #eee;
  color: #a9aab1;
}

.giveLike:hover {
  background: #ff7b8d;
}

.posmition {
  background: #ecf0f1;
  font-size: 14px;
  line-height: 22px;
  padding: 15px 20px;
  border-radius: 4px;
  margin: 30px auto;
}

.article {
  font-size: 1.3em;
  font-family: Georgia, system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  color: #3d4852;
  padding-bottom: 20px;

  p {
    margin: 7px 0;
  }
}

.commentbox {
  max-width: 840px;
  margin: auto;
}

.comment-title {
  font-size: 20px;
  margin: 10px 0 15px;
  border-left: 4px solid #f7576c;
  padding-left: 10px;
  line-height: 22px;

  span {
    font-size: 14px;
    margin-top: -6px;
    position: absolute;
  }
}

.nextBox {
  border-top: 1px solid #dfe8ea;
  line-height: 26px;
  padding-top: 10px;
  margin-top: 45px;
  display: flex;
  justify-content: space-between;

  .goArticle {
    width: 49%;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 18px;

    span {
      overflow: hidden;
      margin: 0 5px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .goArticle:nth-child(2) {
    justify-content: flex-end;
  }

  .goArticle:hover {
    color: #ff7b8d;
  }

  .goArticle:hover span {
    text-decoration: underline;
  }
}

.blog-header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  font-family: monospace;
  visibility: hidden;
  background: hsla(0, 0%, 100%, 0.95);
  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  transform: translate3d(0, -120%, 0);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

  .title {
    width: 840px;
    margin: auto;
    display: flex;
    align-items: center;

    a {
      display: inherit;
    }

    i {
      color: #a0aec0;
      font-size: 22px;
      margin: 0 15px;
    }
  }

  &.active {
    visibility: visible;
    transition: all 0.5s cubic-bezier(0.22, 1, 0.27, 1);
    transform: translateZ(0);
  }
}

.progressBar {
  height: 4px;
  animation: movingGradient 15s linear infinite;
  background-size: 600% 100%;
  background-image: linear-gradient(120deg, #ee7752, #e73c7e, #23a6d5, #23d5ab, #ee7752, #e73c7e);
  transition: width 0.3s linear 0s;
}

@keyframes movingGradient {
  0% {
    background-position: 0 50%;
  }

  to {
    background-position: 100% 50%;
  }
}

@media screen and (min-width: 900px) {
  .banner .bg {
    background: #989898;
  }
}

@media screen and (max-width: 750px) {
  .title-box h1 {
    font-size: 2em;
  }

  .article {
    font-size: 1.15em;
  }

  .commentbox {
    border-top: 30px solid #f5f6f7;
  }

  .nextBox {
    flex-wrap: wrap;

    .goArticle {
      margin-bottom: 10px;
      width: 100%;
      cursor: pointer;
    }
  }
}
</style>
