<template>
  <div class="CommentComponent m-2">
    <div class="card m-2 p-1 comm-area">
      <div class="row pt-2">
        <div class="col-5 text-center py-4">
          <p :contenteditable="state.editComment" @blur="editComment">
            <b>{{ commentProps.body }}</b>
          </p>
        </div>
        <div class="col-5 py-4">
          <p>{{ commentProps.creator.name }}</p>
        </div>
        <div class="col-2 text-center py-4">
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
          // needed route.params.id passed in the editComment in order to get the blogId
          commentService.editComment(route.params.id, props.commentProps.id, event.target.innerText)
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
<style scoped>
.comm-area{
  background-color:rgb(118, 22, 207) ;
  color: rgb(234, 199, 39);
  border: outset;
}
</style>
