

import express from "express";
import authenticateToken from "../middleware/authentication.js";
import { findTheCurrentUser , createNewUser, getListOfEmployee, editEmployee, getOneEmployee, deleteEmployee } from "../controllers/user.js";

const UserRouter = express.Router()



UserRouter.get('/', authenticateToken, findTheCurrentUser);
UserRouter.post('/createUser',createNewUser);
UserRouter.get('/employeeList', getListOfEmployee);
UserRouter.put('/edit-user/:id', editEmployee);
UserRouter.get('/get-user/:id', getOneEmployee);
UserRouter.delete('/delete-user/:id', deleteEmployee);

export default UserRouter;