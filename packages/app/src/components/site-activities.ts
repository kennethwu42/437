import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";

export class SiteActivitiesElement extends LitElement {
  @property({ type: Array })
  activities: Array<{ name: string; desc: string }> = [];

  override render() {
    if (!this.activities || this.activities.length === 0) {
      return html`<p>No activities available.</p>`;
    }

    return html`
      ${this.activities.map(
        (act) => html`
          <section class="card">
            <h3>${act.name}</h3>
            <p>${act.desc}</p>
          </section>
        `
      )}
    `;
  }

  static styles = css`
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
