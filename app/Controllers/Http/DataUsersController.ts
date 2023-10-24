import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Document from 'App/Models/Document'

// function printUsers(users) {
//     users.forEach((value, index, arr) => { Object.keys(value).forEach(key => console.log(`${key}: ${value[key]}`)) });
// }

export default class DataUsersController {

    public async index({ view, auth }: HttpContextContract) {
        /* AUTENTICACAO FORÇADA */
        // await auth.use('web').authenticate()
        // console.log(auth.user!)
        const dataUsers = await Document.all()
        return view.render('documents/index', { dataUsers })
    }
    public async show({ view, params }: HttpContextContract) {
        // const user = dataUsers[params.id]
        const user = await Document.find(params.id)
        return view.render('documents/show', { user })
    }

    // public showUser({ response, params }: HttpContextContract) {
    //     return response.json(dataUsers[params.id])
    // }
    public store({ response, request }: HttpContextContract) {
        const text = request.input('text');
        const dataUser = {
            id: 10,
            name: text,
        };
        // const dataUser = await Document.create({text})

        dataUsers.push(dataUser);
        return response.json(dataUser);
    }

    public async postContent({ response, request }) {

        // dataUsers.forEach((value, index, arr) => { Object.keys(value).forEach(key => console.log(`${key}: ${value[key]}`)) });
        // PEGANDO TODO O ARRAY DE OBJETOS DE DADOS DO USER
        const dataUsers = await Document.all()
        // printUsers(dataUsers);
        // console.log(`Antes de adicionar: ${dataUsers}`);
        // return response.send.json(dataUsers)

        // PEGANDO O VALOR DO INPUT DO INDEX
        let name = request.input('nameInput');

        // const dataUser = {
        //     id: 10,
        //     name: name,
        // };
        // CRIANDO UM NOVO NOME DE USER NA TABELA
        const dataUser = await Document.create({ name })

        // ADICIONANDO O OBJETO NOVO
        dataUsers.push(dataUser);
        // printUsers(dataUsers);
        return response.json(dataUsers);
    }


}
