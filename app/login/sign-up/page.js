"use client";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { auth } from "@/app/firebase/config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { register, handleSubmit } = useForm();

  const router = useRouter();

  async function onSubmitForm(data) {
    if (data.email === "" || data.password === "") {
      toast.error("Fill the empty inputs!");
      return;
    }

    try {
      const { email, password } = data;
      const res = await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Successfully signed up!");
      router.push("/login");
    } catch (error) {
      console.log(error);
      const errorMessage = error.message || "An unknown error occurred.";
      toast.error(errorMessage);
    }
  }
  function onSubmitFormErr(error) {
    console.log(error);
    toast.error("Form submission error");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h1>
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
