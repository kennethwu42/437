import{a as $,i as p,b as u,x as a,r as m,V as P,n as h,d as _,_ as O,s as z,h as C}from"./state-BJBJ081d.js";const F={};console.log("🛠 update.ts loaded");function T(s,e,t){if(console.log("🛠 Message received in update:",s),e(r=>({...r,user:t})),s[0]==="campsites/init"){console.log("🌱 campsites/init received — fetching data"),fetch("/api/campsites",{headers:$.headers(t)}).then(r=>r.json()).then(r=>{console.log("📦 campsites fetched — applying to model:",r),e(i=>({...i,campsites:r}))}).catch(r=>{console.error("❌ Failed to fetch campsites:",r)});return}switch(s[0]){case"campsites/load":console.log("✅ Applying campsites to model:",s[1].campsites),e(r=>({...r,campsites:s[1].campsites}));break;case"activities/load":console.log("✅ Applying activities to model:",s[1].activities),e(r=>({...r,activities:s[1].activities}));break;default:throw new Error(`Unhandled message type: ${s[0]}`)}}const w=class w extends p{constructor(){super(...arguments),this.isMainPage=!1}firstUpdated(){const e=this.renderRoot.querySelector("#darkModeToggle");localStorage.getItem("dark-mode")==="true"&&(document.body.classList.add("dark-mode"),e&&(e.checked=!0)),e==null||e.addEventListener("change",r=>{const i=r.target.checked;localStorage.setItem("dark-mode",String(i)),document.body.classList.toggle("dark-mode",i)}),this.isMainPage=window.location.pathname==="/app",this.requestUpdate()}render(){return a`
      <header>
        <div class="page-wrapper">
          ${this.isMainPage?null:a`<button class="back-button" @click=${()=>history.back()}>← Back</button>`}
          <h1>Camping and Hiking</h1>
          <p>Explore outdoor adventures in the San Luis Obispo area:</p>
          <label>
            <input id="darkModeToggle" type="checkbox" autocomplete="off" />
            Dark mode
          </label>
        </div>
      </header>
    `}};w.styles=u`
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
  `;let g=w;customElements.define("camping-header",g);const b=class b extends p{render(){return a`
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
    `}};b.styles=u`
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
  `;let f=b;customElements.define("home-view",f);var j=Object.defineProperty,L=Object.getOwnPropertyDescriptor,M=(s,e,t,r)=>{for(var i=L(e,t),o=s.length-1,n;o>=0;o--)(n=s[o])&&(i=n(e,t,i)||i);return i&&j(e,t,i),i};class R extends P{constructor(){super("camping:model")}get campsites(){return this.model.campsites??[]}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["campsites/init"])}render(){return a`
      <h2>Campsites</h2>
      <site-campsites .campsites=${this.campsites}></site-campsites>
    `}}M([m()],R.prototype,"campsites");class A extends p{render(){return a`
      <site-activities src="/data/activities.json"></site-activities>
    `}}var D=Object.defineProperty,N=(s,e,t,r)=>{for(var i=void 0,o=s.length-1,n;o>=0;o--)(n=s[o])&&(i=n(e,t,i)||i);return i&&D(e,t,i),i};const y=class y extends p{constructor(){super(...arguments),this.campsites=[]}render(){return console.log("📦 site-campsites received:",this.campsites),!this.campsites||this.campsites.length===0?a`<p>No campsites to display.</p>`:a`
      ${this.campsites.map(e=>{const t=e.name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");return a`
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
    `}};y.styles=u`
    :host {
      display: block;
    }

    .icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
  `;let v=y;N([h({type:Array})],v.prototype,"campsites");customElements.define("site-campsites",v);var I=Object.defineProperty,d=(s,e,t,r)=>{for(var i=void 0,o=s.length-1,n;o>=0;o--)(n=s[o])&&(i=n(e,t,i)||i);return i&&I(e,t,i),i};const x=class x extends p{constructor(){super(...arguments),this.showReviewSection=!1,this.showReviewForm=!1,this.reviewText="",this.reviews=[]}firstUpdated(){this.loadReviews()}loadReviews(){const e=localStorage.getItem("reviews");if(e&&this.id){const t=JSON.parse(e);this.reviews=t.filter(r=>r.id===this.id)}}saveReviewToLocalStorage(e){const t=localStorage.getItem("reviews"),r=t?JSON.parse(t):[],i={id:this.id??"",name:this.name,review:e},o=[...r,i];localStorage.setItem("reviews",JSON.stringify(o)),this.reviews=[...this.reviews,i]}toggleReviewSection(){this.showReviewSection=!this.showReviewSection}toggleReviewForm(){this.showReviewForm=!this.showReviewForm}submitReview(){const e=this.reviewText.trim();e&&(this.saveReviewToLocalStorage(e),this.reviewText="",this.showReviewForm=!1)}render(){const e=this.count!==void 0?a`<p class="count">${this.count} campsites</p>`:"";return a`
      <section class="card">
        <div class="header">
          <slot name="icon"></slot>
          <div>
            <h2>${this.name}</h2>
            ${e}
          </div>
        </div>

        <div class="body">
          ${this.image?a`<img class="campsite-img" src=${this.image} alt=${this.name} />`:null}

          <div class="desc">
            <slot name="desc"></slot>
          </div>
        </div>

        <button @click=${this.toggleReviewSection}>
          ${this.showReviewSection?"Hide Reviews":"See All Reviews"}
        </button>

        ${this.showReviewSection?a`
              <div class="reviews">
                <h3>Reviews</h3>
                ${this.reviews.length>0?this.reviews.map(t=>a`<p class="review">"${t.review}"</p>`):a`<p>No reviews yet.</p>`}

                <button @click=${this.toggleReviewForm}>
                  ${this.showReviewForm?"Cancel":"Add a Review"}
                </button>

                ${this.showReviewForm?a`
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
    `}};x.styles=u`
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
  `;let c=x;d([h()],c.prototype,"name");d([h({type:Number})],c.prototype,"count");d([h()],c.prototype,"id");d([h()],c.prototype,"image");d([m()],c.prototype,"showReviewSection");d([m()],c.prototype,"showReviewForm");d([m()],c.prototype,"reviewText");d([m()],c.prototype,"reviews");customElements.define("site-campsite",c);var U=Object.defineProperty,S=(s,e,t,r)=>{for(var i=void 0,o=s.length-1,n;o>=0;o--)(n=s[o])&&(i=n(e,t,i)||i);return i&&U(e,t,i),i};const k=class k extends p{constructor(){super(...arguments),this.src="",this.activities=[]}connectedCallback(){super.connectedCallback(),this.src&&fetch(this.src).then(e=>e.json()).then(e=>{this.activities=e}).catch(e=>{console.error("Failed to load activities:",e)})}render(){return this.activities.length===0?a`<p>Loading activities...</p>`:a`
      ${this.activities.map(e=>a`
          <section class="card">
            <h3>${e.name}</h3>
            <p>${e.desc}</p>
          </section>
        `)}
    `}};k.styles=u`
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
  `;let l=k;S([h()],l.prototype,"src");S([m()],l.prototype,"activities");customElements.define("site-activities",l);const J=[{path:"/app/campsites",view:()=>a`<campsites-view></campsites-view>`},{path:"/app/activities",view:()=>a`<activities-view></activities-view>`},{path:"/app",view:()=>a`<home-view></home-view>`},{path:"/",redirect:"/app"}];_({"mu-auth":$.Provider,"mu-history":C.Provider,"mu-store":class extends z.Provider{constructor(){super(T,F,"camping:auth"),this.provides="camping:model"}},"mu-switch":class extends O.Element{constructor(){super(J,"camping:history","camping:auth")}},"camping-header":g,"home-view":f,"campsites-view":R,"activities-view":A,"site-campsites":v,"site-campsite":c,"site-activities":l});
