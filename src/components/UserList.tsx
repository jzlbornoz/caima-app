import React, { useEffect, useState } from "react";
import Firebase from "../services/firebaseConnection/class";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import initFirebaseFunction from "../services/firebaseConnection/firebaseInitConfig";
import { useStore } from "@nanostores/react";
import { userList } from "../stores/userStore";

let firebaseApp;
let db;

initFirebaseFunction().then((res) => {
  firebaseApp = res;
  db = getFirestore(res);
});

const UserList = () => {
  const $isCartOpen = useStore(userList).then((res) => console.log("RES", res));
  console.log($isCartOpen);

  return <div>UserList </div>;
};

export default UserList;
