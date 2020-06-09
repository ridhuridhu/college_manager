const mongoose = require('mongoose');
var AutoIncrement=require("mongoose-sequence")(mongoose);

const PostSchema=new mongoose.Schema({
    
});




PostSchema.plugin(AutoIncrement,{id:"key_seq",inc_field:"key"});

module.exports = mongoose.model('users', userSchema);