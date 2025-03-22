import express from "express";
import { productDB } from "./database.js";

const router = express.Router();

// Get all items listed by the logged-in user
router.get("/:userId", (req, res) => {
    const { userId } = req.params;

    const sql = "SELECT * FROM lost_found_items WHERE user_id = ?";
    
    productDB.query(sql, [userId], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch user's items", details: err });
        }
        return res.json(data);
    });
});

export default router;
