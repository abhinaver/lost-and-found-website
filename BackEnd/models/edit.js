
import express from "express";
import {productDB} from "./database.js";


const router = express.Router();




router.put('/:id', (req, res) => {
    const itemId = req.params.id;
    const { name, location, date, description, type, image_url, phone } = req.body;
    
    productDB.query(
        "UPDATE lost_found_items SET name = ?, location = ?, date = ?, description = ?, type = ?, image_url = ?, phone = ? WHERE id = ?",
        [name, location, date, description, type, image_url, phone, itemId],
        (err, result) => {
            if (err) return res.status(500).json({ 
                error: 'Failed to update item', 
                details: err 
            });
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Item not found' });
            }
            
            return res.json({ 
                message: 'Item updated successfully',
                id: itemId
            });
        }
    );
});



export default router;