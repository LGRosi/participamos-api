import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("ParticipamosDB");
const messages = db.collection("Messages");

async function bringMessages(filterMessages = {}) {
    if (!filterMessages.name) {
        filterMessages = {};
    }

    return client.connect()
        .then(async function () {
            return messages.find(filterMessages).toArray();
        })
        .catch(function (err) {
            return [];
        })
}

async function save(message) {
    const newMessage = {
        ...message,
        dateTime: new Date().toISOString()
    };

    return client.connect()
        .then(function () {
            return messages.insertOne(newMessage);
        })
        .then(function () {
            return newMessage;
        })
}

export {
    bringMessages,
    save
}