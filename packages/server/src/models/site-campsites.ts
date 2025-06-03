import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";

export class SiteCampsitesElement extends LitElement {
  @property() src = "";
  @state() campsites: Array<{ name: string; count: number; desc: string }> = [];

  override connectedCallback() {
    super.connectedCallback();
    if (this.src) {
      fetch(this.src)
        .then((res) => res.json())
        .then((data) => {
          this.campsites = data;
        })
        .catch((err) => {
          console.error("Failed to load campsites:", err);
        });
    }
  }

  override render() {
    if (this.campsites.length === 0) {
      return html`<p>Loading campsites...</p>`;
    }

    return html`
      ${this.campsites.map(
        (camp) => html`
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

  static styles = css`
    :host {
      display: block;
    }

    .icon {
      width: 50px;
      height: 50px;
      fill: currentColor;
    }
  `;
}

customElements.define("site-campsites", SiteCampsitesElement);
