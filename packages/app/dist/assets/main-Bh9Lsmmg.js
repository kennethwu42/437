import{a as b,i as m,b as u,x as o,r as d,V as S,n as v,d as _,_ as O,s as T,h as z}from"./state-BJBJ081d.js";const C={};console.log("🛠 update.ts loaded");function j(r,e,t){if(console.log("🛠 Message received in update:",r),e(s=>({...s,user:t})),r[0]==="campsites/init"){console.log("🌱 campsites/init received — fetching data"),fetch("/api/campsites",{headers:b.headers(t)}).then(s=>s.json()).then(s=>{console.log("📦 campsites fetched — applying to model:",s),e(i=>({...i,campsites:s}))}).catch(s=>{console.error("❌ Failed to fetch campsites:",s)});return}if(r[0]==="activities/init"){console.log("🌱 activities/init received — fetching data"),fetch("/api/activities",{headers:b.headers(t)}).then(s=>s.json()).then(s=>{console.log("📦 activities fetched — applying to model:",s),e(i=>({...i,activities:s}))}).catch(s=>{console.error("❌ Failed to fetch activities:",s)});return}switch(r[0]){case"campsites/load":console.log("✅ Applying campsites to model:",r[1].campsites),e(s=>({...s,campsites:r[1].campsites}));break;case"activities/load":console.log("✅ Applying activities to model:",r[1].activities),e(s=>({...s,activities:r[1].activities}));break;default:throw new Error(`Unhandled message type: ${r[0]}`)}}const x=class x extends m{constructor(){super(...arguments),this.isMainPage=!1}firstUpdated(){const e=this.renderRoot.querySelector("#darkModeToggle");localStorage.getItem("dark-mode")==="true"&&(document.body.classList.add("dark-mode"),e&&(e.checked=!0)),e==null||e.addEventListener("change",s=>{const i=s.target.checked;localStorage.setItem("dark-mode",String(i)),document.body.classList.toggle("dark-mode",i)}),this.isMainPage=window.location.pathname==="/app",this.requestUpdate()}render(){return o`
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
    }

    .page-wrapper {
      max-width: 1024px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: var(--space-small);
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
  `;let g=x;customElements.define("camping-header",g);const y=class y extends m{render(){return o`
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
      max-width: 1024px;
      margin: 0 auto;
      padding: 1rem;
    }

    .main-image {
      width: 100%;
      height: auto;
      border-radius: var(--radius-default);
      margin-bottom: 1rem;
    }

    .link-grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
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
  `;let f=y;customElements.define("home-view",f);var A=Object.defineProperty,I=Object.getOwnPropertyDescriptor,M=(r,e,t,s)=>{for(var i=I(e,t),a=r.length-1,n;a>=0;a--)(n=r[a])&&(i=n(e,t,i)||i);return i&&A(e,t,i),i};class F extends S{constructor(){super("camping:model")}get campsites(){return this.model.campsites??[]}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["campsites/init"])}render(){return o`
      <h2>Campsites</h2>
      <site-campsites .campsites=${this.campsites}></site-campsites>
    `}}M([d()],F.prototype,"campsites");var N=Object.defineProperty,D=Object.getOwnPropertyDescriptor,L=(r,e,t,s)=>{for(var i=D(e,t),a=r.length-1,n;a>=0;a--)(n=r[a])&&(i=n(e,t,i)||i);return i&&N(e,t,i),i};class P extends S{constructor(){super("camping:model")}get activities(){return this.model.activities??[]}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["activities/init"])}render(){return o`
      <h2>Activities</h2>
      <site-activities .activities=${this.activities}></site-activities>
    `}}L([d()],P.prototype,"activities");var J=Object.defineProperty,U=(r,e,t,s)=>{for(var i=void 0,a=r.length-1,n;a>=0;a--)(n=r[a])&&(i=n(e,t,i)||i);return i&&J(e,t,i),i};const k=class k extends m{constructor(){super(...arguments),this.campsites=[]}render(){return console.log("📦 site-campsites received:",this.campsites),!this.campsites||this.campsites.length===0?o`<p>No campsites to display.</p>`:o`
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
    `}};k.styles=u`
    :host {
      display: block;
    }

    .icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
  `;let h=k;U([v({type:Array})],h.prototype,"campsites");customElements.define("site-campsites",h);var q=Object.defineProperty,p=(r,e,t,s)=>{for(var i=void 0,a=r.length-1,n;a>=0;a--)(n=r[a])&&(i=n(e,t,i)||i);return i&&q(e,t,i),i};const R=class R extends m{constructor(){super(...arguments),this.showReviewSection=!1,this.showReviewForm=!1,this.reviewText="",this.reviews=[]}firstUpdated(){this.loadReviews()}loadReviews(){const e=localStorage.getItem("reviews");if(e&&this.id){const t=JSON.parse(e);this.reviews=t.filter(s=>s.id===this.id)}}saveReviewToLocalStorage(e){const t=localStorage.getItem("reviews"),s=t?JSON.parse(t):[],i={id:this.id??"",name:this.name,review:e},a=[...s,i];localStorage.setItem("reviews",JSON.stringify(a)),this.reviews=[...this.reviews,i]}toggleReviewSection(){this.showReviewSection=!this.showReviewSection}toggleReviewForm(){this.showReviewForm=!this.showReviewForm}submitReview(){const e=this.reviewText.trim();e&&(this.saveReviewToLocalStorage(e),this.reviewText="",this.showReviewForm=!1)}render(){const e=this.count!==void 0?o`<p class="count">${this.count} campsites</p>`:"";return o`
      <section class="card">
        <div class="header">
          <slot name="icon"></slot>
          <div>
            <h2>${this.name}</h2>
            ${e}
          </div>
        </div>

        <div class="body">
          ${this.image?o`<img class="campsite-img" src=${this.image} alt=${this.name} />`:null}

          <div class="desc">
            <slot name="desc"></slot>
          </div>
        </div>

        <button @click=${this.toggleReviewSection}>
          ${this.showReviewSection?"Hide Reviews":"See All Reviews"}
        </button>

        ${this.showReviewSection?o`
              <div class="reviews">
                <h3>Reviews</h3>
                ${this.reviews.length>0?this.reviews.map(t=>o`<p class="review">"${t.review}"</p>`):o`<p>No reviews yet.</p>`}

                <button @click=${this.toggleReviewForm}>
                  ${this.showReviewForm?"Cancel":"Add a Review"}
                </button>

                ${this.showReviewForm?o`
                      <textarea
                        .value=${this.reviewText}
                        @input=${t=>this.reviewText=t.target.value}
                        placeholder="Write your review here..."
                      ></textarea>
                      <button @click=${this.submitReview}>Submit Review</button>
                    `:null}
              </div>
            `:null}
      </section>
    `}};R.styles=u`
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
  `;let c=R;p([v()],c.prototype,"name");p([v({type:Number})],c.prototype,"count");p([v()],c.prototype,"id");p([v()],c.prototype,"image");p([d()],c.prototype,"showReviewSection");p([d()],c.prototype,"showReviewForm");p([d()],c.prototype,"reviewText");p([d()],c.prototype,"reviews");customElements.define("site-campsite",c);var V=Object.defineProperty,w=(r,e,t,s)=>{for(var i=void 0,a=r.length-1,n;a>=0;a--)(n=r[a])&&(i=n(e,t,i)||i);return i&&V(e,t,i),i};const $=class $ extends m{constructor(){super(...arguments),this.activities=[],this.reviews={},this.showReviewSection={},this.showReviewForm={},this.reviewText={}}firstUpdated(){this.loadReviews()}loadReviews(){const e=localStorage.getItem("activity-reviews");e&&(this.reviews=JSON.parse(e))}saveReview(e,t,s){const i={id:e,name:t,review:s},a={...this.reviews,[e]:[...this.reviews[e]||[],i]};localStorage.setItem("activity-reviews",JSON.stringify(a)),this.reviews=a,this.reviewText={...this.reviewText,[e]:""},this.showReviewForm={...this.showReviewForm,[e]:!1}}toggleSection(e){this.showReviewSection={...this.showReviewSection,[e]:!this.showReviewSection[e]}}toggleForm(e){this.showReviewForm={...this.showReviewForm,[e]:!this.showReviewForm[e]}}handleInput(e,t){this.reviewText={...this.reviewText,[e]:t.target.value}}submitReview(e,t){var i;const s=(i=this.reviewText[e])==null?void 0:i.trim();s&&this.saveReview(e,t,s)}render(){return o`
      ${this.activities.map(e=>{const t=e.name,s=this.reviews[t]||[];return o`
          <section class="card">
            ${e.image?o`<img class="activity-img" src="${e.image}" alt="${e.name}" />`:null}
            <h3>${e.name}</h3>
            <p>${e.desc}</p>

            <button @click=${()=>this.toggleSection(t)}>
              ${this.showReviewSection[t]?"Hide Reviews":"See All Reviews"}
            </button>

            ${this.showReviewSection[t]?o`
                  <div class="reviews">
                    <h4>Reviews</h4>
                    ${s.length>0?s.map(i=>o`<p class="review">"${i.review}"</p>`):o`<p>No reviews yet.</p>`}

                    <button @click=${()=>this.toggleForm(t)}>
                      ${this.showReviewForm[t]?"Cancel":"Add a Review"}
                    </button>

                    ${this.showReviewForm[t]?o`
                          <textarea
                            .value=${this.reviewText[t]||""}
                            @input=${i=>this.handleInput(t,i)}
                            placeholder="Write your review here..."
                          ></textarea>
                          <button @click=${()=>this.submitReview(t,e.name)}>
                            Submit Review
                          </button>
                        `:null}
                  </div>
                `:null}
          </section>
        `})}
    `}};$.styles=u`
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
  `;let l=$;w([v({type:Array})],l.prototype,"activities");w([d()],l.prototype,"reviews");w([d()],l.prototype,"showReviewSection");w([d()],l.prototype,"showReviewForm");w([d()],l.prototype,"reviewText");customElements.define("site-activities",l);const W=[{path:"/app/campsites",view:()=>o`<campsites-view></campsites-view>`},{path:"/app/activities",view:()=>o`<activities-view></activities-view>`},{path:"/app",view:()=>o`<home-view></home-view>`},{path:"/",redirect:"/app"}];_({"mu-auth":b.Provider,"mu-history":z.Provider,"mu-store":class extends T.Provider{constructor(){super(j,C,"camping:auth"),this.provides="camping:model"}},"mu-switch":class extends O.Element{constructor(){super(W,"camping:history","camping:auth")}},"camping-header":g,"home-view":f,"campsites-view":F,"activities-view":P,"site-campsites":h,"site-campsite":c,"site-activities":l});
