const mongoose = require('mongoose');
const Schema=mongoose.Schema;
mongoose.plugin(schema => { schema.options.usePushEach = true });
var AutoIncrement=require("mongoose-sequence")(mongoose);


const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  key:{type:Number,unique:true,required:false},
  Date:{type:Date,default:Date.now()},
  post:[{type:Schema.Types.ObjectId,ref:"Post"}],
  userClass:[{type:Schema.Types.ObjectId,ref:"User"}],
  followers:[{type:Schema.Types.ObjectId,ref:"USer"}],
  followersName:[{type:String}],
  following:[{type:Schema.Types.ObjectId,ref:"User"}],
  followingName:[{type:String}],
  


});

userSchema.plugin(AutoIncrement,{id:"key_seq",inc_field:"key"});

module.exports = mongoose.model('User', userSchema);