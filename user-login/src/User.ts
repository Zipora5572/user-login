import { createContext, Dispatch } from "react"
import { login, register, update } from "./useAPI"

export type UserType = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    address: string,
    phoneNumber: string
}

type PartialWithRequiredFields<T, K extends keyof T> = Partial<T> & Pick<T, K>;

type Action = {
    type: 'REGISTER',
    data: Partial<UserType>
} | {
    type: 'LOGIN'
    data: Partial<UserType>
} | {
    type: 'LOG_OUT'

} | {
    type: 'GET_USER'

} | {
    type: 'UPDATE',
    data: PartialWithRequiredFields<UserType, 'email' | 'password'>;
}


export const initialState: UserType = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: ''
}

export const UserContext = createContext<{
    user: UserType;
    userDispatch: Dispatch<Action>;
}>({
    user: initialState,
    userDispatch: () => null
});



let identity = 0

export default (state: UserType, action: Action): UserType => {
    switch (action.type) {
        case 'REGISTER':
            return {
                ...state,
                ...action.data, // You can add a loading state here if needed
            };
        case 'LOGIN':
            return {
                ...state,
                ...action.data // Update with the login data
            };
        case 'LOG_OUT':
            return initialState;
        case 'UPDATE':
            return {
                ...state,
                ...action.data // Update with new user data
            };
        default:
            return state;
    }
}
