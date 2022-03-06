import express, { Response, NextFunction } from "express";
import cors from "cors";
import Request from "./types/Request";
import connectDB from "./config/connection";
import HttpStatusCodes from "http-status-codes";
import restaurantRouter from "./routes/api/restaurant";

const app = express();
// Connect to MongoDB
connectDB.then();
// Main middleware
app.use(express.json());

// Access API
const URL = "http://localhost:3500";
app.use(
  cors({
    origin: [URL, URL],
    credentials: true,
  })
);

// Routes
app.use('/api/restaurant', restaurantRouter)

// No route matched, 404 not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res
    .status(HttpStatusCodes.BAD_REQUEST)
    .send(`${req.originalUrl} is not exist`);
});

const PORT = process.env.PORT || 3501;
const server = app.listen(PORT, () =>
  console.log(`server is up on port ${PORT}`)
);
