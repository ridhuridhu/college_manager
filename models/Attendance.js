const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const AttendanceSchema=new Schema({
    user:{type:Schema.Types.ObjectId,ref:"User"},
    name:{type:String },
    total:{type:Number,default:0},
    present:{type:Number,default:0},
    absent:{type:Number,default:0},
    percentage:{type:Number,default:0},
});



module.exports = mongoose.model('Attendance', AttendanceSchema);