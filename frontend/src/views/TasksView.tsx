import { useEffect, useState } from "react"
import type { ITask } from "../interfaces"
import { createTask, getAllTaskByUser, removeTask, updateTask } from "../api/task.api"
import ErrorMessage from "../components/01-atoms/ErrorMessage"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"


export default function TaskView() {

    const [isModalEditTask, setIsModalEditTask] = useState(false)
    const [isModalCreateTask, setIsModalCreateTask] = useState(false)
    const [dataTask, setDataTask] = useState<ITask[]>([])
    const [taskToEdit, setTaskToEdit] = useState<ITask | null>(null)

    const initialValues: ITask = {
        id: '',
        taskName: '',
        description: '',
    }
    const { register, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })


    useEffect(() => {
        const dataApiTasks = async () => {
            const response = await getAllTaskByUser()
            setDataTask(response)
        }
        dataApiTasks()
    }, [])

    const handleCreateTask = async (formData: ITask) => {
        try {
            const { task } = await createTask(formData)
            setDataTask(prev => [...prev, task])
            toast.success('Se ha registrado la tarea')
            setIsModalCreateTask(false)

        } catch {
            toast.error('Ha ocurrido un error')
        }
    }

    const handleSelectTaskToEdit = (task: ITask) => {
        setTaskToEdit(task)
        reset(task)
        setIsModalEditTask(true)
    }

    const handleEditTask = async (formData: ITask) => {
        try {
            const { task } = await updateTask(formData)
            setDataTask(prevTasks => prevTasks.map(prevTask => prevTask.id === taskToEdit?.id ? task : prevTask))
            setIsModalEditTask(false)
            toast.success('Se ha editado con exito la tarea')
        } catch {
            toast.error('Ha ocurrido un error')
        }
    }

    const handleRemoveTask = async (idTask: ITask['id']) => {
        try {
            await removeTask(idTask)
            toast.success('Se ha eliminado la tarea')
            setDataTask(tasks => tasks.filter(task => task.id !== idTask))
        } catch {
            toast.error('Ha ocurrido un error')
        }
    }

    return (
        <>
            <h1 className="text-5xl font-black text-white">Todas las tareas</h1>
            <p className="text-2xl font-light text-white mt-5">
                Comienza a gestionar tus tareas: {''}
                <span className=" text-fuchsia-500 font-bold">Crea, Edita o Elimina tareas</span>
            </p>

            <div className="flex flex-col gap-5 py-5">

                {
                    dataTask ?
                        dataTask.map(task => (
                            <div
                                key={task.id}
                                className="w-full p-3 bg-white  border-gray-300 border"
                            >
                                <p className="font-semibold text-fuchsia-500 text-2xl">{task.taskName}</p>
                                <p className="font-normal text-xl text-gray-600">{task.description}</p>
                                <div className="flex gap-x-3 pt-5">
                                    <button
                                        className="bg-red-600 hover:bg-red-700 w-full p-2  text-white font-black  text-lg cursor-pointer"
                                        onClick={() => handleRemoveTask(task.id)}
                                    >
                                        Eliminar Tarea
                                    </button>
                                    <button className="bg-green-600 hover:bg-green-700 w-full p-2  text-white font-black  text-lg cursor-pointer"
                                        onClick={() => handleSelectTaskToEdit(task)}
                                    >
                                        Editar Tarea
                                    </button>
                                </div>
                            </div>
                        ))
                        :
                        <p className="text-white text-xl py-8">No se han registrado tareas aún</p>

                }

            </div>
            <div>
                <button
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2  text-white font-black  text-lg cursor-pointer"
                    onClick={() => setIsModalCreateTask(true)}
                >
                    Crear Tarea
                </button>
            </div>

            <div
                className={`fixed inset-0 z-10 flex flex-col justify-center items-center bg-slate-400 bg-opacity-50 ${isModalEditTask ? 'flex fade-in' : 'hidden fade-out'}`}
            >
                <div
                    className="bg-gray-800 py-8 px-5"
                >
                    <h1 className="text-5xl font-black text-white">Editar Tarea</h1>
                    <p className="text-2xl font-light text-white mt-5">
                        Edita la información de las tareas a continuación
                    </p>


                    <form
                        className="space-y-8 p-10 mt-10 bg-white"
                        noValidate
                        key={taskToEdit?.id || "edit-form"}
                    >
                        <div className="flex flex-col gap-5">
                            <label
                                className="font-normal text-2xl"
                            >Nombre de la tarea</label>

                            <input
                                id="taskName"
                                type="taskName"
                                placeholder="Nombre de la tarea"
                                className="w-full p-3  border-gray-300 border"
                                {...register("taskName", {
                                    required: "El nombre de la tarea es obligatorio",
                                })}
                            />
                            {errors.taskName && (
                                <ErrorMessage>{errors.taskName.message}</ErrorMessage>
                            )}
                        </div>

                        <div className="flex flex-col gap-5">
                            <label
                                className="font-normal text-2xl"
                            >Descripción</label>

                            <input
                                type="text"
                                placeholder="Descripción de la tarea"
                                className="w-full p-3  border-gray-300 border"
                                {...register("description", {
                                    required: "La Descripción es obligatoria",
                                })}
                            />
                            {errors.description && (
                                <ErrorMessage>{errors.description.message}</ErrorMessage>
                            )}
                        </div>

                        <div className="flex gap-x-3 pt-5">
                            <button className="bg-red-600 hover:bg-red-700 w-full p-2  text-white font-black  text-lg cursor-pointer"
                                type="button"
                                onClick={() => setIsModalEditTask(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-green-600 hover:bg-green-700 w-full p-2  text-white font-black  text-lg cursor-pointer"
                                onClick={handleSubmit(handleEditTask)}
                            >
                                Aceptar
                            </button>
                        </div>
                    </form>
                </div>

            </div>

            <div
                className={`fixed inset-0 z-10 flex flex-col justify-center items-center bg-slate-400 bg-opacity-50 ${isModalCreateTask ? 'flex fade-in' : 'hidden fade-out'}`}
            >
                <div
                    className="bg-gray-800 py-8 px-5"
                >
                    <h1 className="text-5xl font-black text-white">Crear Tarea</h1>
                    <p className="text-2xl font-light text-white mt-5">
                        Llena la siguiente información para agregar la tarea:
                    </p>

                    <form
                        className="space-y-8 p-10 mt-10 bg-white"
                        noValidate
                    >
                        <div className="flex flex-col gap-5">
                            <label
                                className="font-normal text-2xl"
                            >Nombre de la tarea</label>

                            <input
                                id="taskName"
                                type="taskName"
                                placeholder="Nombre de la tarea"
                                className="w-full p-3  border-gray-300 border"
                                {...register("taskName", {
                                    required: "El nombre de la tarea es obligatorio",
                                })}
                            />
                            {errors.taskName && (
                                <ErrorMessage>{errors.taskName.message}</ErrorMessage>
                            )}
                        </div>

                        <div className="flex flex-col gap-5">
                            <label
                                className="font-normal text-2xl"
                            >Descripción</label>

                            <input
                                type="text"
                                placeholder="Descripción de la tarea"
                                className="w-full p-3  border-gray-300 border"
                                {...register("description", {
                                    required: "La Descripción es obligatoria",
                                })}
                            />
                            {errors.description && (
                                <ErrorMessage>{errors.description.message}</ErrorMessage>
                            )}
                        </div>

                        <div className="flex gap-x-3 pt-5">
                            <button className="bg-red-600 hover:bg-red-700 w-full p-2  text-white font-black  text-lg cursor-pointer"
                                type="button"
                                onClick={() => setIsModalCreateTask(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-green-600 hover:bg-green-700 w-full p-2  text-white font-black  text-lg cursor-pointer"
                                onClick={handleSubmit(handleCreateTask)}
                            >
                                Aceptar
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}