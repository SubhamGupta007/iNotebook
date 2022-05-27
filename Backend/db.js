const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://SubhamGupta:mypassword@cluster0.aem6r.mongodb.net/?retryWrites=true&w=majority"


const connectedtomongo = () => {
    mongoose.connect(mongoURI,() => {
        console.log("connected to mongo successfully")
    })
    
}

module.exports = connectedtomongo