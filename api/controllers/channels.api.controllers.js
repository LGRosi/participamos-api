import { bringChannels, save } from "../../services/channels.services.js";

async function findAll(req, res) {
    try {
        const channels = await bringChannels(req.query, req.db.collection("Channels"));
        res.status(200).json(channels);
    } catch (err) {
        res.status(500).json(err);
    }
}

async function create(req, res) {
    const channel = {
        name: req.body.name
    };

    try {
        const newChannel = await save(channel, req.db.collection("Channels"));
        res.status(201).json(newChannel);
    } catch (error) {
        console.error(picocolors.red("Error al guardar el canal", error));
        res.status(500).json({ error: "Error interno del servidor" });
    }
}


export {
    findAll,
    create
}