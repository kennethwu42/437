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

    const displayedReviews = this.reviews.slice(0, 3);

    return html`
      <section class="card">
        <div class="layout">
          ${this.image
            ? html`<img class="campsite-img" src=${this.image} alt=${this.name} />`
            : null}

          <div class="content">
            <h2>${this.name}</h2>
            ${countDisplay}
            <div class="desc">
              <slot name="desc"></slot>
            </div>

            <div class="reviews">
              <h3>Reviews</h3>
              ${displayedReviews.length > 0
                ? displayedReviews.map(r => html`<p class="review">"${r.review}"</p>`)
                : html`<p>No reviews yet.</p>`}

              ${this.showReviewForm
                ? html`
                    <textarea
                      .value=${this.reviewText}
                      @input=${(e: Event) =>
                        (this.reviewText = (e.target as HTMLTextAreaElement).value)}
                      placeholder="Write your review here..."
                    ></textarea>
                    <div class="review-actions">
                      <button @click=${this.submitReview}>Submit</button>
                      <button @click=${this.toggleReviewForm} class="cancel">Cancel</button>
                    </div>
                  `
                : html`
                    <div class="review-actions">
                      <button @click=${this.toggleReviewForm}>Add a Review</button>
                    </div>
                  `}
            </div>
          </div>
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
      background-color: var(--color-box-background, #fff);
      padding: 1rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .layout {
      display: flex;
      gap: 1rem;
      flex-direction: row;
    }

    .campsite-img {
      width: 280px;
      height: auto;
      object-fit: cover;
      border-radius: 6px;
      flex-shrink: 0;
    }

    .content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
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
      margin-bottom: 0.5rem;
    }

    .desc {
      font-size: 1rem;
      font-family: var(--body-font, sans-serif);
      color: var(--color-text-default, #333);
      margin-bottom: 1rem;
    }

    .reviews {
      margin-top: 0.5rem;
    }

    .review {
      font-style: italic;
      padding: 0.4rem;
      margin: 0.2rem 0;
      background: #f4f4f4;
      border-left: 4px solid #ccc;
      color: #222;
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

    .review-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    button {
      font-size: 0.95rem;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      background-color: var(--color-primary, #2563eb);
      color: white;
      border: none;
      cursor: pointer;
    }

    .cancel {
      background-color: var(--color-muted, #aaa);
    }
  `;
}

customElements.define("site-campsite", SiteCampsiteElement);
