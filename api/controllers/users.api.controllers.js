import jwt from "jsonwebtoken";
import * as usersService from "../../services/users.services.js";
import * as tokenService from "../../services/token.services.js";

function login(req, res) {

   usersService.login(req.body)
      .then(user => {
         const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, 'CLAVE_SECRETA');
         
         tokenService.create({ token, user_id: user._id });
         
         res.json({ token, user });
      })
      .catch(err => {
         res.status(400).json({ message: err.message });
      })
}

function logout(req, res) {
   const token = req.headers['auth-token'];

   tokenService.removeByToken(token)
      .then(() => {
         res.json({ message: 'Logout exitoso' });
      })
      .catch(err => {
         res.status(400).json({ message: err.message });
      })
}

function find(req, res) {
   const filter = {}

   const token = req.headers['auth-token'];

   if (!token) {
      return res.status(401).json({ message: 'No enviaste el token' });
   }
   
   try {
      const payload = jwt.verify(token, 'CLAVE_SECRETA')
   } catch (err) {
      return res.status(401).json({ message: 'Token inválido' });
   }

   usersService.find(filter)
      .then(users => res.json(users))
}

function create(req, res) {
   const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
   }

   usersService.create(user)
      .then(user => {
         res.json(user);
      })
      .catch(err => {
         res.status(400).json({ message: err.message });
      })
}

function remove(req, res) {
   const id = req.params.id;

   usersService.remove(id)
      .then(() => res.json({ message: 'Usuario eliminado' }))
      .catch(err => res.status(400).json({ message: err.message }))
}


export {
   login,
   logout,
   find,
   create,
   remove,
}