import { request } from "@/plugins/request";

// 获取所有的文章列表
export const getArticles = (params) => {
  return request({
    method: "GET",
    url: "/api/articles",
    params,
  });
};

// 获取用户的文章列表
export const getFeedArticles = (params) => {
  return request({
    method: "GET",
    url: "/api/articles/feed",
    // Authorization: Token jwt.token.here
    params,
  });
};

// 添加点赞
export const addFavorite = (slug) => {
  return request({
    method: "POST",
    url: `/api/articles/${slug}/favorite`
  });
};

// 取消点赞
export const deleteFavorite = (slug) => {
  return request({
    method: "DELETE",
    url: `/api/articles/${slug}/favorite`
  });
};

// 根据slug获取文章
export const getArticleBySlug = (slug) => {
  return request({
    method: "GET",
    url: `/api/articles/${slug}`
  })
}

// 删除文章
export const deleteArticle = (slug) => {
  return request({
    method: "DELETE",
    url: `/api/articles/${slug}`
  })
}

// 更新文章
export const updateArticle = (slug, params) => {
  return request({
    method: "PUT",
    url: `/api/articles/${slug}`,
    params
  })
}

// 新建文章
export const createArticle = (params) => {
  return request({
    method: "POST",
    url: `/api/articles`,
    params
  })
}

// 根据slug获取评论
export const getComment = (slug) => {
  return request({
    method: "GET",
    url: `/api/articles/${slug}/comments`
  })
}

// 删除评论
export const deleteComment = (slug, id) => {
  return request({
    method: "DELETE",
    url: `/api/articles/${slug}/comments/${id}`
  })
}

// 新建评论
export const addComment = (slug, params) => {
  return request({
    method: "POST",
    url: `/api/articles/${slug}/comments`,
    params
  })
}
