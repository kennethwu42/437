"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_express = __toESM(require("express"));
var import_mongo = require("./services/mongo");
var import_campsites = __toESM(require("./routes/campsites"));
var import_activities = __toESM(require("./routes/activities"));
var import_auth = __toESM(require("./routes/auth"));
(0, import_mongo.connect)("SLO_Activities");
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || "../proto";
app.use(import_express.default.static(staticDir));
app.use(import_express.default.json());
app.get("/hello", (_req, res) => {
  res.send("Hello, World");
});
app.use("/api/campsites", import_auth.authenticateUser, import_campsites.default);
app.use("/api/activities", import_auth.authenticateUser, import_activities.default);
app.use("/auth", import_auth.default);
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
