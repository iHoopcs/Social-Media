"use client";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { useState } from "react";
interface LoginPayload {
  email: String;
  password: String;
}
interface RegisterPayload {
  fName: String;
  lName: String;
  email: String;
  password: String;
}

export default function Home() {
  const [loginClickedStyle, setLoginClickedStyle] = useState(false);
  const [registerClickedStyle, setRegisterClickedStyle] = useState(false);

  const [loginDisplayed, setLoginDisplayed] = useState(false);
  const [registerDisplayed, setRegisterDisplayed] = useState(false);

  // login payload
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const handleLogin = async (e: any) => {
    e.preventDefault();
    const payload: LoginPayload = {
      email: loginEmail,
      password: loginPassword,
    };

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload }),
    });

    console.log(response);
    if (response.ok) {
      redirect("/pages/dashboard");
    }
  };

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const handleRegister = async (e: any) => {
    e.preventDefault();
    const payload: RegisterPayload = {
      fName: fName,
      lName: lName,
      email: registerEmail,
      password: registerPassword,
    };
    console.log;

    // const response = await fetch("http://localhost:3000/api/auth/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ payload }),
    // });

    // console.log(response);
  };
  return (
    <>
      <div className="flex flex-row justify-center items-center min-h-screen">
        <div className="flex flex-col w-full items-center">
          <Button
            variant={loginClickedStyle ? "default" : "outline"}
            className="cursor-pointer w-full max-w-sm"
            onClick={() => {
              setLoginClickedStyle(true);
              setRegisterClickedStyle(false);
              setLoginDisplayed(true);
              setRegisterDisplayed(false);
            }}
          >
            Login
          </Button>
          <Button
            variant={registerClickedStyle ? "default" : "outline"}
            className="cursor-pointer mt-4 w-full max-w-sm"
            onClick={() => {
              setRegisterClickedStyle(true);
              setLoginClickedStyle(false);
              setRegisterDisplayed(true);
              setLoginDisplayed(false);
            }}
          >
            Register
          </Button>
        </div>

        <div className="flex flex-col w-full items-center">
          {loginDisplayed ? (
            <form className="flex flex-col" onSubmit={handleLogin}>
              <input
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                }}
                className="border p-2 rounded w-full"
              />
              <input
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }}
                className="border p-2 rounded w-full mt-2"
              />
              <button
                type="submit"
                className="border rounded p-2 w-full mt-5 hover:bg-blue-500 cursor-pointer"
              >
                Login
              </button>
            </form>
          ) : null}

          {registerDisplayed ? (
            <form className="flex flex-col" onSubmit={handleRegister}>
              <input
                placeholder="First name"
                value={fName}
                onChange={(e) => {
                  setFName(e.target.value);
                }}
                className="border p-2 rounded w-full"
              />
              <input
                placeholder="Last name"
                value={lName}
                onChange={(e) => {
                  setLName(e.target.value);
                }}
                className="border p-2 rounded w-full mt-2"
              />
              <input
                placeholder="Enter your email"
                value={registerEmail}
                onChange={(e) => {
                  setRegisterEmail(e.target.value);
                }}
                className="border p-2 rounded w-full mt-2"
              />
              <input
                placeholder="Create account password"
                value={registerPassword}
                onChange={(e) => {
                  setRegisterPassword(e.target.value);
                }}
                className="border p-2 rounded w-full mt-2"
              />
              <button
                type="submit"
                className="border rounded p-2 w-full mt-5 hover:bg-blue-500 cursor-pointer"
              >
                Register
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </>
  );
}
