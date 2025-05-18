import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import campsiteRoutes from "./routes/campsites";
import activityRoutes from "./routes/activities";

connect("SLO Activities");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());

// Hello test route
app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello, World");
});

// ✅ Use REST routers
app.use("/api/campsites", campsiteRoutes);
app.use("/api/activities", activityRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
