import"./modulepreload-polyfill-B5Qt9EMX.js";import{i as h,x as i,a as u,r as b,n as d}from"./state-BvXKpwmJ.js";var y=Object.defineProperty,f=(t,e,r,g)=>{for(var s=void 0,o=t.length-1,c;o>=0;o--)(c=t[o])&&(s=c(e,r,s)||s);return s&&y(e,r,s),s};const l=class l extends h{constructor(){super(...arguments),this.src="",this.campsites=[]}connectedCallback(){super.connectedCallback(),this.src&&fetch(this.src).then(e=>e.json()).then(e=>{this.campsites=e}).catch(e=>{console.error("Failed to load campsites:",e)})}render(){return this.campsites.length===0?i`<p>Loading campsites...</p>`:i`
      ${this.campsites.map(e=>i`
          <site-campsite .name=${e.name} .count=${e.count}>
            <svg slot="icon" class="icon">
              <use href="/icons/icons.svg#campsites"></use>
            </svg>
            <p slot="desc">${e.desc}</p>
          </site-campsite>
        `)}
    `}};l.styles=u`
    :host {
      display: block;
    }

    .icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
  `;let a=l;f([d()],a.prototype,"src");f([b()],a.prototype,"campsites");customElements.define("site-campsites",a);var x=Object.defineProperty,v=(t,e,r,g)=>{for(var s=void 0,o=t.length-1,c;o>=0;o--)(c=t[o])&&(s=c(e,r,s)||s);return s&&x(e,r,s),s};const p=class p extends h{render(){const e=this.count!==void 0?i`<p class="count">${this.count} campsites</p>`:"";return i`
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
    `}};p.styles=u`
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
      width: 24px;
      height: 24px;
      fill: currentColor;
      flex-shrink: 0;
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
  `;let n=p;v([d()],n.prototype,"name");v([d({type:Number})],n.prototype,"count");customElements.define("site-campsite",n);const m=document.querySelector("label");m.onchange=t=>{t.stopPropagation();const e=t.target.checked;m.dispatchEvent(new CustomEvent("darkmode:toggle",{bubbles:!0,detail:{checked:e}}))};document.body.addEventListener("darkmode:toggle",t=>{t.detail.checked?document.body.classList.add("dark-mode"):document.body.classList.remove("dark-mode")});
