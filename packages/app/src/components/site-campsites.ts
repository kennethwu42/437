import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { SiteCampsite } from "server/models";

export class SiteCampsitesElement extends LitElement {
  @property({ type: Array }) campsites: SiteCampsite[] = [];

  override render() {
    console.log("📦 site-campsites received:", this.campsites);

    if (!this.campsites || this.campsites.length === 0) {
      return html`<p>No campsites to display.</p>`;
    }

    return html`
      ${this.campsites.map((camp) => {
        const id = camp.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

        return html`
          <site-campsite
            .id=${id}
            .name=${camp.name}
            .count=${camp.count}
            .image=${camp.image}
          >
            <svg slot="icon" class="icon">
              <use href="/icons/icons.svg#campsites"></use>
            </svg>
            <p slot="desc">${camp.desc}</p>
          </site-campsite>
        `;
      })}
    `;
  }

  static styles = css`
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
