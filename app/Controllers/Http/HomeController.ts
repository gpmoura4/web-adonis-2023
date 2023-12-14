import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import view from '@ioc:Adonis/Core/View'
import { Post } from 'App/Models/Post'
import User from 'App/Models/User'

export default class HomeController {
  public async index({ view, auth }: HttpContextContract) {
    const posts = await Post.query().orderBy('created_at', 'desc').limit(3)
    const users = await User.all()

    process.env.PORT = process.env.PORT;
    const porta = process.env.PORT;

    // Exiba o valor da variável de ambiente
    console.log("Porta:", porta);

    return view.render('home/home', { posts, users, auth })
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
