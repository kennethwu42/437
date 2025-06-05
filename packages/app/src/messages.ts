import { SiteCampsite, SiteActivity } from "server/models";

export type Msg =
  | ["campsites/init"]
  | ["campsites/load", { campsites: SiteCampsite[] }]
  | ["activities/load", { activities: SiteActivity[] }];
