import express from "express";
import * as channelsApiControllers from "../controllers/channels.api.controllers.js";
import { databaseConfiguration } from "../../middleware/database-configuration.middleware.js";
// import { isLogin, isUser } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.use(databaseConfiguration);

router.route('*')
    // .all([isLogin, isUser]);

router.route("/")
    .get(channelsApiControllers.findAll)
    .post(channelsApiControllers.create);

export default router;