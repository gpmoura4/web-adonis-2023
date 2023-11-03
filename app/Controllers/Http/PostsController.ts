import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import view from '@ioc:Adonis/Core/View'
import Post from 'App/Models/Post'
import User from 'App/Models/User'

export default class PostsController {
    public async index({ view, auth }: HttpContextContract) {
        const posts = await Post.all()
        const users = await User.all()

        return view.render('posts/index', { posts, users })
    }

    public async create({}: HttpContextContract) {
        return view.render('posts/create')
    }
  
    public async store({ request, response, auth }: HttpContextContract) {
        const data = await request.only(['title', 'content'])
        const author = auth.user.id
        const post = await Post.create({ user_id: author, ...data})
        return response.redirect().toRoute('post.index')
    }
  
    public async show({ params, view }: HttpContextContract) {
        const post = await Post.findOrFail(params.id)
        const user = await User.find(post.user_id)
        return view.render('posts/show', {post: post, user: user})
    }
  
    public async edit({}: HttpContextContract) {}
  
    public async update({}: HttpContextContract) {}
  
    public async destroy({}: HttpContextContract) {}
}
