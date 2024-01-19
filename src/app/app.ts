import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import userRoutes from './modules/user/user.route'
import productRoutes from './modules/Product/product.routes'
import cartRoutes from './modules/cart/cart.routes'
import paymentRoutes from './modules/payment/pay.routes'
import 'dotenv/config'
import { jwtAuthentication } from './modules/jwt/jwtRoutes'
import morgan from 'morgan'
const app = express()

app.use([
    cors(),
    morgan('dev')
])
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/user', userRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)
app.use('/payment', paymentRoutes)
app.post('/jwt', jwtAuthentication)

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error.status) {
        return res.status(error.status).json({ message: error.message });
    }

    res.status(500).json({ message: "something went wrong" });
});


app.get('/', (req, res) => {
    res.json("server is running")
    console.log(process.env.ACCESS_TOKEN)
})
export default app;