import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../store/services/userServices";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/appSlices";

function Login({ setVisible }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [login] = useLoginMutation();
  const submitHandler = async (data) => {
    console.log(data);
    login(data)
      .unwrap()
      .then((response) => {
        console.log(response);
        reset();
        toast.success("Signed up");
        setVisible(false);
        dispatch(setUser(response));
        localStorage.setItem("user", JSON.stringify(response));

        if (response.role === "ROLE_SUPER_ADMIN") {
          navigate("/super_admin");
        } else if (response.role === "ROLE_ADMIN") {
          navigate("/admin/index");
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("invalid password or tel number");
      });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Tel number
        </label>
        <input
          id="email"
          type="text"
          placeholder="911234567"
          className="mt-1 block w-full p-2 border rounded"
          {...register("username", {
            required: "Tel number is required!",
          })}
        />

        {errors.username && (
          <p className="mt-2 text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-2">
          <input
            {...register("password", {
              required: "Password is required!",
            })}
            type="password"
            autoComplete="current-password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}

export default Login;
