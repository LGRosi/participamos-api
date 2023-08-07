import express from "express";
import * as messagesApiControllers from "../controllers/messages.api.controllers.js";
import { databaseConfiguration } from "../../middleware/database-configuration.middleware.js";

const router = express.Router();

router.use(databaseConfiguration);

router.route("/")
    .get(messagesApiControllers.findAll)
    .post(messagesApiControllers.create);

export default router;