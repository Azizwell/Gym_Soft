import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useUpdateSuperAdminMutation } from "../../store/services/superAdminServices";
import { toast } from "react-toastify";
import { setUser } from "../../store/slices/appSlices";

const SettingSuperAdm = () => {
  const [updateSuperAdmin] = useUpdateSuperAdminMutation();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    console.log(data);
    updateSuperAdmin(data).then((res) => {
      if (res.error) {
        toast.error("error");
      }
      if (res.data) {
        dispatch(setUser(res.data));
        localStorage.setItem("user", JSON.stringify(res.data));
        toast.success("success");
        reset();
      }
      console.log(res);
    });
  };
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col md:flex-row gap-6 mb-6 "
    >
      {/* Телефон */}
      <div className="flex flex-col w-full">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Tel number
        </label>
        <input
          id="email"
          type="text"
          value={register.username}
          placeholder="911234567"
          className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
          {...register("username", {
            required: "Tel number is required!",
            pattern: {
              value: /^\d{2}\d{3}\d{2}\d{2}$/,
              message: "Please enter a valid tel number!",
            },
          })}
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      {/* Пароль */}
      <div className="flex flex-col w-full">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          {...register("password", {
            required: "Password is required!",
            minLength: {
              value: 6,
              message: "The password must be at least 6 digits long!",
            },
          })}
          type="password"
          className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Полное имя */}
      <div className="flex flex-col w-full">
        <label
          htmlFor="fullname"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          FullName
        </label>
        <input
          {...register("fullName", {
            required: "Fullname is required!",
            pattern: {
              value: /^[A-Z][a-z]+ [A-Z][a-z]+$/,
              message: "Please enter a valid fullName (e.g., Ali Valiev)!",
            },
          })}
          type="text"
          value={register.fullName}
          placeholder="Ali Valiev"
          className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div className="flex items-end w-full">
        <button
          type="submit"
          className=" bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 shadow-md transition duration-300"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default SettingSuperAdm;
