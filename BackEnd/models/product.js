
import express from "express";
import {productDB} from "./database.js";


const router = express.Router();




router.get('/', (req, res) => {
    productDB.query("SELECT * FROM lost_found_items ", (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch products', details: err });
        return res.json(data);
    });
});



export default router;