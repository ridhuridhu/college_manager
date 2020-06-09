const mongoose = require('mongoose');
var AutoIncrement=require("mongoose-sequence")(mongoose);


const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  key:{type:Number,unique:true,required:false},
  Date:{type:Date,default:Date.now()},
  friends:{type:Array},
  friendRequest:{type:Array},
  post:{type:}
});

userSchema.plugin(AutoIncrement,{id:"key_seq",inc_field:"key"});

module.exports = mongoose.model('users', userSchema);