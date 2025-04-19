import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

let snap = new Midtrans.Snap({
    isProduction: false,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
    serverKey: process.env.MIDTRANS_SERVER_KEY
})

export async function POST(request) {
    const {totalPrice, items, customer} = await request.json()

    try {
        const parameters = {
            transaction_details: {
                order_id: uuidv4(), 
                gross_amount: totalPrice
            },
            item_details: items.map(item => ({
                id: item.id,
                name: item.name,
                price: parseInt(item.price.replace(",", ".")),
                quantity: item.quantity
            })),
            customer_details: {
                first_name: customer.name,
                phone: customer.phone,
                address: customer.address
            }
        }
        const token = await snap.createTransactionToken(parameters)
        return NextResponse.json({token})
    } catch (error) {
        console.error("Error generating payment token", error)
        return Response.json(
            {error: "Failed to generate payment token"},
            {status: 500}
        )
    }
}