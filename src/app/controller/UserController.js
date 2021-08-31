import * as Yup from 'yup';
import User from "../models/Users";

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    //buscar do body para saber se tem algum problema

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({
        message: "Dados inválidos"
      });
    }

    const userExists = await User.findOne({
      where: {
        email: req.body.email
      }
    })

    if (userExists) {
      return res.status(401).json({
        message: "Usuario já existe em nossa base de dados"
      })
    }
    const { id, name, email } = await User.create(req.body)
    return res.json({ id, name, email });

  };
  async index(req, res) {
    const person = {
      name: "Nome da Pessoa",
      age: 21
    }
    return res.status(200).json(person);
  };

  async delete(req, res) {
    return res.status(200).json({ message: 'Isso aí psiti!' });
  };
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      oldPassword: Yup.string().min(6),
      password: Yup.string().when('oldPassword',
        (oldPassword, field) => oldPassword ? field.required().min(6) : field
      ),
      confirmPassword: Yup.string().when('password',
        (password, field) => password ? field.required().min(6).oneOf([Yup.ref('password')]) : field
      ),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({
        messagem: "Falha na validação, por favor confira os dados informados"
      })
    }
    // desestruturação para validar
    const {email, oldPassword} = req.body;

    // validar a estrutura assíncrona pois acessaremos a Model acessando a primary key
    const user = await User.findByPk(req.userId)
    
    // verificar se o email é do usuario 
    if(email && email !== user.email){
      const userExist = await User.findOne({
        where: {email}
      });
      if(userExist){
        return res.status(400).json({
          message: 'Verifique o e-mail do usuário'
        })
      }
      return res.status(400).json({ message: 'Email não confere'})
    }
    if(oldPassword && !(await user.checkPassword(oldPassword))){
      return res.status(400).json({ message: 'Senha não confere'})
    }
   
    // desestruturar do retorno do banco no caso de êxito
    const {id, name, employee} = await user.update(req.body)
    return res.status(200).json({
      id, 
      name, 
      employee
    })
  };
}

export default new UserController();