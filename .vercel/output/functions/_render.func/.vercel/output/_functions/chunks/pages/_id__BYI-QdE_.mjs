/* empty css                          */
import { c as createComponent, r as renderTemplate, d as addAttribute, e as createAstro, m as maybeRenderHead, f as renderComponent, g as renderHead, h as renderSlot } from '../astro_B-yGYjDC.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { atom, map } from 'nanostores';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, query, collection, getDocs, doc, setDoc, where, getDoc } from 'firebase/firestore';

const $$Astro$2 = createAstro();
const $$ViewTransitions = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "C:/Users/javie/Documents/development/caima-app/node_modules/astro/components/ViewTransitions.astro", void 0);

const initFirebaseFunction = async () => {
  return initializeApp({
    apiKey: "AIzaSyBEILjZJiiSG5J35jx4hL2hq3PHpE4qggc",
    authDomain: "caima-app.firebaseapp.com",
    projectId: "caima-app",
    storageBucket: "caima-app.appspot.com",
    messagingSenderId: "723271304008",
    appId: "1:723271304008:web:b1213c6e192a59e44a697d"
  });
};

const TimeStampsToDate = (seconds) => {
  const date = new Date(seconds * 1e3);
  return date;
};

class Firebase {
  firebaseApp;
  db;
  auth;
  constructor() {
    this.firebaseApp = null;
    initFirebaseFunction().then((res) => {
      this.firebaseApp = res;
      this.auth = getAuth();
      this.db = getFirestore(res);
    });
  }
  async getUsersList() {
    const userRef = query(collection(this.db, "users"));
    const docs = await getDocs(userRef);
    const data = [];
    docs.forEach((doc2) => {
      data.push({
        ...doc2.data()
      });
    });
    return data;
  }
  async registerUser(data, password) {
    const res = await createUserWithEmailAndPassword(this.auth, data.email, password);
    const dataToSend = {
      ...data,
      uid: res.user.uid
    };
    const newUserRef = doc(collection(this.db, "users"));
    await setDoc(newUserRef, {
      ...dataToSend,
      id: newUserRef.id
    });
    return res.user.uid;
  }
  async updateUser(data, payload) {
    await setDoc(doc(this.db, "users", data.id), {
      ...data,
      ...payload
    });
    return;
  }
  async loginUser(email, password) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  async getUserFromUId(uid, accessToken) {
    const userRef = query(collection(this.db, "users"), where("uid", "==", uid));
    const docs = await getDocs(userRef);
    const data = [];
    docs.forEach((doc2) => {
      data.push({
        ...doc2.data()
      });
    });
    return data.length > 0 ? { ...data[0], uid, accessToken } : void 0;
  }
  async getUserFromId(id) {
    const userRef = query(collection(this.db, "users"), where("id", "==", id));
    const docs = await getDocs(userRef);
    const data = [];
    docs.forEach((doc2) => {
      data.push({
        ...doc2.data()
      });
    });
    return data.length > 0 ? { ...data[0], id } : void 0;
  }
  // PARTY
  async registerParty(data) {
    const newPartyRef = doc(collection(this.db, "parties"));
    await setDoc(newPartyRef, {
      ...data,
      id: newPartyRef.id
    });
    return newPartyRef.id;
  }
  async getPartiesList() {
    const partyRes = query(collection(this.db, "parties"));
    const docs = await getDocs(partyRes);
    const data = [];
    docs.forEach((doc2) => {
      data.push({
        ...doc2.data()
      });
    });
    return data.map((item) => {
      item.date = TimeStampsToDate(item.date.seconds);
      return item;
    });
  }
  async getPartyById(id) {
    const docRef = doc(this.db, "parties", id);
    const partyData = (await getDoc(docRef)).data();
    if (partyData) {
      return {
        ...partyData,
        date: TimeStampsToDate(partyData.date.seconds)
      };
    }
  }
  async updateParty(party, payload) {
    const res = await setDoc(doc(this.db, "parties", party.id), {
      ...party,
      ...payload
    });
    return res;
  }
  /**
       * Users Api
       
      async loginUser(email: string, password: string) {
          return signInWithEmailAndPassword(this.auth, email, password);
      }
  
      async getUserFromId(uid: string, accessToken: string) {
          const userRef = query(collection(this.db, "users"), where("uid", "==", uid));
          const docs = await getDocs(userRef);
          const data: any[] = []
  
          docs.forEach((doc) => {
              data.push({
                  ...doc.data()
              })
          });
  
          return data.length > 0 ? { ...data[0], uid, accessToken } : undefined
      }
  
      
  
      async registerUser(email: string, password: string, data: UserReducerInitialState) {
          const res = await createUserWithEmailAndPassword(this.auth, email, password);
          const dataToSend: UserReducerInitialState = {
              ...data,
              uid: res.user.uid,
          }
          const newUserRef = doc(collection(this.db, "users"));
          return setDoc(newUserRef, {
              ...dataToSend,
              id: newUserRef.id
          })
          //return addDoc(collection(this.db, "users"), dataToSend);
      }
  
      async updateUser(data: UserReducerInitialState, payload: UserInterface) {
          return await setDoc(doc(this.db, "users", data.id), {
              ...data,
              ...payload
          });
      }
  
      async removeUser(user: UserReducerInitialState) {
          await deleteUser(this.auth.currentUser);
          return deleteDoc(doc(this.db, "users", user.id));
      }
  
      async logoutUser() {
          console.log('logoutUser');
      }
  
      /**
       * End Users Api
       */
  /**
       * Tournaments Api
    
  
      async getTournamentsList() {
          const tournamentsRef = query(collection(this.db, "tournaments"));
          const docs = await getDocs(tournamentsRef);
          const data: any[] = []
  
          docs.forEach((doc) => {
              data.push({
                  ...doc.data()
              })
          });
  
          return data
      }
  
      async getTournamentById(id: string) {
          const docRef = doc(this.db, "tournaments", id);
          return (await getDoc(docRef)).data();
      };
  
      async createTournament(
          name: string,
          rules: string,
          format: TournamentFormat,
          startDate: string,
          endDate: string,
          currentRound: number,
          winner: UserInterface | null,
          table: TablePlayers[],
          game: 'Ajedrez'
      ) {
  
          const dataToSend: TournamentInterface = {
              name,
              rules,
              format,
              startDate,
              endDate,
              currentRound,
              winner,
              table,
              game
          }
          const newTournamentRef = doc(collection(this.db, "tournaments"));
          return setDoc(newTournamentRef, {
              ...dataToSend,
              id: newTournamentRef.id,
          });
      }
  
      async updateTournament(tournament: TournamentReducerInitialState, payload: TournamentReducerInitialState) {
          const table = payload.table
          return await setDoc(doc(this.db, "tournaments", tournament.id), {
              ...tournament,
              table: table,
              currentRound: payload.currentRound + 1,
          });
      }
      /**
       * End Tournament Api
       */
}

