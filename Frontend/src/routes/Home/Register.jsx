import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../store/services/userServices";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/appSlices";

function Register({ setVisible }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [signUp, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();

  const submitHandler = async (data) => {
    console.log(data);

    signUp(data)
      .unwrap()
      .then((userData) => {
        console.log(userData);
        toast.success("Signed up");
        reset();
        setVisible(false);
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.code);
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
            pattern: {
              value: /^\d{2}\d{3}\d{2}\d{2}$/,
              message: "Please enter a valid tel number!",
            },
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
              minLength: {
                value: 6,
                message: "The password must be at least 6 digits long!",
              },
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
        <label
          htmlFor="fullname"
          className="block text-sm font-medium text-gray-700"
        >
          FullName
        </label>
        <div className="">
          <input
            {...register("fullName", {
              required: "fullname kiritish shart",
              pattern: {
                value: /^[A-Z][a-z]+ [A-Z][a-z]+$/,
                message: "Please enter a valid fullName (e.g., Ali Valiev)!",
              },
            })}
            type="text"
            autoComplete="fullname"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.fullName && (
            <p className="mt-2 text-sm text-red-600">
              {errors.fullName.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <button
          disabled={isLoading}
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}

export default Register;
