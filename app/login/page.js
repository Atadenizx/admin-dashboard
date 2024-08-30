"use client";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config";
import { setCookie } from "cookies-next";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  async function onSubmitForm(data) {
    // Check for empty inputs
    if (data.email === "" || data.password === "") {
      toast.error("Fill the empty inputs!"); // Display toast message
      return;
    }
    try {
      const { email, password } = data;
      const res = await signInWithEmailAndPassword(auth, email, password);
      const token = await res.user.getIdToken(); // Get Firebase ID Token
      setCookie("authToken", token); // Store token in cookies
      toast.success("Successfully signed in!");
      router.push("/protected/dashboard");
    } catch (error) {
      console.log(error);
      const errorMessage = error.message || "An unknown error occurred.";
      toast.error(errorMessage);
    }
  }
  function onSubmitFormErr(error) {
    console.log(error);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmitForm, onSubmitFormErr)}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email")}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              {...register("password")}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
          >
            Login
          </button>
        </form>
        <div className="flex flex-col items-center">
          <h2>Don&apos;t have an account yet?</h2>
          <Link
            className="px-4 py-2 font-semibold text-indigo-600 bg-white border-2 border-indigo-600 rounded-md "
            href="/login/sign-up"
          >
            Sign Up Here
          </Link>
        </div>
      </div>
    </div>
  );
}
