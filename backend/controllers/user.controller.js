import User from "../models/user.model.js";
import Link from "../models/link.model.js";

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, profilePic, bio, username } = req.body
        const updates = {}

        const user = await User.findOne({ username, _id: { $ne: userId } })
        if (user) {
            return res.status(400).json({ message: "username already exists" })
        }

        if (name) updates.name = name
        if (profilePic || profilePic == null) updates.profilePic = profilePic
        if (bio) updates.bio = bio
        if (username) updates.username = username

        const updatedUser = await User.findByIdAndUpdate(
            userId, updates,
            { new: true, ruValidators: true }
        )

        return res.status(200).json({
            updatedUser,
            message: "Profile updated successfully"
        })
    } catch (error) {
        console.log("Error in updateProfile controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username }).select('-password')
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const links = await Link.find({ userId: user?._id })
        return res.status(200).json({
            user: {
                name: user.name,
                bio: user.bio,
                profilePic: user.profilePic
            },
            links
        })
    } catch (error) {
        console.log("Error in getUserProfile controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}