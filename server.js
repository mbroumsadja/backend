import express from 'express'
import cors from 'cors';
import morgan from 'morgan';

import User from './models/user.js';
import Role from './models/role.js';
import UserRole from './models/user_role.js';
import Session from './models/session.js';
import Message from './models/msg.js';

import android from './routes/android/android.js';

const app = express();
const port = 10000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.use(android)
app.listen(port,()=>{
    console.log( `le serveur tourne sur le port ${port}`);
});