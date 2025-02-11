 const mongoose = require("mongoose");

 const QuestionSchema = new mongoose.Schema({
    quizId:{type:mongoose.Schema.Types.ObjectId,ref:"Quiz",required:true},
    questionText:{type:String,required:true},
    options:[{type:String,required:true}],
    correctOption:{type:Number,required:true},
    points:{type:Number,default:0}
 },{timestamps:true});

 module.exports =mongoose.model("Question",QuestionSchema);