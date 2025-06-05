import { SiteCampsite, SiteActivity } from "server/models";

export interface Model {
  campsites?: SiteCampsite[];
  activities?: SiteActivity[];
}

export const init: Model = {};
