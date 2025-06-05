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
            <div class="activity-layout">
              ${act.image
                ? html`<img class="activity-img" src="${act.image}" alt="${act.name}" />`
                : null}

              <div class="content">
                <h3>${act.name}</h3>
                <p>${act.desc}</p>

                <div class="reviews">
                  <h4>Reviews</h4>
                  ${reviews.slice(-3).map((r) => html`<p class="review">"${r.review}"</p>`)}
                  ${reviews.length === 0 ? html`<p>No reviews yet.</p>` : null}
                </div>

                ${this.showReviewForm[id]
                  ? html`
                      <textarea
                        .value=${this.reviewText[id] || ""}
                        @input=${(e: Event) => this.handleInput(id, e)}
                        placeholder="Write your review here..."
                      ></textarea>
                      <button class="submit" @click=${() => this.submitReview(id, act.name)}>
                        Submit Review
                      </button>
                    `
                  : null}

                <button class="add" @click=${() => this.toggleForm(id)}>
                  ${this.showReviewForm[id] ? "Cancel" : "Add a Review"}
                </button>
              </div>
            </div>
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

    .activity-layout {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }

    .activity-img {
      width: 300px;
      height: auto;
      object-fit: cover;
      border-radius: 6px;
      flex-shrink: 0;
    }

    .content {
      flex: 1;
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

    .reviews {
      margin-top: 0.5rem;
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
      background-color: var(--color-box-background, #fff);
      color: var(--color-text-default, #000);
    }

    textarea::placeholder {
      color: var(--color-text-muted, #666); /* or #999 for higher contrast */
    }


    .review {
      font-style: italic;
      padding: 0.25rem;
      background: #f9f9f9;
      border-left: 4px solid #ccc;
      color: #222; /* 👈 ensures dark readable text */
    }



    button {
      font-size: 0.95rem;
      padding: 0.4rem 0.8rem;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      margin-top: 0.5rem;
    }

    .add {
      float: right;
      background-color: var(--color-primary, #2563eb);
      color: white;
    }

    .submit {
      background-color: var(--color-accent, #16a34a);
      color: white;
    }
  `;
}

customElements.define("site-activities", SiteActivitiesElement);
