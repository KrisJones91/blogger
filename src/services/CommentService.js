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
    const res = await api.post('/api/comments', commentData)
    console.log(res)
    this.getComments()
  }

  // passed blog (could also be ID) because blog needed to be passed in order to recognize which blogId was necessary
  async editComment(blog, commentId, newComment) {
    // had title and needed body cause TITLE is not a property of Comments
    const commentData = { blog, body: newComment }
    const res = await api.put('/api/comments/' + commentId, commentData)
    console.log(res)
    this.getComments(blog)
  }

  async deleteComment(commentId) {
    await api.delete('/api/comments/' + commentId)
    this.getComments()
  }
}

export const commentService = new CommentService()
