const User = require('../models/user');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const Rol = require('../models/rol')
const storage = require('../utils/cloud_storage');
const nodemail = require('nodemailer');
const user = "2bitsw@gmail.com";
const pass = "H151005M";

function geraStringAleatoria(tamanho) {
    var stringAleatoria = '';
    var caracteres = '0123456789';
    for (var i = 0; i < tamanho; i++) {
        stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return stringAleatoria;
}
console.log(geraStringAleatoria(6));


module.exports = {
    
    async getAll(req, res, next) {
        try {
            const data = await User.getAll();    
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Erro em buscar os usuários'
            });
        }
    },
    async findByRole(req, res, next) {
        try {
            const role = req.params.role;
            console.log(`Rolex: ${role}`);

            const data = await User.findByRole(role);    
            console.log(`Usuario: ${data}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Erro ao buscar o usuario por Role'
            });
        }
    },

    

    async findById(req, res, next) {
        try {
            const id = req.params.id;

            const data = await User.findByUserId(id);    
            console.log(`Usuario: ${data}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Erro ao buscar o usuario por ID'
            });
        }
    },

    async findByEmail(req, res, next) {
        try {
            const email = req.params.email;

            const data = await User.findByEmail(email);  
            console.log(`STATUS: ${res}`);  
            
           if(data==null){
            return res.status(501).json({
                success: false,
                message: 'Não encontramos seu email!'
            });

           }else
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Erro ao buscar o usuario por Email'
            });
        }
    },
  
    async register(req, res, next) {
        try {            
            const user = req.body;
            const data = await User.create(user);

            await Rol.create(data.id, 1); // ROL POR DEFECTO (CLIENTE)
           
            return res.status(201).json({
                success: true,
                message: 'Registro realizado com Sucesso!',
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Houve un erro com eol registro do usuario',
                error: error
            });
        }
    },

    async registerWithImage(req, res, next) {
        try {
            
            const user = JSON.parse(req.body.user);
            console.log(`Datos enviados del usuario: ${user}`);
          
            const files = req.files;

            if (files.length > 0) {
                const pathImage = `image_${Date.now()}`; // NOMBRE DEL ARCHIVO
                const url = await storage(files[0], pathImage);

                if (url != undefined && url != null) {
                    user.image = url;
                }
            }

            const data = await User.create(user);

            await Rol.create(data.id, 1); // ROL POR DEFECTO (CLIENTE)

            return res.status(201).json({
                success: true,
                message: 'Registro realizado com Sucesso!',
                data: data.id
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Houve un erro con o registro do usuario',
                error: error
            });
        }
    },
    async update(req, res, next) {
        try {
            const id_category = req.params.id_category; // CLIENTE
            const user = JSON.parse(req.body.user);
            console.log(`Datos enviados del usuario: ${JSON.stringify(user)}`);

            const files = req.files;

            if (files.length > 0) {
                const pathImage = `image_${Date.now()}`; // NOMBRE DEL ARCHIVO
                const url = await storage(files[0], pathImage);

                if (url != undefined && url != null) {
                    user.image = url;
                }
            }

            await User.update(user);

            return res.status(201).json({
                success: true,
                message: 'Os dados do usuario foram atualizados com sucesso'
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Houve un erro com a atualização dos dados do usuario',
                error: error
            });
        }
    },

 


    
    async login(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            const myUser = await User.findByEmail(email);

            if (!myUser) {
                return res.status(401).json({
                    success: false,
                    message: 'O email não foi encontrado'
                });
            }

            if (User.isPasswordMatched(password, myUser.password)) {
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {
                    // expiresIn: (60*60*24) // 1 HORA
                    // expiresIn: (60 * 3) // 2 MINUTO
                });
                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`,
                    array_to_json: myUser.array_to_json
                }
                console.log(`usuario enviado ${data}`);
                await User.updateToken(myUser.id, `JWT ${token}`);

                console.log(`USUARIO ENVIADO ${data}`);

                return res.status(201).json({
                    success: true,
                    data: data,
                    message: 'O usuario está autenticado'
                });
            }
            else {
                return res.status(401).json({
                    success: false,
                    message: 'A senha não está correta'
                   
                });
            }

        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Erro ao fazer login login',
                error: error
            });
        }
    },
    async logout(req, res, next) {

        try {
            const id = req.body.id;
            await User.updateToken(id, null);
            return res.status(201).json({
                success: true,
                message: ' Sessão do usuario foi finalizada'
            });
        } 
        catch(e) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Erro no momento de encerrar a sessão',
                error: error
            });
        }
    },

    async send(req, res, next) {  
        const email = req.body.email;  
            const transporter = nodemail.createTransport(
                {
                    host:"smtp.gmail.com",
                    port:587,
                    auth:{user,pass}
                }
            )
            transporter.sendMail({
                from:user,
                to:email,
                replyTo:email,
                subject:"Recuperação de senha",
                html: "<!doctype html>\n" +
				"<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\"\n" +
				"xmlns:th=\"http://www.thymeleaf.org\">\n" +
				"<head>\n" +
				"<meta charset=\"UTF-8\">\n" +
				"<meta name=\"viewport\"\n" +
				"content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\">\n" +
				"<meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n" +
				"<title>Email</title>\n" +
				"</head>\n" +
				"<body>\n" +
                "<div> Olá <h3>" + email + "</h3></div>\n" +
				"<div><b>Esse é um Email de Recuperação de Senha para o sistema Fidelizze<\b></div>\n" +			
				"<div> Se não foi você que solicitou ignore esse email</div>\n" +			
				"<div> Para alterar sua senha clique no link abaixo:</div>\n" +
                "<div> <a href='https://app-fidelizze.surge.sh/#recovery'>Fidelizze</a></div>\n" +
				"</body>\n" +
				"</html>\n"

                
            }).then(info=>{

                res.send(info)
            }).catch(error =>{
                res.send(error)
            })
           
    },
    async recovery(req, res, next) {  
        console.log(` req ${req.body.name}`);
        try {
            let user = req.body;
            
           await User.recover(user);
           
            return res.status(201).json({
                success: true,
                message: 'Senha atualizada com Sucesso'
            });
        } 
        catch(e) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Erro ao atuazlizar a senha',
                error: error
            });
        }
           
    },
    async esqueci(req, res, next) {  
        console.log(` req ${req.body.name}`);
        try {
            let user = req.body;
            
           await User.esqueci(user);
           
            return res.status(201).json({
                success: true,
                message: 'Requizição enviada com sucesso'
            });
        } 
        catch(e) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Erro ao enviar a solicitação de alteração de senha',
                error: error
            });
        }
           
    }

}