import admin from "../config/firebase.admin.js";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import saveCookie from "../utils/saveCookie.js";

export const registerUser = async (req, res) => {
    try {
        const { name, username, email, password, profilePic, bio } = req.body;

        if (!username || !email || !password) {
            return res.status(401).json({ message: "All fields are required" })
        }

        const user = await User.findOne({ $or: [{ email }, { username }] })

        if (user) {
            if (user.email === email) {
                return res.status(401).json({ message: "Email already exists" })
            }
            if (user.username === username) {
                return res.status(401).json({ message: "Username not available" })
            }
        }

        const newUser = await User.create({
            name, username, email, password, profilePic, bio, provider: "local"
        })

        if (newUser) {
            const token = generateToken(newUser._id)
            saveCookie(token, res)
            res.status(201).json({
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    username: newUser.username,
                    email: newUser.email,
                    bio: newUser.bio,
                    profilePic: newUser.profilePic
                },
                message: "Registered successfully"
            })
        } else {
            return res.status(500).json("Unable to register")
        }
    } catch (error) {
        console.log("Error in registerUser controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ message: "All fields are required" })
        }

        const user = await User.findOne({ email, provider: 'local' })
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const passwordCorrect = await user.comparePassword(password)
        if (!passwordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        if (user) {
            const token = generateToken(user._id)
            saveCookie(token, res)
            res.status(200).json({
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    bio: user.bio,
                    email: user.email,
                    profilePic: user.profilePic
                },
                message: "Logged in successfully"
            })
        }
    } catch (error) {
        console.log("Error in loginUser controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const googleSignIn = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "No token provided" });

        const decoded = await admin.auth().verifyIdToken(token);

        let user = await User.findOne({ firebaseUID: decoded.uid });

        if (!user) {
            const existingEmailUser = await User.findOne({ email: decoded.email });

            if (existingEmailUser && existingEmailUser.provider === "local") {
                return res.status(400).json({
                    message: "Email already exists"
                });
            }

            user = await User.create({
                provider: "google",
                firebaseUID: decoded.uid,
                username: decoded.email.split("@")[0],
                email: decoded.email,
                profilePic: decoded.picture,
                name: decoded?.name || decoded.email.split("@")[0],
                bio: "",
            });
        }

        const jwtToken = generateToken(user._id);
        saveCookie(jwtToken, res);

        return res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                bio: user.bio,
                email: user.email,
                profilePic: user.profilePic,
                provider: user.provider
            },
            message: "Signed in successfully"
        });
    } catch (error) {
        console.log("Error in googleLogin controller:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserInfo = async (req, res) => {
    try {
        return res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in getUserInfo controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const logoutUser = async (_, res) => {
    try {
        res.cookie('authToken', "", { maxAge: 0, secure: true, sameSite: "None" })
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.log("Error in logout controller : ", error)
        res.status(500).json({ message: "Internal server error" })
    }
}