export type AuthApiSignInRequest = {
    login: string;
    password: string;
};

export type AuthApiSignUpRequest = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
};

export type AuthApiSignUpResponse = {
    id: number;
};
