
import express from "express";
import cors from "cors";
import { login } from "../controllers/loginLogout.js";



const LoginRouter = express.Router();

LoginRouter.use(cors()); // Apply CORS to the router

LoginRouter.post('/', login);

export default LoginRouter;
