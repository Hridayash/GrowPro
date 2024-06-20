import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(cors());

// Set to store blacklisted tokens
const blacklist = new Set();

// Hello World endpoint
app.get('/', (req, res) => {
    res.send("Hello World");
});

// Endpoint to create a new user
app.post('/createUser', async (req, res) => {
    try {
        // Hashing password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.Password, salt);
        
        // Determine role
        const role = req.body.Role ? req.body.Role : 'admin';

        // Creating user object
        const user = { Email: req.body.Email, Name: req.body.Name, Password: hashedPassword, Role: role };
        
        // Store user in database
        const newUser = await prisma.user.create({ data: user });
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
        console.log("Error:", error);
    }
});

// Endpoint to handle user login
app.post('/login', async (req, res) => {
    const { Email, Password } = req.body;

    try {
        // Find user by email
        const findUser = await prisma.user.findUnique({
            where: { Email: Email }
        });

        // Check if user exists
        if (!findUser) {
            return res.status(400).json({ error: "User not found" });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(Password, findUser.Password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Generate JWT token
        const user = { userId: findUser.Id, email: findUser.Email, name: findUser.Name, role: findUser.Role };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        res.json({ message: "Login successful", accessToken });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ error: "Failed to login" });
    }
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.sendStatus(401); // Unauthorized
    }

    if (blacklist.has(token)) {
        return res.sendStatus(403); // Forbidden
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user;
        next();
    });
}

// Endpoint to get user details
app.get('/user', authenticateToken, async (req, res) => {
    try {
        // Fetch user details based on userId from JWT
        const user = await prisma.user.findUnique({
            where: { Id: req.user.userId },
            select: { Name: true, Email: true, Role: true }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ error: "Some error occurred" });
    }
});

// Endpoint to fetch list of employees
app.get('/employeeList', async (req, res) => {
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
});

// Endpoint to update user details
app.put('/edit-user/:id', async (req, res) => {
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
});

// Endpoint to fetch user details by ID
app.get('/get-user/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        // Find user by ID
        const user = await prisma.user.findUnique({
            where: { Id: id },
            select: { Name: true, Email: true, Role: true }
        });
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch user" });
    }
});

// Endpoint to delete a user
app.delete('/delete-user/:id', async (req, res) => {
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
});

// Endpoint to handle user logout
app.post('/logout', authenticateToken, (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    blacklist.add(token);
    res.json({ message: 'Logout successful' });
});

// Endpoint to handle user profile update
app.post('/profile', authenticateToken, async (req, res) => {
    const { FullName, Position, Address, Education, Experience, Skills } = req.body;
    const userId = req.user.userId;

    if (!userId) {
        return res.status(400).json({ error: "User ID not found" });
    }

    try {
        // Find existing profile or create new
        const existingProfile = await prisma.profile.findUnique({
            where: { UserId: userId }
        });

        let profile;
        if (existingProfile) {
            profile = await prisma.profile.update({
                where: { UserId: userId },
                data: { FullName, Position, Address, Education, Experience, Skills }
            });
        } else {
            profile = await prisma.profile.create({
                data: { UserId: userId, FullName, Position, Address, Education, Experience, Skills }
            });
        }
        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// Endpoint to fetch user profile
app.get('/profile', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    try {
        // Find user profile by UserId
        const profile = await prisma.profile.findUnique({
            where: { UserId: userId },
            select: { FullName: true, Position: true, Address: true, Education: true, Experience: true, Skills: true }
        });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch profile" });
    }
});






app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
