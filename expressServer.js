import cors from "cors";
import express from "express";
import http from "node:http";
import picocolors from "picocolors";
import { findAvailablePort } from "./middleware/free-port.middleware.js";
import { Server as socketServer } from "socket.io";
import UsersApiRoutes from "./api/routers/users.api.routes.js";
import ChannelsApiRoutes from "./api/routers/channels.api.routes.js";
import MessagesApiRoutes from "./api/routers/messages.api.routes.js";
// import SupportGroupsApiRoutes from "./api/routers/supportGroups.api.routes.js";

const app = express();

const server = http.createServer(app);

const io = new socketServer(server);

const desiredPort = process.env.PORT ?? 4000;

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

findAvailablePort(desiredPort).then(port => {
	server.listen(port, () => {
		console.log(picocolors.blue(`Server is running on port http://localhost:${port}`));
	})
});