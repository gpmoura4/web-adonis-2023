import Route from '@ioc:Adonis/Core/Route'
// import { HttpContext } from '@adonisjs/core/build/standalone';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
// import controller from 'app/Controllers/ Http/DataUsersController'


Route.get('/', 'HomeController.index').as('home')

Route.get('/cadastrar', async ({ view }: HttpContextContract) => {
  return view.render('users/create')
}).as("cadastrar")



// LOGIN ROUTES
Route.get('/login', 'SessionsController.create').as('sessions.login')
Route.post('/login', 'SessionsController.store').as('sessions.store')
Route.get('/logout', 'SessionsController.logout').as('sessions.logout')




// INDEX and SHOW USERS ROUTES
Route.post('/criarUsuario', 'DataUsersController.store').as('store')
Route.group(() => {
  Route.get('/', 'DataUsersController.show').as('show')
  Route.get('/editar', 'DataUsersController.edit').as('edit')
  Route.post('/alterarDados', 'DataUsersController.update').as('update')
  Route.get('/apagarUsuario/:id', 'DataUsersController.destroy').as('destroy')
})
  .prefix('/user')
  .middleware('auth')
  .as('user')

// POST ROUTES
Route.group(() =>{
  Route.get('/', 'PostsController.index').as('index')
  Route.get('/artigos', 'PostsController.articles').as('artigos')
  Route.get('/reviews', 'PostsController.reviews').as('reviews')
  Route.get('/novo', 'PostsController.create').as('create')
  Route.get('/:id', 'PostsController.show').as('show').where('id', /^[0-9]+$/)
  Route.get('/meusPosts', 'PostsController.myPosts').as('myPosts')
  Route.delete('/apagarPost/:id', 'PostsController.destroy').as('destroy')
  Route.post('/', 'PostsController.store').as('store')
  Route.get('/favorito/:id', 'PostsController.like').as('like')
})
  .prefix('/post')
  .middleware('auth')
  .as('post')


Route.get('/leave', async ({ view }: HttpContextContract) => {
  return view.render('home/home')
}).as('leave')