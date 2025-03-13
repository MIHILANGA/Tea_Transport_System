const mongoose = require('mongoose')

const EmployeeSchema2 = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const EmployeeModel2 = mongoose.model("employees2", EmployeeSchema2)
module.exports = EmployeeModel2