import mongoose from "mongoose";
import app from "./app/app";

const port = process.env.PORT || 3001;
const uri = `mongodb+srv://titumiranangtc:${process.env.DB_PASS}@cluster0.ni5th7w.mongodb.net/?retryWrites=true&w=majority`;
const main = async () => {

    try {
        await mongoose.connect(uri);
        console.log("database connection sucessfully")
        app.listen(port, () => [
            console.log("server is running in this port 5000")
        ])
    } catch (error) {
        console.log(error)
    }
}
main()



