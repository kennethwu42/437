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
var site_campsites_exports = {};
__export(site_campsites_exports, {
  SiteCampsitesElement: () => SiteCampsitesElement
});
module.exports = __toCommonJS(site_campsites_exports);
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
class SiteCampsitesElement extends import_lit.LitElement {
  @((0, import_decorators.property)()) src = "";
  @((0, import_decorators.state)()) campsites = [];
  connectedCallback() {
    super.connectedCallback();
    if (this.src) {
      fetch(this.src).then((res) => res.json()).then((data) => {
        this.campsites = data;
      }).catch((err) => {
        console.error("Failed to load campsites:", err);
      });
    }
  }
  render() {
    if (this.campsites.length === 0) {
      return import_lit.html`<p>Loading campsites...</p>`;
    }
    return import_lit.html`
      ${this.campsites.map(
      (camp) => import_lit.html`
          <site-campsite .name=${camp.name} .count=${camp.count}>
            <svg slot="icon" class="icon">
              <use href="/icons/icons.svg#campsites"></use>
            </svg>
            <p slot="desc">${camp.desc}</p>
          </site-campsite>
        `
    )}
    `;
  }
  static styles = import_lit.css`
    :host {
      display: block;
    }

    .icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
  `;
}
customElements.define("site-campsites", SiteCampsitesElement);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SiteCampsitesElement
});
