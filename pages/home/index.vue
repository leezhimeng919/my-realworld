<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <!-- 左侧文章栏 -->
        <div class="col-md-9">
          <!-- 3个tab -->
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'your_feed' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed',
                    },
                  }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'global_feed' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed',
                    },
                  }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'tag_feed' }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag_feed',
                      tag,
                    },
                  }"
                  >#{{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <!-- 文章列表 -->
          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username,
                  },
                }"
              >
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{
                  article.createdAt | date("MMM DD, YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited,
                }"
                @click="onFavorite(article)"
                :disabled="article.isDisable"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              class="preview-link"
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <!-- 页码列表 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: item === page,
                }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag,
                      tab,
                    },
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>
        <!-- 右侧标签栏 -->
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
                :to="{
                  name: 'home',
                  query: {
                    tab: 'tag_feed',
                    tag: item,
                  },
                }"
              >
                {{ item }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticles,
  getFeedArticles,
  addFavorite,
  deleteFavorite,
} from "@/api/article";
import { getTags } from "@/api/tag";
import { mapState } from "vuex";

export default {
  name: "HomeIndex",
  async asyncData({ query, store }) {
    // 要看第几页
    const page = Number.parseInt(query.page || 1);
    // 当前是哪种tab
    const tab = query.tab || "global_feed";
    // 一页多少条
    const limit = 20;
    // 当前标签
    const { tag } = query;

    // // 获取文章列表
    // const { data } = await getArticles({
    //   limit,
    //   offset: (page - 1) * limit
    // });
    // // 获取文章标签信息
    // const { data: tagData } = await getTags()

    // 根据当前tab类型和是否登录决定调用 所有的文章还是个人的文章数据
    const loadArticles =
      store.state && store.state.user && tab === "your_feed"
        ? getFeedArticles
        : getArticles;
    // 使用Promise.all优化
    const [articlesRes, tagsRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag,
      }),
      getTags(),
    ]);

    const { articles, articlesCount } = articlesRes.data;
    const { tags } = tagsRes.data;

    // 为每个article数据中添加一个是否正在点赞的状态

    articles.forEach((item) => {
      item.isDisable = false;
    });

    return {
      articles,
      articlesCount,
      page,
      limit,
      tags,
      tag,
      tab,
    };
  },
  watchQuery: ["page", "tag", "tab"],
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  methods: {
    async onFavorite(article) {
      try {
        article.isDisable = true;
        if (!article.favorited) {
          await addFavorite(article.slug);
          article.favorited = true;
          article.favoritesCount--;
        } else {
          await deleteFavorite(article.slug);
          article.favorited = false;
          article.favoritesCount++;
        }
        article.isDisable = false;
      } catch (err) {
        article.isDisable = false
        console.dir(err);
      }
    },
  },
};
</script>

<style>
</style>