const fb$1 = await new Firebase();
const userInfo = atom({});
const userInfoLoading = atom(true);
const loginStatus = atom({ status: "", message: "" });
const userList = map({});
async function getUserList() {
  try {
    const res = await fb$1.getUsersList();
    res.map((item, key) => {
      userList.setKey(
        item.id || key.toString(),
        item
      );
    });
  } catch (error) {
    loginStatus.set({
      status: "error",
      message: `Error: ${error.code}`
    });
  }
}
async function addUserItem(data, password) {
  try {
    loginStatus.set({ status: "loading", message: "Cargando..." });
    const newUser = await fb$1.registerUser(data, password);
    if (newUser) {
      userList.setKey(
        newUser,
        { ...data, id: newUser }
      );
      loginStatus.set({ status: "success", message: "register success" });
    }
  } catch (error) {
    loginStatus.set({
      status: "error",
      message: `Error: ${error.code}`
    });
  }
}
async function updateUserItem(data, payload) {
  await fb$1.updateUser(data, payload);
  userList.setKey(
    data.id,
    { ...data, ...payload }
  );
}
async function getAccessToken() {
  const res = JSON.parse(localStorage.getItem("userLogged"));
  userInfo.set(res);
  userInfoLoading.set(false);
}
async function setUserLoggedInfo(user) {
  const res = await fb$1.getUserFromUId(user.uid, user.accessToken || "");
  localStorage.setItem("userLogged", JSON.stringify({ ...res, accessToken: user.accessToken }));
  userInfo.set({ ...res, accessToken: user.accessToken });
  userInfoLoading.set(false);
}
async function logInUser(email, password) {
  try {
    loginStatus.set({ status: "loading", message: "Cargando..." });
    const { user } = await fb$1.loginUser(email, password);
    if (user.accessToken) {
      const res = await fb$1.getUserFromUId(user.uid, user.accessToken);
      setUserLoggedInfo(user);
      loginStatus.set({ status: "success", message: "Login exitoso" });
      return res;
    }
  } catch (error) {
    loginStatus.set({
      status: "error",
      message: `Error: ${error.code}`
    });
  }
}
async function logOutUser() {
  localStorage.removeItem("userLogged");
  userInfo.set({});
  loginStatus.set({ status: "", message: "" });
  userList.set({});
}

