const express = require('express');
const UserModel = require('./../model/Users');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Você está na página inicial do login, para registrar um usuário use a rota /register em modo POST');
});

router.post('/register', async (req, res) => {
  const UserData = req.body;

  try {
    // Procurar o usuário pelo email no banco de dados
    const existingUser = await UserModel.findOne({ email: UserData.email });

    if (existingUser) {
      // Se o email já existe no banco de dados, retorne um erro informando que o usuário já está registrado
      return res.status(409).send('O email já está registrado');
    }else {
      // Se o email não existe, crie o novo usuário
      const newUser = await UserModel.create(UserData);
      res.send(newUser);
    }
    
  } catch (error) {
    // Em caso de erro, retorne uma resposta de erro com o status 500
    res.status(500).send('Ocorreu um erro ao criar o usuário');
  }
});

module.exports = router