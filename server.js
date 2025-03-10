import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import './models/sync.js';
import android from './routes/android/android.js';
import web from './routes/web/web.js';
import { all } from './debug/all.js';

const app = express();
const port = process.env.port;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.use(web);
app.use(android)
app.listen(port,()=>{
    console.log( `le serveur tourne sur le port ${port}`);
});