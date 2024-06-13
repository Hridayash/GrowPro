import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

const blacklist = new Set();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.post('/createUser', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.Password, salt);

        const user = { Email: req.body.Email, Name: req.body.Name, Password: hashedPassword };
        const newUser = await prisma.user.create({ data: user });
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
        console.log("Error:", error);
    }
});

app.post('/login', async (req, res) => {
    const { Email, Password } = req.body;

    try {
        const findUser = await prisma.user.findUnique({
            where: { Email: Email }
        });

        if (!findUser) {
            return res.status(400).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(Password, findUser.Password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid password" });
        }

        const user = { userId: findUser.Id, email: findUser.Email, name: findUser.Name };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        res.json({ message: "Login successful", accessToken });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ error: "Failed to login" });
    }
});

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

app.get('/user', authenticateToken, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { Id: req.user.userId },
            select: { Name: true, Email: true }
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

app.post('/logout', authenticateToken, (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    blacklist.add(token);
    res.json({ message: 'Logout successful' });
});

app.post('/profile', authenticateToken, async (req, res) => {
    const { FullName, Position, Address, Education, Experience, Skills } = req.body;
    const userId = req.user.userId;

    console.log('Extracted userId:', userId); // Add this line for debugging

    if (!userId) {
        return res.status(400).json({ error: "User ID not found" });
    }

    try {
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
        res.status(500).json({ error: 'Failed to update profile' });
        console.log(error);
    }
});

app.get('/profile' , authenticateToken , async(req,res)=>{
   const userId = req.user.userId
    try{
        const profile = await prisma.profile.findUnique({
            where :{UserId : userId},
            select:{FullName:true, Position:true, Address:true, Education:true, Experience:true, Skills:true}
        })
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ error: "Some error occurred" });
    
    }
})


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