let navigateOnServerWarned = false;
async function navigate(href, options) {
  {
    if (!navigateOnServerWarned) {
      const warning = new Error(
        "The view transitions client API was called during a server side render. This may be unintentional as the navigate() function is expected to be called in response to user interactions. Please make sure that your usage is correct."
      );
      warning.name = "Warning";
      console.warn(warning);
      navigateOnServerWarned = true;
    }
    return;
  }
}

const fb = await new Firebase();
const partyList = map({});
const partyAdmissionList = map({});
const partyDataStats = atom({});
const partyStatus = atom({ status: "", message: "" });
const admissionApplicationStatus = atom({ status: "", message: "" });
async function createPartyFunction(data) {
  try {
    const newParty = await fb.registerParty(data);
    if (newParty) {
      partyList.setKey(
        newParty,
        { ...data, id: newParty }
      );
    }
  } catch (error) {
    partyStatus.set({
      status: "error",
      message: `Error: ${error.code}`
    });
  }
}
async function getPartiesListFunction() {
  try {
    const res = await fb.getPartiesList();
    res.map((item, key) => {
      partyList.setKey(
        item.id || key.toString(),
        item
      );
    });
  } catch (error) {
    partyStatus.set({
      status: "error",
      message: `Error: ${error.code}`
    });
  }
}
async function registerAdmissionApplications(partyData, newUserId) {
  if (partyData?.admissionApplications?.some((userId) => userId === newUserId)) {
    throw new Error("Application already sent");
  }
  admissionApplicationStatus.set({
    status: "loading",
    message: `Sending application...`
  });
  try {
    const newAdmissionApplications = partyData?.admissionApplications?.length ? [...partyData?.admissionApplications, newUserId] : [newUserId];
    const updatedParty = await fb.updateParty(partyData, { ...partyData, admissionApplications: newAdmissionApplications });
    partyList.setKey(
      partyData.id,
      { ...partyData, admissionApplications: newAdmissionApplications }
    );
    admissionApplicationStatus.set({
      status: "success",
      message: `Application sent successfully. Waiting for approval...`
    });
    return updatedParty;
  } catch (error) {
    admissionApplicationStatus.set({
      status: "error",
      message: `Error: ${error.code}`
    });
  }
}
async function acceptAdmissionApplicationFunction(partyData, userIdToAccept) {
  admissionApplicationStatus.set({
    status: "loading",
    message: `Accepting user...`
  });
  console.log("e");
  try {
    console.log("trying", partyData, userIdToAccept);
    const newAdmissionApplications = partyData?.admissionApplications?.filter((userId) => userId !== userIdToAccept);
    const newPlayers = partyData?.players ? [...partyData?.players, userIdToAccept] : [userIdToAccept];
    const updatedParty = await fb.updateParty(partyData, {
      ...partyData,
      admissionApplications: newAdmissionApplications,
      players: newPlayers,
      stats: [...partyData.stats, { userId: userIdToAccept, goals: 0, victory: 0 }]
    });
    partyList.setKey(
      partyData.id,
      {
        ...partyData,
        admissionApplications: newAdmissionApplications,
        players: newPlayers,
        stats: [...partyData.stats, { userId: userIdToAccept, goals: 0, victory: 0 }]
      }
    );
    console.log("AAAA", {
      ...partyData,
      admissionApplications: newAdmissionApplications,
      players: newPlayers,
      stats: [...partyData.stats, { userId: userIdToAccept, goals: 0, victory: 0 }]
    });
    admissionApplicationStatus.set({
      status: "success",
      message: `User accepted successfully.`
    });
    return updatedParty;
  } catch (error) {
    partyStatus.set({
      status: "error",
      message: `Error: ${error.code}`
    });
  }
}
async function registerGoalsFunction(partyData, partyStats) {
  try {
    const updatedParty = await fb.updateParty(partyData, { ...partyData, stats: partyStats });
    partyList.setKey(
      partyData.id,
      { ...partyData, stats: partyStats }
    );
    return updatedParty;
  } catch (error) {
    partyStatus.set({
      status: "error",
      message: `Error: ${error.code}`
    });
  }
}
async function getPartyDataFunction(id) {
  const partyInformation = await fb.getPartyById(id);
  if (!partyInformation) {
    throw new Error("Party not found");
  }
  const usersInformation = await getPartyPlayersDataFunction(partyInformation.players);
  if (!usersInformation) {
    throw new Error("users not found");
  }
  const statsWithInformation = partyInformation.stats.map((stat) => {
    const user = usersInformation.find((user2) => user2.id === stat.userId);
    if (!user) {
      throw new Error("user not found");
    }
    return { ...stat, user };
  });
  partyDataStats.set({ ...partyInformation, stats: statsWithInformation });
  return { ...partyInformation, stats: statsWithInformation };
}
async function getPartyPlayersDataFunction(playersIds) {
  const res = await Promise.all(
    playersIds.map(async (playerId) => await fb.getUserFromId(playerId))
  );
  return res;
}
async function getAdmissionApplicationsUsersListFunction(ids) {
  const usersInformation = await getPartyPlayersDataFunction(ids);
  if (!usersInformation) {
    throw new Error("users not found");
  }
  usersInformation.map((item, key) => {
    partyAdmissionList.setKey(
      item.id || key.toString(),
      item
    );
  });
  return usersInformation;
}

