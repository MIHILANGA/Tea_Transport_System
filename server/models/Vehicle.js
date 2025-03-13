const mongoose = require('mongoose')

const VehicleSchema = new mongoose.Schema({
    vehiclenumber : String,
    vehiclemodel : String,
    vehicletype : String ,
    vehicleowner : String,
    registerdate : Date,
    insurancedate : Date,
    expierddate : Date,
    vehicleAvailability :Boolean
    
}
)


const VehicleModel = mongoose.model("Vehicle", VehicleSchema)
module.exports = VehicleModel