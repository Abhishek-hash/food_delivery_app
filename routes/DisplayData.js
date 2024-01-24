const express = require('express')
const router = express.Router();

router.post('/foodData', (req, resp) => {
    try{
        console.log(global.food_items)
        resp.send([global.food_items, global.food_category])
    }
    catch(error) {
        console.error(error)
        resp.send("Server Error")
    }
})

module.exports = router;