import { loginScheme } from "../schemes/users.schemes.js";

function isLoginValidation(req, res, next) {
    loginScheme.validate(req.body, {abortEarly: false})
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