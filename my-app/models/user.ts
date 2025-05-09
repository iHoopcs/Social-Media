import mongoose, { Schema, Document } from "mongoose";

interface IComment {
  commentedBy: string;
  commentContent: string;
}

export interface IPost {
  postedBy: string;
  title: string;
  content: string;
  comments: IComment[];
}

interface IUser extends Document {
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  posts: IPost[];
}

const CommentSchema = new Schema<IComment>(
  {
    commentedBy: { type: String, required: true },
    commentContent: { type: String, required: true },
  },
  { _id: false } //not querying specific schema
);

const PostSchema = new Schema<IPost>({
  postedBy: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  comments: { type: [CommentSchema], default: [] },
});

const UserSchema = new Schema<IUser>(
  {
    displayName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    posts: { type: [PostSchema], default: [] },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
