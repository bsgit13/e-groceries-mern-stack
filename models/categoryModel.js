import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    // unique: true,
  },
  //   install slugify package
  slug: {
    type: String,
    lowercase: true,
  },
});
// category is collection name, categorySchema is the reference type

export default mongoose.model("Category", categorySchema);