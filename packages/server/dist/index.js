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
var import_dotenv = __toESM(require("dotenv"));
var import_mongo = require("./services/mongo");
var import_campsites = __toESM(require("./routes/campsites"));
var import_activities = __toESM(require("./routes/activities"));
var import_auth = __toESM(require("./routes/auth"));
var import_profile = __toESM(require("./routes/profile"));
var import_promises = __toESM(require("node:fs/promises"));
var import_path = __toESM(require("path"));
import_dotenv.default.config();
(0, import_mongo.connect)("SLO_Activities");
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || "../proto";
app.use(import_express.default.json({ limit: "5mb" }));
app.use(import_express.default.urlencoded({ extended: true, limit: "5mb" }));
app.use(
  "/auth",
  (req, res, next) => {
    console.log(`[AUTH] ${req.method} ${req.url}`, req.body);
    next();
  },
  import_auth.default
);
app.use("/api/campsites", import_auth.authenticateUser, import_campsites.default);
app.use("/api/activities", import_auth.authenticateUser, import_activities.default);
app.use("/api/profile", import_auth.authenticateUser, import_profile.default);
app.get("/hello", (_req, res) => {
  res.send("Hello, World");
});
app.use(import_express.default.static(staticDir));
app.use("/app", (req, res) => {
  const indexHtml = import_path.default.resolve(staticDir, "index.html");
  import_promises.default.readFile(indexHtml, { encoding: "utf8" }).then(
    (html) => res.send(html)
  );
});
app.get("/", (_req, res) => {
  res.redirect("/app");
});
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});
