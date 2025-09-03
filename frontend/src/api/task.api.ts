import apiTask from "../lib/taskApi";
import { isAxiosError } from "axios";
import type { ITask } from "../interfaces";


export async function getAllTaskByUser() {
    try {
        const url = '/'
        const { data } = await apiTask.get(url)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function createTask(formData: ITask) {
    try {
        const url = '/'
        const { data } = await apiTask.post(url, { ...formData })
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateTask(formData: ITask) {
    try {
        const url = `/${formData.id}`
        const { data } = await apiTask.put(url, { ...formData })
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function removeTask(taskId: ITask['id']) {
    try {
        const url = `/${taskId}`
        const { data } = await apiTask.delete(url)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}