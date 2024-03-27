<script setup>
import { ref, reactive, onMounted } from 'vue'
import { MessageList } from '@/api/message'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked';
import '@/style/message.less'

// avatar_url: import.meta.env.VITE_APP_AVATAR,
// textarea: '支持markdown语法，尾部2个空格后回车才会换行，最长400个字',

// Markdwon 转 html
const render = new marked.Renderer()
marked.setOptions({
  renderer: render, // 这是必填项
  gfm: true,	// 启动类似于Github样式的Markdown语法
  pedantic: false, // 只解析符合Markdwon定义的，不修正Markdown的错误
  sanitize: false, // 原始输出，忽略HTML标签（关闭后，可直接渲染HTML标签）
})

const route = useRoute()
const router = useRouter()
const isLoading = ref(true)

const state = reactive()
const messageList = reactive([])
const avatarUrl = ref(import.meta.env.VITE_APP_AVATAR)

// 文章详情
const getMessageList = () => {
  MessageList().then(res => {
    console.log(res, 'res');
    isLoading.value = false
    // this.pageModel.sumCount = res.data.total

    messageList.push(...res.data.data)
    // 转markdown语法
    messageList.forEach((item) => {
      item.content = marked(item.content)

      if (item.reply.length > 0) {
        item.reply.forEach((reply) => {
          reply.content = marked(reply.content)
        })
      }
      // 转换换行
      // item.content = item.content.replace(/\n/g, '<br>')
    })

    console.log(messageList, 'messageList');

  })
}


onMounted(() => {
  getMessageList()
})

</script>

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
            <!-- <Input v-model="message.content" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" :maxlength="400"
              :placeholder="textarea" /> -->
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

    <section class="main">
      <div class="commentList" v-for="(item, index) in messageList" :key="index">
        <div class="user-ava">
          <img :src="`${avatarUrl}?seed=${item.user.id || 'null'}`" alt="avatar" />
        </div>

        <div class="comment-main">
          <div class="comment-box animate03">
            <div class="username">
              <span>
                <Icon type="md-person" />
                {{
                item.user
                  ? item.user.name
                  : item.name
                    ? `游客（${item.name}）`
                    : '游客'
              }}
                <em v-if="item.user_id == 1">(博主)</em>
                <span class="created">
                  <Icon type="ios-time-outline" />{{ item.created_at }}
                </span>
              </span>
              <span class="floor">{{ item.id }}楼</span>
            </div>
            <div class="com_detail" v-html="item.content" v-highlight></div>

            <!-- 自己的留言显示删除按钮 -->
            <!-- <div class="comment-menu">
              <Poptip confirm placement="left" title="是否删除该留言?" @on-ok="deleteReply(reply)">
                <Icon type="md-trash" v-if="reply.user_id == user.id" />
              </Poptip>
              <Tooltip content="回复留言">
                <i class="iconfont lv-icon-xiaoxi2" @click="handleReply(item, reply)"></i>
              </Tooltip>
            </div> -->

            <!-- 回复功能 -->
            <div class="reply-box" v-for="(reply, _index) in item.reply" :key="_index">
              <p class="reply-header">
                <span>
                  {{ reply.user.name }}
                  <em v-if="reply.user.id == 1">(博主)</em>
                  <span class="noml">回复</span>
                  <span>{{
                reply.topic_user ? reply.topic_user.name : '游客'
              }}</span>
                  <em v-if="reply.topic_user && reply.topic_user.id == 1">(博主)</em>
                  <span class="created">
                    <Icon type="ios-time-outline" />
                    {{ item.created_at }}
                  </span>
                </span>
              </p>
              <div class="com_detail" v-html="reply.content" v-highlight></div>
              <!-- <div class="comment-menu">
                <Poptip confirm placement="left" title="是否删除该留言?" @on-ok="deleteReply(reply)">
                  <Icon type="md-trash" v-if="reply.user_id == user.id" />
                </Poptip>
                <Tooltip content="回复留言">
                  <i class="iconfont lv-icon-xiaoxi2" @click="handleReply(item, reply)"></i>
                </Tooltip>
              </div> -->
            </div>

          </div>
          <!-- 回复评论 -->
          <!-- <div class="reply-text" v-if="item.id == messageId">
            <Input v-model="replyContent" ref="textarea" type="textarea" :autosize="{ minRows: 3, maxRows: 8 }"
              :maxlength="400" :placeholder="replyTextarea" />
            <div class="reply-button">
              <Button class="cancel" @click="cancelReply">
                取消回复
              </Button>
              <Button type="primary" @click="submitReply">
                <Icon type="ios-create" />
                回复留言
              </Button>
            </div>
          </div> -->
        </div>
      </div>

    </section>

  </div>
</template>

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
