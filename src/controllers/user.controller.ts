import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
    const { username, user_email, user_password } = req.body;
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash_password = bcrypt.hashSync(user_password, salt);
        const User = await prisma.users.create({
            data: {
                user_email: user_email,
                username: username,
                user_password: hash_password
            }
        })
        return res.status(201).send({ message: "user created", id: User.user_id })
    } catch (_e) {
        const error = _e as Error
        return res.status(500).send({ error: error.message })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { user_id } = req.body;
    try {
        const User = prisma.users.delete({
            where: {
                user_id: user_id
            }
        })
        return res.status(204).send({ message: "user deleted" })
    } catch (_e) {
        const error = _e as Error
        return res.status(500).send({ error: error.message })
    }
}

export const login = async (req: Request, res: Response) => {
    const { user_email, user_password } = req.body;
    try {
        if (!user_email || !user_password){
            res.status(400).send({message : "email and password required"})
        }
        const Uniqueuser = await prisma.users.findUnique({
            where:{
                user_email:user_email
            }
        })
        if (!Uniqueuser){
            return res.status(400).send({message : "user not found"})
        }

        const check = await bcrypt.compare(user_password,Uniqueuser.user_password);


        if (check){
            res.status(200).send({message: "user logged"})
        }else{
            res.status(403).send({message: "email or password invalid"})
        }
    } catch (_e) {
        const error = _e as Error
        res.status(500).send({ message: error.message })
    }
}