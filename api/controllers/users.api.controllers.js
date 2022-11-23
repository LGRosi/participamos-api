import * as usersService from "../../services/users.services.js";

function find(req, res) {
   const filter = {}

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
   find,
   create,
   remove
}