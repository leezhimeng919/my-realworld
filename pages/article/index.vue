<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <!-- 作者信息 -->
        <article-meta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>
      <hr />
      <!-- 作者信息 -->
      <div class="article-actions">
        <article-meta :article="article" />
      </div>
      <article-comment :article="article" />
    </div>
  </div>
</template>

<script>
import { getArticleBySlug } from "@/api/article";
import markDownIt from "markdown-it";
import ArticleMeta from "./components/article-meta.vue";
import ArticleComment from "./components/article-comment.vue";

export default {
  middleware: "authenticated",
  name: "ArticleIndex",
  components: {
    ArticleMeta,
    ArticleComment,
  },
  async asyncData({ params }) {
    const { slug } = params;
    const { data } = await getArticleBySlug(slug);
    const { article } = data;
    const md = new markDownIt();
    article.body = md.render(article.body);
    return {
      article,
    };
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: this.article.slug,
          name: "description",
          content: this.article.description,
        },
      ],
    };
  },
};
</script>

<style>
</style>