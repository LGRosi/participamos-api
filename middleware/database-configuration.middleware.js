import { MongoClient } from "mongodb";

const databaseConfiguration = (req, res, next) => {
    const client = new MongoClient("mongodb://127.0.0.1:27017");

    try {
        client.connect().then(() => {
            req.dbClient = client;
            req.db = client.db("ParticipamosDB");
            next();
        });

    } catch (error) {
        console.error("Error al conectarse con la base de datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export {
    databaseConfiguration
};