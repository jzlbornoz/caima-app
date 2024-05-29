/* empty css                          */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, f as renderComponent } from '../astro_B-yGYjDC.mjs';
import 'kleur/colors';
import 'html-escaper';
import { l as loginStatus, b as addUserItem, $ as $$Layout } from './_id__BYI-QdE_.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { E as ErrorAlert } from './index_oy1s8f3Y.mjs';

const SuccessAlert = ({
  message,
  url,
  header
}) => {
  return /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto md:px-8", children: /* @__PURE__ */ jsx("div", { className: "flex justify-between p-4 rounded-md bg-green-50 border border-green-300", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 w-full", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-6 w-6 text-green-500",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 self-center", children: [
      /* @__PURE__ */ jsx("span", { className: "text-green-600 font-medium", children: header || "Success" }),
      url && /* @__PURE__ */ jsxs("div", { className: "text-green-600", children: [
        /* @__PURE__ */ jsx("p", { className: "mt-2 sm:text-sm", children: message }),
        /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxs(
          "a",
          {
            href: url,
            className: "inline-flex items-center font-medium hover:underline sm:text-sm",
            children: [
              "confirm",
              /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  className: "h-3.5 w-3.5 ml-1",
                  viewBox: "0 0 20 20",
                  fill: "currentColor",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      fillRule: "evenodd",
                      d: "M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z",
                      clipRule: "evenodd"
                    }
                  )
                }
              )
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("button", { className: "", children: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        className: "w-5 h-5 text-green-600",
        children: /* @__PURE__ */ jsx("path", { d: "M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" })
      }
    ) })
  ] }) }) });
};

const SignInForm = () => {
  const $loginStatus = useStore(loginStatus);
  const [newUserData, setNewUserData] = useState(
    {}
  ), [password, setPassword] = useState(""), [formError, setFormError] = useState("");
  useEffect(() => {
    setNewUserData({});
    setPassword("");
  }, []);
  const handleSubmit = () => {
    setFormError("");
    if (!newUserData.name || !newUserData.userName || !newUserData.email || !password) {
      setFormError("There are empty fields");
      return;
    }
    addUserItem(newUserData, password);
  };
  return /* @__PURE__ */ jsxs("form", { className: "space-y-4 p-10 text-textColor", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "font-medium", children: "Full Name" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          required: true,
          className: "w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-lightPrimaryColor shadow-sm rounded-lg",
          onChange: (e) => setNewUserData({ ...newUserData, name: e.target.value })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "font-medium", children: "Username" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          required: true,
          className: "w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-lightPrimaryColor shadow-sm rounded-lg",
          onChange: (e) => setNewUserData({ ...newUserData, userName: e.target.value })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "font-medium", children: "Email" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "email",
          required: true,
          className: "w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-lightPrimaryColor shadow-sm rounded-lg",
          onChange: (e) => setNewUserData({ ...newUserData, email: e.target.value })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "font-medium", children: "Password" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "password",
          required: true,
          className: "w-full mt-2 mb-6  px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-lightPrimaryColor shadow-sm rounded-lg",
          onChange: (e) => setPassword(e.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "w-full px-4 py-3 text-backgroundColor font-medium bg-lightPrimaryColor hover:bg-primaryColor active:bg-lightPrimaryColor rounded-lg duration-150",
        onClick: handleSubmit,
        type: "button",
        children: $loginStatus.status === "loading" ? "Loading..." : "Register"
      }
    ),
    formError && /* @__PURE__ */ jsx(ErrorAlert, { error: formError }),
    $loginStatus.status === "error" && /* @__PURE__ */ jsx(ErrorAlert, { error: $loginStatus.message }),
    $loginStatus.status === "success" && /* @__PURE__ */ jsx(SuccessAlert, { message: "Register success. You can now log in", url: "/" })
  ] });
};

const $$SignInScreen = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="h-85vh flex items-center justify-center"> ${renderComponent($$result, "SignInForm", SignInForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/javie/Documents/development/caima-app/src/components/SignInForm", "client:component-export": "SignInForm" })} </section>`;
}, "C:/Users/javie/Documents/development/caima-app/src/screens/SignInScreen.astro", void 0);

const $$SignIn = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Caimas app" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SignInScreen", $$SignInScreen, {})} ` })}`;
}, "C:/Users/javie/Documents/development/caima-app/src/pages/sign-in.astro", void 0);

const $$file = "C:/Users/javie/Documents/development/caima-app/src/pages/sign-in.astro";
const $$url = "/sign-in";

export { $$SignIn as default, $$file as file, $$url as url };
