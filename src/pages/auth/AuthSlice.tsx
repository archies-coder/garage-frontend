import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sendPassword, signIn, signUp } from 'api/Apis';
import { getBackdropStart, getBackdropStop } from 'app/BackdropSlice';
import { AppThunk } from 'app/store';
// import { roles } from 'app/rolesConfig'
import { startSnackbar } from 'app/SnackbarSlice';

interface ISignInInputState {
    username: string
    password: string
    rememberMe: boolean
}
interface IPasswordInputState {
    newpass: string
    confnewpass: string
}
interface IForgotPasswordInputState {
    username: string
}
interface ISignUpInputState {
    email: string
    mobile: number
    username: string
    userType?: string
    password: string
}
interface AuthState {
    error: string | null
    isLoading: boolean
    token: string
    userType: string
    isLoggedIn: boolean
    name: string
    roles: any
    currentSignInInput: ISignInInputState
    currentSignUpInput: ISignUpInputState
    currentPasswordInput: IPasswordInputState
    currentForgotPasswordInput: IForgotPasswordInputState
}

const InitialSignUpState: ISignUpInputState = {
    email: '',
    mobile: 0,
    username: '',
    userType: '',
    password: '',

}

const InitialSignInState: ISignInInputState = {
    username: '',
    password: '',
    rememberMe: false
}
const InitialPasswordState: IPasswordInputState = {
    newpass: '',
    confnewpass: '',
}
const InitialForgotPasswordState: IForgotPasswordInputState = {
    username: ''
}


const authInitialState: AuthState = {
    error: '',
    isLoading: false,
    token: '',
    userType: '',
    isLoggedIn: false,
    name: '',
    roles: {},
    currentSignInInput: InitialSignInState,
    currentSignUpInput: InitialSignUpState,
    currentPasswordInput: InitialPasswordState,
    currentForgotPasswordInput: InitialForgotPasswordState

}

function startLoading(state: AuthState) {
    state.isLoading = true
}
function stopLoading(state: AuthState) {
    state.isLoading = false
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        getAuthStart: startLoading,
        getAuthStatus(state: AuthState) {
            if (localStorage.token) state.isLoggedIn = true
        },
        setAuthUser(state: AuthState, { payload }: PayloadAction<any>) {
            const { token, userType, name } = payload
            if (token) {
                state.token = token
                localStorage.setItem('token', token)
                state.isLoggedIn = true
                state.userType = userType
                state.name = name
                //@ts-ignore
                state.roles = roles[userType]
            }
        },
        getSignInSuccess(state: AuthState, { payload }: PayloadAction<any>) {
            // console.log(payload)
            const { token, usertype, name } = payload.data
            if (token) {
                state.token = token
                localStorage.setItem('token', token)
                state.isLoggedIn = true
                state.userType = usertype
                state.name = name
                //@ts-ignore
                state.roles = roles[usertype]
                sessionStorage.setItem('authUser', JSON.stringify({
                    "token": token,
                    "userType": usertype,
                    "name": name
                }));
                if (state.currentSignInInput.rememberMe) localStorage.setItem('authUser', JSON.stringify({
                    "token": token,
                    "userType": usertype,
                    "name": name
                }));
            }
        },
        getAuthFailure: stopLoading,
        setCurrentSignInInput(state, { payload }: PayloadAction<ISignInInputState>) {
            state.currentSignInInput = payload
        },
        setCurrentSignUpInput(state, { payload }: PayloadAction<ISignUpInputState>) {
            state.currentSignUpInput = payload
        },
        setCurrentPasswordInput(state, { payload }: PayloadAction<IPasswordInputState>) {
            state.currentPasswordInput = payload
        },
        setCurrentForgotPasswordInput(state, { payload }: PayloadAction<IForgotPasswordInputState>) {
            state.currentForgotPasswordInput = payload
        },
        resetSignInInput(state: AuthState) {
            state.currentSignInInput = InitialSignInState
        },
        resetSignUpInput(state: AuthState) {
            state.currentSignUpInput = InitialSignUpState
        },
        resetPasswordInput(state: AuthState) {
            state.currentPasswordInput = InitialPasswordState
        },
        resetForgotPasswordInput(state: AuthState) {
            state.currentForgotPasswordInput = InitialForgotPasswordState
        },
        logout(state: AuthState) {
            state = authInitialState

            // debugger
        }
    }
})

export const {
    getAuthStart,
    getAuthStatus,
    getSignInSuccess,
    getAuthFailure,
    setCurrentSignInInput,
    setCurrentSignUpInput,
    setCurrentPasswordInput,
    setCurrentForgotPasswordInput,
    resetPasswordInput,
    resetForgotPasswordInput,
    resetSignInInput,
    resetSignUpInput,
    logout,
    setAuthUser
} = AuthSlice.actions

export default AuthSlice.reducer

export const doLogin = (
    username: string,
    password: string,
    callback?: () => any
): AppThunk => async dispatch => {
    try {
        dispatch(getAuthStart())
        dispatch(getBackdropStart())
        const response = await signIn(username, password)
        dispatch(getSignInSuccess(response))
        callback && callback();
        dispatch(getBackdropStop())
    } catch (err) {
        dispatch(getBackdropStop())
        dispatch(startSnackbar({ message: 'Username or Password is invalid' }))
        dispatch(getAuthFailure())
    }
}
export const resetPassword = (
    newpass: string,
    confnewpass: string,
    callback?: () => any
): AppThunk => async dispatch => {
    try {
        dispatch(getAuthStart())
        dispatch(getBackdropStart())
        // const response = await signIn(username, password)
        // dispatch(getSignInSuccess(response))
        callback && callback();
        dispatch(getBackdropStop())
    } catch (err) {
        dispatch(getBackdropStop())
        dispatch(startSnackbar({ message: 'Username or Password is invalid' }))
        dispatch(getAuthFailure())
    }
}

export const handleForgotPassword = (
    username: string,
    callback?: () => any
): AppThunk => async dispatch => {
    try {
        dispatch(getAuthStart())
        dispatch(getBackdropStart())
        await sendPassword(username).then(res => {
            debugger
            dispatch(startSnackbar({ message: res.data.message || 'Password has been sent' }))
        })
        // dispatch(getSignInSuccess(response))
        callback && callback();
        dispatch(getBackdropStop())
    } catch (err) {
        dispatch(getBackdropStop())
        debugger
        dispatch(startSnackbar({ message: 'Username or Password is invalid' }))
        dispatch(getAuthFailure())
    }
}

export const doRegister = (
    username: string,
    password: string,
    email: string,
    mobile: number,
    userType?: string,
    callback?: () => any
): AppThunk => async dispatch => {
    try {
        dispatch(getAuthStart())
        dispatch(getBackdropStart())
        const response = await signUp(username, password, email, mobile, userType)
            .catch(err => dispatch(startSnackbar({ message: 'Username or Password is invalid' })))
        // dispatch(getSignUpSuccess(response))
        callback && callback();
        dispatch(getBackdropStop())
    } catch (err) {
        dispatch(getBackdropStop())
        dispatch(startSnackbar({ message: 'Something went wrong' }))
        dispatch(getAuthFailure())
    }
}

export const outhUser = (
    user: any
): AppThunk => async dispatch => {
    dispatch(setAuthUser(user))
}

export const doLogout = (): AppThunk => async dispatch => {
    // debugger
    localStorage.removeItem('token')
    sessionStorage.removeItem('authUser')
    localStorage.removeItem('authUser')
    dispatch(logout())
    window.location.reload()
}
