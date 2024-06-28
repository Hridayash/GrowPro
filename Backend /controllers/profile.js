import { PrismaClient } from "@prisma/client";




const prisma = new PrismaClient();

async function getUserProfile(req,res){
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
}
async function getProfile(req,res){
    const {id} = req.params;
    const userId = parseInt(id , 10);

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
}

async function editUserProfile (req,res){
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
}



export {getUserProfile , editUserProfile , getProfile }