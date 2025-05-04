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
const registerSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({}),
  password: z.string().min(8, {}),
});
const loginSchema = z.object({
  email: z.string().email({}),
  password: z.string().min(8, {}),
});

export const AuthComponent = () => {
  const [displayMsg, setDisplayMsg] = useState("");
  const [hasAccountAlready, setHasAccountAlready] = useState(false);

  //shadcn form validation
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function handleRegister(values: z.infer<typeof registerSchema>) {
    console.log(values);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: values }),
    });
    console.log(response);

    if (!response.ok)
      setDisplayMsg("Account already exists with provided email");
    else {
      registerForm.reset();
      setHasAccountAlready(true);
      setDisplayMsg("Account created!");
    }
  }
  async function handleLogin(values: z.infer<typeof loginSchema>) {
    console.log(values);

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: values }),
    });
    console.log(response);

    if (response.status === 400)
      setDisplayMsg("Could not find account with provided email");
    else if (response.status === 401) {
      setDisplayMsg("Incorrect password");
    } else {
      //200 success
      loginForm.reset();
    }
  }

  return (
    <>
      <main className="flex h-screen justify-center items-center">
        <Card
          className={`mx-auto max-w-sm p-5 w-full ${
            !hasAccountAlready ? "block" : "hidden"
          }`}
        >
          <CardHeader>
            <CardTitle className="text-xl text-center mb-2">Register</CardTitle>
          </CardHeader>
          <CardDescription className="text-center mb-5">
            Enter your information to create an account
          </CardDescription>
          <CardContent>
            <Form {...registerForm}>
              <form
                onSubmit={registerForm.handleSubmit(handleRegister)}
                className="space-y-8"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={registerForm.control}
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
                    control={registerForm.control}
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
                      control={registerForm.control}
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
                      control={registerForm.control}
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

                  <div className="grid col-span-2">
                    {displayMsg ? (
                      <span className="text-red-400 text-sm text-center mt-2">
                        *{displayMsg}*
                      </span>
                    ) : null}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full max-w-sm cursor-pointer "
                >
                  Register
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="grid col-span-2 justify-center gap-4 p-5">
            Already have an account?
            <Button
              variant={"outline"}
              className="mx-auto cursor-pointer w-full"
              onClick={() => {
                setHasAccountAlready(true);
                setDisplayMsg("");
              }}
            >
              Login
            </Button>
          </CardFooter>
        </Card>

        <Card
          className={`mx-auto max-w-sm p-5 w-full ${
            hasAccountAlready ? "block" : "hidden"
          }`}
        >
          <CardHeader>
            <CardTitle className="text-xl text-center mb-2">Login</CardTitle>
          </CardHeader>
          <CardDescription className="text-center mb-3">
            Enter account information to login
          </CardDescription>
          <CardContent>
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(handleLogin)}
                className="space-y-8"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid col-span-2">
                    {displayMsg ? (
                      <span className="text-green-600 text-sm text-center mt-2">
                        *{displayMsg}*
                      </span>
                    ) : null}
                  </div>
                  <div className="grid col-span-2">
                    <FormField
                      control={loginForm.control}
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
                      control={loginForm.control}
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
                    />
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
          <CardFooter className="grid col-span-2 justify-center gap-4 p-5">
            Don't have an account?
            <Button
              variant={"outline"}
              className="mx-auto cursor-pointer w-full"
              onClick={() => {
                setHasAccountAlready(false);
                setDisplayMsg("");
              }}
            >
              Register
            </Button>
          </CardFooter>
        </Card>
      </main>
    </>
  );
};
