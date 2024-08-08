import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRouter from './routes/user.js'
import ProfileRouter from './routes/profile.js'
import LoginRouter from './routes/login.js'
import LogoutRouter from './routes/logout.js'
import JobRouter from "./routes/job.js";
import CourseRouter from './routes/Course.js'
import profileId from './routes/profileId.js'
import JobApplication from './routes/jobApplication.js'
import Reviews from './routes/reviews.js'
import GoalRouter from "./routes/goal.js";
import questionRoutes from './routes/question.js';
import feedbackRoutes from './routes/feedback.js'
import responseRoutes from './routes/response.js'

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(cors());


//routes
app.get('/' , (req,res)=>{
    res.json('hello')
})
app.use('/user',UserRouter)
app.use('/profile' , ProfileRouter)
app.use('/login' , LoginRouter)
app.use('/logout' , LogoutRouter)
app.use('/job' , JobRouter)
app.use('/course' , CourseRouter)
app.use('/profileId' , profileId)
app.use('/JobApplication' , JobApplication)
app.use('/reviews' , Reviews)
app.use('/goal' , GoalRouter)
app.use('/feedbacks', feedbackRoutes);
app.use('/questions', questionRoutes);
app.use('/responses', responseRoutes);











app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
