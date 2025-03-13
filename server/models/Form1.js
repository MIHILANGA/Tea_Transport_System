const mongoose = require('mongoose')

const FormSchema1 = new mongoose.Schema({
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


const FormModel1 = mongoose.model("Form1", FormSchema1)
module.exports = FormModel1