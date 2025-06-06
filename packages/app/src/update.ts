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

    const { userid, profile, onSuccess, onFailure } = message[1];
    fetch(`/api/profile/${userid}`, {
      method: "PUT",
      headers: {
        ...Auth.headers(user),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(profile)
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else throw new Error("Failed to save profile");
      })
      .then((saved) => {
        apply((model) => ({ ...model, profile: saved }));
        onSuccess?.();
      })
      .catch((err) => {
        console.error("❌ Failed to save profile:", err);
        onFailure?.(err);
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
      throw new Error(`Unhandled message type: ${message[0]}`);
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
