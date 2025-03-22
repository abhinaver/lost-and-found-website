import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js"; // Ensure you have Cloudinary configured
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();

// Multer storage using Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        res.json({ imageUrl: req.file.path }); // Cloudinary URL
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: "Image upload failed" });
    }
});

export default router;
