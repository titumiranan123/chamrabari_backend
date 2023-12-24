import mongoose from "mongoose";
import app from "./app/app";

const port = process.env.PORT || 3001;

const main = async () => {

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/pratice5');
        console.log("database connection sucessfully")
        app.listen(port, () => [
            console.log("server is running in this port 5000")
        ])
    } catch (error) {
        console.log(error)
    }
}
main()



