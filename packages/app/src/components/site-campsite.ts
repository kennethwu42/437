import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

interface Review {
  id: string;
  name?: string;
  review: string;
}

export class SiteCampsiteElement extends LitElement {
  @property() name?: string;
  @property({ type: Number }) count?: number;
  @property() id?: string;
  @property() image?: string;

  @state()
  private showReviewSection: boolean = false;

  @state()
  private showReviewForm: boolean = false;

  @state()
  private reviewText: string = "";

  @state()
  private reviews: Review[] = [];

  override firstUpdated() {
    this.loadReviews();
  }

  loadReviews() {
    const stored = localStorage.getItem("reviews");
    if (stored && this.id) {
      const all = JSON.parse(stored) as Review[];
      this.reviews = all.filter(r => r.id === this.id);
    }
  }

  saveReviewToLocalStorage(text: string) {
    const stored = localStorage.getItem("reviews");
    const all: Review[] = stored ? JSON.parse(stored) : [];

    const newReview: Review = {
      id: this.id ?? "",
      name: this.name,
      review: text
    };

    const updated = [...all, newReview];
    localStorage.setItem("reviews", JSON.stringify(updated));
    this.reviews = [...this.reviews, newReview];
  }

  toggleReviewSection() {
    this.showReviewSection = !this.showReviewSection;
  }

  toggleReviewForm() {
    this.showReviewForm = !this.showReviewForm;
  }

  submitReview() {
    const trimmed = this.reviewText.trim();
    if (trimmed) {
      this.saveReviewToLocalStorage(trimmed);
      this.reviewText = "";
      this.showReviewForm = false;
    }
  }

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

        <div class="body">
          ${this.image
            ? html`<img class="campsite-img" src=${this.image} alt=${this.name} />`
            : null}

          <div class="desc">
            <slot name="desc"></slot>
          </div>
        </div>

        <button @click=${this.toggleReviewSection}>
          ${this.showReviewSection ? "Hide Reviews" : "See All Reviews"}
        </button>

        ${this.showReviewSection
          ? html`
              <div class="reviews">
                <h3>Reviews</h3>
                ${this.reviews.length > 0
                  ? this.reviews.map(r => html`<p class="review">"${r.review}"</p>`)
                  : html`<p>No reviews yet.</p>`}

                <button @click=${this.toggleReviewForm}>
                  ${this.showReviewForm ? "Cancel" : "Add a Review"}
                </button>

                ${this.showReviewForm
                  ? html`
                      <textarea
                        .value=${this.reviewText}
                        @input=${(e: Event) =>
                          (this.reviewText = (e.target as HTMLTextAreaElement).value)}
                        placeholder="Write your review here..."
                      ></textarea>
                      <button @click=${this.submitReview}>Submit Review</button>
                    `
                  : null}
              </div>
            `
          : null}
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
      background-color: var(--color-box-background, #fff);
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

    .count {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-muted, #666);
      margin-top: 0.15rem;
    }

    .body {
      display: flex;
      flex-direction: column;
      align-items: flex-start;  /* 👈 left-align contents */
      gap: 0.75rem;
      margin: 1rem 0;
    }

    .campsite-img {
      width: 100%;
      max-width: 600px;
      height: auto;
      object-fit: cover;
      border-radius: 6px;
      display: block;
    }

    .desc {
      font-size: 1rem;
      font-family: var(--body-font, sans-serif);
      color: var(--color-text-default, #333);
    }

    button {
      margin-top: 0.75rem;
      font-size: 0.95rem;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      background-color: var(--color-primary, #2563eb);
      color: white;
      border: none;
      cursor: pointer;
    }

    .reviews {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #ccc;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .review {
      font-style: italic;
      padding: 0.25rem;
      background: #f9f9f9;
      border-left: 4px solid #ccc;
    }

    textarea {
      width: 100%;
      font-family: sans-serif;
      font-size: 0.95rem;
      padding: 0.5rem;
      resize: vertical;
      min-height: 60px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .reviews button:last-of-type {
      background-color: var(--color-accent, #16a34a);
    }
  `;
}

customElements.define("site-campsite", SiteCampsiteElement);
