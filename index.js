const express = require('express')
const app = express()
const port = 5003

app.use((req,resp,next) => {
    resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    resp.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

const mongoDB = require('./db')
mongoDB();

app.get('/', (req, resp) => {
    resp.send('Go Fiest app')
})

app.use(express.json())
app.use('/api', require('./routes/CreateUser'))

//DisplayData route
app.use('/api', require('./routes/DisplayData'))  
app.use('/api', require('./routes/OrderData'))
app.use(express.json())
app.use('/api', require('./routes/LoginUser'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})