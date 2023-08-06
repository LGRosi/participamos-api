import { loginSchema } from "../schema/users.schema.js";

function isLoginValidation(req, res, next) {
    loginSchema.validate(req.body, {abortEarly: false})
        .then(data => {
            req.body = data;
            next();
        })
        .catch(err => {
            res.status(400).json({ message: err.message, errors: err.errors })
        })
}

export {
    isLoginValidation
}