import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import view from '@ioc:Adonis/Core/View'
import Post from 'App/Models/Post'
import User from 'App/Models/User'

export default class HomeController {
  public async index({ view, response }: HttpContextContract) {
    const posts = await Post.all()
    return response.json(posts)
}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
