import express, { Request, Response } from "express";
import { Campsite } from "../models/site-campsite";
import Campsites from "../services/campsite-svc";

const router = express.Router();

// GET all campsites
router.get("/", (_req, res: Response) => {
  Campsites.index()
    .then((list: Campsite[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

// GET one campsite by id
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  Campsites.get(id)
    .then((camp: Campsite) => res.json(camp))
    .catch((err) => res.status(404).send(err));
});

// POST new campsite
router.post("/", (req: Request, res: Response) => {
  const newCampsite = req.body;

  Campsites.create(newCampsite)
    .then((camp: Campsite) => res.status(201).json(camp))
    .catch((err) => res.status(500).send(err));
});

// PUT update campsite
router.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const newCampsite = req.body;

  Campsites.update(id, newCampsite)
    .then((camp: Campsite) => res.json(camp))
    .catch(() => res.status(404).end());
});

// DELETE campsite
router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  Campsites.remove(id)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;
