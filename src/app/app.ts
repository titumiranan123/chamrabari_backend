import express from 'express'
import cors from 'cors'
import userRoutes from './modules/user/user.route'
import productRoutes from './modules/Product/product.routes'
import cartRoutes from './modules/cart/cart.routes'
import paymentRoutes from './modules/payment/pay.routes'
import 'dotenv/config'
import jwtRoutes from './modules/jwt/jwt.routes'
const app = express()
app.use((req, res, next) => {
    app.use(cors())

    app.use(express.json({ limit: '10mb' })); // Adjust the limit accordingly
    app.use(express.urlencoded({ limit: '10mb', extended: true }));
    app.use('/user', userRoutes)
    app.use('/products', productRoutes)
    app.use('/cart', cartRoutes)
    app.use('/payment', paymentRoutes)
    app.use('/jwt', jwtRoutes)


    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Origin', 'https://chamrabari-backend.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
app.get('/', (req, res) => {
    res.json("server is running")
    console.log(process.env.ACCESS_TOKEN)
})
export default app;