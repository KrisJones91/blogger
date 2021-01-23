<template>
  <div class="BlogComponent col-4 ">
    <router-link :to="{ name: 'BlogPage', params: {id: blogProp.id } }">
      <div class="card text-center m-2">
        <img class="card-top">
        <h6 class="py-2">
          <b>
            {{ blogProp.title }}
          </b>
        </h6>
        <div class="card-body">
          <p class="card-text" v-if="blogProp.creator.name">
            By: {{ blogProp.creator.name }}
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'
import { logger } from '../utils/Logger'
export default {
  name: 'BlogComponent',
  props: {
    blogProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      editPost: false
    })
    return {
      state,
      editBlog(event) {
        try {
          blogsService.editBlog(props.blogProp.id, event.target.innerText)
        } catch (error) {
          logger.error(error)
        }
      },
      deleteBlog() {
        try {
          blogsService.deleteBlog(props.blogProp.id)
        } catch (error) {
          logger.error(error)
        }
      }

    }
  }
}
</script>
