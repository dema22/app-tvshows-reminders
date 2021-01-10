import { Role } from "./Role";

export interface UserProfile {
    name: string;
    lastName: string;
    username: string;
    email: string;
    role: Role;
}