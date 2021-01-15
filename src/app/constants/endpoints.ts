export const baseUrl : String = 'http://localhost:8080';

export const userEndpoints = {
    ADD_USER : 'user/',
    LOGIN : 'user/authenticate',
    PROFILE: 'user/profile/me'
} as const;

export const tvShowEndpoints = {
    LOAD_TVSHOWS : 'tvShow/file',
    BASIC_INFO_TVSHOWS_BY_NAME : '/tvShow/',
    BASIC_INFO_TVSHOWS_BY_ID: 'tvShow/'
} as const;
