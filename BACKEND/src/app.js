const express = require('express');
const app = express();
const connectToDB = require('../db/db');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('../routes/auth.routes');
const interviewRouter = require('../routes/interview.routes');


app.use(
  cors({
    origin: "https://resumind-ai-frontend.onrender.com",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

connectToDB();

app.use('/api/auth', authRoutes);
app.use('/api/interview', interviewRouter);

module.exports = app;