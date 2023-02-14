import express from 'express'

import { createUrlHash, deleteUrl, redirectUrl } from "../controllers/url.controller"


export const urlRouter = express.Router();

urlRouter.get("/:hash",redirectUrl)
urlRouter.post("/url",createUrlHash)
urlRouter.delete("/url",deleteUrl)