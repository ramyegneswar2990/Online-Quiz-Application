const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
    title:{type:String,require:true},
    courseId:{typr:mongoose.Schema.Types.ObjectId,ref:"Course",reuired:true}
},{timestamps:true});
module.exports=mongoose.model("Topic",TopicSchema);