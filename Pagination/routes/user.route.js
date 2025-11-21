import express from 'express';
import { getUsers } from '../controllers/user.controller.js';

const app = express.Router();

app.get('/users', getUsers);


export default app;