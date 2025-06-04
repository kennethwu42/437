import {
  Auth,
  define,
  History,
  Switch
} from "@calpoly/mustang";
import { html } from "lit";

// Header component
import { HeaderElement } from "./components/camping-header";

// Views
import { HomeViewElement } from "./views/home-view";
import { CampsitesViewElement } from "./views/campsites-view";
import { ActivitiesViewElement } from "./views/activities-view";
import {SiteCampsitesElement} from "./components/site-campsites";
import {SiteCampsiteElement} from "./components/site-campsite";
import {SiteActivitiesElement} from "./components/site-activities";
const routes = [
  {
    path: "/app/campsites",
    view: () => html`<campsites-view></campsites-view>`
  },
  {
    path: "/app/activities",
    view: () => html`<activities-view></activities-view>`
  },
  {
    path: "/app",
    view: () => html`<home-view></home-view>`
  },
  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "camping:history", "camping:auth");
    }
  },
  "camping-header": HeaderElement,
  "home-view": HomeViewElement,
  "campsites-view": CampsitesViewElement,
  "activities-view": ActivitiesViewElement,
  "site-campsites": SiteCampsitesElement,
  "site-campsite": SiteCampsiteElement,
  "site-activities": SiteActivitiesElement
});
