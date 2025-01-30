export type TSignUp = {
    name: string;
    email: string;
    password: string;
}

export type TUser = {
    email: string;
    password: string;
    iat: number;
    exp: number;
}