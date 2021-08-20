<template>
  <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <img
                src="http://i.imgur.com/Qr71crq.jpg"
                class="comment-author-img"
              />
              <button class="btn btn-sm btn-primary" @click.prevent="addComment">Post Comment</button>
            </div>
          </form>

          <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  class="comment-author-img"
                />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
              <span class="mod-options">
                <i class="ion-edit"></i>
                <i class="ion-trash-a" @click="deleteComment"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import { getComment, deleteComment, addComment} from "@/api/article"

export default {
    name: "ArticleComment",
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    date() {
        return {

        }
    },
    async mounted() {
        const {data} = await getComment(this.article.slug)
        console.log(data)
    },
    methods: {
        async addComment() {
            try {
                 const { data } = await addComment(this.article.slug)
            } catch (error) {
                
            }
        },
        async deleteComment (id) {
            await deleteComment(this.article.slug, id)
        }
    }

}
</script>

<style>

</style>