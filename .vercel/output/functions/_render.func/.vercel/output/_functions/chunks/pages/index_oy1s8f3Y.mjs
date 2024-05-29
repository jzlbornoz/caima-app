/* empty css                          */
import { c as createComponent, r as renderTemplate, f as renderComponent } from '../astro_B-yGYjDC.mjs';
import 'kleur/colors';
import 'html-escaper';
import { l as loginStatus, a as logInUser, b as addUserItem, u as updateUserItem, c as userInfo, d as userList, g as getUserList, L as Loader, e as createPartyFunction, f as userInfoLoading, p as partyList, h as admissionApplicationStatus, i as getAccessToken, j as getPartiesListFunction, r as registerAdmissionApplications, $ as $$Layout } from './_id__BYI-QdE_.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useStore } from '@nanostores/react';
import { useState, useEffect, forwardRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
/* empty css                          */
import DatePicker from 'react-datepicker';

const ErrorAlert = ({ error }) => {
  return /* @__PURE__ */ jsx("div", { className: "mt-12 px-4 rounded-md border-l-4 border-red-500 bg-red-50 md:max-w-2xl md:mx-auto", children: /* @__PURE__ */ jsx("div", { className: "flex justify-between py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-6 w-6 text-red-500",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            "fill-rule": "evenodd",
            d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
            "clip-rule": "evenodd"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "self-center ml-3", children: [
      /* @__PURE__ */ jsx("span", { className: "text-red-600 font-semibold", children: " Error " }),
      /* @__PURE__ */ jsx("p", { className: "text-red-600 mt-1", children: error })
    ] })
  ] }) }) });
};

const LogInForm = () => {
  const $loginStatus = useStore(loginStatus);
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  });
  const handleSubmit = () => {
    logInUser(userLogin.email, userLogin.password);
  };
  return /* @__PURE__ */ jsxs("form", { className: "mt-8 space-y-5", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "font-medium", children: " Email " }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "email",
          required: true,
          className: "w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-lightPrimaryColor shadow-sm rounded-lg",
          onChange: (e) => setUserLogin({ ...userLogin, email: e.target.value })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "font-medium", children: " Password " }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "password",
          required: true,
          className: "w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-lightPrimaryColor shadow-sm rounded-lg",
          onChange: (e) => setUserLogin({ ...userLogin, password: e.target.value })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => handleSubmit(),
        className: `w-full px-4 py-2 text-white font-medium ${$loginStatus.status === "loading" ? "bg-backgroundColor" : "bg-lightPrimaryColor"} hover:bg-primaryColor active:bg-lightPrimaryColor rounded-lg duration-150`,
        children: $loginStatus.status === "loading" ? "Loading ..." : "Log In"
      }
    ),
    $loginStatus.status === "error" && /* @__PURE__ */ jsx(ErrorAlert, { error: $loginStatus.message })
  ] });
};

