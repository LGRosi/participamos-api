import cors from "cors";
import express from "express";
import http from "node:http";
import picocolors from "picocolors";
import { Server as socketServer } from "socket.io";
import UsersApiRoutes from "./api/routers/users.api.routes.js";
import ChannelsApiRoutes from "./api/routers/channels.api.routes.js";
import MessagesApiRoutes from "./api/routers/messages.api.routes.js";
// import SupportGroupsApiRoutes from "./api/routers/supportGroups.api.routes.js";

const app = express();

const server = http.createServer(app);

const io = new socketServer(server);

io.on('connection', socket => {
  	console.log(picocolors.green("Client Connected"));

	socket.on("message", (bodyMessage) => {
		socket.broadcast.emit("message", {
			bodyMessage,
			from: socket.id
		});
	});
})

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(UsersApiRoutes);

app.use("/api/channels", ChannelsApiRoutes);

app.use("/api/messages", MessagesApiRoutes);

// app.use("/api/supportGroups", SupportGroupsApiRoutes);

server.listen(4000, function () {
   	console.log(picocolors.blue(`Server is running on port ${4000} | http://localhost:4000`));
});