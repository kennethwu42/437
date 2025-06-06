import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connect } from "./services/mongo";
import campsiteRoutes from "./routes/campsites";
import activityRoutes from "./routes/activities";
import authRouter, { authenticateUser } from "./routes/auth";
import profileRoutes from "./routes/profile"; // ✅ NEW
import fs from "node:fs/promises";
import path from "path";

dotenv.config();
connect("SLO_Activities");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "../proto";

// ✅ Middleware to parse JSON and form data
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// ✅ Auth route logging + registration
app.use(
  "/auth",
  (req: Request, res: Response, next) => {
    console.log(`[AUTH] ${req.method} ${req.url}`, req.body);
    next();
  },
  authRouter
);

// ✅ Protected API routes
app.use("/api/campsites", authenticateUser, campsiteRoutes);
app.use("/api/activities", authenticateUser, activityRoutes);
app.use("/api/profile", authenticateUser, profileRoutes); // ✅ ADDED

// 🧪 Test route
app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello, World");
});

// ✅ Serve static frontend files
app.use(express.static(staticDir));

// SPA Routes: /app/...
app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

// ✅ NEW: Redirect / to /app so users don't see 404
app.get("/", (_req, res) => {
  res.redirect("/app");
});

// ✅ Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});
