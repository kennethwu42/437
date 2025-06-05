import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

interface Review {
  id: string;
  name?: string;
  review: string;
}

export class SiteActivitiesElement extends LitElement {
  @property({ type: Array })
  activities: Array<{ name: string; desc: string; image?: string }> = [];

  @state()
  private reviews: Record<string, Review[]> = {};

  @state()
  private showReviewSection: Record<string, boolean> = {};

  @state()
  private showReviewForm: Record<string, boolean> = {};

  @state()
  private reviewText: Record<string, string> = {};

  override firstUpdated() {
    this.loadReviews();
  }

  loadReviews() {
    const stored = localStorage.getItem("activity-reviews");
    if (stored) {
      this.reviews = JSON.parse(stored);
    }
  }

  saveReview(id: string, name: string, text: string) {
    const newReview: Review = { id, name, review: text };
    const updated = {
      ...this.reviews,
      [id]: [...(this.reviews[id] || []), newReview]
    };
    localStorage.setItem("activity-reviews", JSON.stringify(updated));
    this.reviews = updated;
    this.reviewText = { ...this.reviewText, [id]: "" };
    this.showReviewForm = { ...this.showReviewForm, [id]: false };
  }

  toggleSection(id: string) {
    this.showReviewSection = {
      ...this.showReviewSection,
      [id]: !this.showReviewSection[id]
    };
  }

  toggleForm(id: string) {
    this.showReviewForm = {
      ...this.showReviewForm,
      [id]: !this.showReviewForm[id]
    };
  }

  handleInput(id: string, e: Event) {
    this.reviewText = {
      ...this.reviewText,
      [id]: (e.target as HTMLTextAreaElement).value
    };
  }

  submitReview(id: string, name: string) {
    const text = this.reviewText[id]?.trim();
    if (text) {
      this.saveReview(id, name, text);
    }
  }

  override render() {
    return html`
      ${this.activities.map((act) => {
        const id = act.name;
        const reviews = this.reviews[id] || [];

        return html`
          <section class="card">
            ${act.image
              ? html`<img class="activity-img" src="${act.image}" alt="${act.name}" />`
              : null}
            <h3>${act.name}</h3>
            <p>${act.desc}</p>

            <button @click=${() => this.toggleSection(id)}>
              ${this.showReviewSection[id] ? "Hide Reviews" : "See All Reviews"}
            </button>

            ${this.showReviewSection[id]
              ? html`
                  <div class="reviews">
                    <h4>Reviews</h4>
                    ${reviews.length > 0
                      ? reviews.map((r) => html`<p class="review">"${r.review}"</p>`)
                      : html`<p>No reviews yet.</p>`}

                    <button @click=${() => this.toggleForm(id)}>
                      ${this.showReviewForm[id] ? "Cancel" : "Add a Review"}
                    </button>

                    ${this.showReviewForm[id]
                      ? html`
                          <textarea
                            .value=${this.reviewText[id] || ""}
                            @input=${(e: Event) => this.handleInput(id, e)}
                            placeholder="Write your review here..."
                          ></textarea>
                          <button @click=${() => this.submitReview(id, act.name)}>
                            Submit Review
                          </button>
                        `
                      : null}
                  </div>
                `
              : null}
          </section>
        `;
      })}
    `;
  }

  static styles = css`
    :host {
      display: block;
      margin: 1rem 0;
    }

    .card {
      background-color: var(--color-box-background);
      border: 1px solid var(--color-border-light);
      padding: var(--space-padding);
      margin-bottom: var(--space-margin);
      border-radius: var(--radius-default);
    }

    .activity-img {
      width: 100%;
      max-width: 600px;
      height: auto;
      object-fit: cover;
      border-radius: 6px;
      display: block;
      margin-bottom: 0.75rem;
    }

    h3 {
      font-size: 1.25rem;
      font-family: var(--heading-font, serif);
      margin: 0.5rem 0 0.25rem 0;
    }

    p {
      font-family: var(--body-font, sans-serif);
      margin: 0 0 0.5rem 0;
    }

    button {
      margin-top: 0.5rem;
      font-size: 0.95rem;
      padding: 0.4rem 0.8rem;
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

customElements.define("site-activities", SiteActivitiesElement);
