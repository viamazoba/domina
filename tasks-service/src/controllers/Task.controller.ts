import type { Request, Response } from "express";
import Task from "../models/Task.model";

export class TaskController {

    static createTask = async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body);
            await task.save();
            res.status(201).json({ message: "Task created successfully", task });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error creating task" });
        }
    };

    static getAllTasks = async (req: Request, res: Response) => {
        try {
            const userId = req.userId;

            if (!userId) {
                return res.status(400).json({ message: "User id is required" });
            }

            const tasks = await Task.find({ userId });
            res.json(tasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching tasks" });
        }
    };

    static updateTask = async (req: Request, res: Response) => {
        const userId = req.userId
        const { taskId } = req.params;
        const { taskName, description } = req.body;

        try {
            const task = await Task.findById(taskId);

            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            if (task.userId.toString() !== userId) {
                return res.status(403).json({ message: "Not authorized to update this task" });
            }

            task.taskName = taskName;
            task.description = description;
            await task.save();

            res.json({ message: "Task updated successfully", task });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error updating task" });
        }
    };

    static deleteTaskById = async (req: Request, res: Response) => {
        const userId = req.userId;
        const { taskId } = req.params;

        try {
            const task = await Task.findById(taskId);

            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            if (task.userId.toString() !== userId) {
                return res.status(403).json({ message: "Not authorized to delete this task" });
            }

            await task.deleteOne();

            res.json({ message: "Task deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error deleting task" });
        }
    };
}
