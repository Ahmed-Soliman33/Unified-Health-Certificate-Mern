import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./src/app";
dotenv.config();

const DB_URI = process.env.DB_URI || "";

mongoose
  .connect(DB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
// @ts-ignore
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err: any) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
