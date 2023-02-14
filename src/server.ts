import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import { Router, Request, Response } from 'express';
import { urlRouter } from './Routes/url.router';
import { userRouter } from './Routes/user.router';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}
const PORT = Number(process.env.PORT);
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json())

//ROUTES
app.use("/",urlRouter)
app.use("/user",userRouter)

app.listen(PORT, () => {console.log(`[server] API listening at http://localhost:${PORT}`)});
