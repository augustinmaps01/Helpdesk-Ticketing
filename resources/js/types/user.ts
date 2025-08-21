export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

export interface UserFormData {
    name: string;
    email: string;
    role: string;
    password: string;
    password_confirmation: string;
}