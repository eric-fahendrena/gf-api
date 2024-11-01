import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model("Question", QuestionSchema);

export default Question;
