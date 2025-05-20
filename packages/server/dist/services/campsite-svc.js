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
var campsite_svc_exports = {};
__export(campsite_svc_exports, {
  default: () => campsite_svc_default
});
module.exports = __toCommonJS(campsite_svc_exports);
var import_mongoose = require("mongoose");
const CampsiteSchema = new import_mongoose.Schema(
  {
    id: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    count: { type: Number, required: true },
    desc: { type: String, required: true }
  },
  { collection: "campsites" }
);
const CampsiteModel = (0, import_mongoose.model)("Campsite", CampsiteSchema);
function index() {
  return CampsiteModel.find();
}
function get(id) {
  return CampsiteModel.find({ id }).then((list) => list[0]).catch(() => {
    throw `${id} Not Found`;
  });
}
function create(json) {
  const c = new CampsiteModel(json);
  return c.save();
}
function update(id, campsite) {
  return CampsiteModel.findOneAndUpdate({ id }, campsite, { new: true }).then((updated) => {
    if (!updated) throw `${id} not updated`;
    else return updated;
  });
}
function remove(id) {
  return CampsiteModel.findOneAndDelete({ id }).then((deleted) => {
    if (!deleted) throw `${id} not deleted`;
  });
}
var campsite_svc_default = { index, get, create, update, remove };
