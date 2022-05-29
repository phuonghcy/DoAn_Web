import axiosClient from "./axiosClient"

const authApi = {

    loginWithGoogle: (accessToken) => {
        const url = 'auth/google'
        return axiosClient.post(url, {accessToken: accessToken})
    },
    loginWithFacebook: (data) => {
        const url = 'auth/facebook'
        return axiosClient.post(url, data)
    },
    createCodeVerifyEmail: (data) => {
        const url = 'auth/create-code'
        return axiosClient.post(url, data)
    },
    verifyEmailAndCode: (data) => {
        const url = 'auth/verify-code'
        return axiosClient.post(url, data)
    },
    register: (data) => {
        const url = 'auth/register'
        return axiosClient.post(url, data)
    },
    login: (data) => {
        const url = 'auth/login-bookstore'
        return axiosClient.post(url, data)
    },
    forgotPassword: (data) => {
        const url = 'auth/forgot-password'
        return axiosClient.post(url, data)
    },
    resetPassword: (data) => {
        const url = 'auth/reset-password'
        return axiosClient.patch(url, data)
    },
    getRefreshToken: () => {
        const url = 'auth/refresh-token'
        return axiosClient.post(url)
    },
    logout: () => {
        const url = `auth/logout`
        return axiosClient.get(url)
    }

}

export default authApi