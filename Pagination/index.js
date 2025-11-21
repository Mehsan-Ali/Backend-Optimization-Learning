import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
const app = express();
const PORT = 3000;

app.use(express.json());
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/Pagination');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

connectDB();

app.use('/api/v1', userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});