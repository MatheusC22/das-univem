import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from "express";
import crypto from 'crypto';
const prisma = new PrismaClient()

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}
const PORT = Number(process.env.PORT);

export const createUrlHash = async (req: Request, res: Response) => {
    const { url_original, user_id } = req.body;
    try {
        const bytes = generateHash()
        const Url = await prisma.urls.create({
            data: {
                url_hash: bytes,
                url_original: url_original,
                user_id: user_id
            }
        })
        return res.status(201).send({ link: `http://localhost:${PORT}/${bytes}` })

    } catch (_e) {
        const error = _e as Error
        return res.status(500).send(error.message)
    }
}

function generateHash() {
    const bytes: string = crypto.randomBytes(3).toString('hex')
    return bytes
}

export const redirectUrl = async (req: Request, res: Response) => {
    const hash = String(req.params.hash);
    try {
        const Url = await prisma.urls.findUnique({
            where: {
                url_hash: hash
            },select:{
                url_hash:true,
                url_original:true
            }
        })
        if (Url) {
            res.writeHead(301, {
                Location: Url.url_original
            }).end();
        } else {
            res.status(400).send({ message: "invalid url" })
        }
    } catch (_e) {
        const error = _e as Error
        return res.status(500).send(error.message)
    }
}

export const deleteUrl = async (req: Request, res: Response) => {
    const { url_hash } = req.body
    try {
        const Url = await prisma.urls.delete({
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