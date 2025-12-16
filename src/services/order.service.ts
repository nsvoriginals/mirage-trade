import prisma from "../config/prisma.config";
import { Order, PlaceOrderInput } from "../types/types";
import { getCryptoPrice } from "./marketData.service";

export async function placeOrder(userId: string, orderInfo: PlaceOrderInput) {
    const order = await prisma.order.create({
        data: {
            userId,
            portfolioId: (await prisma.portfolio.findUnique({ where: { userId } }))!.id,
            quantity: orderInfo.quantity,
            price: orderInfo.price,
            type: orderInfo.type,
            side: orderInfo.side,
            symbol: orderInfo.symbol,
            status: "pending"
        },

    });

    const trade = await executeOrder(order)
    return { order, trade }
}

async function executeOrder(order: Order) {
    const currentPrice = await getCryptoPrice(order.symbol) ?? 0;

    console.log(order)
    const trade = await prisma.trade.create({
        data: {
            orderId: order.id,
            userId: order.userId,
            symbol: order.symbol,
            side: order.side,
            quantity: order.quantity,
            price: currentPrice,
            totalValue: order.quantity * currentPrice,
        },
    });
    await updateHoldings(order.userId, order.symbol, order.quantity, currentPrice, order.side as "BUY" | "SELL");
    await prisma.order.update({
        where:{
            id:order.id
        },
        data:{
            status:"filled",
            filledAt:new Date()
        }
    })
    return trade;
}




async function updateHoldings(userId: string, symbol: string, quantity: number, price: number, side: "BUY" | "SELL") {
    const portfolio = await prisma.portfolio.findUnique({
        where: {
            userId
        },
        include: {
            holdings: true
        }
    })
    if (!portfolio) {
        console.log("NO PORtfolio found")
        return;
    }
    let holdings = portfolio.holdings.find(h => h.symbol === symbol);
    if (side == 'BUY') {
        if (!holdings) {
            holdings = await prisma.holding.create({
                data: {
                    portfolioId: portfolio.id,
                    avgCost: price,
                    symbol,
                    quantity,


                }
            })
        } else {
            let totalQt = holdings.quantity + quantity;
            const totalCost = holdings.avgCost * holdings.quantity + price * quantity;
            await prisma.holding.update({
                where: {
                    id: holdings.id
                },
                data: {
                    avgCost: totalCost,
                    quantity: totalQt
                }
            })




        }
        await prisma.portfolio.update({
            where: {
                userId,
            },
            data: {
                cashBalance: portfolio.cashBalance - (quantity * price)
            }
        });
    } else {

        if (!holdings || holdings?.quantity < quantity) throw new Error("Not enough holdings")
        await prisma.holding.update({
            where: {
                id: holdings.id
            },
            data: {
                quantity: holdings?.quantity - quantity
            }
        });

        await prisma.portfolio.update({
            where:{
                id:portfolio.id
            },
            data:{
                cashBalance : portfolio.cashBalance + (quantity * price )
            }
        })

    }
}


export async function getOrderById(oid:string) {
    const order = await prisma.order.findUnique({
        where:{
            id:oid
        }
    })

    if(!order) throw new Error("No order found")
   return order;
}