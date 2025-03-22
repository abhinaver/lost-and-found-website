import express from "express";
import { authDB, productDB } from "./database.js";
import upload from "../middleware/multer.js";
import cloudinary from "../config/cloudinary.js";
const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
    const { type, name, location, date, description, phone } = req.body;
    
    // Get username from token or session, or pass it in the request
    const username = req.body.username || req.user?.username;
    
    if (!username || !name || !location || !date) {
        return res.status(400).json({ 
            error: 'Username, item name, location, and date are required' 
        });
    }
    
    // First look up the user_id from the username
    const getUserIdQuery = "SELECT id FROM project.login WHERE username = ?";
    authDB.query(getUserIdQuery, [username], (err, results) => {
        if (err) {
            console.error("Database error looking up user:", err);
            return res.status(500).json({ error: 'Database error', details: err });
        }
        
        if (results.length === 0) {
            console.error("User not found:", username);
            return res.status(400).json({ error: 'User not found' });
        }
        
        const userId = results[0].id;
        let imageUrl = null;
        
        if (req.file) {
            imageUrl = req.file.path; // Use the Cloudinary URL
        }
        
        console.log("Inserting lost/found item with userId:", userId, "imageUrl:", imageUrl);
        
        // Update the SQL to match the lost_found_items table structure
        const insertItem = `
            INSERT INTO lost_found_items 
            (user_id, type, name, location, date, description, phone, image_url) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const values = [
            userId, 
            type, // "Lost" or "Found"
            name,
            location,
            date,
            description,
            phone,
            imageUrl
        ];
        
        productDB.query(insertItem, values, (err, result) => {
            if (err) {
                console.error("Failed to insert item:", err);
                return res.status(500).json({ 
                    error: 'Failed to add item', 
                    details: err 
                });
            }
            
            console.log("Item inserted successfully:", result);
            return res.json({ 
                message: 'Item added successfully', 
                itemId: result.insertId 
            });
        });
    });
});

export default router;