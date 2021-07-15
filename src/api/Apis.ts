import axios, { AxiosInstance } from 'axios'

export const serverUrl =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_SERVER_URL
        : 'http://192.168.0.105:8080/garage/v1.0'
// 'https://sag-backend.herokuapp.com/garage/v1.0'

let user = sessionStorage.getItem('authUser')

if (!user) user = localStorage.getItem('authUser')

if (user) {
    JSON.parse(user)
    //outhUser(JSON.parse(user));
    user = JSON.parse(user)
} else {
    //@ts-ignore
    user = { token: '' }
}
//@ts-ignore
const { token } = user

export const apis = axios.create({
    baseURL: serverUrl,
    timeout: 10000,
    params: {
        //@ts-ignore
        // token: token || '',
    },
    headers: { Authorization: `Bearer ${token}` || '' },
})

export async function signIn(username: string, password: string) {
    return await apis
        .post(
            '/login',
            JSON.stringify({
                username: username,
                password: password,
            }),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        .then((res) => {
            //@ts-ignore
            // apis.defaults.params.token = res.data.token
            return res
        })
}
// panwar.arjunp@gmail.com 12345

export async function signUp(
    username: string,
    password: string,
    email: string,
    mobile: number,
    userType?: string
) {
    return await apis.post(
        '/register',
        JSON.stringify({
            username: username,
            password: password,
            email: email,
            mobile: mobile,
            usertype: userType,
        }),
        {
            headers: {
                'Content-type': 'application/json',
            },
        }
    )
}

export async function sendPassword(username: string) {
    debugger
    return await apis.post(
        '/product/acountDetail/reset/pasword',
        JSON.stringify({
            username: username,
        }),
        {
            headers: {
                'Content-type': 'application/json',
            },
        }
    )
}
