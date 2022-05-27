const connectedtomongo =  require('./db')
const express = require('express');

connectedtomongo();


const app = express()
const port = 5000

app.use(express.json())

//available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/',(req,res)=>{
    res.send('hello world');
})

app.listen(port,() =>{
    console.log("app is listening on port 5000");
})