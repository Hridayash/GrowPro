
import express from "express";
import authenticateToken from "../middleware/authentication.js";
import upload from "../middleware/multer.js";
import { editUserProfile, getProfile, getUserProfile } from "../controllers/profile.js";

const ProfileRouter = express.Router()


ProfileRouter.get('/', authenticateToken, getUserProfile);
ProfileRouter.get('/:id', getProfile);
ProfileRouter.post('/', authenticateToken, upload.single('profilePicture'), editUserProfile);




export default ProfileRouter;