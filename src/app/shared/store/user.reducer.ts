import {UserState} from "./user.state";
import {createReducer, on} from "@ngrx/store";
import {setUser} from "./user.actions";

const initialState: UserState = {
  user: null,
}

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, {user}) => ({...state, user})),
);
