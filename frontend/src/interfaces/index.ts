

export interface UserRegistrationForm {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export interface UserLoginForm {
    email: string
    password: string
}

export interface ITask {
    id: string
    taskName: string
    description: string
}