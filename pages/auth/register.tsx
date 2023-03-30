import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/firebaseConfig"
import { useRouter } from "next/router"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import FormFields from "@/components/Auth/FormFields"

function RegisterPage() {
  const router = useRouter()

  const [isEmailInUse, setIsEmailInUse] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" })

  const registerUser: SubmitHandler<FieldValues> = async (data) => {
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
      <FormFields errors={errors} register={register} />
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
