export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image provided" })
        }
        return res.status(201).json({ profilePic: req.file.path })
    } catch (error) {
        console.log("Error in uploadImage controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}