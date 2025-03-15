import express from 'express';
import { loginA } from '../../controllers/login.js';
import { signupA, signupU } from '../../controllers/signup.js';

const web = express.Router();

web.post('/signup/admin/',signupA);
web.post('/login/admin',loginA)

web.post('/signup/user',signupU);

export default web;