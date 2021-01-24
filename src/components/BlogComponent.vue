<template>
  <div class="BlogComponent col-4 ">
    <div class="card text-center m-2">
      <div class="card-top">
        <h3 class="py-2" :contenteditable="state.editBlog" @blur="editBlog">
          {{ blogProp.title }}
        </h3>
      </div>
      <router-link :to="{ name: 'BlogPage', params: {id: blogProp.id } }">
        <h6>
          View
        </h6>
      </router-link>
      <div class="card-body">
        <div class="row justify-content-center">
          <button type="button" class="btn btn-outline-warning m-1" v-if="state.account.id == blogProp.creatorId" @click="state.editBlog = !state.editBlog">
            Edit
          </button>
          <button type="button" class="btn btn-outline-danger m-1" v-if="state.account.id == blogProp.creatorId" @click="deleteBlog">
            Delete
          </button>
        </div>
      </div>
      <div class="card-footer">
        <p v-if="blogProp.creator.name">
          By: {{ blogProp.creator.name }}
        </p>
      </div>
    </div>
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
