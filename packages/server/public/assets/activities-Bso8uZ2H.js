import"./modulepreload-polyfill-B5Qt9EMX.js";import{i as h,x as s,a as p,r as m,n as g}from"./state-BvXKpwmJ.js";var u=Object.defineProperty,l=(t,e,c,v)=>{for(var r=void 0,i=t.length-1,n;i>=0;i--)(n=t[i])&&(r=n(e,c,r)||r);return r&&u(e,c,r),r};const o=class o extends h{constructor(){super(...arguments),this.src="",this.activities=[]}connectedCallback(){super.connectedCallback(),this.src&&fetch(this.src).then(e=>e.json()).then(e=>{this.activities=e}).catch(e=>{console.error("Failed to load activities:",e)})}render(){return this.activities.length===0?s`<p>Loading activities...</p>`:s`
      ${this.activities.map(e=>s`
          <section class="card">
            <h3>${e.name}</h3>
            <p>${e.desc}</p>
          </section>
        `)}
    `}};o.styles=p`
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
  `;let a=o;l([g()],a.prototype,"src");l([m()],a.prototype,"activities");customElements.define("site-activities",a);const d=document.querySelector("label");d.onchange=t=>{const e=t.target.checked;d.dispatchEvent(new CustomEvent("darkmode:toggle",{bubbles:!0,detail:{checked:e}}))};document.body.addEventListener("darkmode:toggle",t=>{document.body.classList.toggle("dark-mode",t.detail.checked)});
