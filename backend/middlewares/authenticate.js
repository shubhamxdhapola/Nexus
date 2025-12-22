import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

export const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" })
        }

        jwt.verify(token, process.env.JWT_SECRET, async (error, decodedToken) => {
            if (error) return res.status(401).json({ message: "Unauthorized - Invalid token" })
            const user = await User.findById(decodedToken.id).select('-password')
            if (!user) return res.status(404).json({ message: 'User not found' })
            req.user = user
            next()
        })
    } catch (error) {
        console.log("Error in authenticate middleware : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}