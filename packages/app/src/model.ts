import { SiteCampsite, SiteActivity, Profile } from "server/models";
import { Auth } from "@calpoly/mustang";

export interface Model {
  user?: Auth.User;
  profile?: Profile;
  campsites?: SiteCampsite[];
  activities?: SiteActivity[];
}

export const init: Model = {};
