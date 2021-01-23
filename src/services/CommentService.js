/* eslint-disable no-console */
import { AppState } from '../AppState'
import { api } from '../services/AxiosService'
class CommentService {
  async getComments(id) {
    const res = await api.get('/api/blogs/' + id + '/comments')
    console.log(res)
    AppState.comments = res.data
  }

  async createComment(commentData) {
    const res = await api.post('/api/comment', commentData)
    console.log(res)
    this.getComments()
  }

  async editComment(commentId, newComment) {
    const commentData = { title: newComment }
    const res = await api.put('/api/comment/' + commentId, commentData)
    console.log(res)
    this.getComments()
  }

  async deleteComment(commentId) {
    await api.delete('/api/comment/' + commentId)
    this.getComments()
  }
}

export const commentService = new CommentService()
