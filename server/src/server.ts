// import dependencies
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// create express app
const app = express();

// import config
import connectDB from "./config/db";

// import routes
import bookRoute from "@/routes/book.route";
import userRoute from "@/routes/user.route";

// import middleware
import errorHandler from "./middleware/errorHandler";

const main = () => {
    // load environment variables
    dotenv.config();

    const PORT = process.env.PORT || 3000;
    const MONGO_URI = process.env.MONGO_URI;

    // connect to database
    if (MONGO_URI) {
        connectDB(MONGO_URI);
    } else {
        console.log("MONGO_URI is not set");
        process.exit(1);
    }

    // use internal middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // use cors
    app.use(cors());

    // use routes
    app.use("/api/books", bookRoute);
    app.use("/api/users", userRoute);

    // use error handler
    app.use(errorHandler);

    // start server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

main();
