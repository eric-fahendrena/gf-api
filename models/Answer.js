import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  qId: String,
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
const Answer = mongoose.model("Answer", AnswerSchema);

export default Answer;
