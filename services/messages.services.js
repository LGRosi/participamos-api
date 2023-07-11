import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("ParticipamosDB");
const messages = db.collection("Messages");

async function bringMessages(filterMessages = {}) {
    if (!filterMessages.name) {
        filterMessages = {};
    }

    try {
        await client.connect();
        return await messages.find(filterMessages).toArray();

    } catch (error) {
        return [];
    }
}

async function save(message) {
    const newMessage = {
        ...message,
        dateTime: new Date().toISOString()
    };

    try {
        await client.connect();
        await messages.insertOne(newMessage);
        return newMessage;
    } catch (error) {
        console.error(error);
        throw new Error("Error al guardar el mensaje");
    }
}

export {
    bringMessages,
    save
}