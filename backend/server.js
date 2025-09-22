import app from './app.js';
import { createServer } from "http";

const server = createServer(app);
const PORT = process.env.PORT || 3000 ;

server.listen( PORT , () => {
    console.log(`SERVER IS RUNNING ON PORT NO.${PORT}`);
});