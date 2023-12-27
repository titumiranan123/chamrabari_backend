import express from 'express'
import cors from 'cors'
import userRoutes from './modules/user/user.route'
import productRoutes from './modules/Product/product.routes'
import cartRoutes from './modules/cart/cart.routes'
const app = express()
app.use(cors())
app.use(express.json())

app.use('/user', userRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)

app.get('/', (req, res) => {
    res.json("server is running")
})


export default app;