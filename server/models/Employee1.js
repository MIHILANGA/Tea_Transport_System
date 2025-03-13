const mongoose = require('mongoose')

const EmployeeSchema1 = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const EmployeeModel1 = mongoose.model("employees1", EmployeeSchema1)
module.exports = EmployeeModel1