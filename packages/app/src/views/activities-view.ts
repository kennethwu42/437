import { html, LitElement } from "lit";

export class ActivitiesViewElement extends LitElement {
  render() {
    return html`
      <site-activities src="/data/activiities.json"></site-activities>
    `;
  }
}

customElements.define("activities-view", ActivitiesViewElement);
