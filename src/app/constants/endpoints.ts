export const baseUrl : String = 'http://localhost:8080';

export const userEndpoints = {
    ADD_USER : 'user/',
    LOGIN : 'user/authenticate',
    PROFILE: 'user/profile/me'
} as const;

export const tvShowEndpoints = {
    LOAD_TVSHOWS : 'tvShow/file',
    BASIC_INFO_TVSHOWS_BY_NAME : '/tvShow/',
    BASIC_INFO_TVSHOWS_BY_ID: '/tvShow/'
} as const;

export const tvShowDetailEndpoints = {
    DETAILS_TV_SHOW : '/tvShowDetails/'
}

export const tvShowReminderEndpoints = {
    REMINDERDS_PAGINATED : '/tvShowReminder/paginated',
    SAVE_REMINDER: '/tvShowReminder/',
    UPDATE_REMINDER: '/tvShowReminder/',
    DELETE_REMINDER: '/tvShowReminder/'
}

export const userTvShowEndpoints = {
    SAVE_USER_TVSHOW: '/userTvShow/'
}
