import{a as w,i as h,b as v,x as o,r as l,V as R,n as p,d as _,_ as O,s as C,h as z}from"./state-BJBJ081d.js";const F={};console.log("🛠 update.ts loaded");function j(r,e,t){if(console.log("🛠 Message received in update:",r),e(s=>({...s,user:t})),r[0]==="campsites/init"){console.log("🌱 campsites/init received — fetching data"),fetch("/api/campsites",{headers:w.headers(t)}).then(s=>s.json()).then(s=>{console.log("📦 campsites fetched — applying to model:",s),e(i=>({...i,campsites:s}))}).catch(s=>{console.error("❌ Failed to fetch campsites:",s)});return}if(r[0]==="activities/init"){console.log("🌱 activities/init received — fetching data"),fetch("/api/activities",{headers:w.headers(t)}).then(s=>s.json()).then(s=>{console.log("📦 activities fetched — applying to model:",s),e(i=>({...i,activities:s}))}).catch(s=>{console.error("❌ Failed to fetch activities:",s)});return}switch(r[0]){case"campsites/load":console.log("✅ Applying campsites to model:",r[1].campsites),e(s=>({...s,campsites:r[1].campsites}));break;case"activities/load":console.log("✅ Applying activities to model:",r[1].activities),e(s=>({...s,activities:r[1].activities}));break;default:throw new Error(`Unhandled message type: ${r[0]}`)}}const b=class b extends h{constructor(){super(...arguments),this.isMainPage=!1}firstUpdated(){const e=this.renderRoot.querySelector("#darkModeToggle");localStorage.getItem("dark-mode")==="true"&&(document.body.classList.add("dark-mode"),e&&(e.checked=!0)),e==null||e.addEventListener("change",s=>{const i=s.target.checked;localStorage.setItem("dark-mode",String(i)),document.body.classList.toggle("dark-mode",i)}),this.isMainPage=window.location.pathname==="/app",this.requestUpdate()}render(){return o`
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
    `}};b.styles=v`
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
  `;let u=b;customElements.define("camping-header",u);const y=class y extends h{render(){return o`
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
    `}};y.styles=v`
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
  `;let g=y;customElements.define("home-view",g);var T=Object.defineProperty,A=Object.getOwnPropertyDescriptor,M=(r,e,t,s)=>{for(var i=A(e,t),a=r.length-1,c;a>=0;a--)(c=r[a])&&(i=c(e,t,i)||i);return i&&T(e,t,i),i};class P extends R{constructor(){super("camping:model")}get campsites(){return this.model.campsites??[]}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["campsites/init"])}render(){return o`
      <h2>Campsites</h2>
      <site-campsites .campsites=${this.campsites}></site-campsites>
    `}}M([l()],P.prototype,"campsites");var D=Object.defineProperty,L=Object.getOwnPropertyDescriptor,N=(r,e,t,s)=>{for(var i=L(e,t),a=r.length-1,c;a>=0;a--)(c=r[a])&&(i=c(e,t,i)||i);return i&&D(e,t,i),i};class S extends R{constructor(){super("camping:model")}get activities(){return this.model.activities??[]}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["activities/init"])}render(){return o`
      <h2>Activities</h2>
      <site-activities .activities=${this.activities}></site-activities>
    `}}N([l()],S.prototype,"activities");var I=Object.defineProperty,U=(r,e,t,s)=>{for(var i=void 0,a=r.length-1,c;a>=0;a--)(c=r[a])&&(i=c(e,t,i)||i);return i&&I(e,t,i),i};const x=class x extends h{constructor(){super(...arguments),this.campsites=[]}render(){return console.log("📦 site-campsites received:",this.campsites),!this.campsites||this.campsites.length===0?o`<p>No campsites to display.</p>`:o`
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
    `}};x.styles=v`
    :host {
      display: block;
    }

    .icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
  `;let m=x;U([p({type:Array})],m.prototype,"campsites");customElements.define("site-campsites",m);var J=Object.defineProperty,d=(r,e,t,s)=>{for(var i=void 0,a=r.length-1,c;a>=0;a--)(c=r[a])&&(i=c(e,t,i)||i);return i&&J(e,t,i),i};const k=class k extends h{constructor(){super(...arguments),this.showReviewSection=!1,this.showReviewForm=!1,this.reviewText="",this.reviews=[]}firstUpdated(){this.loadReviews()}loadReviews(){const e=localStorage.getItem("reviews");if(e&&this.id){const t=JSON.parse(e);this.reviews=t.filter(s=>s.id===this.id)}}saveReviewToLocalStorage(e){const t=localStorage.getItem("reviews"),s=t?JSON.parse(t):[],i={id:this.id??"",name:this.name,review:e},a=[...s,i];localStorage.setItem("reviews",JSON.stringify(a)),this.reviews=[...this.reviews,i]}toggleReviewSection(){this.showReviewSection=!this.showReviewSection}toggleReviewForm(){this.showReviewForm=!this.showReviewForm}submitReview(){const e=this.reviewText.trim();e&&(this.saveReviewToLocalStorage(e),this.reviewText="",this.showReviewForm=!1)}render(){const e=this.count!==void 0?o`<p class="count">${this.count} campsites</p>`:"";return o`
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
    `}};k.styles=v`
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
  `;let n=k;d([p()],n.prototype,"name");d([p({type:Number})],n.prototype,"count");d([p()],n.prototype,"id");d([p()],n.prototype,"image");d([l()],n.prototype,"showReviewSection");d([l()],n.prototype,"showReviewForm");d([l()],n.prototype,"reviewText");d([l()],n.prototype,"reviews");customElements.define("site-campsite",n);var q=Object.defineProperty,V=(r,e,t,s)=>{for(var i=void 0,a=r.length-1,c;a>=0;a--)(c=r[a])&&(i=c(e,t,i)||i);return i&&q(e,t,i),i};const $=class $ extends h{constructor(){super(...arguments),this.activities=[]}render(){return!this.activities||this.activities.length===0?o`<p>No activities available.</p>`:o`
      ${this.activities.map(e=>o`
          <section class="card">
            <h3>${e.name}</h3>
            <p>${e.desc}</p>
          </section>
        `)}
    `}};$.styles=v`
    :host {
      display: block;
    }

    .card {
      background-color: var(--color-box-background);
      border: 1px solid var(--color-border-light);
      padding: var(--space-padding);
      margin-bottom: var(--space-margin);
      border-radius: var(--radius-default);
    }

    h3 {
      font-size: 1.25rem;
      font-family: var(--heading-font, serif);
      margin: 0 0 0.25rem 0;
    }

    p {
      font-family: var(--body-font, sans-serif);
      margin: 0;
    }
  `;let f=$;V([p({type:Array})],f.prototype,"activities");const B=[{path:"/app/campsites",view:()=>o`<campsites-view></campsites-view>`},{path:"/app/activities",view:()=>o`<activities-view></activities-view>`},{path:"/app",view:()=>o`<home-view></home-view>`},{path:"/",redirect:"/app"}];_({"mu-auth":w.Provider,"mu-history":z.Provider,"mu-store":class extends C.Provider{constructor(){super(j,F,"camping:auth"),this.provides="camping:model"}},"mu-switch":class extends O.Element{constructor(){super(B,"camping:history","camping:auth")}},"camping-header":u,"home-view":g,"campsites-view":P,"activities-view":S,"site-campsites":m,"site-campsite":n,"site-activities":f});
