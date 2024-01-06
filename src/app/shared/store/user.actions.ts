import {createAction, props} from "@ngrx/store";
import {User} from "../../models/user/user";

export const setUser = createAction('[User] Set User', props<{ user: User}>());
