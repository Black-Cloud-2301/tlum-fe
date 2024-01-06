import {User} from "../../models/user/user";

export interface UserState {
  readonly user: User | null;
}
