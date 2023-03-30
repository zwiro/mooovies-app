import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface FormProps {
  errors?: FieldErrors<FieldValues>
  register: UseFormRegister<FieldValues>
}

function FormFields({ errors, register }: FormProps) {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center gap-4">
          <label htmlFor="email" className="w-24 text-right text-red-700">
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="john@example.com"
            className={`rounded border px-2 py-1 ${
              errors?.email ? "border-red-700" : "border-zinc-600"
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
        {errors?.email ? (
          <span role="alert" className="h-4 pt-1 text-right text-xs">
            {errors.email.message?.toString()}
          </span>
        ) : (
          <div className="h-4" />
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
            className={`rounded border px-2 py-1 outline-none ${
              errors?.password ? "border-red-700" : "border-zinc-600"
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
        {errors?.password ? (
          <span role="alert" className="h-4 pt-1 text-right text-xs">
            {errors.password.message?.toString()}
          </span>
        ) : (
          <div className="h-4" />
        )}
      </div>
    </>
  )
}

export default FormFields
