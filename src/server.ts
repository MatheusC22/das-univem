import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import { Router, Request, Response } from 'express';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}
const PORT = Number(process.env.PORT);
const app = express();
app.use(helmet());
app.use(cors());
const route = Router();

app.use(express.json());

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
});
//ROUTES
app.use(route);
app.listen(PORT, () => {console.log(`[server] API listening at http://localhost:${PORT}`)});