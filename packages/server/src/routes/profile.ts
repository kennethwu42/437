import express from "express";
import { Request, Response } from "express";
import { promises as fs } from "fs";
import path from "path";

const router = express.Router();
const profilePath = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "app",
  "public",
  "data",
  "profile.json"
);



let mockProfile = {
  userid: "Alpha",
  name: "Alpha",
  color: "#2563eb",
  avatar: null
};

// Load profile from disk on server start
fs.readFile(profilePath, "utf-8")
  .then((text) => {
    mockProfile = JSON.parse(text);
    console.log("✅ Loaded profile from disk.");
  })
  .catch((err) => {
    console.warn("⚠️ Could not load profile.json:", err.message);
  });

router.get("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;
  if (userid === mockProfile.userid) {
    res.status(200).json(mockProfile);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

router.put("/:userid", async (req: Request, res: Response) => {
  const { userid } = req.params;
  if (userid === mockProfile.userid) {
    mockProfile = { ...mockProfile, ...req.body };

    try {
      await fs.writeFile(profilePath, JSON.stringify(mockProfile, null, 2));
      console.log("✅ Saved profile to disk.");
      res.status(200).json(mockProfile);
    } catch (err) {
      console.error("❌ Failed to save profile:", err);
      res.status(500).json({ error: "Failed to save profile." });
    }
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

export default router;
