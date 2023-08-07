import jwt from "jsonwebtoken";
import * as usersService from "../../services/users.services.js";
import * as tokenService from "../../services/token.services.js";

async function login(req, res) {
	try {
		const user = await usersService.login(req.body);
		const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, 'CLAVE_SECRETA');
		await tokenService.create({ token, user_id: user._id });
		res.json({ token, user });

	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

async function logout(req, res) {
	const token = req.headers['auth-token'];
	try {
		await tokenService.removeByToken(token);
		res.json({ message: 'Logout exitoso' });

	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

async function find(req, res) {
	const filter = {};
	const token = req.headers['auth-token'];

	if (!token) {
		return res.status(401).json({ message: 'No enviaste el token' });
	}

	try {
		jwt.verify(token, 'CLAVE_SECRETA');
		const users = await usersService.find(filter);
		res.json(users);

	} catch (error) {
		res.status(401).json({ message: 'Token inválido' });
	}
}

async function create(req, res) {
	const user = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	};

	try {
		const newUser = await usersService.create(user);
		res.json(newUser);

	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

async function remove(req, res) {
	const id = req.params.id;

	try {
		await usersService.remove(id);
		res.json({ message: 'Usuario eliminado' });
		
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

export {
	login,
	logout,
	find,
	create,
	remove,
};
