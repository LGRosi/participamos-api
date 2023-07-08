// import { MongoClient } from "mongodb";

// const client = new MongoClient("mongodb://127.0.0.1:27017");
// const db = client.db("ParticipamosDB");
// const channels = db.collection("SupportGroups");

// async function bringChannels(filterChannels = {}) {
//    if (!filterChannels.name) {
//       filterChannels = {};
//    }

//    return client.connect()
//       .then(async function () {
//          return channels.find(filterChannels).toArray();
//       })
//       .catch(function (err) {
//          return [];
//       })
// }

// async function save(channel) {
//    const newChannel = {
//      ...channel,
//    };

//    return client.connect()
//       .then(function () {
//          return channels.insertOne(newChannel);
//       })
//       .then(function () {
//          return newChannel;
//       })
// }


// export {
//    bringChannels,
//    save
// }