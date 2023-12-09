import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public title: string

  @column()
  public content: string

  @column()
  public user_id: number

  @column()
  public category: string

  @column()
  public summary: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @manyToMany(() => User, {
    pivotTable: 'user_post',
  })
  public likedUsers: ManyToMany<typeof User>

  public static async liked(user: typeof User) {
    const post: Post = this
    await post.load('likedUsers')

    for await (const likedUser of post.likedUsers) {
      if (user.id === likedUser.id) {
        return true
      }
    }

    return false
  }

    @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
