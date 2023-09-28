import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import { validateBooks } from "./validations.js";
import { Book } from "./models/bookModel.js";
import mongoose from "mongoose";

const app = express();

//middleware for parsing request body

app.use(express.json())

app.post("/books", async (req, res) => {
    try {
        if (validateBooks(req.body)) {
            const newBook = {
                title: req.body.title,
                author: req.body.author,
                publishYear: req.body.publishYear,
            }
            const insertBook = await Book.create(newBook)
            res.status(201).json({
                message: "sucess",
                data: { insertBook }
            })
        }
        else {
            res.status(400).json({
                message: "send all required fields: title,author,publishYear"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

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