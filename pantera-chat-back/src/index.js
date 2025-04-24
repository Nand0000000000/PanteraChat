import "dotenv/config";
import express from "express";
import cors from "cors";
import chatRouter from "./routes/chat.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/chat", chatRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Pantera backend on http://localhost:${PORT}`)
);
