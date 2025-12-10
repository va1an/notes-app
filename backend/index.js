import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import tagRoutes from "./routes/tagRoutes.js";
import { protect } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();

const allowedOrigins = [
    "https://notes-app-roan-xi.vercel.app",
    "http://localhost:5173"
]

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

app.use(bodyParser.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", protect, noteRoutes);
app.use("/api", protect, tagRoutes);

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL)
    .then(() => {
        console.log("MongoDB connected successfully");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
