import { html, LitElement } from "lit";
//import "../components/site-campsites";


export class CampsitesViewElement extends LitElement {
  render() {
    return html`
      <h2>Campsites</h2>
      <site-campsites src="/data/campsites.json"></site-campsites>
    `;
  }
}

//customElements.define("campsites-view", CampsitesViewElement);
