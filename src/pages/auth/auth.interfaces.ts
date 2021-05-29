export interface ISignInInputState {
    username: string
    password: string
    rememberMe: boolean
}
export interface IPasswordInputState {
    newpass: string
    confnewpass: string
}
export interface IForgotPasswordInputState {
    username: string
}
export interface ISignUpInputState {
    email: string
    mobile: number
    username: string
    userType?: string
    password: string
}
export interface AuthState {
    error: string | null
    isLoading: boolean
    token: string
    userType: string
    isLoggedIn: boolean
    username: string
    roles: any
    currentSignInInput: ISignInInputState
    currentSignUpInput: ISignUpInputState
    currentPasswordInput: IPasswordInputState
    currentForgotPasswordInput: IForgotPasswordInputState
}

export interface ISignInSuccessPayload {
    data: {
        token: string
        userType: string
        username: string
    }
}
