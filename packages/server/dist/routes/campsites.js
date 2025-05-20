"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var campsites_exports = {};
__export(campsites_exports, {
  default: () => campsites_default
});
module.exports = __toCommonJS(campsites_exports);
var import_express = __toESM(require("express"));
var import_campsite_svc = __toESM(require("../services/campsite-svc"));
const router = import_express.default.Router();
router.get("/", (_req, res) => {
  import_campsite_svc.default.index().then((list) => res.json(list)).catch((err) => res.status(500).send(err));
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  import_campsite_svc.default.get(id).then((camp) => res.json(camp)).catch((err) => res.status(404).send(err));
});
router.post("/", (req, res) => {
  const newCampsite = req.body;
  import_campsite_svc.default.create(newCampsite).then((camp) => res.status(201).json(camp)).catch((err) => res.status(500).send(err));
});
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const newCampsite = req.body;
  import_campsite_svc.default.update(id, newCampsite).then((camp) => res.json(camp)).catch(() => res.status(404).end());
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  import_campsite_svc.default.remove(id).then(() => res.status(204).end()).catch((err) => res.status(404).send(err));
});
var campsites_default = router;
