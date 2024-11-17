export interface InputUser {
    nickname:string
}

export interface IUser{
    id:string
    nickname:string
}

export interface ISignInUser{
    user:IUser | null
    list:IUser[]
}

