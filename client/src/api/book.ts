// import dependencies
import axios from "axios";

// import global config
import globalConfig from "@/data/global";

// import types
import { type BookType } from "@/types/book.type";

// import query types
import { type BookQueryType } from "@/types/book.type";

// API config for book
const rootAPIConfig = `${globalConfig.apiRoot}/books`;

// API for book
const bookAPI = {
    getAllBooks: async (query: BookQueryType) => {
        const response = await axios.get(rootAPIConfig, { params: query });
        return response.data;
    },
    getBookByID: async (id: string) => {
        const response = await axios.get(`${rootAPIConfig}/${id}`);
        return response.data;
    },
    createBook: async (book: BookType) => {
        const response = await axios.post(rootAPIConfig, book);
        return response.data;
    },
    updateBook: async (id: string, book: BookType) => {
        const response = await axios.put(`${rootAPIConfig}/${id}`, book);
        return response.data;
    },
    deleteBook: async (id: string) => {
        const response = await axios.delete(`${rootAPIConfig}/${id}`);
        return response.data;
    },
};

export default bookAPI;
