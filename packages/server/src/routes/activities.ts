import express, { Request, Response } from "express";
import { Activity } from "../models/site-activities";
import Activities from "../services/activity-svc";

const router = express.Router();

// GET all activities
router.get("/", (_req, res: Response) => {
  Activities.index()
    .then((list: Activity[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

// GET one activity by id
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  Activities.get(id)
    .then((act: Activity) => res.json(act))
    .catch((err) => res.status(404).send(err));
});

// POST new activity
router.post("/", (req: Request, res: Response) => {
  const newActivity = req.body;

  Activities.create(newActivity)
    .then((act: Activity) => res.status(201).json(act))
    .catch((err) => res.status(500).send(err));
});

// PUT update activity
router.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const newActivity = req.body;

  Activities.update(id, newActivity)
    .then((act: Activity) => res.json(act))
    .catch(() => res.status(404).end());
});

// DELETE activity
router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  Activities.remove(id)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;
