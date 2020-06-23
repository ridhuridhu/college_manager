const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const PollSchema=new Schema({
    date:{type:Date,default:Date.now()},
    hosted:{type:Schema.Types.ObjectId,ref:"User"},
    hostedName:{type:String},
    question:{type:String},
    choice1:{type:String},
    choice2:{type:String},
    classId:{type:Schema.Types.ObjectId,ref:"Classroom"},
    dataOne:{type:Number,default:0},
    dataTwo:{type:Number,default:0},
    polled:[{type:Schema.Types.ObjectId,ref:"User"}]

});

module.exports=mongoose.model("Poll",PollSchema)