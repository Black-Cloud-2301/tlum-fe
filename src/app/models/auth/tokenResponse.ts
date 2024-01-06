import {User} from "../user/user";

export type TokenResponse = {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    user: User;
}
