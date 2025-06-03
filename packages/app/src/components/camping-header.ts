import { html, LitElement, css } from "lit";

export class HeaderElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-bottom: var(--space-margin);
    }

    header {
      background-color: var(--color-header-background, #263646);
      color: var(--color-text-on-dark, white);
      border-radius: var(--radius-default);
      padding: var(--space-padding);
    }

    .page-wrapper {
      max-width: 1024px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: var(--space-small);
    }

    h1 {
      font-family: var(--heading-font, 'Playfair Display', serif);
      font-size: 1.8rem;
      margin: 0;
    }

    p {
      font-family: var(--body-font, sans-serif);
      margin: 0;
      font-size: 1rem;
    }

    label {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-family: var(--body-font, sans-serif);
      font-size: 0.9rem;
    }

    input[type="checkbox"] {
      transform: scale(1.1);
    }
  `;

  override firstUpdated() {
    const toggle = this.renderRoot.querySelector<HTMLInputElement>("#darkModeToggle");
    const saved = localStorage.getItem("dark-mode");

    if (saved === "true") {
      document.body.classList.add("dark-mode");
      if (toggle) toggle.checked = true;
    }

    toggle?.addEventListener("change", (event) => {
      const isDark = (event.target as HTMLInputElement).checked;
      localStorage.setItem("dark-mode", String(isDark));
      document.body.classList.toggle("dark-mode", isDark);
    });
  }

  render() {
    return html`
      <header>
        <div class="page-wrapper">
          <h1>Camping and Hiking</h1>
          <p>Explore outdoor adventures in the San Luis Obispo area:</p>
          <label>
            <input id="darkModeToggle" type="checkbox" autocomplete="off" />
            Dark mode
          </label>
        </div>
      </header>
    `;
  }
}

customElements.define("camping-header", HeaderElement);
