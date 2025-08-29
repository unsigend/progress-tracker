import { API } from "@/api/config";

import axios from "axios";

const booksAPI = {
    getBooks: async () => {
        const response = await axios.get(`${API.books}`);
        return response.data;
    },
};

export default booksAPI;
