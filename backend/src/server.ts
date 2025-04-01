import express, {Request, Response, Application, NextFunction} from 'express';

import dotenv from 'dotenv';
import cors from 'cors';
import 'express-async-errors';
import {router} from './routes/rotas'
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 1999

app.use(cors());
app.use(express.json())
app.use(router)

// Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
      res.status(400).json({
        error: err.message,
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Erro interno do servidor",
      });
    }
  });
  
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);

  });
  
