import * as messagesService from "../../services/messages.services.js";
import picocolors from "picocolors";

async function findAll(req, res) {
    const filterMessages = req.query;

    try {
        const messages = await messagesService.bringMessages(filterMessages);
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
        const newMessage = await messagesService.save(message);
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