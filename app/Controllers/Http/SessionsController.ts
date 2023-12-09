import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Document from 'App/Models/Document'

export default class SessionsController {
    public async create({ view, auth }: HttpContextContract) {
        return view.render('sessions/login')
    }
    public async store({ auth, view, response, request }) {
        // PEGANDO TODO O ARRAY DE OBJETOS DE DADOS DO USER
        const dataUsers = await Document.all()
        // PEGANDO O VALOR DO INPUT DO INDEX
        let email = request.input('email-input-name');
        let passw = request.input('passw-input-name');

        // console.log(email)
        // console.log(passw)

        try {
            await auth.use('web').attempt(email, passw)
            response.redirect().toRoute('home')
        } catch {
            return response.badRequest('ERROR')
        }
        return response.json(dataUsers)
    }

    public async logout({ auth, view, response, request }) {
        // PEGANDO TODO O ARRAY DE OBJETOS DE DADOS DO USER
        await auth.use('web').logout()
        return response.redirect('leave')
    }

}
