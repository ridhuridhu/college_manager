const mongoose = require('mongoose');
const Schema=mongoose.Schema;
mongoose.plugin(schema => { schema.options.usePushEach = true });


const classroomSchema=new Schema({
    code:{type:String,unique:true},
    name:{type:String},
    batch:{type:String},
    classmates:[{type:Schema.Types.ObjectId,ref:"User"}],
    classmates_name:[{type:String}],
    semester:{type:Number},
    cr:{type:Schema.Types.ObjectId,ref:"User"},
    link:{type:String},
    notes:[{type:String}],
    notes_status:[{type:String}],
    announcement:[{type:String}],
    announcement_name:[{type:String}],
    

});

module.exports = mongoose.model('Classroom', classroomSchema);