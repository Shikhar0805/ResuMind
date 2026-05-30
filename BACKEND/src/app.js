const express = require('express');
const app = express();
const connectToDB=require('../db/db');
require('dotenv').config();
const authRoutes=require('../routes/auth.routes');
const cookieParser=require('cookie-parser');
const cors=require('cors');

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());

app.use(express.json());

connectToDB();


app.use('/api/auth', authRoutes);
module.exports = app;