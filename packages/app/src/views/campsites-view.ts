import { html } from "lit";
import { View } from "@calpoly/mustang";
import { state } from "lit/decorators.js";

import { Msg } from "../messages";
import { Model } from "../model";
import { SiteCampsite } from "server/models";

export class CampsitesViewElement extends View<Model, Msg> {
  constructor() {
    super("camping:model");
  }

  @state()
  get campsites(): SiteCampsite[] {
    return this.model.campsites ?? [];
  }

  override connectedCallback() {
    super.connectedCallback();
    this.dispatchMessage(["campsites/init"]);
  }

  render() {
    return html`
      <h2>Campsites</h2>
      <site-campsites .campsites=${this.campsites}></site-campsites>
    `;
  }
}
