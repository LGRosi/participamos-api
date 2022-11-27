import jwt from "jsonwebtoken";
import * as userService from "../services/users.services.js";
import * as tokenService from "../services/token.services.js";

function isLogin(req, res, next) {
   const token = req.headers['auth-token'];

   if (!token) {
      return res.status(401).json({ message: 'No enviaste el token' });
   }
   
   try {
      const payload = jwt.verify(token, 'CLAVE_SECRETA');

      tokenService.findByToken(token)
         .then(token => {
            if(token) {
               userService.findById(payload.id)
                  .then((user) => {
                     req.user = user;
                     next();
                  });
            } else {
               res.status(401).json({ message: 'token inválido' })
            }
         })
   } catch (err) {
      return res.status(401).json({ message: 'Token inválido' });
   }
}

function isUser(req, res, next) {
   if (req.user.email === 'lucas@rosi.com') {
      next();
   } else {
      res.status(401).json({ message: 'No tenes permisos para realizar esta acción' })
   }
}

export {
   isLogin,
   isUser
}