const RegisterUserModal = () => {
  const [newUserData, setNewUserData] = useState(
    {}
  ), [password, setPassword] = useState("");
  const handleSubmit = () => {
    addUserItem(newUserData, password);
    setNewUserData({});
    setPassword("");
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-md shadow-lg px-4 py-6", children: [
    /* @__PURE__ */ jsx("div", { className: " flex items-center justify-center w-12 h-12 mx-auto bg-lightPrimaryColor rounded-full", children: /* @__PURE__ */ jsxs(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        className: "icon icon-tabler icons-tabler-filled icon-tabler-user",
        children: [
          /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
          /* @__PURE__ */ jsx("path", { d: "M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" }),
          /* @__PURE__ */ jsx("path", { d: "M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(Dialog.Title, { className: "text-lg font-medium text-gray-800 text-center mt-3", children: "Registrar Usuario" }),
    /* @__PURE__ */ jsx(Dialog.Description, { className: "mt-1 text-sm leading-relaxed text-start text-gray-500", children: /* @__PURE__ */ jsx("div", { className: "mt-12 mx-auto px-4 p-8 bg-white sm:max-w-lg sm:px-8 sm:rounded-xl", children: /* @__PURE__ */ jsxs("form", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "font-medium", children: "Full name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            required: true,
            className: "w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg",
            value: newUserData.name,
            onChange: (e) => {
              setNewUserData({
                ...newUserData,
                name: e.target.value
              });
            }
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
            className: "w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg",
            value: newUserData.name,
            onChange: (e) => {
              setNewUserData({
                ...newUserData,
                name: e.target.value
              });
            }
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
            className: "w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg",
            value: newUserData.email,
            onChange: (e) => {
              setNewUserData({
                ...newUserData,
                email: e.target.value
              });
            }
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
            className: "w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg",
            value: password,
            onChange: (e) => {
              setPassword(e.target.value);
            }
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "items-center gap-2 mt-3 text-sm sm:flex", children: [
      /* @__PURE__ */ jsx(Dialog.Close, { asChild: true, children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "w-full mt-2 p-2.5 flex-1 text-white bg-lightPrimaryColor rounded-md outline-none ring-offset-2 ring-lightPrimaryColor focus:ring-2 hover:bg-primaryColor",
          onClick: () => handleSubmit(),
          children: "Confirmar"
        }
      ) }),
      /* @__PURE__ */ jsx(Dialog.Close, { asChild: true, children: /* @__PURE__ */ jsx(
        "button",
        {
          className: "w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-lightPrimaryColor focus:ring-2  hover:bg-secondBackgroundColor hover:text-textColor",
          "aria-label": "Close",
          children: "Cancelar"
        }
      ) })
    ] })
  ] });
};

const UpdateUserModal = ({ userData }) => {
  const [newUserData, setNewUserData] = useState(
    userData || {}
  ), [password, setPassword] = useState("");
  const handleSubmit = () => {
    updateUserItem(userData, newUserData);
    setNewUserData({});
    setPassword("");
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-md shadow-lg px-4 py-6", children: [
    /* @__PURE__ */ jsx("div", { className: " flex items-center justify-center w-12 h-12 mx-auto bg-lightPrimaryColor rounded-full", children: /* @__PURE__ */ jsxs(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        className: "icon icon-tabler icons-tabler-filled icon-tabler-user",
        children: [
          /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
          /* @__PURE__ */ jsx("path", { d: "M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" }),
          /* @__PURE__ */ jsx("path", { d: "M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(Dialog.Title, { className: "text-lg font-medium text-gray-800 text-center mt-3", children: "Registrar Usuario" }),
    /* @__PURE__ */ jsx(Dialog.Description, { className: "mt-1 text-sm leading-relaxed text-start text-gray-500", children: /* @__PURE__ */ jsx("div", { className: "mt-12 mx-auto px-4 p-8 bg-white sm:max-w-lg sm:px-8 sm:rounded-xl", children: /* @__PURE__ */ jsxs("form", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "font-medium", children: "Full name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            required: true,
            className: "w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg",
            value: newUserData.name,
            onChange: (e) => {
              setNewUserData({
                ...newUserData,
                name: e.target.value
              });
            }
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
            className: "w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg",
            value: newUserData.email,
            onChange: (e) => {
              setNewUserData({
                ...newUserData,
                email: e.target.value
              });
            }
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "items-center gap-2 mt-3 text-sm sm:flex", children: [
      /* @__PURE__ */ jsx(Dialog.Close, { asChild: true, children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "w-full mt-2 p-2.5 flex-1 text-white bg-lightPrimaryColor rounded-md outline-none ring-offset-2 ring-lightPrimaryColor focus:ring-2 hover:bg-primaryColor",
          onClick: () => handleSubmit(),
          children: "Confirmar"
        }
      ) }),
      /* @__PURE__ */ jsx(Dialog.Close, { asChild: true, children: /* @__PURE__ */ jsx(
        "button",
        {
          className: "w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-lightPrimaryColor focus:ring-2  hover:bg-secondBackgroundColor hover:text-textColor",
          "aria-label": "Close",
          children: "Cancelar"
        }
      ) })
    ] })
  ] });
};

const UsersTable = () => {
  const $userInfo = useStore(userInfo);
  const [tableItems, setTableItems] = useState([]), [loading, setLoading] = useState(true);
  const $userList = useStore(userList);
  useEffect(() => {
    getUserList();
  }, []);
  useEffect(() => {
    if ($userList) {
      setTableItems(Object.values($userList));
      setLoading(false);
    }
  }, [$userList]);
  return /* @__PURE__ */ jsx("section", { children: !loading && tableItems.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "max-w-screen-2xl mx-auto px-4 md:px-8 bg-secondBackgroundColor mt-8 p-4 rounded-xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "items-center justify-between flex", children: [
      /* @__PURE__ */ jsx("div", { className: "max-w-lg", children: /* @__PURE__ */ jsxs("h3", { className: "text-lightPrimaryColor text-xl font-bold sm:text-2xl", children: [
        "Users (",
        tableItems.length,
        ")"
      ] }) }),
      $userInfo.isAdmin && /* @__PURE__ */ jsxs(Dialog.Root, { children: [
        /* @__PURE__ */ jsx(Dialog.Trigger, { className: "rounded-md bg-lightPrimaryColor hover:bg-primaryColor px-5 py-2.5 text-sm font-medium text-backgroundColor hover:text-titleColor shadow ", children: "Register User" }),
        /* @__PURE__ */ jsxs(Dialog.Portal, { children: [
          /* @__PURE__ */ jsx(Dialog.Overlay, { className: "fixed inset-0 w-full h-full bg-black opacity-40" }),
          /* @__PURE__ */ jsx(Dialog.Content, { className: "fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4", children: /* @__PURE__ */ jsx(RegisterUserModal, {}) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-12 relative h-max overflow-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full table-auto text-sm text-left", children: [
      /* @__PURE__ */ jsx("thead", { className: "text-lightPrimaryColor font-medium border-b", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "py-3 pr-6", children: "Username" }),
        /* @__PURE__ */ jsx("th", { className: "py-3 pr-6", children: "Name" }),
        /* @__PURE__ */ jsx("th", { className: "py-3 pr-6", children: "Email" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "text-textColor divide-y", children: tableItems.map((item, idx) => /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { className: "pr-6 py-4 whitespace-nowrap", children: item.userName }),
        /* @__PURE__ */ jsx("td", { className: "pr-6 py-4 whitespace-nowrap", children: item.name }),
        /* @__PURE__ */ jsx("td", { className: "pr-6 py-4 whitespace-nowrap", children: item.email }),
        $userInfo.isAdmin && /* @__PURE__ */ jsxs("td", { className: "text-right px-6 whitespace-nowrap", children: [
          /* @__PURE__ */ jsxs(Dialog.Root, { children: [
            /* @__PURE__ */ jsx(Dialog.Trigger, { className: "py-2 px-3 font-medium text-secondaryColor hover:text-lightSecondaryColor duration-150 hover:bg-backgroundColor rounded-lg", children: "Editar" }),
            /* @__PURE__ */ jsxs(Dialog.Portal, { children: [
              /* @__PURE__ */ jsx(Dialog.Overlay, { className: "fixed inset-0 w-full h-full bg-black opacity-40" }),
              /* @__PURE__ */ jsx(Dialog.Content, { className: "fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4", children: /* @__PURE__ */ jsx(UpdateUserModal, { userData: item }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { className: "py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-backgroundColor rounded-lg", children: "Delete" })
        ] })
      ] }, idx)) })
    ] }) })
  ] }) : /* @__PURE__ */ jsx(Loader, {}) });
};

const RegisterPartyModal = () => {
  const $userInfo = useStore(userInfo);
  const [newPartyData, setNewPartyData] = useState({
    date: /* @__PURE__ */ new Date()
  });
  const handleSubmit = () => {
    createPartyFunction({
      ...newPartyData,
      createdBy: $userInfo.id
    });
  };
  const DatePickerInput = forwardRef(
    ({ value, onClick }, ref) => /* @__PURE__ */ jsx(
      "button",
      {
        className: "rounded-md bg-backgroundColor hover:bg-primaryColor px-5 py-2.5 text-sm font-medium text-textColor shadow mt-5",
        onClick,
        ref,
        children: value
      }
    )
  );
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-md shadow-lg px-4 py-6 ", children: [
    /* @__PURE__ */ jsx(Dialog.Title, { className: "text-lg font-medium text-gray-800 text-center mt-3", children: "Select Caima Date" }),
    /* @__PURE__ */ jsx(Dialog.Description, { className: "mt-1 text-sm leading-relaxed text-center text-gray-500", children: /* @__PURE__ */ jsx(
      DatePicker,
      {
        selected: newPartyData.date,
        onChange: (dateSelected) => setNewPartyData({ ...newPartyData, date: new Date(dateSelected) }),
        customInput: /* @__PURE__ */ jsx(DatePickerInput, {})
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "items-center gap-2 mt-3 text-sm sm:flex", children: [
      /* @__PURE__ */ jsx(Dialog.Close, { asChild: true, children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "w-full mt-2 p-2.5 flex-1 text-white bg-lightPrimaryColor rounded-md outline-none ring-offset-2 ring-lightPrimaryColor focus:ring-2 hover:bg-primaryColor",
          onClick: () => handleSubmit(),
          children: "Confirmar"
        }
      ) }),
      /* @__PURE__ */ jsx(Dialog.Close, { asChild: true, children: /* @__PURE__ */ jsx(
        "button",
        {
          className: "w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-lightPrimaryColor focus:ring-2  hover:bg-secondBackgroundColor hover:text-textColor",
          "aria-label": "Close",
          children: "Cancelar"
        }
      ) })
    ] })
  ] });
};

const Landing = () => {
  const $userInfo = useStore(userInfo);
  const $userInfoLoading = useStore(userInfoLoading);
  const $partyList = useStore(partyList);
  const $admissionApplicationStatus = useStore(admissionApplicationStatus);
  const [partyListData, setPartyListData] = useState([]);
  useEffect(() => {
    getAccessToken();
    getPartiesListFunction();
  }, []);
  useEffect(() => {
    if ($partyList) {
      setPartyListData(
        Object.values($partyList)
      );
    }
  }, [$partyList]);
  const handleAdmissionApplication = (party) => {
    registerAdmissionApplications(party, $userInfo.id);
  };
  return /* @__PURE__ */ jsx("main", { className: "w-full h-85vh flex flex-col items-center justify-center px-4", children: $userInfo?.accessToken ? /* @__PURE__ */ jsxs("div", { className: "max-w-full w-full text-textColor", children: [
    $userInfo.isAdmin && /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxs(Dialog.Root, { children: [
      /* @__PURE__ */ jsx(Dialog.Trigger, { className: "rounded-md bg-lightPrimaryColor hover:bg-primaryColor px-5 py-2.5 text-sm font-medium text-backgroundColor hover:text-titleColor shadow mt-5", children: "Register New Caima" }),
      /* @__PURE__ */ jsxs(Dialog.Portal, { children: [
        /* @__PURE__ */ jsx(Dialog.Overlay, { className: "fixed inset-0 w-full h-full bg-black opacity-40" }),
        /* @__PURE__ */ jsx(Dialog.Content, { className: "fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4", children: /* @__PURE__ */ jsx(RegisterPartyModal, {}) })
      ] })
    ] }) }),
    partyListData?.map((party) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "max-w-screen-2xl mx-auto px-4 md:px-8 bg-secondBackgroundColor mt-8 p-4 rounded-xl",
        children: /* @__PURE__ */ jsx("div", { className: "items-center justify-between flex", children: /* @__PURE__ */ jsxs("div", { className: "max-w-lg flex justify-center items-start flex-col", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              className: "text-lightPrimaryColor text-xl font-bold sm:text-2xl",
              href: `/party/${party.id}`,
              children: [
                "Caima: ",
                party.date.toDateString()
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: `flex items-center text-sm font-medium cursor-pointer ${party?.admissionApplications?.some(
                (userId) => userId === $userInfo?.id
              ) && "text-primaryColor"}`,
              children: [
                party.isClosed ? /* @__PURE__ */ jsx("span", { className: "text-lightSecondaryColor font-bold", children: "Caima finished" }) : party?.players?.some(
                  (userId) => userId === $userInfo?.id
                ) ? /* @__PURE__ */ jsx("a", { href: `/party/${party.id}`, children: "You are participating" }) : /* @__PURE__ */ jsx(
                  "span",
                  {
                    onClick: () => {
                      if (!party?.admissionApplications?.some(
                        (userId) => userId === $userInfo?.id
                      ))
                        handleAdmissionApplication(party);
                    },
                    children: $admissionApplicationStatus.status ? `${$admissionApplicationStatus.message}` : party?.admissionApplications?.some(
                      (userId) => userId === $userInfo?.id
                    ) ? "Waiting for approval" : "Request participation"
                  }
                ),
                !party.isClosed && /* @__PURE__ */ jsx(
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
        ] }) })
      },
      party.id
    )),
    $userInfo.isAdmin && /* @__PURE__ */ jsx(UsersTable, {})
  ] }) : /* @__PURE__ */ jsx(Fragment, { children: $userInfoLoading ? /* @__PURE__ */ jsx(Loader, {}) : /* @__PURE__ */ jsxs("div", { className: "max-w-sm w-full text-textColor", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxs("div", { className: "mt-5 space-y-2", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lightPrimaryColor text-2xl font-bold sm:text-3xl", children: "Log in to your account" }),
      /* @__PURE__ */ jsxs("p", { className: "", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            "data-astro-reload": true,
            className: "font-medium text-lightPrimaryColor hover:text-lightSecondaryColor",
            href: "/sign-in",
            children: "Sign up"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(LogInForm, {})
  ] }) }) });
};

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Caimas app" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Landing", Landing, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/javie/Documents/development/caima-app/src/components/Landing.tsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/javie/Documents/development/caima-app/src/pages/index.astro", void 0);

const $$file = "C:/Users/javie/Documents/development/caima-app/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { ErrorAlert as E, index as i };
