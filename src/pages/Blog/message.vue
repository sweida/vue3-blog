<template>
  <div class="higtlight">
    <section class="about-bg">
      <!-- <img v-imgSrc="banners[3].url" class="bg-img" /> -->
      <img src="@/assets/banner5.jpg" class="bg-img">

      <div class="bg"></div>
      <p class="mgs-title">Say Hello~</p>
      <!-- 评论框 -->
      <div class="input-main">
        <div class="input-box main">
          <div class="userbox">
            <div class="user-img">
              <!-- <img :src="avatar_url"> -->
              <!-- <img :src="
                  user.avatar_url ||
                    `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.id}`
                " /> -->
              <!-- <h4>{{ user.name || '未登录' }}</h4> -->
            </div>
          </div>

          <div class="textbox">
            <Input v-model="message.content" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" :maxlength="400"
              :placeholder="textarea" />
            <div class="submit-box">
              <!-- <div class="ykname">
                <Input v-model="message.name" placeholder="游客可以选填昵称" style="width: 120px" v-if="!user"/>
              </div> -->
              <Button type="primary" @click="submitMessage">
                <Icon type="ios-create" />
                提交评论
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import marked from 'marked'
import '@/style/message.less'

export default {
  data () {
    return {
      avatar_url: import.meta.env.VITE_APP_AVATAR,
      textarea: '支持markdown语法，尾部2个空格后回车才会换行，最长400个字',
      replyTextarea: '',
      replyContent: '',
      loading: true,
      messageList: [],
      messageId: -1,
      topicUserId: '',
      isReply: false,
      message: {
        content: '',
        ykname: '',
      },
      pageModel: {
        page: 1,
        sumCount: 10,
      },
      page: 2,
      hasMore: true,
    }
  },
  // computed: {
  //   // ...mapGetters(['user', 'banners']),
  //   compiledMarkdown: function() {
  //     return marked(this.detail.content, { sanitize: false })
  //   },
  // },
  created () {
    // this.getMessage()
  },
  methods: {
    // // 获取留言
    // getMessage () {
    //   this.$api
    //     .MessageList(this.pageModel)
    //     .then((res) => {
    //       this.loading = false
    //       this.pageModel.sumCount = res.data.total
    //       this.messageList = res.data.data
    //       // 转markdown语法
    //       this.messageList.forEach((item) => {
    //         item.content = marked(item.content, { sanitize: false })
    //         if (item.reply.length > 0) {
    //           item.reply.forEach((reply) => {
    //             reply.content = marked(reply.content, { sanitize: false })
    //           })
    //         }
    //         // 转换换行
    //         // item.content = item.content.replace(/\n/g, '<br>')
    //       })
    //     })
    //     .catch(() => { })
    // },
    // selectRoleList () {
    //   this.getMessage()
    // },
    // // 提交留言
    // submitMessage () {
    //   this.$api
    //     .MessageAdd(this.message)
    //     .then((res) => {
    //       this.getMessage()
    //       this.$Message.success(res.message)
    //       this.message = {
    //         content: '',
    //         name: '',
    //       }
    //     })
    //     .catch(() => { })
    // },
    // // 删除自己的留言
    // deleteComment (item) {
    //   this.$api
    //     .MessageDelete({ id: item.id })
    //     .then((res) => {
    //       this.messageList.splice(this.messageList.indexOf(item), 1)
    //       this.$Message.success(res.message)
    //     })
    //     .catch(() => { })
    // },
    // deleteReply (item) {
    //   this.$api
    //     .MessageReplyDelete({ id: item.id })
    //     .then((res) => {
    //       this.getMessage()
    //       this.$Message.success(res.message)
    //     })
    //     .catch(() => { })
    // },
    // // 回复留言
    // handleReply (item, reply) {
    //   if (!item.user) {
    //     this.$Message.error('不能回复游客！')
    //     return
    //   }
    //   // if (this.messageId == reply.id) {
    //   //   this.cancelReply()
    //   //   return
    //   // }
    //   this.messageId = item.id
    //   this.topicUserId = reply.user.id
    //   this.replyTextarea = '回复' + reply.user.name + '：'
    //   this.replyContent = ''
    //   setTimeout(() => {
    //     this.$refs.textarea[0].focus()
    //   }, 200)
    // },
    // cancelReply () {
    //   this.messageId = -1
    // },
    // // 提交回复
    // submitReply () {
    //   let params = {
    //     content: this.replyContent,
    //     message_id: this.messageId,
    //     topic_user_id: this.topicUserId,
    //   }
    //   this.$api
    //     .MessageReply(params)
    //     .then((res) => {
    //       this.getMessage()
    //       this.$Message.success(res.message)
    //       this.cancelReply()
    //     })
    //     .catch(() => { })
    // },
  },
}
</script>

<style scoped lang="less">
.about-bg {
  width: 100%;
  height: 500px;
  position: relative;

  .bg-img {
    width: 100%;
    position: absolute;
    top: 0;
    -o-object-fit: cover;
    object-fit: cover;
    height: 100%;
  }

  .bg {
    background: #ecf4ff;
    mix-blend-mode: multiply;
    height: 100%;
  }

  .mgs-title {
    text-align: center;
    font-size: 40px;
    color: #fff;
    z-index: 100;
    position: absolute;
    top: 12%;
    width: 220px;
    margin-left: -110px;
    left: 50%;
    font-weight: bold;
  }
}

.input-main {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.comment-menu {
  display: flex;
  justify-content: flex-end;
  color: #657f86;
  padding: 0 10px 5px 0;

  i {
    font-size: 20px;
    margin-left: 10px;
    cursor: pointer;
  }

  .lv-icon-xiaoxi2 {
    top: 2px;
    position: relative;
  }
}

.comment-main {
  flex: 1;
}

.reply-text,
.reply-button {
  margin-top: 10px;
}

.reply-box {
  margin: 0px 10px 7px;
  border: 1px solid #ecf0f1;

  .reply-header {
    display: flex;
    justify-content: space-between;
    background: #ecf0f1;
    margin: 0;
    padding: 8px 9px;

    span {
      color: #f7576c;
      font-weight: bold;
      margin: 0 3px;
    }

    em {
      color: #009688;
      font-weight: bold;
    }

    .created {
      margin-left: 10px;
      font-weight: 100;
      color: #7f8c8d;
    }

    .noml {
      color: #7f8c8d;
    }
  }

  &:hover {
    box-shadow: 2px 2px 15px #d2e7fd;
  }
}

.cancel {
  margin-right: 10px;
}

@media screen and (max-width: 750px) {
  .comment-box {
    box-shadow: 2px 2px 15px #d2e7fd;
  }

  .about-bg {
    height: 320px;

    .mgs-title {
      font-size: 24px;
    }
  }
}
</style>
