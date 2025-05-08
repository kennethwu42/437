import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class SiteCampsiteElement extends LitElement {
  @property() name?: string;
  @property({ type: Number }) count?: number;

  override render() {
    const countDisplay = this.count !== undefined
      ? html`<p class="count">${this.count} campsites</p>`
      : "";

    return html`
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

  static styles = css`
    :host {
      display: block;
      margin: 1rem 0;
    }

    .card {
      border: 1px solid var(--border-color, #ddd);
      border-radius: 8px;
      background-color: var(--background, #fff);
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
      width: 24px;
      height: 24px;
      fill: currentColor;
      flex-shrink: 0;
    }

    .desc {
      font-size: 1rem;
      font-family: var(--body-font, sans-serif);
      color: var(--text-color, #333);
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
