"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

//shadcn form validation
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({}),
  password: z.string().min(8, {}),
});

export const AuthComponent = () => {
  //shadcn form validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const [hasAccountAlready, setHasAccountAlready] = useState(false);

  return (
    <>
      <main className="flex h-screen justify-center items-center">
        {!hasAccountAlready ? (
          <Card className="mx-auto max-w-sm p-5">
            <CardHeader>
              <CardTitle className="text-xl text-center">Register</CardTitle>
            </CardHeader>
            <CardDescription className="text-center">
              Enter your information to create an account
            </CardDescription>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="first name" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="last name" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid col-span-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="email" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid col-span-2">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input placeholder="password" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />{" "}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full max-w-sm cursor-pointer"
                  >
                    Register
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              Already have an account?
              <Button
                variant={"outline"}
                className="mx-auto cursor-pointer"
                onClick={() => {
                  setHasAccountAlready(true);
                }}
              >
                Login
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="mx-auto max-w-sm p-5">
            <CardHeader>
              <CardTitle className="text-xl text-center">Login</CardTitle>
            </CardHeader>
            <CardDescription className="text-center">
              Enter account information to login
            </CardDescription>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid col-span-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="email" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid col-span-2">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input placeholder="password" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />{" "}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full max-w-sm cursor-pointer"
                  >
                    Login
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              Don't have an account?
              <Button
                variant={"outline"}
                className="mx-4 cursor-pointer"
                onClick={() => {
                  setHasAccountAlready(false);
                }}
              >
                Register
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>
    </>
  );
};
