export enum PROFILE_ROLE {
    ADMIN = 'admin',
    STUDENT = 'student'
}

export enum EVENT_STATUS {
    FINISHED = 'finished',
    ONGOING = 'ongoing',
}
export enum AUTH_ERROR_CODE {
    INVALID_CREDENTIALS = 'invalid_credentials',
    EMAIL_NOT_CONFIRMED = 'email_not_confirmed',
    EXISTED_USER = 'user_already_exists',
}