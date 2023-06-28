import express, { json } from "express";
import path from "path";
import dotenv from "dotenv";
import color from "colors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import userRoutes from "./routes/userRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import colorRoutes from "./routes/colorRoutes.js";
import modelRoutes from "./routes/modelRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import User from "./models/userModel.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 5000;

app.get(`/`, (req, res) => {
  res.send(`Hello Express`);
});

app.use("/api/users", userRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/colors", colorRoutes);
app.use(`/api/models`, modelRoutes);
app.use(`/api/products`, productRoutes);
app.use("/api/customers", customerRoutes);
// app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//customer-error
app.use(notFound);
app.use(errorHandler);

//socket io

const httpServer = createServer(app);

const io = new Server(httpServer, {
  allowEIO3: true,
  cors: {
    origin: true,
    credentials: true,
  },
});

// io.on("connection", async (socket) => {
//   console.log("a user connected");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });

//   socket.on("my message", (msg) => {
//     console.log("message: " + msg);
//   });
//   socket.on("my message", (msg) => {
//     // io.emit("my broadcast", `server: ${msg}`);
//     io.emit("my broadcast", msg);
//   });
// });

// listen on port 5000
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
