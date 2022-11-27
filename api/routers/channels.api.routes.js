import express from "express";
import * as channelsApiControllers from "../controllers/channels.api.controllers.js";
import jwt from "jsonwebtoken";

function isLogin(req, res, next) {
   const token = req.headers['auth-token'];

   if (!token) {
      return res.status(401).json({ message: 'No enviaste el token' });
   }
   
   try {
      const payload = jwt.verify(token, 'CLAVE_SECRETA')
   } catch (err) {
      return res.status(401).json({ message: 'Token inválido' });
   }

   next()
}

const router = express.Router();

router.route("/")
   .get([isLogin], channelsApiControllers.findAll)
   .post(channelsApiControllers.create);

export default router;