export const baseUrl : String = 'http://localhost:8080';

export const userEndpoints = {
    ADD_USER : 'user/',
    LOGIN : 'user/authenticate',
    PROFILE: 'user/profile/me'
} as const;

