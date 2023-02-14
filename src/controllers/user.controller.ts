import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient()

export const createUser = async (req:Request, res:Response) =>{
    const {username,user_email,user_password} = req.body;
    try{
        const User = await prisma.users.create({
            data:{
                user_email: user_email,
                username: username,
                user_password:user_password
            }
        })
        return res.send(201).send({message :"user created",id:User.user_id})
    }catch(_e){
        const error = _e as Error
        return res.status(500).send({error: error.message})
    }
}

export const deleteUser = async(req:Request, res: Response) =>{
    const {user_id} = req.body;
    try{
        const User  = prisma.users.delete({
            where:{
                user_id:user_id
            }
        })
        return res.status(204).send({message: "user deleted"})
    }catch(_e){
        const error = _e as Error
        return res.status(500).send({error: error.message})
    }
}