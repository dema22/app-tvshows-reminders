import { Role } from '../interfaces/Role';

export interface User {
    idUser?: number;
    name: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    role: Role;
}