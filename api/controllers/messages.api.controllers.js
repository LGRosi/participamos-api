import picocolors from "picocolors";
import { bringMessages, save } from "../../services/messages.services.js";

async function findAll(req, res) {
    try {
        const messages = await bringMessages(req.query, req.db.collection("Messages"));
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
}

async function create(req, res) {
    const message = {
        bodyMessage: req.body.bodyMessage,
        from: req.body.from,
    };

    try {
        const newMessage = await save(message, req.db.collection("Messages"));
        res.status(201).json(newMessage);
    } catch (error) {
        console.error(picocolors.red("Error al guardar el mensaje", error));
        res.status(500).json({ err: "Internal server error" });
    }
}

export {
    findAll,
    create
}