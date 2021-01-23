/* eslint-disable no-console */
import { AppState } from '../AppState'
import { api } from './AxiosService'

class BlogsService {
  async getBlogs() {
    const res = await api.get('/api/blogs/')
    console.log(res)
    AppState.blogs = res.data
  }

  async getOne(id) {
    const res = await api.get('/api/blogs/' + id)
    AppState.activeBlog = res.data
  }

  async createBlog(blogData) {
    const res = await api.post('/api/blogs', blogData)
    console.log(res)
    this.getBlogs()
  }

  async editBlog(blogId, newTitle) {
    const blogData = { title: newTitle }
    const res = await api.put('/api/blogs/' + blogId, blogData)
    console.log(res)
    this.getBlogs()
  }

  async deleteBlog(blogId) {
    await api.delete('/api/blogs/' + blogId)
    this.getBlogs()
  }
}
export const blogsService = new BlogsService()
