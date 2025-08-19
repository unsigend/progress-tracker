// import dependencies
import { Request, Response, NextFunction } from "express";

// import services
import bookService from "@/service/book.service";

const bookController = {
    getBookByID: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const book = await bookService.getBookByID(id);
            res.status(200).json(book);
        } catch (error) {
            next(error);
        }
    },
    getBooks: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const books = await bookService.getBooks();
            res.status(200).json(books);
        } catch (error) {
            next(error);
        }
    },
    createBook: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const book = await bookService.createBook(req.body);
            res.status(201).json(book);
        } catch (error) {
            next(error);
        }
    },
    updateBook: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const book = await bookService.updateBook(id, req.body);
            res.status(200).json(book);
        } catch (error) {
            next(error);
        }
    },
    deleteBookByID: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await bookService.deleteBookByID(id);
            res.status(200).json({
                message: "Book deleted successfully",
                id: id,
            });
        } catch (error) {
            next(error);
        }
    },
};

export default bookController;
