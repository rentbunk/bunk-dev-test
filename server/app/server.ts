import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import amountRoute from "./routes/amountRoute";

const app: Application = express();

app.use(cors({ origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Primary App Routers
app.use("/payouts", amountRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
