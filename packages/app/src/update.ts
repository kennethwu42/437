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

  // Inject user into model
  apply((model) => ({
    ...model,
    user
  }));

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
