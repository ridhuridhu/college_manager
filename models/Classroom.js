const mongoose = require('mongoose');
const Schema=mongoose.Schema;
mongoose.plugin(schema => { schema.options.usePushEach = true });


const classroomSchema=new Schema({
    code:{type:String,unique:1},
    name:{type:String},
    batch:{type:String},
    classmates:[{type:Schema.Types.ObjectId,ref:"User"}],
    semester:{type:Number},
    cr:{type:Schema.Types.ObjectId,ref:"User"},

});

module.exports = mongoose.model('Classroom', classroomSchema);