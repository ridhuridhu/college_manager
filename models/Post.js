const mongoose = require('mongoose');
const Schema=mongoose.Schema;
var AutoIncrement=require("mongoose-sequence")(mongoose);

const PostSchema=new Schema({
    key:{type:Number,unique:true,required:false},
    Date:{type:String,default:Date.now()},
    status:{type:String},
    user:{type:Schema.Types.ObjectId,ref:"User"},
    image:{type:String},
    likes:[{type:Schema.Types.ObjectId,ref:"User"}],
    comments:[{type:Schema.Types.ObjectId,ref:"User"}],
});




PostSchema.plugin(AutoIncrement,{id:"post_key_seq",inc_field:"key"});

module.exports = mongoose.model('Post', PostSchema);