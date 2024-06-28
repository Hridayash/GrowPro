import express from "express";
import authenticateToken from "../middleware/authentication.js";
import cors from "cors";
import { logout } from "../controllers/loginLogout.js";

const LogoutRouter = express.Router();

LogoutRouter.use(cors()); // Apply CORS to the router

LogoutRouter.post('/', authenticateToken, logout);

export default LogoutRouter;
