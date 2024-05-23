import { map } from 'nanostores';
import Firebase from '../services/firebaseConnection/class';

const fb = await new Firebase()

export const userList = map<Record<string, UserInterface>>({});
/**
 * Retrieves the list of users from the Firebase service and updates the userList store.
 *
 * @return {Promise<void>} A Promise that resolves when the userList store has been updated.
 */
export function getUserList(): Promise<void> {
    return fb.getUsersList().then((res) => {
        res.map((item, key) => {
            userList.setKey(
                item.id || key.toString(),
                item
            );
        });
    });

}
/**
 * Adds a new user item to the user list.
 *
 * @param {UserInterface} data - The user data to be added.
 * @param {string} password - The password for the user.
 * @return {Promise<void>} A promise that resolves when the user item is added successfully.
 */
export async function addUserItem(data: UserInterface, password: string): Promise<void> {
    const newUser = await fb.registerUser(data, password)
    if (newUser) {
        userList.setKey(
            newUser,
            { ...data, id: newUser }
        );
    }
}

export async function updateUserItem(data: UserInfo, payload: UserInfo): Promise<void> {
    await fb.updateUser(data, payload)
    userList.setKey(
        data.id,
        { ...data, ...payload }
    );

}