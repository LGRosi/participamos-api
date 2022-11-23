import express from "express";
import * as channelsApiControllers from "../controllers/channels.api.controllers.js";

const router = express.Router();

router.route("/")
   .get(channelsApiControllers.findAll)
   .post(channelsApiControllers.create);

export default router;