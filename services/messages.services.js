import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("ParticipamosDB");
const messages = db.collection("Messages");

// async function bringChannels(filterMessages = {}) {
//     if (!filterMessages.name) {
//         filterMessages = {};
//     }

//     return client.connect()
//         .then(async function () {
//             return messages.find(filterMessages).toArray();
//         })
//         .catch(function (err) {
//             return [];
//         })
// }

async function save(message) {
    const newMessage = {
        ...message,
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
    // bringChannels,
    save
}