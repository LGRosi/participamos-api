import jwt from "jsonwebtoken";
import * as userService from "../services/users.services.js";
import * as tokenService from "../services/token.services.js";

async function isLogin(req, res, next) {
    const token = req.headers['auth-token'];

    if (!token) {
        return res.status(401).json({ message: 'No enviaste el token' });
    }

    try {
        const payload = jwt.verify(token, 'CLAVE_SECRETA');
        const tokenDoc = await tokenService.findByToken(token);

        if (tokenDoc) {
            const user = await userService.findById(payload.id);
            if (user) {
                req.user = user;
                next();
            } else {
                res.status(401).json({ message: 'Usuario no encontrado' });
            }
        } else {
            res.status(401).json({ message: 'Token inválido' });
        }
        
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
}

function isUser(req, res, next) {
    if (req.user.email === 'lucas@rosi.com') {
        next();
    } else {
        res.status(401).json({ message: 'No tienes permisos para realizar esta acción' });
    }
}

export {
    isLogin,
    isUser
};