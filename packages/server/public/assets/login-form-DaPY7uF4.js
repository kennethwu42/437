import{a as i,i as p,x as u,r as d,n as l}from"./state-BvXKpwmJ.js";const f=i`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  img {
    max-width: 100%;
  }

  ul,
  ol,
  menu {
    list-style: none;
    padding: 0;
  }
`,b={styles:f},g=i`
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 600;
    color: var(--color-text-primary, #222);
    margin: 0 0 0.5em 0;
  }
`;var v=Object.defineProperty,n=(m,r,t,a)=>{for(var e=void 0,o=m.length-1,c;o>=0;o--)(c=m[o])&&(e=c(r,t,e)||e);return e&&v(r,t,e),e};const h=class h extends p{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}render(){return u`
      <form
        @change=${r=>this.handleChange(r)}
        @submit=${r=>this.handleSubmit(r)}
      >
        <slot></slot>
        <slot name="button">
          <button ?disabled=${!this.canSubmit} type="submit">Login</button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `}handleChange(r){const t=r.target,a=t==null?void 0:t.name,e=t==null?void 0:t.value,o=this.formData;switch(a){case"username":this.formData={...o,username:e};break;case"password":this.formData={...o,password:e};break}}handleSubmit(r){r.preventDefault(),this.canSubmit&&fetch(this.api||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.formData)}).then(t=>{if(t.status!==200)throw"Login failed";return t.json()}).then(t=>{const{token:a}=t,e=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:a,redirect:this.redirect}]});this.dispatchEvent(e)}).catch(t=>{console.log(t),this.error=t.toString()})}};h.styles=[b.styles,g,i`
      .error:not(:empty) {
        color: var(--color-error);
        border: 1px solid var(--color-error);
        padding: var(--size-spacing-medium);
      }
    `];let s=h;n([d()],s.prototype,"formData");n([l()],s.prototype,"api");n([l()],s.prototype,"redirect");n([d()],s.prototype,"error");customElements.define("login-form",s);export{s as L};
