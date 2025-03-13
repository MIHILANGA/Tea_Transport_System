const mongoose = require('mongoose')

const MaintainsSchema = new mongoose.Schema({
    vehiclenumber : String,
    maintainsDate : Date,
    price : String,
    Description : String,
 
}
)


const MaintainsModel = mongoose.model("Maintain", MaintainsSchema)
module.exports = MaintainsModel