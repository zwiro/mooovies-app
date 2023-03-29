import { NextPage } from "next"
import { signIn } from "next-auth/react"
import { FormEventHandler, useState } from "react"
import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth"
import { auth } from "@/firebase/firebaseConfig"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

//make reusable posibly with custom hook

function RegisterPage() {
  const router = useRouter()

  const [isEmailInUse, setIsEmailInUse] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" })

  const registerUser = async (data) => {
    const { email, password } = data
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      router.push("/")
    } catch (error) {
      setIsEmailInUse(true)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(registerUser)}
      className="max-w-64 my-auto flex flex-col items-center gap-4 border border-zinc-800 bg-black/20 px-4 py-12 backdrop-blur"
    >
      <p className="pb-4 text-xl font-bold tracking-widest">
        Register a new account
      </p>
      <div className="flex flex-col">
        <div className="flex items-center gap-4">
          <label htmlFor="email" className="w-24 text-right text-red-700">
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="john@example.com"
            className={`rounded border border-zinc-600 px-2 py-1 ${
              errors.email && "border-red-700"
            } `}
            {...register("email", {
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            })}
          />
        </div>
        {errors.email && (
          <span role="alert" className="pt-1 text-right text-xs">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-4">
          <label htmlFor="email" className="w-24 text-right text-red-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="********"
            className={`rounded border border-zinc-600 px-2 py-1 ${
              errors.password && "border-red-700"
            } `}
            {...register("password", {
              required: true,
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
              },
            })}
          />
        </div>
        {errors.password && (
          <span role="alert" className="pt-1 text-right text-xs">
            {errors.password.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="rounded border border-red-700 px-4 py-2 text-red-700 transition-colors hover:bg-red-700 hover:text-white"
      >
        Register
      </button>
      {isEmailInUse && <p>This email is already in use</p>}
    </form>
  )
}

export default RegisterPage
