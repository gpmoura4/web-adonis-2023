import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

// function printUsers(users) {
//     users.forEach((value, index, arr) => { Object.keys(value).forEach(key => console.log(`${key}: ${value[key]}`)) });
// }

export default class DataUsersController {

    public async index({ view, auth }: HttpContextContract) {
        /* AUTENTICACAO FORÇADA */
        // await auth.use('web').authenticate()
        // // console.log(auth.user!)
        const dataUsers = await User.all()
        // return view.render('users/profile', { dataUsers })
    }

    public async show({ view, params }: HttpContextContract) {
     /* AUTENTICACAO FORÇADA */
        // await auth.use('web').authenticate()
        // console.log(auth.user!)
        const dataUsers = await User.all()
        return view.render('users/profile', { dataUsers })
    }
    
    /*Validando e criando nova conta*/
    public async store({ response, request, view }:HttpContextContract) {

     // Validando
     const validationSchema = schema.create({
        name: schema.string([
            // rules.alpha(),
            rules.minLength(3),
            rules.maxLength(25),
            // rules.trim(),
            rules.escape(),
            rules.regex(/^[A-Z][a-zA-Z ]*$/)
        ]),
        last_name: schema.string([
            rules.alpha(),
            rules.minLength(3),
            rules.maxLength(25),
            rules.trim(),
            rules.escape(),
            rules.regex(/^[A-Z][a-zA-Z ]*$/)
        ]),
        
        email: schema.string({trim:true}, [
            rules.email(),
            rules.maxLength(100),
            rules.minLength(6),
            rules.unique({ table: 'users', column: 'email' }),
            rules.normalizeEmail({
                allLowercase: true,
                gmailRemoveDots: true,
                gmailRemoveSubaddress: true,
            }),
            ]),
        password: schema.string([
            rules.trim(),
            rules.maxLength(12),
            rules.minLength(6),
            /*A senha deve ter 4 número, uma letra e um caractere especial*/
            // rules.regex(/^(?=(?:\D*\d){4})(?=[^a-zA-Z]*[a-zA-Z])(?=[^@#$%^&+=!]*[@#$%^&+=!]).*$/)
        ])
        })
            
        const validatedData = await request.validate({
            schema: validationSchema,
            messages:{
                /*NOME*/
                'name.required':'O nome não pode estar vazio',
                'name.alpha':'O nome deve conter apenas letras',
                'name.regex':'O nome deve começar com letra maiúscula',
                'name.maxLength':'O nome não pode ter mais que 25 caracteres',
                'name.minLength':'O nome não pode ter menos que 3 caracteres',
                /*SOBRENOME*/
                'last_name.required':'O sobrenome não pode estar vazio',
                'last_name.regex':'O sobrenome deve começar com letra maiúscula',
                'last_name.alpha':'O sobrenome deve conter apenas letras',
                'last_name.maxLength':'O sobrenome não pode ter mais que 25 caracteres',
                'last_name.minLength':'O sobrenome não pode ter menos que 3 caracteres',
                /*EMAIL*/
                'email.unique':'Esse usuário já existe',
                'email.required':'O email não pode estar vazio',
                'email.maxLength':'O email não pode ter mais que 100 caracteres',
                'email.minLength':'O email não pode ter menos que 6 caracteres',
                /*SENHA*/
                'password.required':'A senha não pode estar vazia',
                'password.minLength':'A senha não pode ter menos que 6 caracteres',
                'password.maxLength':'A senha não pode ter mais que 12 caracteres',
                'password.regex':'A senha deve conter no mínimo 4 números, uma letra e um caractere especial',
            }
        })
        
        // PEGANDO TODO O ARRAY DE OBJETOS DE DADOS DO USER
        const dataUsers = await User.all()
        // CRIANDO UM NOVO EMAIL DE USER NA TABELA
        const dataUser = await User.create({ 
            name: validatedData.name, 
            last_name: validatedData.last_name, 
            email: validatedData.email, 
            password : validatedData.password,
        })
        
        // ADICIONANDO O OBJETO NOVO
        dataUsers.push(dataUser);

        return response.redirect().toRoute('sessions.login')
    }

