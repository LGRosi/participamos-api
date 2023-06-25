import express from "express";
import * as supportGroupsApiControllers from "../controllers/supportGroups.api.controllers";

const router = express.Router();

router.route("/")
   .get(supportGroupsApiControllers.findAll)
   .post(supportGroupsApiControllers.create);

export default router;