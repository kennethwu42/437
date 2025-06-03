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
var site_campsite_exports = {};
__export(site_campsite_exports, {
  SiteCampsiteElement: () => SiteCampsiteElement
});
module.exports = __toCommonJS(site_campsite_exports);
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
class SiteCampsiteElement extends import_lit.LitElement {
  @((0, import_decorators.property)()) name;
  @((0, import_decorators.property)({ type: Number })) count;
  render() {
    const countDisplay = this.count !== void 0 ? import_lit.html`<p class="count">${this.count} campsites</p>` : "";
    return import_lit.html`
      <section class="card">
        <div class="header">
          <slot name="icon"></slot>
          <div>
            <h2>${this.name}</h2>
            ${countDisplay}
          </div>
        </div>
        <div class="desc">
          <slot name="desc"></slot>
        </div>
      </section>
    `;
  }
  static styles = import_lit.css`
    :host {
      display: block;
      margin: 1rem 0;
    }

    .card {
      border: 1px solid var(--border-color, #ddd);
      border-radius: 8px;
      background-color: var(--color-box-background, #fff);
      padding: 1rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.5rem;
    }

    h2 {
      font-size: 1.25rem;
      font-family: var(--heading-font, serif);
      margin: 0;
    }

    .icon {
      width: 50px;
      height: 50px;
      fill: currentColor;
      flex-shrink: 0;
    }

    .desc {
      font-size: 1rem;
      font-family: var(--body-font, sans-serif);
      color: var(--color-text-default, #333);
    }

    .count {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-muted, #666);
      margin-top: 0.15rem;
    }
  `;
}
customElements.define("site-campsite", SiteCampsiteElement);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SiteCampsiteElement
});
