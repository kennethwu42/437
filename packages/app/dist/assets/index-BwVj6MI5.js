(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();var V,ge;class nt extends Error{}nt.prototype.name="InvalidTokenError";function Ms(r){return decodeURIComponent(atob(r).replace(/(.)/g,(t,e)=>{let s=e.charCodeAt(0).toString(16).toUpperCase();return s.length<2&&(s="0"+s),"%"+s}))}function Hs(r){let t=r.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return Ms(t)}catch{return atob(t)}}function We(r,t){if(typeof r!="string")throw new nt("Invalid token specified: must be a string");t||(t={});const e=t.header===!0?0:1,s=r.split(".")[e];if(typeof s!="string")throw new nt(`Invalid token specified: missing part #${e+1}`);let i;try{i=Hs(s)}catch(n){throw new nt(`Invalid token specified: invalid base64 for part #${e+1} (${n.message})`)}try{return JSON.parse(i)}catch(n){throw new nt(`Invalid token specified: invalid json for part #${e+1} (${n.message})`)}}const js="mu:context",Yt=`${js}:change`;class Is{constructor(t,e){this._proxy=zs(t,e)}get value(){return this._proxy}set value(t){Object.assign(this._proxy,t)}apply(t){this.value=t(this.value)}}class Ye extends HTMLElement{constructor(t){super(),console.log("Constructing context provider",this),this.context=new Is(t,this),this.style.display="contents"}attach(t){return this.addEventListener(Yt,t),t}detach(t){this.removeEventListener(Yt,t)}}function zs(r,t){return new Proxy(r,{get:(s,i,n)=>{if(i==="then")return;const o=Reflect.get(s,i,n);return console.log(`Context['${i}'] => `,o),o},set:(s,i,n,o)=>{const c=r[i];console.log(`Context['${i.toString()}'] <= `,n);const a=Reflect.set(s,i,n,o);if(a){let d=new CustomEvent(Yt,{bubbles:!0,cancelable:!0,composed:!0});Object.assign(d,{property:i,oldValue:c,value:n}),t.dispatchEvent(d)}else console.log(`Context['${i}] was not set to ${n}`);return a}})}function Ds(r,t){const e=Ke(t,r);return new Promise((s,i)=>{if(e){const n=e.localName;customElements.whenDefined(n).then(()=>s(e))}else i({context:t,reason:`No provider for this context "${t}:`})})}function Ke(r,t){const e=`[provides="${r}"]`;if(!t||t===document.getRootNode())return;const s=t.closest(e);if(s)return s;const i=t.getRootNode();if(i instanceof ShadowRoot)return Ke(r,i.host)}class Vs extends CustomEvent{constructor(t,e="mu:message"){super(e,{bubbles:!0,composed:!0,detail:t})}}function Je(r="mu:message"){return(t,...e)=>t.dispatchEvent(new Vs(e,r))}class Qt{constructor(t,e,s="service:message",i=!0){this._pending=[],this._context=e,this._update=t,this._eventType=s,this._running=i}attach(t){t.addEventListener(this._eventType,e=>{e.stopPropagation();const s=e.detail;this.consume(s)})}start(){this._running||(console.log(`Starting ${this._eventType} service`),this._running=!0,this._pending.forEach(t=>this.process(t)))}apply(t){this._context.apply(t)}consume(t){this._running?this.process(t):(console.log(`Queueing ${this._eventType} message`,t),this._pending.push(t))}process(t){console.log(`Processing ${this._eventType} message`,t);const e=this._update(t,this.apply.bind(this));e&&e(this._context.value)}}function qs(r){return t=>({...t,...r})}const Kt="mu:auth:jwt",Ze=class Ge extends Qt{constructor(t,e){super((s,i)=>this.update(s,i),t,Ge.EVENT_TYPE),this._redirectForLogin=e}update(t,e){switch(t[0]){case"auth/signin":const{token:s,redirect:i}=t[1];return e(Bs(s)),Dt(i);case"auth/signout":return e(Ws()),Dt(this._redirectForLogin);case"auth/redirect":return Dt(this._redirectForLogin,{next:window.location.href});default:const n=t[0];throw new Error(`Unhandled Auth message "${n}"`)}}};Ze.EVENT_TYPE="auth:message";let Qe=Ze;const Xe=Je(Qe.EVENT_TYPE);function Dt(r,t={}){if(!r)return;const e=window.location.href,s=new URL(r,e);return Object.entries(t).forEach(([i,n])=>s.searchParams.set(i,n)),()=>{console.log("Redirecting to ",r),window.location.assign(s)}}class Fs extends Ye{get redirect(){return this.getAttribute("redirect")||void 0}constructor(){const t=Y.authenticateFromLocalStorage();super({user:t,token:t.authenticated?t.token:void 0})}connectedCallback(){new Qe(this.context,this.redirect).attach(this)}}class lt{constructor(){this.authenticated=!1,this.username="anonymous"}static deauthenticate(t){return t.authenticated=!1,t.username="anonymous",localStorage.removeItem(Kt),t}}class Y extends lt{constructor(t){super();const e=We(t);console.log("Token payload",e),this.token=t,this.authenticated=!0,this.username=e.username}static authenticate(t){const e=new Y(t);return localStorage.setItem(Kt,t),e}static authenticateFromLocalStorage(){const t=localStorage.getItem(Kt);return t?Y.authenticate(t):new lt}}function Bs(r){return qs({user:Y.authenticate(r),token:r})}function Ws(){return r=>{const t=r.user;return{user:t&&t.authenticated?lt.deauthenticate(t):t,token:""}}}function Ys(r){return r.authenticated?{Authorization:`Bearer ${r.token||"NO_TOKEN"}`}:{}}function Ks(r){return r.authenticated?We(r.token||""):{}}const Js=Object.freeze(Object.defineProperty({__proto__:null,AuthenticatedUser:Y,Provider:Fs,User:lt,dispatch:Xe,headers:Ys,payload:Ks},Symbol.toStringTag,{value:"Module"}));function Jt(r,t,e){const s=r.target,i=new CustomEvent(t,{bubbles:!0,composed:!0,detail:e});console.log(`Relaying event from ${r.type}:`,i),s.dispatchEvent(i),r.stopPropagation()}function ye(r,t="*"){return r.composedPath().find(s=>{const i=s;return i.tagName&&i.matches(t)})}function ts(r,...t){const e=r.map((i,n)=>n?[t[n-1],i]:[i]).flat().join("");let s=new CSSStyleSheet;return s.replaceSync(e),s}const Zs=new DOMParser;function M(r,...t){const e=t.map(c),s=r.map((a,d)=>{if(d===0)return[a];const f=e[d-1];return f instanceof Node?[`<ins id="mu-html-${d-1}"></ins>`,a]:[f,a]}).flat().join(""),i=Zs.parseFromString(s,"text/html"),n=i.head.childElementCount?i.head.children:i.body.children,o=new DocumentFragment;return o.replaceChildren(...n),e.forEach((a,d)=>{if(a instanceof Node){const f=o.querySelector(`ins#mu-html-${d}`);if(f){const u=f.parentNode;u==null||u.replaceChild(a,f)}else console.log("Missing insertion point:",`ins#mu-html-${d}`)}}),o;function c(a,d){if(a===null)return"";switch(typeof a){case"string":return _e(a);case"bigint":case"boolean":case"number":case"symbol":return _e(a.toString());case"object":if(a instanceof Node||a instanceof DocumentFragment)return a;if(Array.isArray(a)){const f=new DocumentFragment,u=a.map(c);return f.replaceChildren(...u),f}return new Text(a.toString());default:return new Comment(`[invalid parameter of type "${typeof a}"]`)}}}function _e(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Tt(r,t={mode:"open"}){const e=r.attachShadow(t),s={template:i,styles:n};return s;function i(o){const c=o.firstElementChild,a=c&&c.tagName==="TEMPLATE"?c:void 0;return a&&e.appendChild(a.content.cloneNode(!0)),s}function n(...o){e.adoptedStyleSheets=o}}V=class extends HTMLElement{constructor(){super(),this._state={},Tt(this).template(V.template).styles(V.styles),this.addEventListener("change",r=>{const t=r.target;if(t){const e=t.name,s=t.value;e&&(this._state[e]=s)}}),this.form&&this.form.addEventListener("submit",r=>{r.preventDefault(),Jt(r,"mu-form:submit",this._state)})}set init(r){this._state=r||{},Gs(this._state,this)}get form(){var r;return(r=this.shadowRoot)==null?void 0:r.querySelector("form")}},V.template=M`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style></style>
    </template>
  `,V.styles=ts`
    form {
      display: grid;
      gap: var(--size-spacing-medium);
      grid-column: 1/-1;
      grid-template-columns:
        subgrid
        [start] [label] [input] [col2] [col3] [end];
    }
    ::slotted(label) {
      display: grid;
      grid-column: label / end;
      grid-template-columns: subgrid;
      gap: var(--size-spacing-medium);
    }
    ::slotted(fieldset) {
      display: contents;
    }
    button[type="submit"] {
      grid-column: input;
      justify-self: start;
    }
  `;function Gs(r,t){const e=Object.entries(r);for(const[s,i]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const c=o;c.checked=!!i;break;case"date":o.value=i.toISOString().substr(0,10);break;default:o.value=i;break}}}return r}const es=class ss extends Qt{constructor(t){super((e,s)=>this.update(e,s),t,ss.EVENT_TYPE)}update(t,e){switch(t[0]){case"history/navigate":{const{href:s,state:i}=t[1];e(Xs(s,i));break}case"history/redirect":{const{href:s,state:i}=t[1];e(ti(s,i));break}}}};es.EVENT_TYPE="history:message";let Xt=es;class ve extends Ye{constructor(){super({location:document.location,state:{}}),this.addEventListener("click",t=>{const e=Qs(t);if(e){const s=new URL(e.href);s.origin===this.context.value.location.origin&&(console.log("Preventing Click Event on <A>",t),t.preventDefault(),te(e,"history/navigate",{href:s.pathname+s.search}))}}),window.addEventListener("popstate",t=>{console.log("Popstate",t.state),this.context.value={location:document.location,state:t.state}})}connectedCallback(){new Xt(this.context).attach(this)}}function Qs(r){const t=r.currentTarget,e=s=>s.tagName=="A"&&s.href;if(r.button===0)if(r.composed){const i=r.composedPath().find(e);return i||void 0}else{for(let s=r.target;s;s===t?null:s.parentElement)if(e(s))return s;return}}function Xs(r,t={}){return history.pushState(t,"",r),()=>({location:document.location,state:history.state})}function ti(r,t={}){return history.replaceState(t,"",r),()=>({location:document.location,state:history.state})}const te=Je(Xt.EVENT_TYPE),ei=Object.freeze(Object.defineProperty({__proto__:null,HistoryProvider:ve,Provider:ve,Service:Xt,dispatch:te},Symbol.toStringTag,{value:"Module"}));class At{constructor(t,e){this._effects=[],this._target=t,this._contextLabel=e}observe(t=void 0){return new Promise((e,s)=>{if(this._provider){const i=new $e(this._provider,t);this._effects.push(i),e(i)}else Ds(this._target,this._contextLabel).then(i=>{const n=new $e(i,t);this._provider=i,this._effects.push(n),i.attach(o=>this._handleChange(o)),e(n)}).catch(i=>console.log(`Observer ${this._contextLabel}: ${i}`,i))})}_handleChange(t){console.log("Received change event for observers",t,this._effects),t.stopPropagation(),this._effects.forEach(e=>e.runEffect())}}class $e{constructor(t,e){this._provider=t,e&&this.setEffect(e)}get context(){return this._provider.context}get value(){return this.context.value}setEffect(t){this._effectFn=t,this.runEffect()}runEffect(){this._effectFn&&this._effectFn(this.context.value)}}const is=class rs extends HTMLElement{constructor(){super(),this._state={},this._user=new lt,this._authObserver=new At(this,"blazing:auth"),Tt(this).template(rs.template),this.form&&this.form.addEventListener("submit",t=>{if(t.preventDefault(),this.src||this.action){if(console.log("Submitting form",this._state),this.action)this.action(this._state);else if(this.src){const e=this.isNew?"POST":"PUT",s=this.isNew?"created":"updated",i=this.isNew?this.src.replace(/[/][$]new$/,""):this.src;si(i,this._state,e,this.authorization).then(n=>et(n,this)).then(n=>{const o=`mu-rest-form:${s}`,c=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,[s]:n,url:i}});this.dispatchEvent(c)}).catch(n=>{const o="mu-rest-form:error",c=new CustomEvent(o,{bubbles:!0,composed:!0,detail:{method:e,error:n,url:i,request:this._state}});this.dispatchEvent(c)})}}}),this.addEventListener("change",t=>{const e=t.target;if(e){const s=e.name,i=e.value;s&&(this._state[s]=i)}})}get src(){return this.getAttribute("src")}get isNew(){return this.hasAttribute("new")}set init(t){this._state=t||{},et(this._state,this)}get form(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("form")}get authorization(){var t;return(t=this._user)!=null&&t.authenticated?{Authorization:`Bearer ${this._user.token}`}:{}}connectedCallback(){this._authObserver.observe(({user:t})=>{t&&(this._user=t,this.src&&!this.isNew&&be(this.src,this.authorization).then(e=>{this._state=e,et(e,this)}))})}attributeChangedCallback(t,e,s){switch(t){case"src":this.src&&s&&s!==e&&!this.isNew&&be(this.src,this.authorization).then(i=>{this._state=i,et(i,this)});break;case"new":s&&(this._state={},et({},this));break}}};is.observedAttributes=["src","new","action"];is.template=M`
    <template>
      <form autocomplete="off">
        <slot></slot>
        <slot name="submit">
          <button type="submit">Submit</button>
        </slot>
      </form>
      <slot name="delete"></slot>
      <style>
        form {
          display: grid;
          gap: var(--size-spacing-medium);
          grid-template-columns: [start] 1fr [label] 1fr [input] 3fr 1fr [end];
        }
        ::slotted(label) {
          display: grid;
          grid-column: label / end;
          grid-template-columns: subgrid;
          gap: var(--size-spacing-medium);
        }
        button[type="submit"] {
          grid-column: input;
          justify-self: start;
        }
      </style>
    </template>
  `;function be(r,t){return fetch(r,{headers:t}).then(e=>{if(e.status!==200)throw`Status: ${e.status}`;return e.json()}).catch(e=>console.log(`Failed to load form from ${r}:`,e))}function et(r,t){const e=Object.entries(r);for(const[s,i]of e){const n=t.querySelector(`[name="${s}"]`);if(n){const o=n;switch(o.type){case"checkbox":const c=o;c.checked=!!i;break;default:o.value=i;break}}}return r}function si(r,t,e="PUT",s={}){return fetch(r,{method:e,headers:{"Content-Type":"application/json",...s},body:JSON.stringify(t)}).then(i=>{if(i.status!=200&&i.status!=201)throw`Form submission failed: Status ${i.status}`;return i.json()})}const ii=class ns extends Qt{constructor(t,e){super(e,t,ns.EVENT_TYPE,!1)}};ii.EVENT_TYPE="mu:message";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $t=globalThis,ee=$t.ShadowRoot&&($t.ShadyCSS===void 0||$t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,se=Symbol(),Ae=new WeakMap;let os=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==se)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(ee&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Ae.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Ae.set(e,t))}return t}toString(){return this.cssText}};const ri=r=>new os(typeof r=="string"?r:r+"",void 0,se),ni=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new os(e,r,se)},oi=(r,t)=>{if(ee)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=$t.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},Ee=ee?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return ri(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ai,defineProperty:ci,getOwnPropertyDescriptor:li,getOwnPropertyNames:hi,getOwnPropertySymbols:ui,getPrototypeOf:di}=Object,K=globalThis,we=K.trustedTypes,pi=we?we.emptyScript:"",Se=K.reactiveElementPolyfillSupport,ot=(r,t)=>r,Et={toAttribute(r,t){switch(t){case Boolean:r=r?pi:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},ie=(r,t)=>!ai(r,t),xe={attribute:!0,type:String,converter:Et,reflect:!1,hasChanged:ie};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),K.litPropertyMetadata??(K.litPropertyMetadata=new WeakMap);let F=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=xe){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&ci(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=li(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return i==null?void 0:i.call(this)},set(o){const c=i==null?void 0:i.call(this);n.call(this,o),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??xe}static _$Ei(){if(this.hasOwnProperty(ot("elementProperties")))return;const t=di(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ot("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ot("properties"))){const e=this.properties,s=[...hi(e),...ui(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Ee(i))}else t!==void 0&&e.push(Ee(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return oi(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var s;const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(n!==void 0&&i.reflect===!0){const o=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:Et).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){var s;const i=this.constructor,n=i._$Eh.get(t);if(n!==void 0&&this._$Em!==n){const o=i.getPropertyOptions(n),c=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)==null?void 0:s.fromAttribute)!==void 0?o.converter:Et;this._$Em=n,this[n]=c.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??ie)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i)o.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],o)}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$EO)==null||t.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(s)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}};F.elementStyles=[],F.shadowRootOptions={mode:"open"},F[ot("elementProperties")]=new Map,F[ot("finalized")]=new Map,Se==null||Se({ReactiveElement:F}),(K.reactiveElementVersions??(K.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wt=globalThis,St=wt.trustedTypes,Pe=St?St.createPolicy("lit-html",{createHTML:r=>r}):void 0,as="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,cs="?"+P,fi=`<${cs}>`,j=document,ht=()=>j.createComment(""),ut=r=>r===null||typeof r!="object"&&typeof r!="function",re=Array.isArray,mi=r=>re(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",Vt=`[ 	
\f\r]`,st=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ke=/-->/g,Ce=/>/g,R=RegExp(`>|${Vt}(?:([^\\s"'>=/]+)(${Vt}*=${Vt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Oe=/'/g,Te=/"/g,ls=/^(?:script|style|textarea|title)$/i,gi=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),it=gi(1),J=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),Re=new WeakMap,N=j.createTreeWalker(j,129);function hs(r,t){if(!re(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Pe!==void 0?Pe.createHTML(t):t}const yi=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",o=st;for(let c=0;c<e;c++){const a=r[c];let d,f,u=-1,l=0;for(;l<a.length&&(o.lastIndex=l,f=o.exec(a),f!==null);)l=o.lastIndex,o===st?f[1]==="!--"?o=ke:f[1]!==void 0?o=Ce:f[2]!==void 0?(ls.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=R):f[3]!==void 0&&(o=R):o===R?f[0]===">"?(o=i??st,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,d=f[1],o=f[3]===void 0?R:f[3]==='"'?Te:Oe):o===Te||o===Oe?o=R:o===ke||o===Ce?o=st:(o=R,i=void 0);const h=o===R&&r[c+1].startsWith("/>")?" ":"";n+=o===st?a+fi:u>=0?(s.push(d),a.slice(0,u)+as+a.slice(u)+P+h):a+P+(u===-2?c:h)}return[hs(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};let Zt=class us{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const c=t.length-1,a=this.parts,[d,f]=yi(t,e);if(this.el=us.createElement(d,s),N.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=N.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(as)){const l=f[o++],h=i.getAttribute(u).split(P),p=/([.?@])?(.*)/.exec(l);a.push({type:1,index:n,name:p[2],strings:h,ctor:p[1]==="."?vi:p[1]==="?"?$i:p[1]==="@"?bi:Rt}),i.removeAttribute(u)}else u.startsWith(P)&&(a.push({type:6,index:n}),i.removeAttribute(u));if(ls.test(i.tagName)){const u=i.textContent.split(P),l=u.length-1;if(l>0){i.textContent=St?St.emptyScript:"";for(let h=0;h<l;h++)i.append(u[h],ht()),N.nextNode(),a.push({type:2,index:++n});i.append(u[l],ht())}}}else if(i.nodeType===8)if(i.data===cs)a.push({type:2,index:n});else{let u=-1;for(;(u=i.data.indexOf(P,u+1))!==-1;)a.push({type:7,index:n}),u+=P.length-1}n++}}static createElement(t,e){const s=j.createElement("template");return s.innerHTML=t,s}};function Z(r,t,e=r,s){var i,n;if(t===J)return t;let o=s!==void 0?(i=e.o)==null?void 0:i[s]:e.l;const c=ut(t)?void 0:t._$litDirective$;return(o==null?void 0:o.constructor)!==c&&((n=o==null?void 0:o._$AO)==null||n.call(o,!1),c===void 0?o=void 0:(o=new c(r),o._$AT(r,e,s)),s!==void 0?(e.o??(e.o=[]))[s]=o:e.l=o),o!==void 0&&(t=Z(r,o._$AS(r,t.values),o,s)),t}class _i{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??j).importNode(e,!0);N.currentNode=i;let n=N.nextNode(),o=0,c=0,a=s[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new mt(n,n.nextSibling,this,t):a.type===1?d=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(d=new Ai(n,this,t)),this._$AV.push(d),a=s[++c]}o!==(a==null?void 0:a.index)&&(n=N.nextNode(),o++)}return N.currentNode=j,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class mt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this.v}constructor(t,e,s,i){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this.v=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),ut(t)?t===v||t==null||t===""?(this._$AH!==v&&this._$AR(),this._$AH=v):t!==this._$AH&&t!==J&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):mi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==v&&ut(this._$AH)?this._$AA.nextSibling.data=t:this.T(j.createTextNode(t)),this._$AH=t}$(t){var e;const{values:s,_$litType$:i}=t,n=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=Zt.createElement(hs(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)==null?void 0:e._$AD)===n)this._$AH.p(s);else{const o=new _i(n,this),c=o.u(this.options);o.p(s),this.T(c),this._$AH=o}}_$AC(t){let e=Re.get(t.strings);return e===void 0&&Re.set(t.strings,e=new Zt(t)),e}k(t){re(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new mt(this.O(ht()),this.O(ht()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this.v=t,(e=this._$AP)==null||e.call(this,t))}}class Rt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=v}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=Z(this,t,e,0),o=!ut(t)||t!==this._$AH&&t!==J,o&&(this._$AH=t);else{const c=t;let a,d;for(t=n[0],a=0;a<n.length-1;a++)d=Z(this,c[s+a],e,a),d===J&&(d=this._$AH[a]),o||(o=!ut(d)||d!==this._$AH[a]),d===v?t=v:t!==v&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}o&&!i&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class vi extends Rt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}}class $i extends Rt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==v)}}class bi extends Rt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??v)===J)return;const s=this._$AH,i=t===v&&s!==v||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==v&&(s===v||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Ai{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const Ue=wt.litHtmlPolyfillSupport;Ue==null||Ue(Zt,mt),(wt.litHtmlVersions??(wt.litHtmlVersions=[])).push("3.2.0");const Ei=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new mt(t.insertBefore(ht(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let W=class extends F{constructor(){super(...arguments),this.renderOptions={host:this},this.o=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.o=Ei(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this.o)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.o)==null||t.setConnected(!1)}render(){return J}};W._$litElement$=!0,W.finalized=!0,(ge=globalThis.litElementHydrateSupport)==null||ge.call(globalThis,{LitElement:W});const Ne=globalThis.litElementPolyfillSupport;Ne==null||Ne({LitElement:W});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wi={attribute:!0,type:String,converter:Et,reflect:!1,hasChanged:ie},Si=(r=wi,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(c){const a=t.get.call(this);t.set.call(this,c),this.requestUpdate(o,a,r)},init(c){return c!==void 0&&this.P(o,void 0,r),c}}}if(s==="setter"){const{name:o}=e;return function(c){const a=this[o];t.call(this,c),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function ds(r){return(t,e)=>typeof e=="object"?Si(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,o?{...s,wrapped:!0}:s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ps(r){return ds({...r,state:!0,attribute:!1})}function xi(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function Pi(r){throw new Error('Could not dynamically require "'+r+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var fs={};(function(r){var t=function(){var e=function(u,l,h,p){for(h=h||{},p=u.length;p--;h[u[p]]=l);return h},s=[1,9],i=[1,10],n=[1,11],o=[1,12],c=[5,11,12,13,14,15],a={trace:function(){},yy:{},symbols_:{error:2,root:3,expressions:4,EOF:5,expression:6,optional:7,literal:8,splat:9,param:10,"(":11,")":12,LITERAL:13,SPLAT:14,PARAM:15,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",11:"(",12:")",13:"LITERAL",14:"SPLAT",15:"PARAM"},productions_:[0,[3,2],[3,1],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[7,3],[8,1],[9,1],[10,1]],performAction:function(l,h,p,g,m,y,Mt){var A=y.length-1;switch(m){case 1:return new g.Root({},[y[A-1]]);case 2:return new g.Root({},[new g.Literal({value:""})]);case 3:this.$=new g.Concat({},[y[A-1],y[A]]);break;case 4:case 5:this.$=y[A];break;case 6:this.$=new g.Literal({value:y[A]});break;case 7:this.$=new g.Splat({name:y[A]});break;case 8:this.$=new g.Param({name:y[A]});break;case 9:this.$=new g.Optional({},[y[A-1]]);break;case 10:this.$=l;break;case 11:case 12:this.$=l.slice(1);break}},table:[{3:1,4:2,5:[1,3],6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},{1:[3]},{5:[1,13],6:14,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},{1:[2,2]},e(c,[2,4]),e(c,[2,5]),e(c,[2,6]),e(c,[2,7]),e(c,[2,8]),{4:15,6:4,7:5,8:6,9:7,10:8,11:s,13:i,14:n,15:o},e(c,[2,10]),e(c,[2,11]),e(c,[2,12]),{1:[2,1]},e(c,[2,3]),{6:14,7:5,8:6,9:7,10:8,11:s,12:[1,16],13:i,14:n,15:o},e(c,[2,9])],defaultActions:{3:[2,2],13:[2,1]},parseError:function(l,h){if(h.recoverable)this.trace(l);else{let p=function(g,m){this.message=g,this.hash=m};throw p.prototype=Error,new p(l,h)}},parse:function(l){var h=this,p=[0],g=[null],m=[],y=this.table,Mt="",A=0,pe=0,Rs=2,fe=1,Us=m.slice.call(arguments,1),_=Object.create(this.lexer),O={yy:{}};for(var Ht in this.yy)Object.prototype.hasOwnProperty.call(this.yy,Ht)&&(O.yy[Ht]=this.yy[Ht]);_.setInput(l,O.yy),O.yy.lexer=_,O.yy.parser=this,typeof _.yylloc>"u"&&(_.yylloc={});var jt=_.yylloc;m.push(jt);var Ns=_.options&&_.options.ranges;typeof O.yy.parseError=="function"?this.parseError=O.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var Ls=function(){var D;return D=_.lex()||fe,typeof D!="number"&&(D=h.symbols_[D]||D),D},b,T,E,It,z={},_t,x,me,vt;;){if(T=p[p.length-1],this.defaultActions[T]?E=this.defaultActions[T]:((b===null||typeof b>"u")&&(b=Ls()),E=y[T]&&y[T][b]),typeof E>"u"||!E.length||!E[0]){var zt="";vt=[];for(_t in y[T])this.terminals_[_t]&&_t>Rs&&vt.push("'"+this.terminals_[_t]+"'");_.showPosition?zt="Parse error on line "+(A+1)+`:
`+_.showPosition()+`
Expecting `+vt.join(", ")+", got '"+(this.terminals_[b]||b)+"'":zt="Parse error on line "+(A+1)+": Unexpected "+(b==fe?"end of input":"'"+(this.terminals_[b]||b)+"'"),this.parseError(zt,{text:_.match,token:this.terminals_[b]||b,line:_.yylineno,loc:jt,expected:vt})}if(E[0]instanceof Array&&E.length>1)throw new Error("Parse Error: multiple actions possible at state: "+T+", token: "+b);switch(E[0]){case 1:p.push(b),g.push(_.yytext),m.push(_.yylloc),p.push(E[1]),b=null,pe=_.yyleng,Mt=_.yytext,A=_.yylineno,jt=_.yylloc;break;case 2:if(x=this.productions_[E[1]][1],z.$=g[g.length-x],z._$={first_line:m[m.length-(x||1)].first_line,last_line:m[m.length-1].last_line,first_column:m[m.length-(x||1)].first_column,last_column:m[m.length-1].last_column},Ns&&(z._$.range=[m[m.length-(x||1)].range[0],m[m.length-1].range[1]]),It=this.performAction.apply(z,[Mt,pe,A,O.yy,E[1],g,m].concat(Us)),typeof It<"u")return It;x&&(p=p.slice(0,-1*x*2),g=g.slice(0,-1*x),m=m.slice(0,-1*x)),p.push(this.productions_[E[1]][0]),g.push(z.$),m.push(z._$),me=y[p[p.length-2]][p[p.length-1]],p.push(me);break;case 3:return!0}}return!0}},d=function(){var u={EOF:1,parseError:function(h,p){if(this.yy.parser)this.yy.parser.parseError(h,p);else throw new Error(h)},setInput:function(l,h){return this.yy=h||this.yy||{},this._input=l,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var l=this._input[0];this.yytext+=l,this.yyleng++,this.offset++,this.match+=l,this.matched+=l;var h=l.match(/(?:\r\n?|\n).*/g);return h?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),l},unput:function(l){var h=l.length,p=l.split(/(?:\r\n?|\n)/g);this._input=l+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-h),this.offset-=h;var g=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),p.length-1&&(this.yylineno-=p.length-1);var m=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:p?(p.length===g.length?this.yylloc.first_column:0)+g[g.length-p.length].length-p[0].length:this.yylloc.first_column-h},this.options.ranges&&(this.yylloc.range=[m[0],m[0]+this.yyleng-h]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(l){this.unput(this.match.slice(l))},pastInput:function(){var l=this.matched.substr(0,this.matched.length-this.match.length);return(l.length>20?"...":"")+l.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var l=this.match;return l.length<20&&(l+=this._input.substr(0,20-l.length)),(l.substr(0,20)+(l.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var l=this.pastInput(),h=new Array(l.length+1).join("-");return l+this.upcomingInput()+`
`+h+"^"},test_match:function(l,h){var p,g,m;if(this.options.backtrack_lexer&&(m={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(m.yylloc.range=this.yylloc.range.slice(0))),g=l[0].match(/(?:\r\n?|\n).*/g),g&&(this.yylineno+=g.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:g?g[g.length-1].length-g[g.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+l[0].length},this.yytext+=l[0],this.match+=l[0],this.matches=l,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(l[0].length),this.matched+=l[0],p=this.performAction.call(this,this.yy,this,h,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),p)return p;if(this._backtrack){for(var y in m)this[y]=m[y];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var l,h,p,g;this._more||(this.yytext="",this.match="");for(var m=this._currentRules(),y=0;y<m.length;y++)if(p=this._input.match(this.rules[m[y]]),p&&(!h||p[0].length>h[0].length)){if(h=p,g=y,this.options.backtrack_lexer){if(l=this.test_match(p,m[y]),l!==!1)return l;if(this._backtrack){h=!1;continue}else return!1}else if(!this.options.flex)break}return h?(l=this.test_match(h,m[g]),l!==!1?l:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var h=this.next();return h||this.lex()},begin:function(h){this.conditionStack.push(h)},popState:function(){var h=this.conditionStack.length-1;return h>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(h){return h=this.conditionStack.length-1-Math.abs(h||0),h>=0?this.conditionStack[h]:"INITIAL"},pushState:function(h){this.begin(h)},stateStackSize:function(){return this.conditionStack.length},options:{},performAction:function(h,p,g,m){switch(g){case 0:return"(";case 1:return")";case 2:return"SPLAT";case 3:return"PARAM";case 4:return"LITERAL";case 5:return"LITERAL";case 6:return"EOF"}},rules:[/^(?:\()/,/^(?:\))/,/^(?:\*+\w+)/,/^(?::+\w+)/,/^(?:[\w%\-~\n]+)/,/^(?:.)/,/^(?:$)/],conditions:{INITIAL:{rules:[0,1,2,3,4,5,6],inclusive:!0}}};return u}();a.lexer=d;function f(){this.yy={}}return f.prototype=a,a.Parser=f,new f}();typeof Pi<"u"&&(r.parser=t,r.Parser=t.Parser,r.parse=function(){return t.parse.apply(t,arguments)})})(fs);function q(r){return function(t,e){return{displayName:r,props:t,children:e||[]}}}var ms={Root:q("Root"),Concat:q("Concat"),Literal:q("Literal"),Splat:q("Splat"),Param:q("Param"),Optional:q("Optional")},gs=fs.parser;gs.yy=ms;var ki=gs,Ci=Object.keys(ms);function Oi(r){return Ci.forEach(function(t){if(typeof r[t]>"u")throw new Error("No handler defined for "+t.displayName)}),{visit:function(t,e){return this.handlers[t.displayName].call(this,t,e)},handlers:r}}var ys=Oi,Ti=ys,Ri=/[\-{}\[\]+?.,\\\^$|#\s]/g;function _s(r){this.captures=r.captures,this.re=r.re}_s.prototype.match=function(r){var t=this.re.exec(r),e={};if(t)return this.captures.forEach(function(s,i){typeof t[i+1]>"u"?e[s]=void 0:e[s]=decodeURIComponent(t[i+1])}),e};var Ui=Ti({Concat:function(r){return r.children.reduce((function(t,e){var s=this.visit(e);return{re:t.re+s.re,captures:t.captures.concat(s.captures)}}).bind(this),{re:"",captures:[]})},Literal:function(r){return{re:r.props.value.replace(Ri,"\\$&"),captures:[]}},Splat:function(r){return{re:"([^?]*?)",captures:[r.props.name]}},Param:function(r){return{re:"([^\\/\\?]+)",captures:[r.props.name]}},Optional:function(r){var t=this.visit(r.children[0]);return{re:"(?:"+t.re+")?",captures:t.captures}},Root:function(r){var t=this.visit(r.children[0]);return new _s({re:new RegExp("^"+t.re+"(?=\\?|$)"),captures:t.captures})}}),Ni=Ui,Li=ys,Mi=Li({Concat:function(r,t){var e=r.children.map((function(s){return this.visit(s,t)}).bind(this));return e.some(function(s){return s===!1})?!1:e.join("")},Literal:function(r){return decodeURI(r.props.value)},Splat:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Param:function(r,t){return t[r.props.name]?t[r.props.name]:!1},Optional:function(r,t){var e=this.visit(r.children[0],t);return e||""},Root:function(r,t){t=t||{};var e=this.visit(r.children[0],t);return e?encodeURI(e):!1}}),Hi=Mi,ji=ki,Ii=Ni,zi=Hi;gt.prototype=Object.create(null);gt.prototype.match=function(r){var t=Ii.visit(this.ast),e=t.match(r);return e||!1};gt.prototype.reverse=function(r){return zi.visit(this.ast,r)};function gt(r){var t;if(this?t=this:t=Object.create(gt.prototype),typeof r>"u")throw new Error("A route spec is required");return t.spec=r,t.ast=ji.parse(r),t}var Di=gt,Vi=Di,qi=Vi;const Fi=xi(qi);var Bi=Object.defineProperty,vs=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&Bi(t,e,i),i};const $s=class extends W{constructor(t,e,s=""){super(),this._cases=[],this._fallback=()=>it` <h1>Not Found</h1> `,this._cases=t.map(i=>({...i,route:new Fi(i.path)})),this._historyObserver=new At(this,e),this._authObserver=new At(this,s)}connectedCallback(){this._historyObserver.observe(({location:t})=>{console.log("New location",t),t&&(this._match=this.matchRoute(t))}),this._authObserver.observe(({user:t})=>{this._user=t}),super.connectedCallback()}render(){return console.log("Rendering for match",this._match,this._user),it` <main>${(()=>{const e=this._match;if(e){if("view"in e)return this._user?e.auth&&e.auth!=="public"&&this._user&&!this._user.authenticated?(Xe(this,"auth/redirect"),it` <h1>Redirecting for Login</h1> `):(console.log("Loading view, ",e.params,e.query),e.view(e.params||{},e.query)):it` <h1>Authenticating</h1> `;if("redirect"in e){const s=e.redirect;if(typeof s=="string")return this.redirect(s),it` <h1>Redirecting to ${s}…</h1> `}}return this._fallback({})})()}</main> `}updated(t){t.has("_match")&&this.requestUpdate()}matchRoute(t){const{search:e,pathname:s}=t,i=new URLSearchParams(e),n=s+e;for(const o of this._cases){const c=o.route.match(n);if(c)return{...o,path:s,params:c,query:i}}}redirect(t){te(this,"history/redirect",{href:t})}};$s.styles=ni`
    :host,
    main {
      display: contents;
    }
  `;let xt=$s;vs([ps()],xt.prototype,"_user");vs([ps()],xt.prototype,"_match");const Wi=Object.freeze(Object.defineProperty({__proto__:null,Element:xt,Switch:xt},Symbol.toStringTag,{value:"Module"})),Yi=class bs extends HTMLElement{constructor(){if(super(),Tt(this).template(bs.template),this.shadowRoot){const t=this.shadowRoot.querySelector("slot[name='actuator']");t&&t.addEventListener("click",()=>this.toggle())}}toggle(){this.hasAttribute("open")?this.removeAttribute("open"):this.setAttribute("open","open")}};Yi.template=M`
    <template>
      <slot name="actuator"><button>Menu</button></slot>
      <div id="panel">
        <slot></slot>
      </div>

      <style>
        :host {
          position: relative;
        }
        #is-shown {
          display: none;
        }
        #panel {
          display: none;

          position: absolute;
          right: 0;
          margin-top: var(--size-spacing-small);
          width: max-content;
          padding: var(--size-spacing-small);
          border-radius: var(--size-radius-small);
          background: var(--color-background-card);
          color: var(--color-text);
          box-shadow: var(--shadow-popover);
        }
        :host([open]) #panel {
          display: block;
        }
      </style>
    </template>
  `;const As=class Gt extends HTMLElement{constructor(){super(),this._array=[],Tt(this).template(Gt.template).styles(Gt.styles),this.addEventListener("input-array:add",t=>{t.stopPropagation(),this.append(Es("",this._array.length))}),this.addEventListener("input-array:remove",t=>{t.stopPropagation(),this.removeClosestItem(t.target)}),this.addEventListener("change",t=>{t.stopPropagation();const e=t.target;if(e&&e!==this){const s=new Event("change",{bubbles:!0}),i=e.value,n=e.closest("label");if(n){const o=Array.from(this.children).indexOf(n);this._array[o]=i,this.dispatchEvent(s)}}}),this.addEventListener("click",t=>{ye(t,"button.add")?Jt(t,"input-array:add"):ye(t,"button.remove")&&Jt(t,"input-array:remove")})}get name(){return this.getAttribute("name")}get value(){return this._array}set value(t){this._array=Array.isArray(t)?t:[t],Ki(this._array,this)}removeClosestItem(t){const e=t.closest("label");if(console.log("Removing closest item:",e,t),e){const s=Array.from(this.children).indexOf(e);this._array.splice(s,1),e.remove()}}};As.template=M`
    <template>
      <ul>
        <slot></slot>
      </ul>
      <button class="add">
        <slot name="label-add">Add one</slot>
        <style></style>
      </button>
    </template>
  `;As.styles=ts`
    :host {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: input / end;
    }
    ul {
      display: contents;
    }
    button.add {
      grid-column: input / input-end;
    }
    ::slotted(label) {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: subgrid;
    }
  `;function Ki(r,t){t.replaceChildren(),r.forEach((e,s)=>t.append(Es(e)))}function Es(r,t){const e=r===void 0?M`<input />`:M`<input value="${r}" />`;return M`
    <label>
      ${e}
      <button class="remove" type="button">Remove</button>
    </label>
  `}function Ji(r){return Object.entries(r).map(([t,e])=>{customElements.get(t)||customElements.define(t,e)}),customElements}var Zi=Object.defineProperty,Gi=Object.getOwnPropertyDescriptor,Qi=(r,t,e,s)=>{for(var i=Gi(t,e),n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&Zi(t,e,i),i};class Xi extends W{constructor(t){super(),this._pending=[],this._observer=new At(this,t)}get model(){return this._lastModel=this._context?this._context.value:{},this._lastModel}connectedCallback(){var t;super.connectedCallback(),(t=this._observer)==null||t.observe().then(e=>{console.log("View effect (initial)",this,e),this._context=e.context,this._pending.length&&this._pending.forEach(([s,i])=>{console.log("Dispatching queued event",i,s),s.dispatchEvent(i)}),e.setEffect(()=>{var s;if(console.log("View effect",this,e,(s=this._context)==null?void 0:s.value),this._context)console.log("requesting update"),this.requestUpdate();else throw"View context not ready for effect"})})}dispatchMessage(t,e=this){const s=new CustomEvent("mu:message",{bubbles:!0,composed:!0,detail:t});this._context?(console.log("Dispatching message event",s),e.dispatchEvent(s)):(console.log("Queueing message event",s),this._pending.push([e,s]))}ref(t){return this.model?this.model[t]:void 0}}Qi([ds()],Xi.prototype,"model");/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const bt=globalThis,ne=bt.ShadowRoot&&(bt.ShadyCSS===void 0||bt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,oe=Symbol(),Le=new WeakMap;let ws=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==oe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(ne&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Le.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Le.set(e,t))}return t}toString(){return this.cssText}};const tr=r=>new ws(typeof r=="string"?r:r+"",void 0,oe),Ut=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new ws(e,r,oe)},er=(r,t)=>{if(ne)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=bt.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},Me=ne?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return tr(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:sr,defineProperty:ir,getOwnPropertyDescriptor:rr,getOwnPropertyNames:nr,getOwnPropertySymbols:or,getPrototypeOf:ar}=Object,C=globalThis,He=C.trustedTypes,cr=He?He.emptyScript:"",qt=C.reactiveElementPolyfillSupport,at=(r,t)=>r,Pt={toAttribute(r,t){switch(t){case Boolean:r=r?cr:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},ae=(r,t)=>!sr(r,t),je={attribute:!0,type:String,converter:Pt,reflect:!1,useDefault:!1,hasChanged:ae};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),C.litPropertyMetadata??(C.litPropertyMetadata=new WeakMap);let B=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=je){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&ir(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=rr(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){const c=i==null?void 0:i.call(this);n==null||n.call(this,o),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??je}static _$Ei(){if(this.hasOwnProperty(at("elementProperties")))return;const t=ar(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(at("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(at("properties"))){const e=this.properties,s=[...nr(e),...or(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Me(i))}else t!==void 0&&e.push(Me(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return er(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var n;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:Pt).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){var n,o;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const c=s.getPropertyOptions(i),a=typeof c.converter=="function"?{fromAttribute:c.converter}:((n=c.converter)==null?void 0:n.fromAttribute)!==void 0?c.converter:Pt;this._$Em=i,this[i]=a.fromAttribute(e,c.type)??((o=this._$Ej)==null?void 0:o.get(i))??null,this._$Em=null}}requestUpdate(t,e,s){var i;if(t!==void 0){const n=this.constructor,o=this[t];if(s??(s=n.getPropertyOptions(t)),!((s.hasChanged??ae)(o,e)||s.useDefault&&s.reflect&&o===((i=this._$Ej)==null?void 0:i.get(t))&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i){const{wrapped:c}=o,a=this[n];c!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,o,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};B.elementStyles=[],B.shadowRootOptions={mode:"open"},B[at("elementProperties")]=new Map,B[at("finalized")]=new Map,qt==null||qt({ReactiveElement:B}),(C.reactiveElementVersions??(C.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ct=globalThis,kt=ct.trustedTypes,Ie=kt?kt.createPolicy("lit-html",{createHTML:r=>r}):void 0,Ss="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,xs="?"+k,lr=`<${xs}>`,I=document,dt=()=>I.createComment(""),pt=r=>r===null||typeof r!="object"&&typeof r!="function",ce=Array.isArray,hr=r=>ce(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",Ft=`[ 	
\f\r]`,rt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ze=/-->/g,De=/>/g,U=RegExp(`>|${Ft}(?:([^\\s"'>=/]+)(${Ft}*=${Ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ve=/'/g,qe=/"/g,Ps=/^(?:script|style|textarea|title)$/i,ur=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),w=ur(1),G=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),Fe=new WeakMap,L=I.createTreeWalker(I,129);function ks(r,t){if(!ce(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ie!==void 0?Ie.createHTML(t):t}const dr=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",o=rt;for(let c=0;c<e;c++){const a=r[c];let d,f,u=-1,l=0;for(;l<a.length&&(o.lastIndex=l,f=o.exec(a),f!==null);)l=o.lastIndex,o===rt?f[1]==="!--"?o=ze:f[1]!==void 0?o=De:f[2]!==void 0?(Ps.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=U):f[3]!==void 0&&(o=U):o===U?f[0]===">"?(o=i??rt,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,d=f[1],o=f[3]===void 0?U:f[3]==='"'?qe:Ve):o===qe||o===Ve?o=U:o===ze||o===De?o=rt:(o=U,i=void 0);const h=o===U&&r[c+1].startsWith("/>")?" ":"";n+=o===rt?a+lr:u>=0?(s.push(d),a.slice(0,u)+Ss+a.slice(u)+k+h):a+k+(u===-2?c:h)}return[ks(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class ft{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const c=t.length-1,a=this.parts,[d,f]=dr(t,e);if(this.el=ft.createElement(d,s),L.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(i=L.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(const u of i.getAttributeNames())if(u.endsWith(Ss)){const l=f[o++],h=i.getAttribute(u).split(k),p=/([.?@])?(.*)/.exec(l);a.push({type:1,index:n,name:p[2],strings:h,ctor:p[1]==="."?fr:p[1]==="?"?mr:p[1]==="@"?gr:Nt}),i.removeAttribute(u)}else u.startsWith(k)&&(a.push({type:6,index:n}),i.removeAttribute(u));if(Ps.test(i.tagName)){const u=i.textContent.split(k),l=u.length-1;if(l>0){i.textContent=kt?kt.emptyScript:"";for(let h=0;h<l;h++)i.append(u[h],dt()),L.nextNode(),a.push({type:2,index:++n});i.append(u[l],dt())}}}else if(i.nodeType===8)if(i.data===xs)a.push({type:2,index:n});else{let u=-1;for(;(u=i.data.indexOf(k,u+1))!==-1;)a.push({type:7,index:n}),u+=k.length-1}n++}}static createElement(t,e){const s=I.createElement("template");return s.innerHTML=t,s}}function Q(r,t,e=r,s){var o,c;if(t===G)return t;let i=s!==void 0?(o=e._$Co)==null?void 0:o[s]:e._$Cl;const n=pt(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((c=i==null?void 0:i._$AO)==null||c.call(i,!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=Q(r,i._$AS(r,t.values),i,s)),t}class pr{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??I).importNode(e,!0);L.currentNode=i;let n=L.nextNode(),o=0,c=0,a=s[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new yt(n,n.nextSibling,this,t):a.type===1?d=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(d=new yr(n,this,t)),this._$AV.push(d),a=s[++c]}o!==(a==null?void 0:a.index)&&(n=L.nextNode(),o++)}return L.currentNode=I,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class yt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),pt(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==G&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):hr(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==$&&pt(this._$AH)?this._$AA.nextSibling.data=t:this.T(I.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=ft.createElement(ks(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(e);else{const o=new pr(i,this),c=o.u(this.options);o.p(e),this.T(c),this._$AH=o}}_$AC(t){let e=Fe.get(t.strings);return e===void 0&&Fe.set(t.strings,e=new ft(t)),e}k(t){ce(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new yt(this.O(dt()),this.O(dt()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class Nt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=$}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=Q(this,t,e,0),o=!pt(t)||t!==this._$AH&&t!==G,o&&(this._$AH=t);else{const c=t;let a,d;for(t=n[0],a=0;a<n.length-1;a++)d=Q(this,c[s+a],e,a),d===G&&(d=this._$AH[a]),o||(o=!pt(d)||d!==this._$AH[a]),d===$?t=$:t!==$&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}o&&!i&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class fr extends Nt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}}class mr extends Nt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}}class gr extends Nt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??$)===G)return;const s=this._$AH,i=t===$&&s!==$||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==$&&(s===$||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class yr{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const Bt=ct.litHtmlPolyfillSupport;Bt==null||Bt(ft,yt),(ct.litHtmlVersions??(ct.litHtmlVersions=[])).push("3.3.0");const _r=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new yt(t.insertBefore(dt(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H=globalThis;class S extends B{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=_r(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return G}}var Be;S._$litElement$=!0,S.finalized=!0,(Be=H.litElementHydrateSupport)==null||Be.call(H,{LitElement:S});const Wt=H.litElementPolyfillSupport;Wt==null||Wt({LitElement:S});(H.litElementVersions??(H.litElementVersions=[])).push("4.2.0");const le=class le extends S{firstUpdated(){const t=this.renderRoot.querySelector("#darkModeToggle");localStorage.getItem("dark-mode")==="true"&&(document.body.classList.add("dark-mode"),t&&(t.checked=!0)),t==null||t.addEventListener("change",s=>{const i=s.target.checked;localStorage.setItem("dark-mode",String(i)),document.body.classList.toggle("dark-mode",i)})}render(){return w`
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
    `}};le.styles=Ut`
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
  `;let Ct=le;customElements.define("camping-header",Ct);const he=class he extends S{render(){return w`
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
    `}};he.styles=Ut`
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
  `;let Ot=he;customElements.define("home-view",Ot);class vr extends S{render(){return w`
      <h2>Campsites</h2>
      <site-campsites src="/data/campsites.json"></site-campsites>
    `}}class Cs extends S{render(){return w`
      <site-activities src="/data/activiities.json"></site-activities>
    `}}customElements.define("activities-view",Cs);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $r={attribute:!0,type:String,converter:Pt,reflect:!1,hasChanged:ae},br=(r=$r,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(c){const a=t.get.call(this);t.set.call(this,c),this.requestUpdate(o,a,r)},init(c){return c!==void 0&&this.C(o,void 0,r,c),c}}}if(s==="setter"){const{name:o}=e;return function(c){const a=this[o];t.call(this,c),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function Lt(r){return(t,e)=>typeof e=="object"?br(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Ar(r){return Lt({...r,state:!0,attribute:!1})}var Er=Object.defineProperty,Os=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&Er(t,e,i),i};const ue=class ue extends S{constructor(){super(...arguments),this.src="",this.campsites=[]}connectedCallback(){super.connectedCallback(),this.src&&fetch(this.src).then(t=>t.json()).then(t=>{this.campsites=t}).catch(t=>{console.error("Failed to load campsites:",t)})}render(){return this.campsites.length===0?w`<p>Loading campsites...</p>`:w`
      ${this.campsites.map(t=>w`
          <site-campsite .name=${t.name} .count=${t.count}>
            <svg slot="icon" class="icon">
              <use href="/icons/icons.svg#campsites"></use>
            </svg>
            <p slot="desc">${t.desc}</p>
          </site-campsite>
        `)}
    `}};ue.styles=Ut`
    :host {
      display: block;
    }

    .icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
  `;let X=ue;Os([Lt()],X.prototype,"src");Os([Ar()],X.prototype,"campsites");customElements.define("site-campsites",X);var wr=Object.defineProperty,Ts=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&wr(t,e,i),i};const de=class de extends S{render(){const t=this.count!==void 0?w`<p class="count">${this.count} campsites</p>`:"";return w`
      <section class="card">
        <div class="header">
          <slot name="icon"></slot>
          <div>
            <h2>${this.name}</h2>
            ${t}
          </div>
        </div>
        <div class="desc">
          <slot name="desc"></slot>
        </div>
      </section>
    `}};de.styles=Ut`
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
  `;let tt=de;Ts([Lt()],tt.prototype,"name");Ts([Lt({type:Number})],tt.prototype,"count");customElements.define("site-campsite",tt);const Sr=[{path:"/app/campsites",view:()=>w`<campsites-view></campsites-view>`},{path:"/app/activities",view:()=>w`<activities-view></activities-view>`},{path:"/app",view:()=>w`<home-view></home-view>`},{path:"/",redirect:"/app"}];Ji({"mu-auth":Js.Provider,"mu-history":ei.Provider,"mu-switch":class extends Wi.Element{constructor(){super(Sr,"camping:history","camping:auth")}},"camping-header":Ct,"home-view":Ot,"campsites-view":vr,"activities-view":Cs,"site-campsites":X,"site-campsite":tt});
