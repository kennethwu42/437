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

// GET all
function index(): Promise<Activity[]> {
  return ActivityModel.find();
}

// GET one
function get(id: string): Promise<Activity> {
  return ActivityModel.find({ id })
    .then((list) => list[0])
    .catch(() => {
      throw `${id} Not Found`;
    });
}

// POST
function create(json: Activity): Promise<Activity> {
  const a = new ActivityModel(json);
  return a.save();
}

// PUT
function update(id: string, activity: Activity): Promise<Activity> {
  return ActivityModel.findOneAndUpdate({ id }, activity, { new: true }).then((updated) => {
    if (!updated) throw `${id} not updated`;
    else return updated as Activity;
  });
}

// DELETE
function remove(id: string): Promise<void> {
  return ActivityModel.findOneAndDelete({ id }).then((deleted) => {
    if (!deleted) throw `${id} not deleted`;
  });
}

export default { index, get, create, update, remove };
