import {
  define,
  Form,
  View
} from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Msg } from "../messages";
import { Model } from "../model";

const gridStyles = css`
  section {
    display: grid;
    grid-template-rows: auto auto auto;
    justify-items: center;
    text-align: center;
    gap: 1rem;
    position: relative;
  }

  slot[name="avatar"] {
    grid-row: 1;
  }

  h1 {
    grid-row: 2;
    margin: 0;
  }

  dl {
    grid-row: 3;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  dt {
    font-weight: bold;
    color: var(--color-accent);
    font-family: var(--font-family-display);
  }

  dd {
    margin: 0;
  }

  nav {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .edit {
    background-color: var(--color-primary, #2563eb);
    color: white;
    padding: 0.4rem 0.8rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
  }
`;

class ProfileViewer extends LitElement {
  @property()
  username?: string;

  render() {
    return html`
      <section>
        <slot name="avatar"></slot>
        <h1><slot name="name"></slot></h1>
        <nav>
          <button
            class="edit"
            @click=${() =>
              this.dispatchEvent(
                new CustomEvent("profile:edit", {
                  bubbles: true,
                  composed: true
                })
              )}
          >
            Edit
          </button>
        </nav>
        <dl>
          <dt>Username</dt>
          <dd><slot name="userid"></slot></dd>
        </dl>
      </section>
    `;
  }

  static styles = [gridStyles];
}

class ProfileEditor extends LitElement {
  static uses = define({
    "mu-form": Form.Element
  });

  @property()
  username?: string;

  @property({ attribute: false })
  init?: any;

  render() {
    return html`
      <section>
        <h1><slot name="name"></slot></h1>
        <nav>
          <button
            class="close"
            @click=${() =>
              this.dispatchEvent(
                new CustomEvent("profile:close", {
                  bubbles: true,
                  composed: true
                })
              )}
          >
            Close
          </button>
          <button class="delete">Delete</button>
        </nav>
        <mu-form .init=${this._filteredInit()}>
          <label>
            <span>Username</span>
            <input disabled name="userid" />
          </label>
          <label>
            <span>Avatar</span>
            <input name="avatar" type="file" data-nobind @change=${this._handleAvatarSelected} />
          </label>
          <slot name="avatar"></slot>
          <label>
            <span>Name</span>
            <input name="name" />
          </label>
          <label>
            <span>Color</span>
            <input type="color" name="color" />
          </label>
        </mu-form>
      </section>
    `;
  }

  _filteredInit() {
    const { avatar, ...rest } = this.init ?? {};
    return rest;
  }

  static styles = [
    css`
      section {
        position: relative;
      }
      mu-form {
        grid-column: key / end;
      }
      mu-form input {
        grid-column: input;
      }
      mu-form label:has(input[type="file"]) {
        grid-row-end: span 4;
      }
      .close {
        background-color: #e5e7eb;
        border: none;
        padding: 0.4rem 0.8rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
        margin-right: 0.5rem;
      }
    `
  ];

  _handleAvatarSelected(ev: Event) {
    const target = ev.target as HTMLInputElement;
    const selectedFile = (target.files as FileList)[0];

    const reader: Promise<string> = new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result as string);
      fr.onerror = (err) => reject(err);
      fr.readAsDataURL(selectedFile);
    });

    reader.then((url: string) => {
      this.dispatchEvent(
        new CustomEvent("profile:new-avatar", {
          bubbles: true,
          composed: true,
          detail: url
        })
      );
    });
  }
}

export class ProfileViewElement extends View<Model, Msg> {
  static uses = define({
    "profile-viewer": ProfileViewer,
    "profile-editor": ProfileEditor
  });

  @property({ type: Boolean, reflect: true })
  edit = false;

  @property({ attribute: "user-id", reflect: true })
  userid = "";

  @state()
  get profile() {
    return this.model.profile;
  }

  @state()
  newAvatar?: string;

  constructor() {
    super("camping:model");

    this.addEventListener("profile:new-avatar", (event: Event) => {
      this.newAvatar = (event as CustomEvent).detail as string;
    });

    this.addEventListener("profile:edit", () => {
      this.edit = true;
    });

    this.addEventListener("profile:close", () => {
      this.edit = false;
    });
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === "user-id" && oldValue !== newValue && newValue) {
      this.dispatchMessage(["profile/select", { userid: newValue }]);
    }
  }

  render() {
    const {
      color,
      avatar,
      name,
      userid
    } = this.profile || {};
    const initial = (name || userid || "?").slice(0, 1);

    const fields = html`
      <div slot="avatar">
        ${avatar
          ? html`<img
              src=${avatar}
              style="width:80px;height:80px;border-radius:50%;object-fit:cover;aspect-ratio:1/1;"
            />`
          : html`
              <div
                style="width:80px;height:80px;border-radius:50%;background:${color};display:flex;align-items:center;justify-content:center;font-weight:bold;color:#fff;"
              >
                ${initial}
              </div>
            `}
      </div>
    `;



    return this.edit
      ? html`
          <profile-editor
            username=${userid}
            .init=${this.profile}
            @mu-form:submit=${(event: Form.SubmitEvent<any>) =>
              this._handleSubmit(event)}
          >
            ${fields}
          </profile-editor>
        `
      : html`
          <profile-viewer username=${userid}>
            ${fields}
            <span slot="name">${name}</span>
            <span slot="userid">${userid}</span>
          </profile-viewer>
        `;
  }

  _handleSubmit(event: Form.SubmitEvent<any>) {
    const profile = this.newAvatar
      ? { ...event.detail, avatar: this.newAvatar }
      : event.detail;

    this.dispatchMessage([
      "profile/save",
      {
        userid: this.userid,
        profile,
        onSuccess: () => {
          this.edit = false;
          this.dispatchMessage(["profile/select", { userid: this.userid }]);
        },
        onFailure: (error: Error) => console.log("ERROR:", error)
      }
    ]);
  }

  static styles = [];
}
