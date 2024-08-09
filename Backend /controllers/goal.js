import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function setGoal(req, res) {
  try {
    const { Title, Description, EmployeeId , ManagerId } = req.body;

    const goal = await prisma.goal.create({
      data: {
        Title,
        Description,
        Employee: {
          connect: { Id: parseInt(EmployeeId) },
        },
        Manager: {
            connect: { Id: parseInt(ManagerId) },
          },
       
      },
      
    });

    res.json(goal);
  } catch (error) {
    console.error('Error setting goal:', error);
    res.status(500).json({ error: 'Failed to set goal' });
  }
}

export async function getEmployeeGoals(req, res) {
    const employeeId = parseInt(req.params.employeeId);
    try {
      const goals = await prisma.goal.findMany({
        where: { EmployeeId: employeeId },
        select: {
          Id: true,
          Title: true,
          Description: true,
          Completed: true,
          Employee: { select: { Name: true } },
          Manager: { select: { Name: true } },
        },
      });
      res.json(goals);
    } catch (error) {
      console.error('Error fetching goals:', error);
      res.status(500).json({ error: 'Failed to fetch goals' });
    }
  }
export async function getAllEmployeeGoals(req, res) {
   
    try {
      const goals = await prisma.goal.findMany({
        
        select: {
          Id: true,
          Title: true,
          Description: true,
          Completed: true,
          Employee: { select: { Name: true } },
          Manager: { select: { Name: true } },
        },
      });
      res.json(goals);
    } catch (error) {
      console.error('Error fetching goals:', error);
      res.status(500).json({ error: 'Failed to fetch goals' });
    }
  }

export async function markGoal(req, res) {
    const goalId = parseInt(req.params.goalId) ;
    console.log(goalId)
    try {
      if (!goalId) {
        throw new Error('Invalid goal ID');
      }
  
      const goal = await prisma.goal.update({
        where: { Id: goalId },
        data: { Completed: true },
      });
      res.json(goal);
    } catch (error) {
      console.error('Error marking goal as completed:', error);
      res.status(500).json({ error: 'Failed to mark goal as completed' });
    }
  }

  export async function getCompletedGoals(req, res) {
    try {
      const goals = await prisma.goal.findMany({
        where :{Completed : true},
        select: {
          Id: true,
          Title: true,
          Description: true,
          Completed: true,
          Employee: { select: { Name: true } },
          Manager: { select: { Name: true } },
        },
      });
      res.json(goals);
    } catch (error) {
      console.error('Error fetching goals:', error);
      res.status(500).json({ error: 'Failed to fetch goals' });
    }
  }
