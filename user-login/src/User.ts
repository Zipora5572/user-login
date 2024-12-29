import { createContext, Dispatch, useReducer } from "react"

export type UserType = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    address: string,
    phoneNumber: string
}


type Action = {
    type: 'ADD_USER',
    data: Omit<UserType, 'id'>
} | {
    type: 'DELETE_USER'
    
} | {
    type: 'GET_USER'

} | {
    type: 'UPDATE_USER',
    data: UserType
} | {
    type: 'UPDATE_USER',
    data: Partial<UserType>
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
    // console.log("Reducer action:", action); // Log the action

    switch (action.type) {



        case 'ADD_USER':
            return {  id: identity++, ...action.data };
        
        case 'DELETE_USER':
            return initialState
        case 'UPDATE_USER':
            return { ...state, ...action.data }
        default:
            return state
    }

}
