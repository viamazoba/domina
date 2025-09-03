import { Request, Response } from 'express'

export const healthChecktHandler = (_: Request, res: Response) => {
    res.status(200).json({ message: 'Server is OK', uptime: process.uptime() })
}