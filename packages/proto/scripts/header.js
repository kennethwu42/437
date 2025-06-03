class HeaderElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #2c3e50; /* dark blue/gray background */
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          border: 3px solid #3cb371; /* green border */
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-weight: 700;
          font-size: 1.5rem;
          box-sizing: border-box;
          user-select: none;
        }
      </style>
      <div>
        Camping and Hiking
      </div>
    `;
  }

  static initializeOnce() {
    if (!customElements.get("blz-header")) {
      customElements.define("blz-header", HeaderElement);
    }
  }
}

export { HeaderElement };
