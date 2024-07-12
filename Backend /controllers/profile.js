import { PrismaClient } from "@prisma/client";
import upload from "../middleware/multer.js";
import cloudinary from "../utils/cloudinary.js";

const prisma = new PrismaClient();

async function getUserProfile(req, res) {
    const userId = req.user.userId;
    try {
        // Find user profile by UserId
        const profile = await prisma.profile.findUnique({
            where: { UserId: userId },
            select: { FullName: true, Position: true, Address: true, ProfileUrl: true }
        });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).json({ error: "Failed to fetch profile" });
    }
}

async function getProfile(req, res) {
    const { id } = req.params;
    const userId = parseInt(id, 10);

    try {
        // Find user profile by UserId
        const profile = await prisma.profile.findUnique({
            where: { UserId: userId },
            select: { FullName: true, Position: true, Address: true, ProfileUrl: true }
        });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).json({ error: "Failed to fetch profile" });
    }
}

async function editUserProfile(req, res) {
    const { FullName, Position, Address ,  } = req.body;
    const userId = req.user.userId;

    try {
        let profile;

        // Handle file upload if present
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            profile = await prisma.profile.upsert({
                where: { UserId: userId },
                update: { FullName, Position, Address, ProfileUrl: result.secure_url },
                create: { UserId: userId, FullName, Position, Address, ProfileUrl: result.secure_url }
            });
        } else {
            // No file uploaded, update profile without ProfileUrl
            profile = await prisma.profile.upsert({
                where: { UserId: userId },
                update: { FullName, Position, Address },
                create: { UserId: userId, FullName, Position, Address }
            });
        }

        res.json(profile);
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
}

export { getUserProfile, editUserProfile, getProfile, upload }; // Exporting `upload` from multer middleware
