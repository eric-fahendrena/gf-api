import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  path: "String",
  name: String,
});

const ItemSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  items: [{ type: mongoose.Schema.Types.Mixed }],
  books: [BookSchema],
});

const BranchSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  items: [ItemSchema],
});

const Branch = mongoose.model("Branch", BranchSchema);

export default Branch;
