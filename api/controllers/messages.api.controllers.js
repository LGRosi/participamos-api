import * as messagesService from "../../services/messages.services.js";

function findAll(req, res) {
    const filterMessages = req.query;

    messagesService.bringMessages(filterMessages)
        .then(function (messages) {
            res.status(200).json(messages);
        })
        .catch(function (err) {
            res.status(500).json(err);
        });
}

function create(req, res) {
    const message = {
        bodyMessage: req.body.bodyMessage,
        from: req.body.from,
    };

    messagesService.save(message)
        .then(function (newMessage) {
            res.status(201).json(newMessage);
        })
        .catch(function (err) {
            console.error("Error saving message:", err);
            res.status(500).json({ err: "Internal server error" });
        });
}

export {
    findAll,
    create
}