import Route from '@ioc:Adonis/Core/Route'
// import { HttpContext } from '@adonisjs/core/build/standalone';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
// import controller from 'app/Controllers/ Http/DataUsersController'


// LOGIN ROUTES
Route.get('/login', 'SessionsController.create').as('sessions.create')
Route.post('/login', 'SessionsController.postContent').as('sessions.postContent')
Route.get('/logout', 'SessionsController.logout').as('sessions.logout')

// INDEX and SHOW USERS ROUTES
Route.group(() => {
  Route.get('/', 'DataUsersController.index').as('index')
  Route.get('/:id', 'DataUsersController.show').as('show')
})
  .prefix('/users-data')
  .middleware('auth')
  .as('users-data')

Route.get('/', async ({ view }: HttpContextContract) => {
  return view.render('welcome')
})

Route.get('/leave', async ({ view }: HttpContextContract) => {
  return view.render('leave')
}).as('leave')

Route.post('/', 'DataUsersController.postContent')
