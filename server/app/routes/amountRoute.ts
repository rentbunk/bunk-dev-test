import express, { Router } from "express";
import { payouts } from "../controllers/amountController";

const router: Router = express.Router();

router.post("/", payouts);

export default router;
