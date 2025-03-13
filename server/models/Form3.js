const mongoose = require('mongoose')

const FormSchema3 = new mongoose.Schema({
    applicantname : String,
    appiicantAppoinment : String,
    vehicleIncharge : String,
    dateofRequired : Date,
    timeofRequired : String,
    natureofDuty : String,
    addresstoGo : String,
    requirement : String,
    timetobeSpent : String,
    distance : String,
    dateofArrival : Date,
    timeofArrival : String,
    numofOfficers : Number,
    numofLectures : Number,
    numofInstructors : Number,
    numofcadetOfficers : Number,
    numofdayScholers : Number,
    numofcivilStaff : Number,
    totalofPassengers : Number,
    routetoFollow : String,
    dateofApply : Date,
    rejectOrConfirm : String,
    rejectOrConfirm1 : String,
    driver : String,
    vehicle: String,

}
)


const FormModel3 = mongoose.model("Form3", FormSchema3)
module.exports = FormModel3