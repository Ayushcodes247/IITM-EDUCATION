import { connect } from "mongoose";

/**
 * Connect to MongoDB using Mongoose
 */
const connectToDB = async () => {
  try {
    // Attempt to connect to the database using the URI from environment variables
    await connect(process.env.MONGOURI);
    console.log("Connected to the database.");
  } catch (error) {
    // Log detailed error and exit process in production
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit process with failure code
  }
};

export default connectToDB;
