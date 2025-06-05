import { html, LitElement, css } from "lit";

export class HomeViewElement extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .page-wrapper {
      padding: 1rem;
      text-align: left;
    }

    .main-image {
      width: 100%;
      max-width: 600px;
      height: auto;
      border-radius: var(--radius-default);
      margin-bottom: 1rem;
      display: block;
    }

    .link-grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      max-width: 600px;
      padding: 0;
      list-style: none;
    }

    .link-card {
      display: block;
      padding: 1.25rem;
      background-color: var(--color-box-background);
      border: 1px solid var(--color-border-light);
      border-radius: var(--radius-default);
      text-decoration: none;
      color: var(--color-text-default);
      font-family: var(--body-font, sans-serif);
      transition: background-color 0.2s;
    }

    .link-card:hover {
      background-color: var(--color-box-hover);
    }
  `;

  render() {
    return html`
      <div class="page-wrapper">
        <main>
          <img
            src="/images/mountainslo.webp"
            alt="Scenic San Luis Obispo Mountains"
            class="main-image"
          />

          <ul class="link-grid">
            <li><a href="/app/campsites" class="link-card">Campsite</a></li>
            <li><a href="/app/activities" class="link-card">Activities</a></li>
          </ul>
        </main>
      </div>
    `;
  }
}

customElements.define("home-view", HomeViewElement);
