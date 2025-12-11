import rateLimit from "express-rate-limit";

const limiter=rateLimit({
    statusCode:429,
    windowMs:10 * 60 * 1000,
    message:"Too many frequent requests",
    limit:100,
    legacyHeaders: false
})

export default limiter;