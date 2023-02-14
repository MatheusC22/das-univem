import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import crypto from 'crypto';
const prisma = new PrismaClient()

export const hashUrl = async (req: Request, res: Response) => {
    try {
        const bytes = crypto.randomBytes(4).toString('hex')
        
    } catch (_e) {
        const error = _e as Error
        return res.status(500).send(error.message)
    }
}

export const redirectUrl = async (req: Request, res: Response) => {
    try {

    } catch (_e) {
        const error = _e as Error
        return res.status(500).send(error.message)
    }
}

export const deleteUrl = async (req: Request, res: Response) => {
    const { url_hash } = req.body
    try {
        const Url = prisma.urls.delete({
            where: {
                url_hash: url_hash
            }
        })
        return res.status(204).send({ message: "url deleted" })
    } catch (_e) {
        const error = _e as Error
        return res.status(500).send(error.message)
    }
}