import express from "express";
import * as usersApiControllers from "../controllers/users.api.controllers.js";
import { isLoginValidation } from "../../middleware/users-validation.middleware.js";

const router = express.Router();

router.route('/api/users/login')
    .post([isLoginValidation], usersApiControllers.login);

router.route('/api/users/logout')
    .post(usersApiControllers.logout);

router.route('/api/users')
    .get(usersApiControllers.find)
    .post(usersApiControllers.create);

router.route('/api/users/:id')
    .delete(usersApiControllers.remove);

export default router;