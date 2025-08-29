// import dependencies
import httpErrors from "http-errors";

// import types
import { BookType, BookQueryParamsType } from "@root/shared/types";

// import models
import BookModel from "@/models/book.model";

// import util
import { isValidISBN } from "@/util/ISBN";

// private API for interacting with database

/**
 * Get all books
 * @param queryObject - BookQueryParamsType containing the query config
 * @returns The books in Promise
 *
 * the default sortBy is createdAt
 * the default sortOrder is desc (latest to oldest)
 * the default page is 1
 * the default limit is 10
 *
 * the sortBy can be: title | createdAt | ISBN
 * the sortOrder can be: asc | desc
 * the page can be any number
 */
const _getAllBooks = async (
    queryObject: BookQueryParamsType
): Promise<BookType[]> => {
    const _filterObject: any = {};
    const _projectionObject: any = null;
    const _optionsObject: any = {};

    const _defaultSortBy = "createdAt";
    const _defaultSortOrder = "desc";
    const _defaultPage = 1;
    const _defaultLimit = 10;

    const _sortBy = queryObject.sortBy || _defaultSortBy;
    const _sortOrder = queryObject.sortOrder || _defaultSortOrder;
    const _page = queryObject.page || _defaultPage;
    const _limit = queryObject.limit || _defaultLimit;
    const _skip = (_page - 1) * _limit;

    if (queryObject.search && queryObject.search.trim()) {
        // trim whitespace
        queryObject.search = queryObject.search.trim();

        // Validate ISBN
        if (queryObject.search && isValidISBN(queryObject.search)) {
            // search by ISBN
            _filterObject.ISBN = queryObject.search;
        } else {
            // search by title or author
            _filterObject.$or = [
                { title: { $regex: queryObject.search, $options: "i" } },
                { author: { $regex: queryObject.search, $options: "i" } },
            ];
        }
    }

    _optionsObject.sort = {
        [_sortBy]: _sortOrder === "asc" ? 1 : -1,
    };
    _optionsObject.limit = Number(_limit);
    // performance optimization
    _optionsObject.lean = true;
    _optionsObject.skip = Number(_skip);

    const books = await BookModel.find(
        _filterObject,
        _projectionObject,
        _optionsObject
    );
    return books as BookType[];
};

// Public APIs for controller
const bookService = {
    /**
     * Get a book by its ID
     * @param id - The ID of the book to get
     * @returns The book object in Promise
     */
    getBookByID: async (id: string): Promise<BookType> => {
        const book = await BookModel.findById(id);
        if (!book) {
            throw new httpErrors.NotFound("Book not found");
        }
        return book as BookType;
    },

    /**
     * Get all books
     * @param queryObject - BookQueryParamsType containing the query config
     * @returns All books in Promise
     */
    getBooks: async (queryObject: BookQueryParamsType): Promise<BookType[]> => {
        if (!queryObject) {
            queryObject = {};
        }

        const books = await _getAllBooks(queryObject);
        return books as BookType[];
    },

    /**
     * Create a new book
     * @param book - The book object to create
     * @returns The created book in Promise
     * @note Data is assumed to be already validated by middleware
     */
    createBook: async (book: BookType): Promise<BookType> => {
        const newBook = await BookModel.create(book);
        return newBook as BookType;
    },

    /**
     * Update a book by its ID
     * @param id - The ID of the book to update
     * @param book - The book object to update
     * @returns The updated book in Promise
     */
    updateBook: async (id: string, book: BookType): Promise<BookType> => {
        const updatedBook = await BookModel.findByIdAndUpdate(id, book, {
            new: true,
        });
        if (!updatedBook) {
            throw new httpErrors.NotFound("Book not found");
        }
        return updatedBook as BookType;
    },

    /**
     * Delete a book by its ID
     * @param id - The ID of the book to delete
     * @returns The deleted book in Promise
     */
    deleteBookByID: async (id: string) => {
        const deletedBook = await BookModel.findByIdAndDelete(id);
        if (!deletedBook) {
            throw new httpErrors.NotFound("Book does not exist");
        }
        return deletedBook as BookType;
    },
};

export default bookService;
