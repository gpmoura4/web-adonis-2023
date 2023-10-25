import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import view from '@ioc:Adonis/Core/View'
import Post from 'App/Models/Post'

export default class PostsController {
    public async index({ view, auth }: HttpContextContract) {
        const posts = await Post.all()
        return view.render('posts/index', { posts })
    }

    public async create({}: HttpContextContract) {
        return view.render('posts/create')
    }
  
    public async store({ request, response }: HttpContextContract) {
        const data = await request.only(['title', 'content'])
        const post = await Post.create(data)
        return response.redirect().toRoute('post.index')
    }
  
    public async show({ params, view }: HttpContextContract) {
        const post = await Post.find(params.id)
        return view.render('posts/show', {post: post})
    }
  
    public async edit({}: HttpContextContract) {}
  
    public async update({}: HttpContextContract) {}
  
    public async destroy({}: HttpContextContract) {}
}
