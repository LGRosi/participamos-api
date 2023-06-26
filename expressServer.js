import cors from "cors";
import express from "express";
import UsersApiRoutes from "./api/routers/users.api.routes.js";
import ChannelsApiRoutes from "./api/routers/channels.api.routes.js";
// import SupportGroupsApiRoutes from "./api/routers/supportGroups.api.routes.js";

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(UsersApiRoutes);

app.use("/api/channels", ChannelsApiRoutes);

// app.use("/api/supportGroups", SupportGroupsApiRoutes);

app.listen(4000, function () {
  console.log(`Server is running on port ${4000} | http://localhost:4000`);
});