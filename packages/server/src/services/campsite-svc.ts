import { Schema, model } from "mongoose";
import { Campsite } from "../models/site-campsite";

const CampsiteSchema = new Schema<Campsite>(
  {
    id: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    count: { type: Number, required: true },
    desc: { type: String, required: true },
  },
  { collection: "campsites" }
);

const CampsiteModel = model<Campsite>("Campsite", CampsiteSchema);

function index(): Promise<Campsite[]> {
  return CampsiteModel.find();
}

function get(id: string): Promise<Campsite> {
  return CampsiteModel.find({ id })
    .then((list) => list[0])
    .catch(() => {
      throw `${id} Not Found`;
    });
}

export default { index, get };
