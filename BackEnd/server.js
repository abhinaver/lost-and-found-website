import express from 'express';
import cors from 'cors';

 

const app = express();

app.use(cors());
app.use(express.json());

import myItemsRouter from "./models/myitems.js";
app.use("/my-items", myItemsRouter);

import signinRouter from "./models/signin.js";
app.use("/signin", signinRouter);

import loginRouter from "./models/login.js";
app.use("/login", loginRouter);

import productRouter from "./models/product.js";
app.use("/products", productRouter);

import addproductRouter from "./models/addproduct.js";
app.use("/add-product", addproductRouter);

import sproductRouter from "./models/sproduct.js";
app.use("/product", sproductRouter);

import dproductRouter from "./models/delete.js";
app.use("/delete-item", dproductRouter);

import myproductRouter from "./models/myproduct.js";
app.use("/my-item", myproductRouter);


import eproductRouter from "./models/edit.js";
app.use("/update-item", eproductRouter);


import imgRouter from "./models/imageupload.js";
app.use("/upload-image", imgRouter);

app.listen(8081, () => {
    console.log(" Server running on port 8081");
});
