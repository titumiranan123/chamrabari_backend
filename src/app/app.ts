import express from 'express'
import cors from 'cors'
import userRoutes from './modules/user/user.route'
import productRoutes from './modules/Product/product.routes'
import cartRoutes from './modules/cart/cart.routes'
import paymentRoutes from './modules/payment/pay.routes'
import 'dotenv/config'
import jwtRoutes from './modules/jwt/jwt.routes'
const app = express()
app.use(cors())

app.use(express.json({ limit: '10mb' })); // Adjust the limit accordingly
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/user', userRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)
app.use('/payment', paymentRoutes)
app.use('/jwt', jwtRoutes)


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    next();
});
app.get('/', (req, res) => {
    res.json("server is running")
    console.log(process.env.ACCESS_TOKEN)
})
export default app;