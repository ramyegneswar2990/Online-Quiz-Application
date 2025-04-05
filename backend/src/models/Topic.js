const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
    name:{type:String,require:true},
    description:{type:string},
    courseId:{type:mongoose.Schema.Types.ObjectId,ref:"Course",required:true}
},{timestamps:true});
module.exports=mongoose.model("Topic",TopicSchema);