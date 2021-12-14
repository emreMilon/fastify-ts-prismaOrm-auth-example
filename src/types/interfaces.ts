export interface IUser {
    userId: string;
    firstName: string;
    lastName: string;
    position: string;
    email: string;
    password: string;
}

export interface IDecodedToken {
    id?: string;
    user?: IUser;
    iat: number;
    exp: number;
}