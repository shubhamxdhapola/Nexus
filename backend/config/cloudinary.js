import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const NexusStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Nexus_Storage',
        allowedFormats: ['jpg', 'jpeg', 'png']
    }
})

export default NexusStorage;