import Route from '@ioc:Adonis/Core/Route'
// import { HttpContext } from '@adonisjs/core/build/standalone';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
// import controller from 'app/Controllers/ Http/DataUsersController'

// HOME
Route.get('/', async ({ view }: HttpContextContract) => {
  return view.render('welcome')
})
Route.post('/', 'DataUsersController.store')


// LOGIN ROUTES
Route.get('/login', 'SessionsController.create').as('sessions.create')
Route.post('/login', 'SessionsController.store').as('sessions.store')
Route.get('/logout', 'SessionsController.logout').as('sessions.logout')

// INDEX and SHOW USERS ROUTES
Route.group(() => {
  Route.get('/', 'DataUsersController.index').as('index')
  // Route.get('/:id', 'DataUsersController.show').as('show')
  Route.get('/:id/edit', 'DataUsersController.edit').as('edit')
  Route.post('/:id', 'DataUsersController.update').as('update')
})
  .prefix('/user')
  .middleware('auth')
  .as('user')

Route.get('/leave', async ({ view }: HttpContextContract) => {
  return view.render('leave')
}).as('leave')



// // USER ROUTE
// Route.group(() =>{
//   Route.get('/', '.index').as('index')
// })
//   .middleware('auth')




// POST ROUTES
Route.group(() =>{
  Route.get('/', 'PostsController.index').as('index')
  Route.get('/novo', 'PostsController.create').as('create')
  Route.get('/:id', 'PostsController.show').as('show').where('id', /^[0-9]+$/)
  Route.post('/', 'PostsController.store').as('store')
})
  .prefix('/post')
  .middleware('auth')
  .as('post')
