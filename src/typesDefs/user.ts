interface UserInterface {
    id: string;
    uid: string;
    name: string;
    email: string;
    userName: string;
    isAdmin: string;
    accessToken?: string;
}

interface UserInfo extends UserInterface {

}
