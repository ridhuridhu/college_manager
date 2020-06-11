const mongoose = require('mongoose');
const Schema=mongoose.Schema;
mongoose.plugin(schema => { schema.options.usePushEach = true });
var AutoIncrement=require("mongoose-sequence")(mongoose);

const PostSchema=new Schema({
    key:{type:Number,unique:true,required:false},
    date:{type:String,default:Date.now()},
    status:{type:String},
    user_id:{type:Schema.Types.ObjectId,ref:"User"},
    name:{type:String}, 
    image:{type:String},
    likes:[{type:Schema.Types.ObjectId,ref:"User"}],
    comments:[{type:Schema.Types.ObjectId,ref:"User"}],
});




PostSchema.plugin(AutoIncrement,{id:"post_key_seq",inc_field:"key"});

module.exports = mongoose.model('Post', PostSchema);