import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import view from '@ioc:Adonis/Core/View'
import { Post } from 'App/Models/Post'
import User from 'App/Models/User'

export default class PostsController {

    private perPage = 3;

    public async index({ view, auth }: HttpContextContract) {
        const posts = await Post.all()
        const users = await User.all()
        const page = await Post.query().paginate(1,this.perPage)

        return view.render('posts/index', { posts, users, page })
    }

    public async create({ auth }: HttpContextContract) {
        return view.render('posts/create', { auth })
    }
  
    public async store({ request, response, auth }: HttpContextContract) {
        const data = await request.only(['title', 'content', 'category', 'summary'])
        const author = auth.user.id
        const post = await Post.create({ user_id: author, ...data})
        const dataUsers = await User.all() 
        return response.redirect().toRoute('post.index' , { dataUsers })
    }
  
    public async show({ params, view }: HttpContextContract) {
        const post = await Post.findOrFail(params.id)
        const user = await User.find(post.user_id)
        const { DateTime } = require('luxon')

        post.createdAt = DateTime.fromISO(post.createdAt).toLocaleString({month: '2-digit', day: '2-digit', year: 'numeric'});

        return view.render('posts/show', {post: post, user: user})
    }

    public async myPosts({ auth, view }: HttpContextContract) {
        const author = auth.user.id
        const authorName = auth.user.name
        const posts = await Post.query().where("user_id" , author)

        return view.render('posts/myPosts', {posts, authorName})
    }

    public async articles({ view }: HttpContextContract) {
        const posts = await Post.query().where("category" , "Artigo")
        const users = await User.all()

        return view.render('posts/articles', { posts, users })
    }

    public async reviews({ view }: HttpContextContract) {
        const posts = await Post.query().where("category" , "Review")
        const users = await User.all()

        return view.render('posts/reviews', { posts, users })
    }

    public async edit({}: HttpContextContract) {}
  
    public async update({}: HttpContextContract) {}
  
    public async destroy({ auth, params, view}: HttpContextContract) {
        const post = await Post.findOrFail(params.id)
        const authorName = await auth.user.name
        if(post.user_id == auth.user.id){
          await post.delete()
        }
        
        return view.render('posts/myPosts', {authorName} );
      }

    public async paginate({ response, params, view}: HttpContextContract) {
        const page = await Post.query().paginate(params.page, this.perPage)
        const html = await view.render('components/post_list', {posts: page})
        
        return response.json({html,page})
    }
    }

    public async like({ params, response }: HttpContextContract) {
        const post = await Post.findOrFail(params.id)
        const user = await User.findOrFail(1)
        const liked = await post.liked(user)
        var like_flag: boolean

        if (liked) {
            await user.related('likedPosts').detach([post.id])
        
            like_flag = false
        } else {
            await user.related('likedPosts').attach([post.id])
        
            like_flag = true
        }
    
        // return { id: post.id, liked: like_flag }
        return response.redirect().toRoute('post.index' , { liked })
    }

}
