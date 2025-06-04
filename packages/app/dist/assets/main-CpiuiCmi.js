import{i as n,a as p,x as i,r as k,n as u,d as P,_,h as j,b as z}from"./state-CWq57S3t.js";const v=class v extends n{firstUpdated(){const e=this.renderRoot.querySelector("#darkModeToggle");localStorage.getItem("dark-mode")==="true"&&(document.body.classList.add("dark-mode"),e&&(e.checked=!0)),e==null||e.addEventListener("change",m=>{const s=m.target.checked;localStorage.setItem("dark-mode",String(s)),document.body.classList.toggle("dark-mode",s)})}render(){return i`
      <header>
        <div class="page-wrapper">
          <h1>Camping and Hiking</h1>
          <p>Explore outdoor adventures in the San Luis Obispo area:</p>
          <label>
            <input id="darkModeToggle" type="checkbox" autocomplete="off" />
            Dark mode
          </label>
        </div>
      </header>
    `}};v.styles=p`
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
  `;let h=v;customElements.define("camping-header",h);const g=class g extends n{render(){return i`
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
    `}};g.styles=p`
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
  `;let f=g;customElements.define("home-view",f);class L extends n{render(){return i`
      <h2>Campsites</h2>
      <site-campsites src="/data/campsites.json"></site-campsites>
    `}}class O extends n{render(){return i`
      <site-activities src="/data/activities.json"></site-activities>
    `}}var D=Object.defineProperty,w=(a,e,r,m)=>{for(var s=void 0,t=a.length-1,o;t>=0;t--)(o=a[t])&&(s=o(e,r,s)||s);return s&&D(e,r,s),s};const b=class b extends n{constructor(){super(...arguments),this.src="",this.campsites=[]}connectedCallback(){super.connectedCallback(),this.src&&fetch(this.src).then(e=>e.json()).then(e=>{this.campsites=e}).catch(e=>{console.error("Failed to load campsites:",e)})}render(){return this.campsites.length===0?i`<p>Loading campsites...</p>`:i`
      ${this.campsites.map(e=>i`
          <site-campsite .name=${e.name} .count=${e.count}>
            <svg slot="icon" class="icon">
              <use href="/icons/icons.svg#campsites"></use>
            </svg>
            <p slot="desc">${e.desc}</p>
          </site-campsite>
        `)}
    `}};b.styles=p`
    :host {
      display: block;
    }

    .icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
  `;let c=b;w([u()],c.prototype,"src");w([k()],c.prototype,"campsites");customElements.define("site-campsites",c);var M=Object.defineProperty,$=(a,e,r,m)=>{for(var s=void 0,t=a.length-1,o;t>=0;t--)(o=a[t])&&(s=o(e,r,s)||s);return s&&M(e,r,s),s};const y=class y extends n{render(){const e=this.count!==void 0?i`<p class="count">${this.count} campsites</p>`:"";return i`
      <section class="card">
        <div class="header">
          <slot name="icon"></slot>
          <div>
            <h2>${this.name}</h2>
            ${e}
          </div>
        </div>
        <div class="desc">
          <slot name="desc"></slot>
        </div>
      </section>
    `}};y.styles=p`
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

    .icon {
      width: 50px;
      height: 50px;
      fill: currentColor;
      flex-shrink: 0;
      font-size: 1.5rem; /* Add this line for emoji or text-based icons */
    }

    .desc {
      font-size: 1rem;
      font-family: var(--body-font, sans-serif);
      color: var(--color-text-default, #333);
    }

    .count {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-muted, #666);
      margin-top: 0.15rem;
    }
  `;let d=y;$([u()],d.prototype,"name");$([u({type:Number})],d.prototype,"count");customElements.define("site-campsite",d);var A=Object.defineProperty,C=(a,e,r,m)=>{for(var s=void 0,t=a.length-1,o;t>=0;t--)(o=a[t])&&(s=o(e,r,s)||s);return s&&A(e,r,s),s};const x=class x extends n{constructor(){super(...arguments),this.src="",this.activities=[]}connectedCallback(){super.connectedCallback(),this.src&&fetch(this.src).then(e=>e.json()).then(e=>{this.activities=e}).catch(e=>{console.error("Failed to load activities:",e)})}render(){return this.activities.length===0?i`<p>Loading activities...</p>`:i`
      ${this.activities.map(e=>i`
          <section class="card">
            <h3>${e.name}</h3>
            <p>${e.desc}</p>
          </section>
        `)}
    `}};x.styles=p`
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
  `;let l=x;C([u()],l.prototype,"src");C([k()],l.prototype,"activities");customElements.define("site-activities",l);const F=[{path:"/app/campsites",view:()=>i`<campsites-view></campsites-view>`},{path:"/app/activities",view:()=>i`<activities-view></activities-view>`},{path:"/app",view:()=>i`<home-view></home-view>`},{path:"/",redirect:"/app"}];P({"mu-auth":z.Provider,"mu-history":j.Provider,"mu-switch":class extends _.Element{constructor(){super(F,"camping:history","camping:auth")}},"camping-header":h,"home-view":f,"campsites-view":L,"activities-view":O,"site-campsites":c,"site-campsite":d,"site-activities":l});
