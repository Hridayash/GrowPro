
import express from "express";
import authenticateToken from "../middleware/authentication.js";
import { editUserProfile, getProfile, getUserProfile } from "../controllers/profile.js";

const ProfileRouter = express.Router()


ProfileRouter.get('/', authenticateToken, getUserProfile);
ProfileRouter.get('/:id', getProfile);
ProfileRouter.post('/', authenticateToken, editUserProfile);




export default ProfileRouter;