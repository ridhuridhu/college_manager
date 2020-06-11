const mongoose = require('mongoose');
const Schema=mongoose.Schema;
var AutoIncrement=require("mongoose-sequence")(mongoose);


const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  key:{type:Number,unique:true,required:false},
  Date:{type:Date,default:Date.now()},
  friends:[{type:Schema.Types.ObjectId,ref:"User"}],
  friendRequest:[{type:Schema.Types.ObjectId,ref:"User"}],
  post:[{type:Schema.Types.ObjectId,ref:"Post"}],
});

userSchema.plugin(AutoIncrement,{id:"key_seq",inc_field:"key"});

module.exports = mongoose.model('User', userSchema);