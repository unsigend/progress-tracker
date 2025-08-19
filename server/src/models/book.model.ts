import { Schema, model } from "mongoose";

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: false },
    description: { type: String, required: false },
    pages: { type: Number, required: false },
    image: { type: String, required: false },
    ISBN: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const BookModel = model("Book", bookSchema);

export default BookModel;
