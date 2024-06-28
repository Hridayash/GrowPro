import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { blacklist }  from "../middleware/authentication.js";




const prisma = new PrismaClient();





async function login(req,res) {
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
        console.error("Error:", err);
        res.status(500).json({ error: "Failed to login" });
    }
}

async function logout(req,res){
    const token = req.headers['authorization'].split(' ')[1];
    blacklist.add(token);
    res.json({ message: 'Logout successful' });

}

export {login , logout}