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
var site_activities_exports = {};
__export(site_activities_exports, {
  SiteActivitiesElement: () => SiteActivitiesElement
});
module.exports = __toCommonJS(site_activities_exports);
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
class SiteActivitiesElement extends import_lit.LitElement {
  @((0, import_decorators.property)()) src = "";
  @((0, import_decorators.state)()) activities = [];
  connectedCallback() {
    super.connectedCallback();
    if (this.src) {
      fetch(this.src).then((res) => res.json()).then((data) => {
        this.activities = data;
      }).catch((err) => {
        console.error("Failed to load activities:", err);
      });
    }
  }
  render() {
    if (this.activities.length === 0) {
      return import_lit.html`<p>Loading activities...</p>`;
    }
    return import_lit.html`
      ${this.activities.map(
      (act) => import_lit.html`
          <section class="card">
            <h3>${act.name}</h3>
            <p>${act.desc}</p>
          </section>
        `
    )}
    `;
  }
  static styles = import_lit.css`
    :host {
      display: block;
    }

    .card {
      background-color: var(--color-box-background);
      border: 1px solid var(--color-border-light);
      padding: var(--space-padding);
      margin-bottom: var(--space-margin);
      border-radius: var(--radius-default);
    }

    h3 {
      font-size: 1.25rem;
      font-family: var(--heading-font, serif);
      margin: 0 0 0.25rem 0;
    }

    p {
      font-family: var(--body-font, sans-serif);
      margin: 0;
    }
  `;
}
customElements.define("site-activities", SiteActivitiesElement);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SiteActivitiesElement
});
