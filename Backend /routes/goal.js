import express from "express";
import authenticateToken from "../middleware/authentication.js";
import { setGoal, getEmployeeGoals, markGoal ,getAllEmployeeGoals , getCompletedGoals} from "../controllers/goal.js";

const GoalRouter = express.Router();

GoalRouter.post('/set-goal', authenticateToken, setGoal);
GoalRouter.get('/employee-goals/:employeeId', authenticateToken, getEmployeeGoals);
GoalRouter.get('/employee-goals/', authenticateToken, getAllEmployeeGoals);
GoalRouter.put('/mark-goal/:goalId', authenticateToken, markGoal);
GoalRouter.get('/completedgoals', authenticateToken, getCompletedGoals)


export default GoalRouter;