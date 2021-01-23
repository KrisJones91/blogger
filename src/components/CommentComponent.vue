<template>
  <div class="CommentComponent m-2">
    <div class="card m-2">
      <div class="row pt-2">
        <div class="col-4 py-4">
          <p> comment </p>
          <p> {{ commentProps.body }}</p>
        </div>
        <div class="col-4 py-4">
          <p>{{ commentProps.creatorId }}</p>
        </div>
        <div class="col-4 text-center py-4">
          <button type="button" class="btn btn-outline-primary m-1">
            Edit
          </button>
          <button type="button" class="btn btn-outline-primary m-1">
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
export default {
  name: 'CommentComponent',
  props: {
    commentProps: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      comment: computed(() => AppState.comments),
      editComment: false
    })
    return {
      state,
      editComment(event) {
        try {
          commentService.editComment(props.comment.id, event.target.innerText)
        } catch (error) {
          logger.error(error)
        }
      },
      deleteComment() {
        try {
          commentService.deleteComment(props.comment.id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }

}

</script>
