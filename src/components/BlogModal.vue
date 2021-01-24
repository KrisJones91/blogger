<template>
  <div class="QuickModal">
    <!-- Modal -->
    <div class="modal fade"
         id="modelId"
         tabindex="-1"
         role="dialog"
         aria-labelledby="modelTitleId"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Create a NEW Blog!
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="" @submit.prevent="createBlog">
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <input type="text"
                           name="imgUrl"
                           id="imgUrl"
                           class="form-control text-center m-1"
                           placeholder="Image URL"
                           aria-describedby="helpId"
                           v-model="state.newBlog.imgUrl"
                    >
                    <input type="text"
                           name="title"
                           id="title"
                           class="form-control text-center m-1"
                           placeholder="Title"
                           aria-describedby="helpId"
                           v-model="state.newBlog.title"
                    >
                    <textarea type="text"
                              name="body"
                              id="body"
                              class="form-control text-center m-1"
                              placeholder="body..."
                              aria-describedby="helpId"
                              v-model="state.newBlog.body"
                    ></textarea>
                    <div class="row justify-content-center">
                      <button class="btn btn-success " type="submit">
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { blogsService } from '../services/BlogsService'
import { logger } from '../utils/Logger'
export default {
  name: 'BlogModal',
  setup() {
    const state = reactive({
      newBlog: {}
    })
    return {
      state,
      async createBlog() {
        try {
          await blogsService.createBlog(state.newBlog)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>
