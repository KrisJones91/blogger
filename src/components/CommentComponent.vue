<template>
  <div class="CommentComponent m-2">
    <div class="card m-2">
      <div class="row pt-2">
        <div class="col-4 py-4">
          <p :contenteditable="state.editComment" @blur="editComment">
            {{ commentProps.body }}
          </p>
        </div>
        <div class="col-4 py-4">
          <p>{{ commentProps.creator.name }}</p>
        </div>
        <div class="col-4 text-center py-4">
          <button type="button" class="btn btn-outline-warning m-1" v-if="state.account.id == commentProps.creatorId" @click="state.editComment = !state.editComment">
            Edit
          </button>
          <button type="button" class="btn btn-outline-danger m-1" v-if="state.account.id == commentProps.creatorId" @click="deleteComment()">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { commentService } from '../services/CommentService'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
export default {
  name: 'CommentComponent',
  props: {
    commentProps: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      comment: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      blog: computed(() => AppState.activeBlog),
      editComment: false
    })
    return {
      state,
      async editComment(event) {
        try {
          commentService.editComment(props.commentProps.id, event.target.innerText)
          await commentService.getComments(route.params.id)
        } catch (error) {
          logger.error(error)
        }
      },
      async deleteComment() {
        try {
          await commentService.deleteComment(props.commentProps.id)
          await commentService.getComments(route.params.id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }

}

</script>
