import {
  Auth,
  define,
  History,
  Switch,
  Store
} from "@calpoly/mustang";
import { html } from "lit";

// MVU: Model, Msg, Update
import { Model, init } from "./model";
import { Msg } from "./messages";
import update from "./update";

// Header component
import { HeaderElement } from "./components/camping-header";

// Views
import { HomeViewElement } from "./views/home-view";
import { CampsitesViewElement } from "./views/campsites-view";
import { ActivitiesViewElement } from "./views/activities-view";

// Components
import { SiteCampsitesElement } from "./components/site-campsites";
import { SiteCampsiteElement } from "./components/site-campsite";
import { SiteActivitiesElement } from "./components/site-activities";

// App Routes
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
  // Mustang providers
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-store": class AppStore extends Store.Provider<Model, Msg> {
    constructor() {
      super(update, init, "camping:auth");
      this.provides = "camping:model";
    }
  },
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "camping:history", "camping:auth");
    }
  },

  // App components
  "camping-header": HeaderElement,
  "home-view": HomeViewElement,
  "campsites-view": CampsitesViewElement,
  "activities-view": ActivitiesViewElement,
  "site-campsites": SiteCampsitesElement,
  "site-campsite": SiteCampsiteElement,
  "site-activities": SiteActivitiesElement
});
