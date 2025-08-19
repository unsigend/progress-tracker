// import dependencies
import express from "express";
import cors from "cors";

// create express app
const app = express();

// import routes
import bookRoute from "@/routes/book.route";
import userRoute from "@/routes/user.route";

const main = () => {
    // use middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // use cors
    app.use(cors());

    // use routes
    app.use("/api/books", bookRoute);
    app.use("/api/users", userRoute);

    // start server
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
};

main();
