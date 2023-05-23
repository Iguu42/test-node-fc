import { AppError } from './errors/AppError';
import { NextFunction, Response } from 'express';
import { Request } from 'express';
import "express-async-errors";
import express from 'express';
import { routes } from '.';

const app = express();

app.use(express.json());

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message
        })
    }

    return res.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    })
})

app.listen(process.env.PORT, () => console.log("server is running in port 3000"));