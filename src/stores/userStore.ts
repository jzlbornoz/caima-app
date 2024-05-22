import { atom } from 'nanostores';
import Firebase from '../services/firebaseConnection/class';

const fb = await new Firebase()

export const userList = atom(fb.getUsersList());

export const registerUserFunction = (data: UserInterface, password: string,) => {
    fb.registerUser(data, password)
}