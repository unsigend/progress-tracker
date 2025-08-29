/**
 * BookType interface
 * @type {object} bookObject
 * @description bookObject containing the book config
 * @property {string} title - title of the book
 * @property {string} author - author of the book
 * @property {string} description - description of the book
 */
interface BookType {
    title: string;
    author?: string;
    description?: string;
    pages?: number;
    image?: string;
    ISBN?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

/**
 * BookQueryParamsType interface
 * @type {object} queryObject
 * @description queryObject containing the query config
 * @property {string} search - single string search value for:  title | author | ISBN
 * @property {string} sortBy - sortBy: "title" | "createAt" | "ISBN"
 * @property {string} sortOrder - sortOrder: "asc" | "desc"
 * @property {number} page - page number
 * @property {number} limit - number of items per page
 */
interface BookQueryParamsType {
    search?: string;
    sortBy?: "title" | "createdAt" | "ISBN";
    sortOrder?: "asc" | "desc";
    page?: number;
    limit?: number;
}

/**
 * UserType interface
 * @type {object} userObject
 * @description userObject containing the user config
 * @property {string} username - username of the user
 * @property {string} email - email of the user
 */
interface UserType {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export type { BookType, UserType, BookQueryParamsType };
