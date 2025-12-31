import express from "express";
import { connectMongo } from "./database/mongoCon.js";
import userRoutes from "./routes/usersRoutes.js";
import messageRoute from "./routes/messagesRoute.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import authMiddleware from "./middleware/authMiddleware.js";
import "dotenv/config";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.use("/messages", authMiddleware, messageRoute);

//this will connect to the mongo db database.
await connectMongo({
  uri: process.env.MONGO_URL,
  dbName: process.env.MONGO_DATABASE_NAME,
});

app.use(errorMiddleware);

app.listen(process.env.PORT, (err) => {
  console.log(
    `server running successfully at - http://www.localhost:${process.env.PORT}`
  );
});
