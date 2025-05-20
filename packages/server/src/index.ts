import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import campsiteRoutes from "./routes/campsites";
import activityRoutes from "./routes/activities";
import authRouter, { authenticateUser } from "./routes/auth";

  
connect("SLO_Activities");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "../proto";


app.use(express.static(staticDir));
app.use(express.json());

// Hello test route
app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello, World");
});

app.use("/api/campsites", authenticateUser, campsiteRoutes);
app.use("/api/activities", authenticateUser, activityRoutes);

app.use("/auth", authRouter);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
