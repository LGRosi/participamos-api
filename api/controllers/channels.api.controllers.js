import * as channelsService from "../../services/channels.services.js";


function findAll(req, res) {
   const filterChannels = req.query;

   channelsService.bringChannels(filterChannels)
      .then(function (channels) {
         res.status(200).json(channels);
      })
      .catch(function (err) {
         res.status(500).json(err);
      });
}

function create(req, res) {
   const channel = {
      name: req.body.name
   };

   channelsService.save(channel)
      .then(function (newChannel) {
         res.status(201).json(newChannel);
      })
      .catch(function (err) {
         res.status(500).json(err);
      });
}


export {
   findAll,
   create
}