const express = require('express')
const router = express.Router();
const Order = require('../models/Orders')

router.post('/orderData', async (req, resp) => {
    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date})

    // If email not existing in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })
    console.log("eId: ",eId)
    if(eId === null){
        try{
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                resp.json({success: true})
            })
        }
        catch (error) {
            console.log("error.status: ",error.status)
            console.log("error.message: ",error.message)
            //const status = error.status || 500;
            resp.status(error.status || 500).send("Server Error", error.message)
        }
    }

    else {
        try {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: {order_data: data}}
                ).then(() => {
                    resp.json({success: true})
                })
        }
        catch (error) {
            resp.send("Server Error", error.message)
        }
    }
})

router.post('/myorderData', async (req, resp) => {

    try {
        let myData = await Order.findOne({'email': req.body.email})
        resp.json({orderData: myData})
    }
    catch (error) {
        resp.send("Server Error", error.message)
    }
})

module.exports = router;