const HeaderButtons = () => {
  const $userInfo = useStore(userInfo);
  const $userInfoLoading = useStore(userInfoLoading);
  const handleLogout = () => {
    logOutUser();
    admissionApplicationStatus.set({ status: "", message: "" });
    partyStatus.set({ status: "", message: "" });
    navigate();
  };
  return /* @__PURE__ */ jsx(Fragment, { children: !$userInfoLoading && /* @__PURE__ */ jsx("section", { className: "flex items-center gap-4", children: !$userInfo?.accessToken ? /* @__PURE__ */ jsx("div", { className: "sm:flex sm:gap-4", children: /* @__PURE__ */ jsx(
    "span",
    {
      className: "rounded-md bg-backgroundColor hover:bg-textColor px-5 py-2.5 text-sm font-medium text-titleColor hover:text-backgroundColor shadow",
      onClick: () => navigate(),
      children: "Register"
    }
  ) }) : /* @__PURE__ */ jsx("div", { className: "sm:flex sm:gap-4", children: /* @__PURE__ */ jsx(
    "span",
    {
      className: "rounded-md bg-backgroundColor hover:bg-textColor px-5 py-2.5 text-sm font-medium text-titleColor hover:text-backgroundColor shadow",
      onClick: () => handleLogout(),
      children: "Logout"
    }
  ) }) }) });
};

