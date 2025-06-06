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
      border: 2px solid #16a34a;
    }

    .page-wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--space-small);
      text-align: left;
    }

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .back-button {
      background: none;
      border: none;
      color: inherit;
      font: inherit;
      cursor: pointer;
      padding: 0.25rem 0;
      text-decoration: underline;
    }

    .dropdown {
      position: relative;
      display: inline-block;
    }

    .dropdown-button {
      background: white;
      color: #263646;
      font-size: 0.9rem;
      border-radius: 6px;
      padding: 0.5rem 0.8rem;
      font-weight: bold;
      cursor: pointer;
      border: none;
      font-family: var(--body-font, sans-serif);
    }

    .dropdown-content {
      display: none;
      position: absolute;
      right: 0;
      top: 100%; /* directly below the button */
      background-color: white;
      min-width: 160px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      z-index: 10;
      border-radius: 6px;
      overflow: hidden;
      margin-top: 0; /* removed the gap */
    }


    .dropdown-content a,
    .dropdown-content button {
      color: #263646;
      padding: 0.75rem 1rem;
      text-decoration: none;
      display: block;
      background: white;
      border: none;
      width: 100%;
      text-align: left;
      font-size: 0.9rem;
      font-family: var(--body-font, sans-serif);
      cursor: pointer;
    }

    .dropdown-content a:hover,
    .dropdown-content button:hover {
      background-color: #f3f4f6;
    }

    .dropdown:hover .dropdown-content {
      display: block;
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

  private isMainPage = false;

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

    this.isMainPage = window.location.pathname === "/app";
    this.requestUpdate();
  }

  private getUsername(): string {
    return "Alpha"; // Mocked user name
  }

  private handleSignOut() {
    this.dispatchEvent(new CustomEvent("auth:message", {
      bubbles: true,
      composed: true,
      detail: ["auth/signout", {}]
    }));
  }

  render() {
    const username = this.getUsername();
    return html`
      <header>
        <div class="page-wrapper">
          <div class="header-top">
            <a class="back-button" href="/app">← Back</a>

            <div class="dropdown">
              <button class="dropdown-button">Hi, ${username}</button>
              <div class="dropdown-content">
                <a href="/app/profile/${username}">Profile</a>
                <button @click=${this.handleSignOut}>Sign out</button>
              </div>
            </div>
          </div>

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
