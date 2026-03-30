import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { Users } from './models/User.js'



const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))



app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'server is running'
    })
})

app.post("/create", async (req, res) => {
    try {
        const user = await Users.create({
            name: "user",
            email: "user@gmail.com",
            password: "user12345",
            role: "investor",
            balance: 100000,
        },{ returnDocument: 'after' })

        res.status(200).json({
            success:true,
            message: "user is created successfully!",
            user
        })
    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Internal server',
            error: error.message
        })
    }
})


export { app }
export default app
