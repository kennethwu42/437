import{a as b,i as h,b as g,x as o,r as d,V as F,n as m,d as I,_ as O,s as T,h as S}from"./state-BJBJ081d.js";const z={};console.log("🛠 update.ts loaded");function C(a,e,t){if(console.log("🛠 Message received in update:",a),e(r=>({...r,user:t})),a[0]==="campsites/init"){console.log("🌱 campsites/init received — fetching data"),fetch("/api/campsites",{headers:b.headers(t)}).then(r=>r.json()).then(r=>{console.log("📦 campsites fetched — applying to model:",r),e(i=>({...i,campsites:r}))}).catch(r=>{console.error("❌ Failed to fetch campsites:",r)});return}if(a[0]==="activities/init"){console.log("🌱 activities/init received — fetching data"),fetch("/api/activities",{headers:b.headers(t)}).then(r=>r.json()).then(r=>{console.log("📦 activities fetched — applying to model:",r),e(i=>({...i,activities:r}))}).catch(r=>{console.error("❌ Failed to fetch activities:",r)});return}switch(a[0]){case"campsites/load":console.log("✅ Applying campsites to model:",a[1].campsites),e(r=>({...r,campsites:a[1].campsites}));break;case"activities/load":console.log("✅ Applying activities to model:",a[1].activities),e(r=>({...r,activities:a[1].activities}));break;default:throw new Error(`Unhandled message type: ${a[0]}`)}}const x=class x extends h{constructor(){super(...arguments),this.isMainPage=!1}firstUpdated(){const e=this.renderRoot.querySelector("#darkModeToggle");localStorage.getItem("dark-mode")==="true"&&(document.body.classList.add("dark-mode"),e&&(e.checked=!0)),e==null||e.addEventListener("change",r=>{const i=r.target.checked;localStorage.setItem("dark-mode",String(i)),document.body.classList.toggle("dark-mode",i)}),this.isMainPage=window.location.pathname==="/app",this.requestUpdate()}render(){return o`
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
    `}};x.styles=g`
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
  `;let f=x;customElements.define("camping-header",f);const y=class y extends h{render(){return o`
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
    `}};y.styles=g`
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
  `;let w=y;customElements.define("home-view",w);var j=Object.defineProperty,A=Object.getOwnPropertyDescriptor,D=(a,e,t,r)=>{for(var i=A(e,t),s=a.length-1,c;s>=0;s--)(c=a[s])&&(i=c(e,t,i)||i);return i&&j(e,t,i),i};class P extends F{constructor(){super("camping:model")}get campsites(){return this.model.campsites??[]}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["campsites/init"])}render(){return o`
      <h2>Campsites</h2>
      <site-campsites .campsites=${this.campsites}></site-campsites>
    `}}D([d()],P.prototype,"campsites");var L=Object.defineProperty,M=Object.getOwnPropertyDescriptor,N=(a,e,t,r)=>{for(var i=M(e,t),s=a.length-1,c;s>=0;s--)(c=a[s])&&(i=c(e,t,i)||i);return i&&L(e,t,i),i};class _ extends F{constructor(){super("camping:model")}get activities(){return this.model.activities??[]}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["activities/init"])}render(){return o`
      <h2>Activities</h2>
      <site-activities .activities=${this.activities}></site-activities>
    `}}N([d()],_.prototype,"activities");var U=Object.defineProperty,J=(a,e,t,r)=>{for(var i=void 0,s=a.length-1,c;s>=0;s--)(c=a[s])&&(i=c(e,t,i)||i);return i&&U(e,t,i),i};const k=class k extends h{constructor(){super(...arguments),this.campsites=[]}render(){return console.log("📦 site-campsites received:",this.campsites),!this.campsites||this.campsites.length===0?o`<p>No campsites to display.</p>`:o`
      ${this.campsites.map(e=>{const t=e.name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");return o`
          <site-campsite
            .id=${t}
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
    `}};k.styles=g`
    :host {
      display: block;
    }

    .icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
  `;let v=k;J([m({type:Array})],v.prototype,"campsites");customElements.define("site-campsites",v);var q=Object.defineProperty,p=(a,e,t,r)=>{for(var i=void 0,s=a.length-1,c;s>=0;s--)(c=a[s])&&(i=c(e,t,i)||i);return i&&q(e,t,i),i};const $=class $ extends h{constructor(){super(...arguments),this.showReviewForm=!1,this.reviewText="",this.reviews=[]}firstUpdated(){this.loadReviews()}loadReviews(){const e=localStorage.getItem("reviews");if(e&&this.id){const t=JSON.parse(e);this.reviews=t.filter(r=>r.id===this.id)}}saveReviewToLocalStorage(e){const t=localStorage.getItem("reviews"),r=t?JSON.parse(t):[],i={id:this.id??"",name:this.name,review:e},s=[...r,i];localStorage.setItem("reviews",JSON.stringify(s)),this.reviews=[...this.reviews,i]}toggleReviewForm(){this.showReviewForm=!this.showReviewForm}submitReview(){const e=this.reviewText.trim();e&&(this.saveReviewToLocalStorage(e),this.reviewText="",this.showReviewForm=!1)}render(){const e=this.count!==void 0?o`<p class="count">${this.count} campsites</p>`:"",t=this.reviews.slice(0,3);return o`
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
              ${t.length>0?t.map(r=>o`<p class="review">"${r.review}"</p>`):o`<p>No reviews yet.</p>`}

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
    `}};$.styles=g`
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
  `;let n=$;p([m()],n.prototype,"name");p([m({type:Number})],n.prototype,"count");p([m()],n.prototype,"id");p([m()],n.prototype,"image");p([d()],n.prototype,"showReviewForm");p([d()],n.prototype,"reviewText");p([d()],n.prototype,"reviews");customElements.define("site-campsite",n);var V=Object.defineProperty,u=(a,e,t,r)=>{for(var i=void 0,s=a.length-1,c;s>=0;s--)(c=a[s])&&(i=c(e,t,i)||i);return i&&V(e,t,i),i};const R=class R extends h{constructor(){super(...arguments),this.activities=[],this.reviews={},this.showReviewForm={},this.reviewText={},this.reviewImage={}}firstUpdated(){this.loadReviews()}loadReviews(){const e=localStorage.getItem("activity-reviews");e&&(this.reviews=JSON.parse(e))}saveReview(e,t,r,i){const s={id:e,name:t,review:r,image:i},c={...this.reviews,[e]:[...this.reviews[e]||[],s]};localStorage.setItem("activity-reviews",JSON.stringify(c)),this.reviews=c,this.reviewText={...this.reviewText,[e]:""},this.reviewImage={...this.reviewImage,[e]:""},this.showReviewForm={...this.showReviewForm,[e]:!1}}toggleForm(e){this.showReviewForm={...this.showReviewForm,[e]:!this.showReviewForm[e]}}handleInput(e,t){this.reviewText={...this.reviewText,[e]:t.target.value}}handleImage(e,t){var i;const r=(i=t.target.files)==null?void 0:i[0];if(r){const s=new FileReader;s.onload=()=>{this.reviewImage={...this.reviewImage,[e]:s.result}},s.readAsDataURL(r)}}submitReview(e,t){var s;const r=(s=this.reviewText[e])==null?void 0:s.trim(),i=this.reviewImage[e];r&&this.saveReview(e,t,r,i)}render(){return o`
      ${this.activities.map(e=>{const t=e.name,r=this.reviews[t]||[];return o`
          <section class="card">
            <div class="activity-layout">
              ${e.image?o`<img class="activity-img" src="${e.image}" alt="${e.name}" />`:null}

              <div class="content">
                <h3>${e.name}</h3>
                <p>${e.desc}</p>

                <div class="reviews">
                  <h4>Reviews</h4>
                  ${r.length===0?o`<p>No reviews yet.</p>`:null}
                  ${r.slice(-3).map(i=>o`
                      <div class="review-block">
                        <p class="review">"${i.review}"</p>
                        ${i.image?o`<img class="review-image" src="${i.image}" alt="Review image" />`:null}
                      </div>
                    `)}
                </div>

                ${this.showReviewForm[t]?o`
                      <textarea
                        .value=${this.reviewText[t]||""}
                        @input=${i=>this.handleInput(t,i)}
                        placeholder="Write your review here..."
                      ></textarea>
                      <input
                        type="file"
                        accept="image/*"
                        @change=${i=>this.handleImage(t,i)}
                      />
                      <button class="submit" @click=${()=>this.submitReview(t,e.name)}>
                        Submit Review
                      </button>
                    `:null}

                <button class="add" @click=${()=>this.toggleForm(t)}>
                  ${this.showReviewForm[t]?"Cancel":"Add a Review"}
                </button>
              </div>
            </div>
          </section>
        `})}
    `}};R.styles=g`
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

    .review-block {
      margin-bottom: 0.5rem;
    }

    .review {
      font-style: italic;
      padding: 0.25rem;
      background: #f9f9f9;
      border-left: 4px solid #ccc;
      color: #222;
    }

    .review-image {
      margin-top: 0.3rem;
      max-width: 100%;
      max-height: 200px;
      border-radius: 4px;
      display: block;
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
      color: var(--color-text-muted, #666);
    }

    input[type="file"] {
      margin-top: 0.5rem;
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
  `;let l=R;u([m({type:Array})],l.prototype,"activities");u([d()],l.prototype,"reviews");u([d()],l.prototype,"showReviewForm");u([d()],l.prototype,"reviewText");u([d()],l.prototype,"reviewImage");customElements.define("site-activities",l);const W=[{path:"/app/campsites",view:()=>o`<campsites-view></campsites-view>`},{path:"/app/activities",view:()=>o`<activities-view></activities-view>`},{path:"/app",view:()=>o`<home-view></home-view>`},{path:"/",redirect:"/app"}];I({"mu-auth":b.Provider,"mu-history":S.Provider,"mu-store":class extends T.Provider{constructor(){super(C,z,"camping:auth"),this.provides="camping:model"}},"mu-switch":class extends O.Element{constructor(){super(W,"camping:history","camping:auth")}},"camping-header":f,"home-view":w,"campsites-view":P,"activities-view":_,"site-campsites":v,"site-campsite":n,"site-activities":l});
