import dotenv from 'dotenv';
import app from './app.js';
import connect from './db.js';

dotenv.config();

connect();

app.listen(process.env.PORT, () => console.log(`Servidor corriendo en el puerto ${process.env.PORT}`));