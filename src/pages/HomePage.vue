<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="row m-3">
      <div class="col text-center">
        <h1 class="main-text">
          Blog it!
        </h1>
      </div>
    </div>
    <div class="row justify-content-center m-4">
      <div class="col ">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId">
          Create Blog
        </button>
        <BlogModal />
      </div>
    </div>
    <div class="row">
      <BlogComponent v-for="blog in state.blogs" :key="blog.id" :blog-prop="blog" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { blogsService } from '../services/BlogsService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      blogs: computed(() => AppState.blogs),
      user: computed(() => AppState.user)
    })
    onMounted(async() => {
      try {
        await blogsService.getBlogs()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state

    }
  }

}
</script>

<style scoped lang="scss">
.main-text{
  font-family: 'Vibes', cursive;
  color: black;

}
</style>
