import express from "express";
import * as messagesApiControllers from "../controllers/messages.api.controllers.js";

const router = express.Router();

router.route("/")
    .get(messagesApiControllers.findAll)
    .post(messagesApiControllers.create);

export default router;