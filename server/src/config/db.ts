import mongoose from "mongoose";
import chalk from "chalk";

const connectDB = async (URI: string) => {
    try {
        const connection = await mongoose.connect(URI);
        // show the database name
        console.log(
            chalk.green(`Connected to MongoDB: ${connection.connection.name}`)
        );
    } catch (error) {
        console.log(chalk.red("Error connecting to MongoDB: " + error));
        process.exit(1);
    }
};

export default connectDB;
