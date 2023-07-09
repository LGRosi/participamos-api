import * as messagesService from "../../services/messages.services.js";

// function findAll(req, res) {
//     const filterMessages = req.query;

//     messagesService.bringChannels(filterMessages)
//         .then(function (messages) {
//             res.status(200).json(messages);
//         })
//         .catch(function (err) {
//             res.status(500).json(err);
//         });
// }

// function create(req, res) {
//     const message = {
//         name: req.body.name
//     };

//     messagesService.save(message)
//         .then(function (newMessage) {
//             res.status(201).json(newMessage);
//         })
//         .catch(function (err) {
//             res.status(500).json(err);
//         });
// }

function create(req, res) {
    const message = {
        bodyMessage: req.body.bodyMessage, // Asegúrate de que el nombre del campo en el body coincida con lo que estás enviando desde el frontend
        from: req.body.from, // Asegúrate de que el nombre del campo en el body coincida con lo que estás enviando desde el frontend
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
    // findAll,
    create
}