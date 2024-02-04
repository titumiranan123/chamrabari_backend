import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import userRoutes from './modules/userAuthentication/user.routes'
import productRoutes from './modules/Product/product.routes'
import cartRoutes from './modules/cart/cart.routes'
import paymentRoutes from './modules/payment/pay.routes'
import 'dotenv/config'
import { jwtAuthentication, jwtVerify } from './modules/jwt/jwtRoutes'
import morgan from 'morgan'
import blogRoute from '../app/modules/blog/blog.route'

const app = express()

app.use([
    cors(),
    morgan('dev')
])

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req, res) => {
    console.log(process.env.ACCESS_TOKEN);
    res.status(200).json("server is running");
});

app.use('/api/v1', userRoutes)
app.use('/products', productRoutes)
app.use('/api/v1/cart', cartRoutes)
app.use('/payment', paymentRoutes)
app.use('/api/v1/blog', blogRoute)
app.post('/jwt', jwtAuthentication)

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error.status) {
        return res.status(error.status).json({ message: error.message });
    }
    res.status(500).json({ message: "something went wrong" });
});

export default app;
