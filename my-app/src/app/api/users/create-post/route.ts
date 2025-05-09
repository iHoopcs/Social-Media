import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/user";
import { connectMongoDB } from "@/lib/mongodb";
import { IPost } from "../../../../../models/user";

export async function PUT(request: NextRequest) {
  //fetch new post payload & userId from session cookie
  const { payload } = await request.json();
  const userId = await request.cookies.get("session")?.value;

  if (!payload || !userId)
    return new NextResponse("Server error creating post", { status: 400 });

  await connectMongoDB();
  //find User by userId
  //append new post to User posts
  try {
    await User.findById(userId).then((user) => {
      console.log(user);
      const newPost: IPost = {
        postedBy: payload.postedBy,
        title: payload.title,
        content: payload.content,
        comments: [],
      };
      user.posts.push(newPost);
      user.save();
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Error accessing account", { status: 400 });
  }

  return new NextResponse("Post created!", { status: 200 });
}
