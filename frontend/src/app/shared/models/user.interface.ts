export interface User{
    email: string;
    password: string;
}

export interface UserResponse{
    message: string;
    token: string;
    userId: number;
}