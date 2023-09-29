import express from "express";
import { Book } from "../models/bookModel.js";
import { validateBooks } from "../validations.js";

const router = express.Router();


//Route to Post the books in to DataBase
router.post("/", async (req, res) => {
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
                data: insertBook
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

//Route to Get all the Books from DB
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        if (books.length > 0) {
            res.status(200).json({
                message: "Ok",
                count: books.length,
                data: books
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

//Route to fetch the data by using ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const books = await Book.findById(id);
        res.status(200).send(books)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

//Route for Updating the book
router.put("/:id", async (req, res) => {
    try {
        if (!validateBooks(req.body)) {
            return res.status(400).json({
                message: "Send all required fields: title,author,publishYear"
            })
        } else {
            const { id } = req.params;
            const result = await Book.findByIdAndUpdate(id, req.body);
            console.log("result", result);
            if (!result) {
                console.log("coming here");
                return res.status(404).json({ message: "Book not found" })
            } else {
                return res.status(200).json({ message: `Book with ${id} updated successfully` })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

//Delete the Book
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "Book not found" })
        }
        return res.status(200).json({
            message: "Book Deleted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

export default router;