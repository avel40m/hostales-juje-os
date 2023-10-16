import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();
const dbUrl = `mongodb://localhost:${process.env.PORT_DATABASE}/${process.env.NAME_DATABASE}`;

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl)
        .then(() => console.log("Conectado a la base de datos"));
    } catch (error) {
        console.error(`Error a conectar a la base de datos: ${error}`);
    }
}

export default connectDB;