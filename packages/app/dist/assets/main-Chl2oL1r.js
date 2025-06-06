import{a as w,i as v,b as u,x as a,r as d,V as S,d as C,f as U,n as p,h as M,_ as N,s as E}from"./state-BO9EvWL1.js";const J={};console.log("🛠 update.ts loaded");function q(o,e,i){if(console.log("🛠 Message received in update:",o),e(r=>({...r,user:i})),o[0]==="campsites/init"){console.log("🌱 campsites/init received — fetching data"),fetch("/api/campsites",{headers:w.headers(i)}).then(r=>r.json()).then(r=>{console.log("📦 campsites fetched — applying to model:",r),e(t=>({...t,campsites:r}))}).catch(r=>{console.error("❌ Failed to fetch campsites:",r)});return}if(o[0]==="activities/init"){console.log("🌱 activities/init received — fetching data"),fetch("/api/activities",{headers:w.headers(i)}).then(r=>r.json()).then(r=>{console.log("📦 activities fetched — applying to model:",r),e(t=>({...t,activities:r}))}).catch(r=>{console.error("❌ Failed to fetch activities:",r)});return}if(o[0]==="profile/select"){console.log("👤 profile/select received"),B(o[1],i).then(r=>{r&&(console.log("📦 profile loaded:",r),e(t=>({...t,profile:r})))});return}if(o[0]==="profile/save"){console.log("💾 profile/save received");const{userid:r,profile:t,onSuccess:s,onFailure:n}=o[1];fetch(`/api/profile/${r}`,{method:"PUT",headers:{...w.headers(i),"Content-Type":"application/json"},body:JSON.stringify(t)}).then(l=>{if(l.status===200)return l.json();throw new Error("Failed to save profile")}).then(l=>{e(O=>({...O,profile:l})),s==null||s()}).catch(l=>{console.error("❌ Failed to save profile:",l),n==null||n(l)});return}switch(o[0]){case"campsites/load":console.log("✅ Applying campsites to model:",o[1].campsites),e(r=>({...r,campsites:o[1].campsites}));break;case"activities/load":console.log("✅ Applying activities to model:",o[1].activities),e(r=>({...r,activities:o[1].activities}));break;default:throw new Error(`Unhandled message type: ${o[0]}`)}}function B(o,e){return fetch(`/api/profile/${o.userid}`,{headers:w.headers(e)}).then(i=>i.status===200?i.json():void 0).then(i=>{if(i)return console.log("👤 Loaded profile:",i),i})}const I=class I extends v{constructor(){super(...arguments),this.isMainPage=!1}firstUpdated(){const e=this.renderRoot.querySelector("#darkModeToggle");localStorage.getItem("dark-mode")==="true"&&(document.body.classList.add("dark-mode"),e&&(e.checked=!0)),e==null||e.addEventListener("change",r=>{const t=r.target.checked;localStorage.setItem("dark-mode",String(t)),document.body.classList.toggle("dark-mode",t)}),this.isMainPage=window.location.pathname==="/app",this.requestUpdate()}getUsername(){return"Alpha"}handleSignOut(){this.dispatchEvent(new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signout",{}]}))}render(){const e=this.getUsername();return a`
      <header>
        <div class="page-wrapper">
          <div class="header-top">
            <a class="back-button" href="/app">← Back</a>

            <div class="dropdown">
              <button class="dropdown-button">Hi, ${e}</button>
              <div class="dropdown-content">
                <a href="/app/profile/${e}">Profile</a>
                <button @click=${this.handleSignOut}>Sign out</button>
              </div>
            </div>
          </div>

          <h1>Camping and Hiking</h1>
          <p>Explore outdoor adventures in the San Luis Obispo area:</p>

          <label>
            <input id="darkModeToggle" type="checkbox" autocomplete="off" />
            Dark mode
          </label>
        </div>
      </header>
    `}};I.styles=u`
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

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .back-button {
      background: none;
      border: none;
      color: inherit;
      font: inherit;
      cursor: pointer;
      padding: 0.25rem 0;
      text-decoration: underline;
    }

    .dropdown {
      position: relative;
      display: inline-block;
    }

    .dropdown-button {
      background: white;
      color: #263646;
      font-size: 0.9rem;
      border-radius: 6px;
      padding: 0.5rem 0.8rem;
      font-weight: bold;
      cursor: pointer;
      border: none;
      font-family: var(--body-font, sans-serif);
    }

    .dropdown-content {
      display: none;
      position: absolute;
      right: 0;
      top: 100%; /* directly below the button */
      background-color: white;
      min-width: 160px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      z-index: 10;
      border-radius: 6px;
      overflow: hidden;
      margin-top: 0; /* removed the gap */
    }


    .dropdown-content a,
    .dropdown-content button {
      color: #263646;
      padding: 0.75rem 1rem;
      text-decoration: none;
      display: block;
      background: white;
      border: none;
      width: 100%;
      text-align: left;
      font-size: 0.9rem;
      font-family: var(--body-font, sans-serif);
      cursor: pointer;
    }

    .dropdown-content a:hover,
    .dropdown-content button:hover {
      background-color: #f3f4f6;
    }

    .dropdown:hover .dropdown-content {
      display: block;
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
  `;let $=I;customElements.define("camping-header",$);const P=class P extends v{render(){return a`
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
    `}};P.styles=u`
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
  `;let k=P;customElements.define("home-view",k);var W=Object.defineProperty,G=Object.getOwnPropertyDescriptor,K=(o,e,i,r)=>{for(var t=G(e,i),s=o.length-1,n;s>=0;s--)(n=o[s])&&(t=n(e,i,t)||t);return t&&W(e,i,t),t};class L extends S{constructor(){super("camping:model")}get campsites(){return this.model.campsites??[]}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["campsites/init"])}render(){return a`
      <h2>Campsites</h2>
      <site-campsites .campsites=${this.campsites}></site-campsites>
    `}}K([d()],L.prototype,"campsites");var Q=Object.defineProperty,X=Object.getOwnPropertyDescriptor,Y=(o,e,i,r)=>{for(var t=X(e,i),s=o.length-1,n;s>=0;s--)(n=o[s])&&(t=n(e,i,t)||t);return t&&Q(e,i,t),t};class D extends S{constructor(){super("camping:model")}get activities(){return this.model.activities??[]}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["activities/init"])}render(){return a`
      <h2>Activities</h2>
      <site-activities .activities=${this.activities}></site-activities>
    `}}Y([d()],D.prototype,"activities");var Z=Object.defineProperty,H=Object.getOwnPropertyDescriptor,f=(o,e,i,r)=>{for(var t=r>1?void 0:r?H(e,i):e,s=o.length-1,n;s>=0;s--)(n=o[s])&&(t=(r?n(e,i,t):n(t))||t);return r&&t&&Z(e,i,t),t};const V=u`
  section {
    display: grid;
    grid-template-rows: auto auto auto;
    justify-items: center;
    text-align: center;
    gap: 1rem;
    position: relative;
  }

  slot[name="avatar"] {
    grid-row: 1;
  }

  h1 {
    grid-row: 2;
    margin: 0;
  }

  dl {
    grid-row: 3;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  dt {
    font-weight: bold;
    color: var(--color-accent);
    font-family: var(--font-family-display);
  }

  dd {
    margin: 0;
  }

  nav {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .edit {
    background-color: var(--color-primary, #2563eb);
    color: white;
    padding: 0.4rem 0.8rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
  }
`,T=class T extends v{render(){return a`
      <section>
        <slot name="avatar"></slot>
        <h1><slot name="name"></slot></h1>
        <nav>
          <button
            class="edit"
            @click=${()=>this.dispatchEvent(new CustomEvent("profile:edit",{bubbles:!0,composed:!0}))}
          >
            Edit
          </button>
        </nav>
        <dl>
          <dt>Username</dt>
          <dd><slot name="userid"></slot></dd>
        </dl>
      </section>
    `}};T.styles=[V];let R=T;f([p()],R.prototype,"username",2);const _=class _ extends v{render(){return a`
      <section>
        <h1><slot name="name"></slot></h1>
        <nav>
          <button
            class="close"
            @click=${()=>this.dispatchEvent(new CustomEvent("profile:close",{bubbles:!0,composed:!0}))}
          >
            Close
          </button>
          <button class="delete">Delete</button>
        </nav>
        <mu-form .init=${this._filteredInit()}>
          <label>
            <span>Username</span>
            <input disabled name="userid" />
          </label>
          <label>
            <span>Avatar</span>
            <input name="avatar" type="file" data-nobind @change=${this._handleAvatarSelected} />
          </label>
          <slot name="avatar"></slot>
          <label>
            <span>Name</span>
            <input name="name" />
          </label>
          <label>
            <span>Color</span>
            <input type="color" name="color" />
          </label>
        </mu-form>
      </section>
    `}_filteredInit(){const{avatar:e,...i}=this.init??{};return i}_handleAvatarSelected(e){const r=e.target.files[0];new Promise((s,n)=>{const l=new FileReader;l.onload=()=>s(l.result),l.onerror=O=>n(O),l.readAsDataURL(r)}).then(s=>{this.dispatchEvent(new CustomEvent("profile:new-avatar",{bubbles:!0,composed:!0,detail:s}))})}};_.uses=C({"mu-form":U.Element}),_.styles=[u`
      section {
        position: relative;
      }
      mu-form {
        grid-column: key / end;
      }
      mu-form input {
        grid-column: input;
      }
      mu-form label:has(input[type="file"]) {
        grid-row-end: span 4;
      }
      .close {
        background-color: #e5e7eb;
        border: none;
        padding: 0.4rem 0.8rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
        margin-right: 0.5rem;
      }
    `];let b=_;f([p()],b.prototype,"username",2);f([p({attribute:!1})],b.prototype,"init",2);const F=class F extends S{constructor(){super("camping:model"),this.edit=!1,this.userid="",this.addEventListener("profile:new-avatar",e=>{this.newAvatar=e.detail}),this.addEventListener("profile:edit",()=>{this.edit=!0}),this.addEventListener("profile:close",()=>{this.edit=!1})}get profile(){return this.model.profile}attributeChangedCallback(e,i,r){super.attributeChangedCallback(e,i,r),e==="user-id"&&i!==r&&r&&this.dispatchMessage(["profile/select",{userid:r}])}render(){const{color:e,avatar:i,name:r,userid:t}=this.profile||{},s=(r||t||"?").slice(0,1),n=a`
      <div slot="avatar">
        ${i?a`<img
              src=${i}
              style="width:80px;height:80px;border-radius:50%;object-fit:cover;aspect-ratio:1/1;"
            />`:a`
              <div
                style="width:80px;height:80px;border-radius:50%;background:${e};display:flex;align-items:center;justify-content:center;font-weight:bold;color:#fff;"
              >
                ${s}
              </div>
            `}
      </div>
    `;return this.edit?a`
          <profile-editor
            username=${t}
            .init=${this.profile}
            @mu-form:submit=${l=>this._handleSubmit(l)}
          >
            ${n}
          </profile-editor>
        `:a`
          <profile-viewer username=${t}>
            ${n}
            <span slot="name">${r}</span>
            <span slot="userid">${t}</span>
          </profile-viewer>
        `}_handleSubmit(e){const i=this.newAvatar?{...e.detail,avatar:this.newAvatar}:e.detail;this.dispatchMessage(["profile/save",{userid:this.userid,profile:i,onSuccess:()=>{this.edit=!1,this.dispatchMessage(["profile/select",{userid:this.userid}])},onFailure:r=>console.log("ERROR:",r)}])}};F.uses=C({"profile-viewer":R,"profile-editor":b}),F.styles=[];let h=F;f([p({type:Boolean,reflect:!0})],h.prototype,"edit",2);f([p({attribute:"user-id",reflect:!0})],h.prototype,"userid",2);f([d()],h.prototype,"profile",1);f([d()],h.prototype,"newAvatar",2);var ee=Object.defineProperty,te=(o,e,i,r)=>{for(var t=void 0,s=o.length-1,n;s>=0;s--)(n=o[s])&&(t=n(e,i,t)||t);return t&&ee(e,i,t),t};const j=class j extends v{constructor(){super(...arguments),this.campsites=[]}render(){return console.log("📦 site-campsites received:",this.campsites),!this.campsites||this.campsites.length===0?a`<p>No campsites to display.</p>`:a`
      ${this.campsites.map(e=>{const i=e.name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");return a`
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
    `}};j.styles=u`
    :host {
      display: block;
    }

    .icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
  `;let y=j;te([p({type:Array})],y.prototype,"campsites");customElements.define("site-campsites",y);var ie=Object.defineProperty,g=(o,e,i,r)=>{for(var t=void 0,s=o.length-1,n;s>=0;s--)(n=o[s])&&(t=n(e,i,t)||t);return t&&ie(e,i,t),t};const z=class z extends v{constructor(){super(...arguments),this.showReviewForm=!1,this.reviewText="",this.reviews=[]}firstUpdated(){this.loadReviews()}loadReviews(){const e=localStorage.getItem("reviews");if(e&&this.id){const i=JSON.parse(e);this.reviews=i.filter(r=>r.id===this.id)}}saveReviewToLocalStorage(e){const i=localStorage.getItem("reviews"),r=i?JSON.parse(i):[],t={id:this.id??"",name:this.name,review:e},s=[...r,t];localStorage.setItem("reviews",JSON.stringify(s)),this.reviews=[...this.reviews,t]}toggleReviewForm(){this.showReviewForm=!this.showReviewForm}submitReview(){const e=this.reviewText.trim();e&&(this.saveReviewToLocalStorage(e),this.reviewText="",this.showReviewForm=!1)}render(){const e=this.count!==void 0?a`<p class="count">${this.count} campsites</p>`:"",i=this.reviews.slice(0,3);return a`
      <section class="card">
        <div class="layout">
          ${this.image?a`<img class="campsite-img" src=${this.image} alt=${this.name} />`:null}

          <div class="content">
            <h2>${this.name}</h2>
            ${e}
            <div class="desc">
              <slot name="desc"></slot>
            </div>

            <div class="reviews">
              <h3>Reviews</h3>
              ${i.length>0?i.map(r=>a`<p class="review">"${r.review}"</p>`):a`<p>No reviews yet.</p>`}

              ${this.showReviewForm?a`
                    <textarea
                      .value=${this.reviewText}
                      @input=${r=>this.reviewText=r.target.value}
                      placeholder="Write your review here..."
                    ></textarea>
                    <div class="review-actions">
                      <button @click=${this.submitReview}>Submit</button>
                      <button @click=${this.toggleReviewForm} class="cancel">Cancel</button>
                    </div>
                  `:a`
                    <div class="review-actions">
                      <button @click=${this.toggleReviewForm}>Add a Review</button>
                    </div>
                  `}
            </div>
          </div>
        </div>
      </section>
    `}};z.styles=u`
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
  `;let c=z;g([p()],c.prototype,"name");g([p({type:Number})],c.prototype,"count");g([p()],c.prototype,"id");g([p()],c.prototype,"image");g([d()],c.prototype,"showReviewForm");g([d()],c.prototype,"reviewText");g([d()],c.prototype,"reviews");customElements.define("site-campsite",c);var re=Object.defineProperty,x=(o,e,i,r)=>{for(var t=void 0,s=o.length-1,n;s>=0;s--)(n=o[s])&&(t=n(e,i,t)||t);return t&&re(e,i,t),t};const A=class A extends v{constructor(){super(...arguments),this.activities=[],this.reviews={},this.showReviewForm={},this.reviewText={},this.reviewImage={}}firstUpdated(){this.loadReviews()}loadReviews(){const e=localStorage.getItem("activity-reviews");e&&(this.reviews=JSON.parse(e))}saveReview(e,i,r,t){const s={id:e,name:i,review:r,image:t},n={...this.reviews,[e]:[...this.reviews[e]||[],s]};localStorage.setItem("activity-reviews",JSON.stringify(n)),this.reviews=n,this.reviewText={...this.reviewText,[e]:""},this.reviewImage={...this.reviewImage,[e]:""},this.showReviewForm={...this.showReviewForm,[e]:!1}}toggleForm(e){this.showReviewForm={...this.showReviewForm,[e]:!this.showReviewForm[e]}}handleInput(e,i){this.reviewText={...this.reviewText,[e]:i.target.value}}handleImage(e,i){var t;const r=(t=i.target.files)==null?void 0:t[0];if(r){const s=new FileReader;s.onload=()=>{this.reviewImage={...this.reviewImage,[e]:s.result}},s.readAsDataURL(r)}}submitReview(e,i){var s;const r=(s=this.reviewText[e])==null?void 0:s.trim(),t=this.reviewImage[e];r&&this.saveReview(e,i,r,t)}render(){return a`
      ${this.activities.map(e=>{const i=e.name,r=this.reviews[i]||[];return a`
          <section class="card">
            <div class="activity-layout">
              ${e.image?a`<img class="activity-img" src="${e.image}" alt="${e.name}" />`:null}

              <div class="content">
                <h3>${e.name}</h3>
                <p>${e.desc}</p>

                <div class="reviews">
                  <h4>Reviews</h4>
                  ${r.length===0?a`<p>No reviews yet.</p>`:null}
                  ${r.slice(-3).map(t=>a`
                      <div class="review-block">
                        <p class="review">"${t.review}"</p>
                        ${t.image?a`<img class="review-image" src="${t.image}" alt="Review image" />`:null}
                      </div>
                    `)}
                </div>

                ${this.showReviewForm[i]?a`
                      <textarea
                        .value=${this.reviewText[i]||""}
                        @input=${t=>this.handleInput(i,t)}
                        placeholder="Write your review here..."
                      ></textarea>
                      <input
                        type="file"
                        accept="image/*"
                        @change=${t=>this.handleImage(i,t)}
                      />
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
    `}};A.styles=u`
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
  `;let m=A;x([p({type:Array})],m.prototype,"activities");x([d()],m.prototype,"reviews");x([d()],m.prototype,"showReviewForm");x([d()],m.prototype,"reviewText");x([d()],m.prototype,"reviewImage");customElements.define("site-activities",m);const se=[{path:"/app/profile/:userid",view:o=>a`<profile-view user-id="${o.userid}"></profile-view>`},{path:"/app/campsites",view:()=>a`<campsites-view></campsites-view>`},{path:"/app/activities",view:()=>a`<activities-view></activities-view>`},{path:"/app",view:()=>a`<home-view></home-view>`},{path:"/",redirect:"/app"}];C({"mu-auth":w.Provider,"mu-history":M.Provider,"mu-store":class extends E.Provider{constructor(){super(q,J,"camping:auth"),this.provides="camping:model"}},"mu-switch":class extends N.Element{constructor(){super(se,"camping:history","camping:auth")}},"camping-header":$,"home-view":k,"campsites-view":L,"activities-view":D,"profile-view":h,"site-campsites":y,"site-campsite":c,"site-activities":m});
