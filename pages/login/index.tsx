import { NextPage } from "next"
import { signIn } from "next-auth/react"
import { FormEventHandler, useState } from "react"

function LoginPage() {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" })
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your userinfo
    e.preventDefault()

    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    })

    console.log(res)
  }
  return (
    <form className="max-w-64 flex flex-col items-center gap-4 border border-zinc-800 bg-black/20 px-4 py-12 backdrop-blur">
      <div className="flex items-center gap-4">
        <label htmlFor="email" className="w-24 text-red-700">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="john@example.com"
          className="rounded px-2 py-1"
        />
      </div>
      <div className="flex items-center gap-4">
        <label htmlFor="email" className="w-24 text-red-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="********"
          className="rounded px-2 py-1"
        />
      </div>
    </form>
  )
}

export default LoginPage
