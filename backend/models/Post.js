import mongoose, { Schema } from "mongoose";


const postSchema = new Schema({
  description: String,
  imageUrl: String,

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
      required: true
  },

  likes: [
    {
      users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    }
  ],
  comments: [
    {
      madeBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
      },
      text: String,
      createdAt: {
          type: Date,
          default: Date.now
        }}
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Post = mongoose.model("Post", postSchema)

export default Post