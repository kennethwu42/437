"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var activity_svc_exports = {};
__export(activity_svc_exports, {
  default: () => activity_svc_default
});
module.exports = __toCommonJS(activity_svc_exports);
var import_mongoose = require("mongoose");
const ActivitySchema = new import_mongoose.Schema(
  {
    id: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    desc: { type: String, required: true }
  },
  { collection: "activities" }
);
const ActivityModel = (0, import_mongoose.model)("Activity", ActivitySchema);
function index() {
  return ActivityModel.find();
}
function get(id) {
  return ActivityModel.find({ id }).then((list) => list[0]).catch(() => {
    throw `${id} Not Found`;
  });
}
function create(json) {
  const a = new ActivityModel(json);
  return a.save();
}
function update(id, activity) {
  return ActivityModel.findOneAndUpdate({ id }, activity, { new: true }).then((updated) => {
    if (!updated) throw `${id} not updated`;
    else return updated;
  });
}
function remove(id) {
  return ActivityModel.findOneAndDelete({ id }).then((deleted) => {
    if (!deleted) throw `${id} not deleted`;
  });
}
var activity_svc_default = { index, get, create, update, remove };
