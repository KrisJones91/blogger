<template>
  <div class="BlogComponent col-6 align-items-center ">
    <div class="card text-center m-3">
      <div class="card-top p-2">
        <h3 class="py-2" :contenteditable="state.editBlog" @blur="editBlog">
          {{ blogProp.title }}
        </h3>
      </div>
      <div class="card-body">
        <router-link :to="{ name: 'BlogPage', params: {id: blogProp.id } }">
          <h5 class="view">
            View
          </h5>
        </router-link>
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
          Writer | <b>{{ blogProp.creator.name }}</b>
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
<style scoped>
.view{
  cursor: pointer;
  color: rgb(234, 199, 39);
}
.view:hover{
  color: rgb(240, 5, 136);
}
.card-top{
  background-color: rgb(49, 1, 121);
  color: rgb(234, 199, 39);
  border: outset  rgb(240, 5, 136);
}
.card-body{
  background-color: rgb(118, 54, 192);
  border: inset rgb(240, 5, 136);
}
.card-footer{
  background-color: rgb(49, 1, 121);
  color: rgb(234, 199, 39);
  border: outset rgb(240, 5, 136);
  /* text-shadow: 1px 2px 1px rgb(173, 5, 240); */
}
</style>
