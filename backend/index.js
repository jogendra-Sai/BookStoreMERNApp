import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import booksRouter from "./routes/booksRoute.js";
import mongoose from "mongoose";
import cors from "cors"

const app = express();

//middleware for parsing request body

app.use(express.json());
app.use(cors());
// app.use(cors(
//     {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST", "DELETE", "PUT"],
//         allowedHeaders: ["Content-Type"]
//     }
// ));
app.use("/books", booksRouter)

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("App is connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening on port :${PORT}`);
        })
    })
    .catch((error) => {
        console.log("error", error);
    })