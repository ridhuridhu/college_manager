const mongoose = require('mongoose');
const Schema=mongoose.Schema;
mongoose.plugin(schema => { schema.options.usePushEach = true });


const classroomSchema=new Schema({
    code:{type:String,unique:true},
    name:{type:String},
    batch:{type:String},
    classmates:[{type:Schema.Types.ObjectId,ref:"User",unique:true}],
    semester:{type:Number},
    cr:{type:Schema.Types.ObjectId,ref:"User"},
    link:{type:String},

});

module.exports = mongoose.model('Classroom', classroomSchema);