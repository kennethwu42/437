import{a as b,i as h,b as u,x as o,r as d,V as F,n as v,d as O,_ as T,s as S,h as z}from"./state-BJBJ081d.js";const C={};console.log("🛠 update.ts loaded");function j(s,e,i){if(console.log("🛠 Message received in update:",s),e(r=>({...r,user:i})),s[0]==="campsites/init"){console.log("🌱 campsites/init received — fetching data"),fetch("/api/campsites",{headers:b.headers(i)}).then(r=>r.json()).then(r=>{console.log("📦 campsites fetched — applying to model:",r),e(t=>({...t,campsites:r}))}).catch(r=>{console.error("❌ Failed to fetch campsites:",r)});return}if(s[0]==="activities/init"){console.log("🌱 activities/init received — fetching data"),fetch("/api/activities",{headers:b.headers(i)}).then(r=>r.json()).then(r=>{console.log("📦 activities fetched — applying to model:",r),e(t=>({...t,activities:r}))}).catch(r=>{console.error("❌ Failed to fetch activities:",r)});return}switch(s[0]){case"campsites/load":console.log("✅ Applying campsites to model:",s[1].campsites),e(r=>({...r,campsites:s[1].campsites}));break;case"activities/load":console.log("✅ Applying activities to model:",s[1].activities),e(r=>({...r,activities:s[1].activities}));break;default:throw new Error(`Unhandled message type: ${s[0]}`)}}const x=class x extends h{constructor(){super(...arguments),this.isMainPage=!1}firstUpdated(){const e=this.renderRoot.querySelector("#darkModeToggle");localStorage.getItem("dark-mode")==="true"&&(document.body.classList.add("dark-mode"),e&&(e.checked=!0)),e==null||e.addEventListener("change",r=>{const t=r.target.checked;localStorage.setItem("dark-mode",String(t)),document.body.classList.toggle("dark-mode",t)}),this.isMainPage=window.location.pathname==="/app",this.requestUpdate()}render(){return o`
      <header>
        <div class="page-wrapper">
          ${this.isMainPage?null:o`<button class="back-button" @click=${()=>history.back()}>← Back</button>`}
          <h1>Camping and Hiking</h1>
          <p>Explore outdoor adventures in the San Luis Obispo area:</p>
          <label>
            <input id="darkModeToggle" type="checkbox" autocomplete="off" />
            Dark mode
          </label>
        </div>
      </header>
    `}};x.styles=u`
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

    .back-button {
      align-self: flex-start;
      background: none;
      border: none;
      color: inherit;
      font: inherit;
      cursor: pointer;
      padding: 0.25rem 0;
      text-decoration: underline;
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
  `;let g=x;customElements.define("camping-header",g);const y=class y extends h{render(){return o`
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
    `}};y.styles=u`
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
  `;let f=y;customElements.define("home-view",f);var A=Object.defineProperty,I=Object.getOwnPropertyDescriptor,M=(s,e,i,r)=>{for(var t=I(e,i),a=s.length-1,c;a>=0;a--)(c=s[a])&&(t=c(e,i,t)||t);return t&&A(e,i,t),t};class P extends F{constructor(){super("camping:model")}get campsites(){return this.model.campsites??[]}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["campsites/init"])}render(){return o`
      <h2>Campsites</h2>
      <site-campsites .campsites=${this.campsites}></site-campsites>
    `}}M([d()],P.prototype,"campsites");var N=Object.defineProperty,D=Object.getOwnPropertyDescriptor,L=(s,e,i,r)=>{for(var t=D(e,i),a=s.length-1,c;a>=0;a--)(c=s[a])&&(t=c(e,i,t)||t);return t&&N(e,i,t),t};class _ extends F{constructor(){super("camping:model")}get activities(){return this.model.activities??[]}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["activities/init"])}render(){return o`
      <h2>Activities</h2>
      <site-activities .activities=${this.activities}></site-activities>
    `}}L([d()],_.prototype,"activities");var J=Object.defineProperty,U=(s,e,i,r)=>{for(var t=void 0,a=s.length-1,c;a>=0;a--)(c=s[a])&&(t=c(e,i,t)||t);return t&&J(e,i,t),t};const k=class k extends h{constructor(){super(...arguments),this.campsites=[]}render(){return console.log("📦 site-campsites received:",this.campsites),!this.campsites||this.campsites.length===0?o`<p>No campsites to display.</p>`:o`
      ${this.campsites.map(e=>{const i=e.name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");return o`
          <site-campsite
            .id=${i}
            .name=${e.name}
            .count=${e.count}
            .image=${e.image}
          >
            <svg slot="icon" class="icon">
              <use href="/icons/icons.svg#campsites"></use>
            </svg>
            <p slot="desc">${e.desc}</p>
          </site-campsite>
        `})}
    `}};k.styles=u`
    :host {
      display: block;
    }

    .icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
  `;let m=k;U([v({type:Array})],m.prototype,"campsites");customElements.define("site-campsites",m);var q=Object.defineProperty,p=(s,e,i,r)=>{for(var t=void 0,a=s.length-1,c;a>=0;a--)(c=s[a])&&(t=c(e,i,t)||t);return t&&q(e,i,t),t};const $=class $ extends h{constructor(){super(...arguments),this.showReviewForm=!1,this.reviewText="",this.reviews=[]}firstUpdated(){this.loadReviews()}loadReviews(){const e=localStorage.getItem("reviews");if(e&&this.id){const i=JSON.parse(e);this.reviews=i.filter(r=>r.id===this.id)}}saveReviewToLocalStorage(e){const i=localStorage.getItem("reviews"),r=i?JSON.parse(i):[],t={id:this.id??"",name:this.name,review:e},a=[...r,t];localStorage.setItem("reviews",JSON.stringify(a)),this.reviews=[...this.reviews,t]}toggleReviewForm(){this.showReviewForm=!this.showReviewForm}submitReview(){const e=this.reviewText.trim();e&&(this.saveReviewToLocalStorage(e),this.reviewText="",this.showReviewForm=!1)}render(){const e=this.count!==void 0?o`<p class="count">${this.count} campsites</p>`:"",i=this.reviews.slice(0,3);return o`
      <section class="card">
        <div class="layout">
          ${this.image?o`<img class="campsite-img" src=${this.image} alt=${this.name} />`:null}

          <div class="content">
            <h2>${this.name}</h2>
            ${e}
            <div class="desc">
              <slot name="desc"></slot>
            </div>

            <div class="reviews">
              <h3>Reviews</h3>
              ${i.length>0?i.map(r=>o`<p class="review">"${r.review}"</p>`):o`<p>No reviews yet.</p>`}

              ${this.showReviewForm?o`
                    <textarea
                      .value=${this.reviewText}
                      @input=${r=>this.reviewText=r.target.value}
                      placeholder="Write your review here..."
                    ></textarea>
                    <div class="review-actions">
                      <button @click=${this.submitReview}>Submit</button>
                      <button @click=${this.toggleReviewForm} class="cancel">Cancel</button>
                    </div>
                  `:o`
                    <div class="review-actions">
                      <button @click=${this.toggleReviewForm}>Add a Review</button>
                    </div>
                  `}
            </div>
          </div>
        </div>
      </section>
    `}};$.styles=u`
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
  `;let n=$;p([v()],n.prototype,"name");p([v({type:Number})],n.prototype,"count");p([v()],n.prototype,"id");p([v()],n.prototype,"image");p([d()],n.prototype,"showReviewForm");p([d()],n.prototype,"reviewText");p([d()],n.prototype,"reviews");customElements.define("site-campsite",n);var V=Object.defineProperty,w=(s,e,i,r)=>{for(var t=void 0,a=s.length-1,c;a>=0;a--)(c=s[a])&&(t=c(e,i,t)||t);return t&&V(e,i,t),t};const R=class R extends h{constructor(){super(...arguments),this.activities=[],this.reviews={},this.showReviewForm={},this.reviewText={}}firstUpdated(){this.loadReviews()}loadReviews(){const e=localStorage.getItem("activity-reviews");e&&(this.reviews=JSON.parse(e))}saveReview(e,i,r){const t={id:e,name:i,review:r},a={...this.reviews,[e]:[...this.reviews[e]||[],t]};localStorage.setItem("activity-reviews",JSON.stringify(a)),this.reviews=a,this.reviewText={...this.reviewText,[e]:""},this.showReviewForm={...this.showReviewForm,[e]:!1}}toggleForm(e){this.showReviewForm={...this.showReviewForm,[e]:!this.showReviewForm[e]}}handleInput(e,i){this.reviewText={...this.reviewText,[e]:i.target.value}}submitReview(e,i){var t;const r=(t=this.reviewText[e])==null?void 0:t.trim();r&&this.saveReview(e,i,r)}render(){return o`
      ${this.activities.map(e=>{const i=e.name,r=this.reviews[i]||[];return o`
          <section class="card">
            <div class="activity-layout">
              ${e.image?o`<img class="activity-img" src="${e.image}" alt="${e.name}" />`:null}

              <div class="content">
                <h3>${e.name}</h3>
                <p>${e.desc}</p>

                <div class="reviews">
                  <h4>Reviews</h4>
                  ${r.slice(-3).map(t=>o`<p class="review">"${t.review}"</p>`)}
                  ${r.length===0?o`<p>No reviews yet.</p>`:null}
                </div>

                ${this.showReviewForm[i]?o`
                      <textarea
                        .value=${this.reviewText[i]||""}
                        @input=${t=>this.handleInput(i,t)}
                        placeholder="Write your review here..."
                      ></textarea>
                      <button class="submit" @click=${()=>this.submitReview(i,e.name)}>
                        Submit Review
                      </button>
                    `:null}

                <button class="add" @click=${()=>this.toggleForm(i)}>
                  ${this.showReviewForm[i]?"Cancel":"Add a Review"}
                </button>
              </div>
            </div>
          </section>
        `})}
    `}};R.styles=u`
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
  `;let l=R;w([v({type:Array})],l.prototype,"activities");w([d()],l.prototype,"reviews");w([d()],l.prototype,"showReviewForm");w([d()],l.prototype,"reviewText");customElements.define("site-activities",l);const W=[{path:"/app/campsites",view:()=>o`<campsites-view></campsites-view>`},{path:"/app/activities",view:()=>o`<activities-view></activities-view>`},{path:"/app",view:()=>o`<home-view></home-view>`},{path:"/",redirect:"/app"}];O({"mu-auth":b.Provider,"mu-history":z.Provider,"mu-store":class extends S.Provider{constructor(){super(j,C,"camping:auth"),this.provides="camping:model"}},"mu-switch":class extends T.Element{constructor(){super(W,"camping:history","camping:auth")}},"camping-header":g,"home-view":f,"campsites-view":P,"activities-view":_,"site-campsites":m,"site-campsite":n,"site-activities":l});
