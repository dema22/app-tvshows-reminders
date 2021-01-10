import { Role } from '../interfaces/Role';

export interface User {
    name: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    role: Role;
}