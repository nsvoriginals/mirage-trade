import express,{Request,Response} from 'express';
import authRoutes from './routes/auth.route'
import portfolioRoutes from './routes/portfolio.route'
import limiter from './middlewares/ratelimit.middleware';
import errorHandler from './middlewares/errorhandler.middleware';
import initBinanceFeed from './workers/binancefeed.worker';
import orderRoutes from './routes/order.route'
import tradeRoutes from './routes/trade.route'
import cors from 'cors'
const app=express();
const corsOptions = {
  origin:'*',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json())
app.use(limiter);
initBinanceFeed();
app.get('/',(req:Request,res:Response)=>{
    res.send("Server is running baby ")
})

app.use('/api/auth',authRoutes)
app.use('/api/portfolio',portfolioRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/trades',tradeRoutes)


//app.use(errorHandler)
app.listen(3000,()=>{
    console.log("hi there")
})