    // Aqui será a função para editar os dados do usuário
    public async edit({view, auth, params}: HttpContextContract) {

        const user = await User.find(auth.user.id)        
        return view.render('users/edit', {user : user})
    }    

    // Aqui será a função para editar os dados do usuário
    public async update({response,request, auth, params}: HttpContextContract) {
        
    // console.log('------------------------------ TESTE')
    // // Validando
    const validationSchema = schema.create({
        name: schema.string([
            // rules.alpha(),
            rules.minLength(3),
            rules.maxLength(25),
            // rules.trim(),
            rules.escape(),
            rules.regex(/^[A-ZÁÀÃÉÈÍÌÓÒÔÕÚÙÇa-záàãéèíìóòôõúùç ]*$/)
        ]),
        last_name: schema.string([
            rules.alpha(),
            rules.minLength(3),
            rules.maxLength(25),
            rules.trim(),
            rules.escape(),
            rules.regex(/^[A-ZÁÀÃÉÈÍÌÓÒÔÕÚÙÇa-záàãéèíìóòôõúùç ]*$/)
        ]),
        
        email: schema.string({trim:true}, [
            rules.email(),
            rules.maxLength(100),
            rules.minLength(6),
            rules.normalizeEmail({
                allLowercase: true,
                gmailRemoveDots: true,
                gmailRemoveSubaddress: true,
            }),
            ]),
        password: schema.string([
            rules.trim(),
            rules.maxLength(12),
            rules.minLength(6),
            /*A senha deve ter 4 número, uma letra e um caractere especial*/
            // rules.regex(/^(?=(?:\D*\d){4})(?=[^a-zA-Z]*[a-zA-Z])(?=[^@#$%^&+=!]*[@#$%^&+=!]).*$/)
        ])
        })
        
        
        const validatedData = await request.validate({
            schema: validationSchema,
            messages:{
                /*NOME*/
                'name.required':'O nome não pode estar vazio',
                'name.alpha':'O nome deve conter apenas letras',
                'name.regex':'O nome deve começar com letra maiúscula',
                'name.maxLength':'O nome não pode ter mais que 25 caracteres',
                'name.minLength':'O nome não pode ter menos que 3 caracteres',
                /*SOBRENOME*/
                'last_name.required':'O sobrenome não pode estar vazio',
                'last_name.regex':'O sobrenome deve começar com letra maiúscula',
                'last_name.alpha':'O sobrenome deve conter apenas letras',
                'last_name.maxLength':'O sobrenome não pode ter mais que 25 caracteres',
                'last_name.minLength':'O sobrenome não pode ter menos que 3 caracteres',
                /*EMAIL*/
                'email.required':'O email não pode estar vazio',
                'email.maxLength':'O email não pode ter mais que 100 caracteres',
                'email.minLength':'O email não pode ter menos que 6 caracteres',
                /*SENHA*/
                'password.required':'A senha não pode estar vazia',
                'password.minLength':'A senha não pode ter menos que 6 caracteres',
                'password.maxLength':'A senha não pode ter mais que 12 caracteres',
                'password.regex':'A senha deve conter no mínimo 4 números, uma letra e um caractere especial',
            }
        })
        // console.log('teSTE');

        // PEGANDO TODO O ARRAY DE OBJETOS DE DADOS DO USER
        const dataUsers = await User.all()
        // CRIANDO UM NOVO EMAIL DE USER NA TABELA
        let dataUser = await User.find(auth.user.id)

        if (!dataUser) return response.status(404).send('Usuário não encontrado');
          
        dataUser.merge({ 
            name: validatedData.name, 
            last_name: validatedData.last_name, 
            email: validatedData.email, 
            password : validatedData.password,
        })
        
        await dataUser.save()
        // ADICIONANDO O OBJETO NOVO
        // dataUsers.push(dataUser);
        return response.redirect().toRoute('user.show')
    }    

    public async destroy({ auth, params, view}: HttpContextContract) {
        // const user = await User.findOrFail(params.id)
        // // const authorName = await auth.user.name
        // if(user.id == auth.user.id){
        //   await user.delete()
        // }
        
        const user = await User.find(auth.user.id)
        await user.delete()
    
        return view.render('sessions/login');
    
      }


}