const HeaderInfo = () => {
  const $userInfo = useStore(userInfo);
  useEffect(() => {
    getAccessToken();
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    $userInfo.name && /* @__PURE__ */ jsx("span", { className: "text-textColor w-full text-center", children: $userInfo?.name }),
    /* @__PURE__ */ jsx(HeaderButtons, {})
  ] });
};

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="bg-secondBackgroundColor"> <div class="mx-auto max-w-full h-10vh px-4 sm:px-6 lg:px-8 flex items-center"> <div class="flex h-16 items-center justify-between w-screen"> <div class="md:flex md:items-center md:gap-12"> <a class="block text-textColor" href="/"> <span class="sr-only">Home</span> <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-ball-football"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M12 7l4.76 3.45l-1.76 5.55h-6l-1.76 -5.55z"></path><path d="M12 7v-4m3 13l2.5 3m-.74 -8.55l3.74 -1.45m-11.44 7.05l-2.56 2.95m.74 -8.55l-3.74 -1.45"></path></svg> </a> </div> ${renderComponent($$result, "HeaderInfo", HeaderInfo, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/javie/Documents/development/caima-app/src/components/HeaderInfo", "client:component-export": "HeaderInfo" })} </div> </div> </header>`;
}, "C:/Users/javie/Documents/development/caima-app/src/components/Header.astro", void 0);

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} ${renderSlot($$result, $$slots["default"])}  </body> </html>`;
}, "C:/Users/javie/Documents/development/caima-app/src/layouts/Layout.astro", void 0);

const AdmissionApplicationUsersList = () => {
  const $userInfo = useStore(userInfo);
  const $partyAdmissionList = useStore(partyAdmissionList);
  const $partyDataStats = useStore(partyDataStats);
  const $admissionApplicationStatus = useStore(admissionApplicationStatus);
  useEffect(() => {
    getAdmissionApplicationsUsersListFunction(
      $partyDataStats.admissionApplications
    );
  }, [$partyDataStats]);
  const handleAcceptUser = (userId) => {
    acceptAdmissionApplicationFunction($partyDataStats, userId);
    const newList = Object.values($partyAdmissionList)?.filter(
      (item) => item.id !== userId
    );
    newList.map((item) => {
      partyAdmissionList.setKey(item.id, item);
    });
  };
  return /* @__PURE__ */ jsx("ul", { className: "mt-12 divide-y", children: Object.values($partyAdmissionList).map((item, idx) => /* @__PURE__ */ jsxs("li", { className: "py-5 flex items-start justify-between", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "44",
          height: "44",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          className: "icon icon-tabler icons-tabler-outline icon-tabler-ball-football text-textColor",
          children: /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
            /* @__PURE__ */ jsx("path", { d: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" }),
            /* @__PURE__ */ jsx("path", { d: "M12 7l4.76 3.45l-1.76 5.55h-6l-1.76 -5.55z" }),
            /* @__PURE__ */ jsx("path", { d: "M12 7v-4m3 13l2.5 3m-.74 -8.55l3.74 -1.45m-11.44 7.05l-2.56 2.95m.74 -8.55l-3.74 -1.45" })
          ] })
        }
      ),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "block text-sm text-lightPrimaryColor font-extrabold", children: item.name }),
        /* @__PURE__ */ jsx("span", { className: "block text-sm text-textColor", children: item.email })
      ] })
    ] }),
    $userInfo.id === $partyDataStats?.createdBy && /* @__PURE__ */ jsx(
      "span",
      {
        className: "text-sm font-bold text-backgroundColor  rounded-lg px-3 py-2  bg-lightPrimaryColor hover:bg-textColor cursor-pointer",
        onClick: () => handleAcceptUser(item.id),
        children: $admissionApplicationStatus.message ? $admissionApplicationStatus.message : "Accept"
      }
    )
  ] })) });
};

const Loader = () => {
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center mt-10", children: /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "124",
      height: "124",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "icon icon-tabler icons-tabler-outline icon-tabler-loader-2 animate-spin text-primaryColor",
      children: [
        /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ jsx("path", { d: "M12 3a9 9 0 1 0 9 9" })
      ]
    }
  ) });
};

const PartyPlayersTable = () => {
  const $partyDataStats = useStore(partyDataStats);
  return /* @__PURE__ */ jsx("section", { children: $partyDataStats?.stats?.length > 0 ? /* @__PURE__ */ jsx("div", { className: "max-w-screen-2xl mx-auto bg-secondBackgroundColor  rounded-xl", children: /* @__PURE__ */ jsx("div", { className: "relative h-max overflow-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full table-auto text-sm text-left", children: [
    /* @__PURE__ */ jsx("thead", { className: "text-lightPrimaryColor font-medium border-b", children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { className: "py-3 pr-6", children: "Username" }),
      /* @__PURE__ */ jsx("th", { className: "py-3 pr-6 text-center", children: "Goals" }),
      /* @__PURE__ */ jsx("th", { className: "py-3 pr-6 text-center", children: "Victories" })
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { className: "text-textColor divide-y", children: $partyDataStats?.stats?.map((item, idx) => /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { className: "pr-6 py-4 whitespace-nowrap", children: item?.user?.userName }),
      /* @__PURE__ */ jsx("td", { className: "pr-6 py-4 whitespace-nowrap text-center", children: item?.goals || 0 }),
      /* @__PURE__ */ jsx("td", { className: "pr-6 py-4 whitespace-nowrap text-center", children: item?.victory || 0 })
    ] }, idx)) })
  ] }) }) }) : /* @__PURE__ */ jsx(Loader, {}) });
};

const PartyStatsList = () => {
  const $partyDataStats = useStore(partyDataStats);
  const handleOnChange = (playerIndex, value, name, submit = false) => {
    const newPlayersList = $partyDataStats?.stats?.map((player, index) => {
      if (index === playerIndex) {
        return {
          ...player,
          [name]: value
        };
      }
      return {
        ...player
      };
    });
    partyDataStats.set({ ...$partyDataStats, stats: newPlayersList });
    if (submit) {
      registerGoalsFunction($partyDataStats, newPlayersList);
    }
  };
  return /* @__PURE__ */ jsxs("ul", { className: "mt-12 divide-y", children: [
    /* @__PURE__ */ jsxs("li", { className: "py-5 flex items-center justify-around", children: [
      /* @__PURE__ */ jsx("span", { className: "block text-sm text-lightPrimaryColor font-extrabold w-1/5 overflow-hidden", children: "Player" }),
      /* @__PURE__ */ jsx("div", { className: "relative text-lightSecondaryColor w- w-1/4 text-left", children: "Goals" }),
      /* @__PURE__ */ jsx("div", { className: "relative  text-lightSecondaryColor w-1/4 text-left", children: "Victories" })
    ] }),
    $partyDataStats?.stats?.map((item, idx) => /* @__PURE__ */ jsxs("li", { className: "py-5 flex items-center justify-around", children: [
      /* @__PURE__ */ jsx("span", { className: "block text-sm text-lightPrimaryColor font-extrabold w-1/5 overflow-hidden", children: item?.user?.userName }),
      /* @__PURE__ */ jsx("div", { className: "relative mt-2  text-gray-500 w- w-1/4", children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "number",
          placeholder: "0",
          className: "w-full  px-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg",
          onBlur: (e) => handleOnChange(
            idx,
            parseInt(e.target.value || "0"),
            "goals",
            true
          ),
          onChange: (e) => handleOnChange(idx, parseInt(e.target.value || "0"), "goals"),
          value: item?.goals || ""
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "relative mt-2  text-gray-500 w-1/4", children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "number",
          placeholder: "0",
          className: "w-full  px-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg",
          onChange: (e) => handleOnChange(idx, parseInt(e.target.value || "0"), "victory"),
          onBlur: (e) => handleOnChange(
            idx,
            parseInt(e.target.value || "0"),
            "victory",
            true
          ),
          value: item?.victory || ""
        }
      ) })
    ] }))
  ] });
};

const PartyPlayersStats = ({ partyId }) => {
  const $userInfo = useStore(userInfo);
  useEffect(() => {
    getPartyDataFunction(partyId);
  }, [partyId]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("section", { className: "max-w-screen-2xl md:mx-auto px-4 md:px-8 bg-secondBackgroundColor mt-8 p-4 rounded-xl mx-2", children: [
      /* @__PURE__ */ jsx("span", { className: "text-titleColor text-2xl", children: "Caima players" }),
      /* @__PURE__ */ jsx(PartyPlayersTable, {})
    ] }),
    $userInfo.isAdmin && /* @__PURE__ */ jsxs("section", { className: "max-w-screen-2xl md:mx-auto px-4 md:px-8 bg-secondBackgroundColor mt-8 p-4 rounded-xl mx-2", children: [
      /* @__PURE__ */ jsx("span", { className: "text-titleColor text-2xl", children: "Goals and Victories" }),
      /* @__PURE__ */ jsx(PartyStatsList, {})
    ] })
  ] });
};

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Caimas App | Caima` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PartyPlayersStats", PartyPlayersStats, { "client:load": true, "partyId": id || "", "client:component-hydration": "load", "client:component-path": "C:/Users/javie/Documents/development/caima-app/src/components/PartyPlayersStats", "client:component-export": "PartyPlayersStats" })} ${maybeRenderHead()}<section class="max-w-screen-2xl mx-auto px-4 md:px-8 bg-secondBackgroundColor mt-8 p-4 rounded-xl"> <span class="text-titleColor text-2xl">Users Requests</span> ${renderComponent($$result2, "AdmissionApplicationUsersList", AdmissionApplicationUsersList, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/javie/Documents/development/caima-app/src/components/AdmissionApplicationUsersList", "client:component-export": "AdmissionApplicationUsersList" })} </section> ` })}`;
}, "C:/Users/javie/Documents/development/caima-app/src/pages/party/[id].astro", void 0);

const $$file = "C:/Users/javie/Documents/development/caima-app/src/pages/party/[id].astro";
const $$url = "/party/[id]";

const _id_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$id,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, Loader as L, _id_ as _, logInUser as a, addUserItem as b, userInfo as c, userList as d, createPartyFunction as e, userInfoLoading as f, getUserList as g, admissionApplicationStatus as h, getAccessToken as i, getPartiesListFunction as j, loginStatus as l, partyList as p, registerAdmissionApplications as r, updateUserItem as u };
