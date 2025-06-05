import { html } from "lit";
import { View } from "@calpoly/mustang";
import { state } from "lit/decorators.js";

import { Msg } from "../messages";
import { Model } from "../model";
import { SiteActivity } from "server/models";

export class ActivitiesViewElement extends View<Model, Msg> {
  constructor() {
    super("camping:model");
  }

  @state()
  get activities(): SiteActivity[] {
    return this.model.activities ?? [];
  }

  override connectedCallback() {
    super.connectedCallback();
    this.dispatchMessage(["activities/init"]);
  }

  render() {
    return html`
      <h2>Activities</h2>
      <site-activities .activities=${this.activities}></site-activities>
    `;
  }
}
