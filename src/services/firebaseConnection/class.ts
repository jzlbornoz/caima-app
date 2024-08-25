import type { PartyInformationInterface } from "./../../typesDefs/party";
import { type FirebaseApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    deleteUser,
    getAuth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from "firebase/auth";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    where,
    setDoc,
    addDoc,
    deleteDoc,
} from "firebase/firestore";
import initFirebaseFunction from "./firebaseInitConfig";
import type { PartyInterface } from "../../typesDefs/party";
import { TimeStampsToDate } from "../../utils/TimeStampsToDate";

/* eslint-disable @typescript-eslint/no-explicit-any */
class Firebase {
    firebaseApp: FirebaseApp | null;
    db: any;
    auth: any;

    constructor() {
        this.firebaseApp = null;
        initFirebaseFunction().then((res) => {
            this.firebaseApp = res;
            this.auth = getAuth();
            this.db = getFirestore(res);
        });
    }

    async getUsersList(): Promise<UserInterface[]> {
        const userRef = query(collection(this.db, "users"));
        const docs = await getDocs(userRef);
        const data: any[] = [];

        docs.forEach((doc) => {
            data.push({
                ...doc.data(),
            });
        });

        return data;
    }

    async registerUser(data: UserInterface, password: string) {
        const res = await createUserWithEmailAndPassword(
            this.auth,
            data.email,
            password
        );
        const dataToSend: UserInterface = {
            ...data,
            uid: res.user.uid,
        };
        const newUserRef = doc(collection(this.db, "users"));
        await setDoc(newUserRef, {
            ...dataToSend,
            id: newUserRef.id,
        });
        return res.user.uid;
    }

    async sendEmailToRecoveryPassword(email: string) {
        await sendPasswordResetEmail(this.auth, email);
    }

    async updateUser(data: UserInfo, payload: UserInfo) {
        await setDoc(doc(this.db, "users", data.id), {
            ...data,
            ...payload,
        });
        return;
    }

    async loginUser(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    async getUserFromUId(uid: string, accessToken?: string) {
        const userRef = query(
            collection(this.db, "users"),
            where("uid", "==", uid)
        );
        const docs = await getDocs(userRef);
        const data: any[] = [];

        docs.forEach((doc) => {
            data.push({
                ...doc.data(),
            });
        });

        return data.length > 0 ? { ...data[0], uid, accessToken } : undefined;
    }
    async getUserFromId(id: string) {
        const userRef = query(collection(this.db, "users"), where("id", "==", id));
        const docs = await getDocs(userRef);
        const data: any[] = [];

        docs.forEach((doc) => {
            data.push({
                ...doc.data(),
            });
        });

        return data.length > 0 ? { ...data[0], id } : undefined;
    }
    // PARTY
    async registerParty(data: PartyInterface) {
        const newPartyRef = doc(collection(this.db, "parties"));
        await setDoc(newPartyRef, {
            ...data,
            id: newPartyRef.id,
        });
        return newPartyRef.id;
    }

    async getPartiesList(): Promise<PartyInformationInterface[]> {
        const partyRes = query(collection(this.db, "parties"));
        const docs = await getDocs(partyRes);
        const data: any[] = [];

        docs.forEach((doc) => {
            data.push({
                ...doc.data(),
            });
        });

        return data.map((item) => {
            item.date = TimeStampsToDate(item.date.seconds);
            return item;
        });
    }

    async getPartyById(id: string) {
        const docRef = doc(this.db, "parties", id);
        const partyData = (await getDoc(docRef)).data();
        if (partyData) {
            return {
                ...partyData,
                date: TimeStampsToDate(partyData.date.seconds),
            };
        }
    }

    async updateParty(
        party: PartyInformationInterface,
        payload: PartyInformationInterface
    ) {
        const res = await setDoc(doc(this.db, "parties", party.id), {
            ...party,
            ...payload,
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

export default Firebase;
