import { Schema, model } from "mongoose";
import { Activity } from "../models/site-activities";

const ActivitySchema = new Schema<Activity>(
  {
    id: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    desc: { type: String, required: true },
  },
  { collection: "activities" }
);

const ActivityModel = model<Activity>("Activity", ActivitySchema);

function index(): Promise<Activity[]> {
  return ActivityModel.find();
}

function get(id: string): Promise<Activity> {
  return ActivityModel.find({ id })
    .then((list) => list[0])
    .catch(() => {
      throw `${id} Not Found`;
    });
}

export default { index, get };
