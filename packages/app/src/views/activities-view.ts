import { html, LitElement } from "lit";

export class ActivitiesViewElement extends LitElement {
  render() {
    return html`
      <site-activities src="/data/activities.json"></site-activities>
    `;
  }
}
