import express from "express";
import dotenv from "dotenv";
import { initializeTransaction, verifyTransaction } from "./payment.js";
dotenv.config();
const server = express();
server.post("/apiservice/webhook-callback", express.json({ type: "application/json" }), async (req, res) => {
    const event = req.body;
    console.log("event ------> ", event);
    if (event.event === "charge.success") {
        const { reference, amount, customer } = event.data;
        console.log(`saved columns in db -> 
        reference: ${reference}, 
        amount: ${amount}, 
        customer: ${customer}`);
    }
    else if (event.event === "charge.failed") {
        console.log("Transaction failed");
    }
    res.sendStatus(200);
});
server.use(express.json());
server.use(express.urlencoded());
server.get("/", (req, res) => {
    res.json({
        status: 1,
        message: "up and running",
        payload: {},
    });
});
server.post("/initialize", async (req, res) => {
    const { email, amount, metadata } = req.body;
    try {
        const result = await initializeTransaction(email, amount, metadata);
        res.json({ status: true, data: result.data });
    }
    catch (error) {
        res.status(400).json({
            status: false,
            message: error?.response?.data?.message || "Init failed",
        });
    }
});
server.get("/verify/:reference", async (req, res) => {
    const { reference } = req.params;
    try {
        const result = await verifyTransaction(reference);
        if (result.data.status === "success") {
            console.log("DB updateds!!");
        }
        res.json({ status: true, data: result.data });
    }
    catch (error) {
        res.status(400).json({
            status: false,
            message: error?.response?.data?.message || "Verify failed",
        });
    }
});
server.listen(process.env.PORT, () => {
    console.log("server running");
});
