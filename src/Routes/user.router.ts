import express from 'express'

import{createUser,deleteUser, login} from "../controllers/user.controller"

export const userRouter = express.Router()

userRouter.post("/",createUser)
userRouter.delete("/",deleteUser)
userRouter.post("/login",login)