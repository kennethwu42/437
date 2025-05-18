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

function create(json: Campsite): Promise<Campsite> {
  const c = new CampsiteModel(json);
  return c.save();
}

function update(id: string, campsite: Campsite): Promise<Campsite> {
  return CampsiteModel.findOneAndUpdate({ id }, campsite, { new: true }).then((updated) => {
    if (!updated) throw `${id} not updated`;
    else return updated as Campsite;
  });
}

function remove(id: string): Promise<void> {
  return CampsiteModel.findOneAndDelete({ id }).then((deleted) => {
    if (!deleted) throw `${id} not deleted`;
  });
}


export default { index, get, create, update, remove };

