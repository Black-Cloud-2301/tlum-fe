import {Role} from "../role/role";

export type User = {
   id: number;
   code: string;
   firstname: string;
   lastname: string;
   phoneNumber: string;
   email: string;
   address: string;
   avatar: string;
   roles: Role[];
}
