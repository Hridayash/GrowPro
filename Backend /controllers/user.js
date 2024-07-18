import { PrismaClient } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt"

const app  = express();
const prisma = new PrismaClient()
app.use(express.json())



async function findTheCurrentUser (req, res){

    try {
        // Fetch user details based on userId from JWT
        const user = await prisma.user.findUnique({
            where: { Id: req.user.userId },
            select: { Name: true, Email: true, Role: true, Id: true }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ error: "Some error occurred" });
    }


}

async function createNewUser(req,res){
    try {
        // Hashing password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.Password, salt);
        
        // Determine role
        const role = req.body.Role ? req.body.Role : 'manager';

        // Creating user object
        const user = { Email: req.body.Email, Name: req.body.Name, Password: hashedPassword, Role: role };
        
        // Store user in database
        const newUser = await prisma.user.create({ data: user });
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
        console.log("Error:", error);
    }
}



async function getListOfEmployee (req,res){
    try {
        // Fetch all users with select fields
        const users = await prisma.user.findMany({
            select: { Name: true, Email: true, Role: true, Id: true }
        });
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch employee list" });
    }
}
async function getOneEmployee (req,res){
    
    try {
        // Find user by ID
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }
        const user = await prisma.user.findUnique({
            where: { Id: id },
            select: { Name: true, Email: true, Role: true }
        });
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch user" });
    }
}

async  function editEmployee(req,res){
    const id = parseInt(req.params.id, 10);
    try {
        // Update user based on ID
        const user = await prisma.user.update({
            where: { Id: id },
            data: {
                Name: req.body.Name,
                Email: req.body.Email,
                Role: req.body.Role
            }
        });
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to update user" });
    }
}

async function deleteEmployee(req,res){

    const id = parseInt(req.params.id, 10);
    try {
        // Delete user based on ID
        const user = await prisma.user.delete({
            where: { Id: id }
        });
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete user" });
    }
}


export {findTheCurrentUser , createNewUser, getListOfEmployee, editEmployee , getOneEmployee , deleteEmployee};