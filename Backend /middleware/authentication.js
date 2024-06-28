import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();
const blacklist = new Set();


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

export {blacklist}
export default authenticateToken;