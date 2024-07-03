import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../@types/types";
import dialogs, { showSuccessDialog } from "../ui/dialogs";
import patterns from "../validation/patterns";
import { useAuth } from "../context/AuthContext"; // ייבוא נכון של useAuth

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onLogin = (data: LoginUser) => {
    console.log('Login data:', data); // הוספת הודעת ניפוי
    login(data.email, data.password)
      .then(() => {
        showSuccessDialog("Login", "Logged in");
        navigate("/");
      })
      .catch((e: any) => {
        dialogs.error("Login Error", e.response?.data || "An error occurred during login");
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>();

  return (
<div className="login-page min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 dark:text-white">
<div className="max-w-md w-full bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
<h2 className="text-3xl font-bold mb-6 text-center">Login Page</h2>
<form noValidate onSubmit={handleSubmit(onLogin)} className="">
  {/* email */}
<section className="mb-4">
            <input
              placeholder="Email"
              autoCapitalize="true"
              autoCorrect="false"
              autoComplete="email"
              type="email"
              {...register("email", {
                required: "This field is mandatory",
                pattern: patterns.email,
              })}
              className="w-full p-3 border border-gray-300 rounded-md text-black"
            />
            {errors.email && <p className="text-red-500 mt-2">{errors.email?.message}</p>}
          </section>

          {/* password */}
          <section className="mb-4">
            <input
              autoComplete="current-password"
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "This field is mandatory",
                pattern: patterns.password,
              })}
              className="w-full p-3 border border-gray-300 rounded-md text-black"
            />
            {errors.password && <p className="text-red-500 mt-2">{errors.password?.message}</p>}
          </section>

          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
