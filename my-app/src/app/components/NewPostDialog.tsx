"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const commentSchema = z.object({
  commentedBy: z.string(),
  commentContent: z.string(),
});

export const postSchema = z.object({
  postedBy: z.string().min(2),
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(20, { message: "Title cannot be longer than 20 characters long" }),
  content: z.string().min(1, { message: "Post content cannot be empty" }),
  imageSrc: z.string().optional(),
  comments: z.array(commentSchema).optional(),
});

export const NewPostDialog = ({ data }: { data: any }) => {
  const postForm = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      postedBy: data.firstName,
      title: "",
      content: "",
      imageSrc: "",
      comments: [],
    },
  });

  //handle react-hook-form submission
  async function handleCreatePost(values: z.infer<typeof postSchema>) {
    console.log(values);
    try {
      const response = await fetch("/api/users/create-post", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload: values }),
      });
      console.log(response);
      if (response.ok) {
        //close & reset form
        postForm.reset();
        toast("Post created!", {
          description: "Your post has been published.",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="rounded-2xl cursor-pointer mb-5 w-full max-w-sm">
          New Post?
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            New Social Media Post
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            You will be logged out and prompted to log back in.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...postForm}>
          <form
            onSubmit={postForm.handleSubmit(handleCreatePost)}
            className="space-y-8 m-4"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Title */}
              <div className="grid col-span-2">
                <FormField
                  control={postForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="This will be the post title"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Image src */}
              <div className="grid col-span-2 mt-2">
                <FormField
                  control={postForm.control}
                  name="imageSrc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload an image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          {...field}
                          className="border bg-slate-50"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Content */}
              <div className="grid col-span-2 mt-2">
                <FormField
                  control={postForm.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share a little more about what you want to post"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <AlertDialogAction type="submit" className="w-full cursor-pointer">
              Create Post
            </AlertDialogAction>
          </form>
        </Form>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
