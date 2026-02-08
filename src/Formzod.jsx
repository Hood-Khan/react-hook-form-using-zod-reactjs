import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    name: z
      .string()
      .min(3, "Minimum length should be 3")
      .max(20, "Maximum length should be 20"),

    dob: z
      .string()
      .nonempty("Date of birth is required")
      .refine((date) => {
        const today = new Date();
        const birthDate = new Date(date);

        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        return age >= 10 && age <= 80;
      }, "Age must be between 10 and 80"),

    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


function Formzod() {
  const { register, handleSubmit, control, formState } = useForm({
    // defaultValues: {
    //   name: "khan",
    //   email: "xyz@gmail.com",
    //   password: "123456"
    // },

    resolver: zodResolver(formSchema)
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Registration Form
        </h2>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Name
          </label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
              ${errors.name ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-300"}`}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">
              {errors.name?.message}
            </p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            DOB
          </label>
          <input
            type="date"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2
              ${errors.dob ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-300"}`}
            {...register("dob")}
          />
          {errors.dob && (
            <p className="text-sm text-red-600 mt-1">
              {errors.dob?.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2
              ${errors.email ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-300"}`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">
              {errors.email?.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2
              ${errors.password ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-300"}`}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">
              {errors.password?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2
              ${errors.password ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-300"}`}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600 mt-1">
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium
            hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>

      <DevTool control={control} placement="top-left" />
    </div>
  );
}

export default Formzod;