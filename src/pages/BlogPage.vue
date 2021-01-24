<template>
  <div class="blog-page container-fluid">
    <div class="row justify-content-center m-5">
      <div class="col-6 text-center">
        <h3>{{ blog.title }}</h3>
        <p class="py-4">
          {{ blog.body }}
        </p>
      </div>
      <div class="col-5 p-2">
        <img class="img-fluid" :src="blog.imgUrl" alt="">
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col text-center">
        <div class="card">
          <div class="card-top m-2">
            <h3>Comments</h3>
            <div class="m-2">
              <input type="text" class="form-control" placeholder="add comment here..." />
            </div>
            <div>
              <button type="button" class="btn btn-outline-primary">
                Add Comment
              </button>
            </div>
            <div class="row">
              <CommentComponent v-for="comment in state.comments" :key="comment.id" :comment-props="comment" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'
import { commentService } from '../services/CommentService'
export default {
  name: 'BlogPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      comments: computed(() => AppState.comments)

    })

    onMounted(async() => {
      await blogsService.getOne(route.params.id)
      await commentService.getComments(route.params.id)
    })
    return {
      state,
      blog: computed(() => AppState.activeBlog)

    }
  }
}
</script>
