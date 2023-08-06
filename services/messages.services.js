import picocolors from "picocolors";

async function bringMessages(filterMessages = {}, dbCollection) {
    if (!filterMessages.name) {
        filterMessages = {};
    }

    try {
        return await dbCollection.find(filterMessages).toArray();
    } catch (error) {
        return [];
    }
}

async function save(message, dbCollection) {
    const newMessage = {
        ...message,
        dateTime: new Date().toISOString()
    };

    try {
        await dbCollection.insertOne(newMessage);
        return newMessage;
    } catch (error) {
        console.error(picocolors.red('Error al guardar el mensaje', error));
        throw new Error("Error al guardar el mensaje");
    }
}

export {
    bringMessages,
    save
}