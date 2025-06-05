import{i as l,a as u,x as t,n as h,r as v,d as S,_ as P,h as z,b as F}from"./state-CWq57S3t.js";const w=class w extends l{constructor(){super(...arguments),this.isMainPage=!1}firstUpdated(){const e=this.renderRoot.querySelector("#darkModeToggle");localStorage.getItem("dark-mode")==="true"&&(document.body.classList.add("dark-mode"),e&&(e.checked=!0)),e==null||e.addEventListener("change",n=>{const i=n.target.checked;localStorage.setItem("dark-mode",String(i)),document.body.classList.toggle("dark-mode",i)}),this.isMainPage=window.location.pathname==="/app",this.requestUpdate()}render(){return t`
      <header>
        <div class="page-wrapper">
          ${this.isMainPage?null:t`<button class="back-button" @click=${()=>history.back()}>← Back</button>`}
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
  `;let g=w;customElements.define("camping-header",g);const b=class b extends l{render(){return t`
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
  `;let f=b;customElements.define("home-view",f);class C extends l{render(){return t`
      <h2>Campsites</h2>
      <site-campsites src="/data/campsites.json"></site-campsites>
    `}}class L extends l{render(){return t`
      <site-activities src="/data/activities.json"></site-activities>
    `}}var T=Object.defineProperty,$=(o,e,s,n)=>{for(var i=void 0,r=o.length-1,c;r>=0;r--)(c=o[r])&&(i=c(e,s,i)||i);return i&&T(e,s,i),i};const y=class y extends l{constructor(){super(...arguments),this.src="",this.campsites=[]}connectedCallback(){super.connectedCallback(),this.src&&fetch(this.src).then(e=>e.json()).then(e=>{this.campsites=e}).catch(e=>{console.error("Failed to load campsites:",e)})}render(){return this.campsites.length===0?t`<p>Loading campsites...</p>`:t`
      ${this.campsites.map(e=>{const s=e.name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");return t`
          <site-campsite
            .id=${s}
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
  `;let p=y;$([h()],p.prototype,"src");$([v()],p.prototype,"campsites");customElements.define("site-campsites",p);var _=Object.defineProperty,d=(o,e,s,n)=>{for(var i=void 0,r=o.length-1,c;r>=0;r--)(c=o[r])&&(i=c(e,s,i)||i);return i&&_(e,s,i),i};const x=class x extends l{constructor(){super(...arguments),this.showReviewSection=!1,this.showReviewForm=!1,this.reviewText="",this.reviews=[]}firstUpdated(){this.loadReviews()}loadReviews(){const e=localStorage.getItem("reviews");if(e&&this.id){const s=JSON.parse(e);this.reviews=s.filter(n=>n.id===this.id)}}saveReviewToLocalStorage(e){const s=localStorage.getItem("reviews"),n=s?JSON.parse(s):[],i={id:this.id??"",name:this.name,review:e},r=[...n,i];localStorage.setItem("reviews",JSON.stringify(r)),this.reviews=[...this.reviews,i]}toggleReviewSection(){this.showReviewSection=!this.showReviewSection}toggleReviewForm(){this.showReviewForm=!this.showReviewForm}submitReview(){const e=this.reviewText.trim();e&&(this.saveReviewToLocalStorage(e),this.reviewText="",this.showReviewForm=!1)}render(){const e=this.count!==void 0?t`<p class="count">${this.count} campsites</p>`:"";return t`
      <section class="card">
        <div class="header">
          <slot name="icon"></slot>
          <div>
            <h2>${this.name}</h2>
            ${e}
          </div>
        </div>

        <div class="body">
          ${this.image?t`<img class="campsite-img" src=${this.image} alt=${this.name} />`:null}

          <div class="desc">
            <slot name="desc"></slot>
          </div>
        </div>

        <button @click=${this.toggleReviewSection}>
          ${this.showReviewSection?"Hide Reviews":"See All Reviews"}
        </button>

        ${this.showReviewSection?t`
              <div class="reviews">
                <h3>Reviews</h3>
                ${this.reviews.length>0?this.reviews.map(s=>t`<p class="review">"${s.review}"</p>`):t`<p>No reviews yet.</p>`}

                <button @click=${this.toggleReviewForm}>
                  ${this.showReviewForm?"Cancel":"Add a Review"}
                </button>

                ${this.showReviewForm?t`
                      <textarea
                        .value=${this.reviewText}
                        @input=${s=>this.reviewText=s.target.value}
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
  `;let a=x;d([h()],a.prototype,"name");d([h({type:Number})],a.prototype,"count");d([h()],a.prototype,"id");d([h()],a.prototype,"image");d([v()],a.prototype,"showReviewSection");d([v()],a.prototype,"showReviewForm");d([v()],a.prototype,"reviewText");d([v()],a.prototype,"reviews");customElements.define("site-campsite",a);var j=Object.defineProperty,R=(o,e,s,n)=>{for(var i=void 0,r=o.length-1,c;r>=0;r--)(c=o[r])&&(i=c(e,s,i)||i);return i&&j(e,s,i),i};const k=class k extends l{constructor(){super(...arguments),this.src="",this.activities=[]}connectedCallback(){super.connectedCallback(),this.src&&fetch(this.src).then(e=>e.json()).then(e=>{this.activities=e}).catch(e=>{console.error("Failed to load activities:",e)})}render(){return this.activities.length===0?t`<p>Loading activities...</p>`:t`
      ${this.activities.map(e=>t`
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
  `;let m=k;R([h()],m.prototype,"src");R([v()],m.prototype,"activities");customElements.define("site-activities",m);const O=[{path:"/app/campsites",view:()=>t`<campsites-view></campsites-view>`},{path:"/app/activities",view:()=>t`<activities-view></activities-view>`},{path:"/app",view:()=>t`<home-view></home-view>`},{path:"/",redirect:"/app"}];S({"mu-auth":F.Provider,"mu-history":z.Provider,"mu-switch":class extends P.Element{constructor(){super(O,"camping:history","camping:auth")}},"camping-header":g,"home-view":f,"campsites-view":C,"activities-view":L,"site-campsites":p,"site-campsite":a,"site-activities":m});
