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

function RegisterPage() {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" })
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      )
      router.push("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-64 my-auto flex flex-col items-center gap-4 border border-zinc-800 bg-black/20 px-4 py-12 backdrop-blur"
    >
      <p className="pb-4 text-xl font-bold tracking-widest">
        Register a new account
      </p>
      <div className="flex items-center gap-4">
        <label htmlFor="email" className="w-24 text-right text-red-700">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="john@example.com"
          className="rounded px-2 py-1"
          value={userInfo.email}
          onChange={({ target }) =>
            setUserInfo((prevInfo) => {
              return { ...userInfo, email: target.value }
            })
          }
        />
      </div>
      <div className="flex items-center gap-4">
        <label htmlFor="email" className="w-24 text-right text-red-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="********"
          className="rounded px-2 py-1"
          value={userInfo.password}
          onChange={({ target }) =>
            setUserInfo((prevInfo) => {
              return { ...userInfo, password: target.value }
            })
          }
        />
      </div>
      <button
        type="submit"
        className="rounded border border-red-700 px-4 py-2 text-red-700 transition-colors hover:bg-red-700 hover:text-white"
      >
        Register
      </button>
    </form>
  )
}

export default RegisterPage
