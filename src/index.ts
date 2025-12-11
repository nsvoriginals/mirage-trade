import express,{Request,Response} from 'express';
import authRoutes from './routes/auth.route'
import portfolioRoutes from './routes/portfolio.route'
import limiter from './middlewares/ratelimit.middleware';
import errorHandler from './middlewares/errorhandler.middleware';
import initBinanceFeed from './workers/binancefeed.worker';
const app=express();
app.use(express.json())
app.use(limiter);
initBinanceFeed();
app.get('/',(req:Request,res:Response)=>{
    res.send("Server is running baby ")
})

app.use('/api/auth',authRoutes)
app.use('/api/portfolio',portfolioRoutes)



//app.use(errorHandler)
app.listen(3000,()=>{
    console.log("hi there")
})