export const API_PATHS = {

    AUTH: {
        REGISTER: '/api/auth/register',
        LOGIN: '/api/auth/login',
        LOGOUT: '/api/auth/logout',
        GET_PROFILE: '/api/auth/get-user-info',
        GOOGLE_SIGNIN: '/api/auth/google-signin'
    },

    IMAGE: {
        UPLOAD: '/api/upload',
    },

    LINK: {
        GET_ALL_LINKS: '/api/link',
        ADD_LINK: '/api/link/add',
        UPDATE_LINK: (linkId) => `/api/link/${linkId}`,
        DELETE_LINK: (linkId) => `/api/link/${linkId}`
    },

    USER : {
        UPDATE_PROFILE : '/api/user/update-profile'
    }
}