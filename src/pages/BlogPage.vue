<template>
  <div class="blog-page container-fluid bg-image">
    <div class="row p-3">
      <div class="col">
        <router-link :to="{ name: 'Home' }">
          <i type="button" class="fas fa-angle-double-left fa-3x"></i>
        </router-link>
      </div>
    </div>
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
              <input type="text" class="form-control" v-model="state.newComment.body" placeholder="add comment here..." />
            </div>
            <div>
              <button type="button" class="btn btn-outline-primary" @click="createComment">
                Add Comment
              </button>
            </div>
            <CommentComponent v-for="comment in state.comments" :key="comment.id" :comment-props="comment" />
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
import { logger } from '../utils/Logger'
import { blogsService } from '../services/BlogsService'
import { commentService } from '../services/CommentService'
export default {
  name: 'BlogPage',

  setup() {
    const route = useRoute()
    const state = reactive({
      comments: computed(() => AppState.comments),
      newComment: { blog: route.params.id }

    })

    onMounted(async() => {
      await blogsService.getOne(route.params.id)
      await commentService.getComments(route.params.id)
    })
    return {
      state,
      blog: computed(() => AppState.activeBlog),
      async createComment() {
        try {
          await commentService.createComment(state.newComment)
          await commentService.getComments(route.params.id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
.bg-image{
    background-image: url('https://www.10wallpaper.com/wallpaper/1920x1200/1908/2019_Purple_Abstract_4K_HD_Design_1920x1200.jpg');
}
</style>
