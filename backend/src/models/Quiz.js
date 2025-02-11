 const mongoose =require("mongoose");

 const QuizSchema =new mongoose({
    title:{type:String,required:true},
    topicId:{type:mongoose.Schema.Types.ObjectId,ref:"Topic",required:true}
    
},{timestamps:true});

modeule.exports = mongoose.model("Quiz",QuizSchema);