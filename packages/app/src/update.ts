import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";

console.log("🛠 update.ts loaded");

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  console.log("🛠 Message received in update:", message);

  // Always update model with current user
  apply((model) => ({
    ...model,
    user
  }));

  // Handle async message types
  if (message[0] === "campsites/init") {
    console.log("🌱 campsites/init received — fetching data");

    fetch("/api/campsites", {
      headers: Auth.headers(user)
    })
      .then((res) => res.json())
      .then((campsites) => {
        console.log("📦 campsites fetched — applying to model:", campsites);
        apply((model) => ({
          ...model,
          campsites
        }));
      })
      .catch((err) => {
        console.error("❌ Failed to fetch campsites:", err);
      });

    return;
  }

  if (message[0] === "activities/init") {
    console.log("🌱 activities/init received — fetching data");

    fetch("/api/activities", {
      headers: Auth.headers(user)
    })
      .then((res) => res.json())
      .then((activities) => {
        console.log("📦 activities fetched — applying to model:", activities);
        apply((model) => ({
          ...model,
          activities
        }));
      })
      .catch((err) => {
        console.error("❌ Failed to fetch activities:", err);
      });

    return;
  }

  if (message[0] === "profile/select") {
    console.log("👤 profile/select received");

    loadProfile(message[1], user).then((profile) => {
      if (profile) {
        console.log("📦 profile loaded:", profile);
        apply((model) => ({
          ...model,
          profile
        }));
      }
    });

    return;
  }

  if (message[0] === "profile/save") {
    console.log("💾 profile/save received");

    saveProfile(message[1], user)
      .then((saved) => {
        apply((model) => ({ ...model, profile: saved }));
        message[1].onSuccess?.();
      })
      .catch((err) => {
        console.error("❌ Failed to save profile:", err);
        message[1].onFailure?.(err);
      });

    return;
  }

  // Sync updates
  switch (message[0]) {
    case "campsites/load":
      console.log("✅ Applying campsites to model:", message[1].campsites);
      apply((model) => ({
        ...model,
        campsites: message[1].campsites
      }));
      break;

    case "activities/load":
      console.log("✅ Applying activities to model:", message[1].activities);
      apply((model) => ({
        ...model,
        activities: message[1].activities
      }));
      break;

    default:
      const unhandled: never = message[0];
      throw new Error(`Unhandled message type: ${unhandled}`);
  }
}

function loadProfile(
  payload: { userid: string },
  user: Auth.User
): Promise<unknown> {
  return fetch(`/api/profile/${payload.userid}`, {
    headers: Auth.headers(user)
  })
    .then((res) => (res.status === 200 ? res.json() : undefined))
    .then((json) => {
      if (json) {
        console.log("👤 Loaded profile:", json);
        return json;
      }
    });
}

function saveProfile(
  msg: {
    userid: string;
    profile: unknown;
  },
  user: Auth.User
): Promise<unknown> {
  return fetch(`/api/profile/${msg.userid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.profile)
  }).then((response: Response) => {
    if (response.status === 200) return response.json();
    else throw new Error(`Failed to save profile for ${msg.userid}`);
  });
}
