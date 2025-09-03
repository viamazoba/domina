import type { Request, Response } from "express"
import User from "../models/User.model"
import { checkPassword, hashPassword } from "../utils/auth"
import { generateJWT } from "../utils/jwt"


export class AuthController {

    static createAccount = async (req: Request, res: Response) => {
        try {

            const { password, email } = req.body
            const userExists = await User.findOne({ email })

            if (userExists) {
                const error = new Error('User already exist')
                return res.status(409).json({ error: error.message })
            }

            const user = new User(req.body)
            user.password = await hashPassword(password)

            await user.save()
            res.send('Account created succesfully')

        } catch (error) {
            res.status(500).json({ error: 'There was an error' })
        }
    }

    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })

            if (!user) {
                const error = new Error('Invalid User')
                return res.status(404).json({ error: error.message })
            }

            const isPasswordCorrect = await checkPassword(password, user.password)

            if (!isPasswordCorrect) {
                const error = new Error('Incorrect Password')
                return res.status(401).json({ error: error.message })
            }

            const token = generateJWT({
                id: user.id
            })
            res.send(token)

        } catch (error) {
            res.status(500).json({ error: 'There was an error' })
        }
    }

    static checkPassword = async (req: Request, res: Response) => {
        const { password } = req.body

        const user = await User.findById(req.user.id)
        const isPasswordCorrect = await checkPassword(password, user.password)

        if (!isPasswordCorrect) {
            const error = new Error('Incorrect Password')
            return res.status(401).json({ error: error.message })
        }

        res.send('Correct Password')
    }
}