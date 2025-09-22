import { connect } from "mongoose";

const connectToDB = () => {
  connect(process.env.MONGOURI)
    .then(() => {
      console.log("CONNECTED TO THE DATABASE.");
    })
    .catch((error) => {
      console.error("Error in connecting to the DATABASE:", error.message);
    });
};

export default connectToDB;
