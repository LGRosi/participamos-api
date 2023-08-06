async function bringChannels(filterChannels = {}, dbCollection) {
    if (!filterChannels.name) {
        filterChannels = {};
    }

    try {
        return await dbCollection.find(filterChannels).toArray();
    } catch (error) {
        return [];
    }
}

async function save(channel, dbCollection) {
    const newChannel = {
        ...channel,
    };

    try {
        await dbCollection.insertOne(newChannel);
        return newChannel;
    } catch (error) {
        console.error(picocolors.red('Error al guardar el canal', error));
        throw new Error("Error al guardar el canal");
    }
}


export {
    bringChannels,
    save
}