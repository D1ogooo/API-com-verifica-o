const express = require('express');
const UserModel = require('./../model/Users');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Você está na página inicial do login, para registrar um usuário use a rota /register em modo POST');
});

router.post('/register', async (req, res) => {
  const UserData = req.body;

  try {
    const existingEmailUser = await UserModel.findOne({email: UserData.email});
    const existingPasswordUser = await UserModel.findOne({name: UserData.name});

    if (existingEmailUser) {
      return res.status(409).send('Email já está em uso');
    }
    
    if(existingPasswordUser){
      return res.status(409).send('Senha já está em uso');
    }  
    
    else {
      const newUser = await UserModel.create(UserData);
      res.send(newUser);
    }
    
  } catch (error) {
    res.status(500).send('Ocorreu um erro ao criar o usuário');
  }
});

module.exports = router
