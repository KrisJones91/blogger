<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center home-bg">
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
        <button type="button" class="btn btn-color btn-lg" data-toggle="modal" data-target="#modelId">
          Create
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

<style scoped>
.home-bg{
  background-image: url('https://www.10wallpaper.com/wallpaper/1920x1200/1908/2019_Purple_Abstract_4K_HD_Design_1920x1200.jpg');
  background-position-x: -0%;
  background-position-y: -0%;
}
.main-text{
  font-family: 'Damion', cursive;
  color: rgb(240, 5, 136);
  font-size: 150px !important;
  /* -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: rgb(44, 7, 3); */
  text-shadow: 3px 1px 5px rgb(234, 199, 39);
}
.btn-color{
  color: rgb(240, 5, 136);
  display: block;
  background-color: rgb(234, 199, 39);
  border-color: purple;
  font-family: 'DM Sans', sans-serif;
}
.btn:hover{
  background-color: rgb(240, 5, 136);
  color: rgb(234, 199, 39);
  box-shadow: 0px 1px 30px gray;

}
</style>
