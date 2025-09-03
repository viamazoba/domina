import apiAuth from "../lib/authApi";
import { isAxiosError } from "axios";
import type { UserLoginForm, UserRegistrationForm } from "../interfaces";


export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = '/create-account'
        const { data } = await apiAuth.post(url, formData)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function authenticateUser(formData: UserLoginForm) {
    try {
        const url = '/login'
        const { data } = await apiAuth.post(url, formData)
        const token = data.token
        localStorage.setItem('AUTH_TOKEN', `${token}`)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}