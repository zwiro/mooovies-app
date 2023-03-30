import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/firebaseConfig"
import { useRouter } from "next/router"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import FormFields from "@/components/Auth/FormFields"

function LoginPage() {
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleLogin: SubmitHandler<FieldValues> = async (data) => {
    const { email, password } = data
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/")
    } catch (error) {
      setError(true)
    }
  }

  const { register, handleSubmit } = useForm()

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="max-w-64 my-auto flex flex-col items-center gap-4 border border-zinc-800 bg-black/20 px-4 py-12 backdrop-blur"
    >
      <p className="pb-4 text-xl font-bold tracking-widest">
        Log in to your account
      </p>
      <FormFields register={register} />
      <button
        type="submit"
        className="rounded border border-red-700 px-4 py-2 text-red-700 transition-colors hover:bg-red-700 hover:text-white"
      >
        Log In
      </button>
      {error && <p>Incorrect credentials</p>}
    </form>
  )
}

export default LoginPage
