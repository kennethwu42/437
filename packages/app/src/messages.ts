import { SiteCampsite, SiteActivity, Profile } from "server/models";

export type Msg =
  | ["campsites/init"]
  | ["campsites/load", { campsites: SiteCampsite[] }]
  | ["activities/load", { activities: SiteActivity[] }]
  | [
      "profile/save",
      {
        userid: string;
        profile: Profile;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ];
