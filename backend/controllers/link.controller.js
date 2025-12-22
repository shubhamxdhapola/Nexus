import Link from "../models/link.model.js"

export const getAllLinks = async (req, res) => {
    try {
        const userId = req.user._id
        const links = await Link.find({userId}).sort({_id : -1})
        return res.status(200).json({ links })
    } catch (error) {
        console.log("Error in getAllLinks controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const createLink = async (req, res) => {
    try {
        const { title, url } = req.body;
        const userId = req.user._id
        if (!title || !url) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const link = await Link.create({ userId, title, url })
        return res.status(201).json({ link, message: "Link created successfully" })

    } catch (error) {
        console.log("Error in createLink controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const updateLink = async (req, res) => {
    try {
        const { title, url } = req.body;
        const { id } = req.params
        const updates = {}

        if (title) updates.title = title
        if (url) updates.url = url

        const updatedLink = await Link.findByIdAndUpdate(
            id, updates,
            { new: true, runValidators: true }
        )

        if (!updatedLink){ 
            return res.status(404).json({ message: "Link not found" })
        }

        return res.status(200).json({
            updatedLink,
            message: "Link updated successfully",
        })
    } catch (error) {
        console.log("Error in updateLink controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const deleteLink = async(req, res) => {
    try {
        const {id} = req.params
        const deletedLink = await Link.findByIdAndDelete(id)
        if(!deletedLink) {
            return res.status(404).json({message : "Link not found"})
        }
        return res.status(200).json({message : "Link deleted successfully"})        
    } catch (error) {
           console.log("Error in deleteLink controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}