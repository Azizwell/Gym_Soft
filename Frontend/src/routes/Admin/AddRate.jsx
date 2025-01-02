import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddRateToUserMutation,
  useGetRateQuery,
  useGetReportQuery,
} from "../../store/services/adminService";
import { setRate } from "../../store/slices/appSlices";

function AddRate({ setVisible, refetch, userId }) {
  const navigate = useNavigate();
  const { data, isSuccess } = useGetRateQuery();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { rate, rateId } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(setRate(data));
    console.log(data);
  }, [data, isSuccess]);

  const [addRateToUser, { isLoading }] = useAddRateToUserMutation();
  const dispatch = useDispatch();
  const { refetch: reportRefetch } = useGetReportQuery(rateId.userId);

  const submitHandler = async (data) => {
    const admin = JSON.parse(localStorage.getItem("user"));
    const updateData = { ...data, userId: userId };
    console.log(updateData);
    addRateToUser(updateData)
      .then((userData) => {
        console.log(userData);
        toast.success("Signed up");
        refetch();
        reset();
        reportRefetch();
        setVisible(false);
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.code);
      });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 mt-2">
      <div>
        <label
          htmlFor="rateId"
          className="block text-sm font-medium text-gray-700"
        >
          Rate
        </label>
        <select
          {...register("rateId", {
            required: "Rate is required!",
          })}
          id="rateId"
          className="mt-2 border px-4 py-2 rounded-md w-full focus:outline-none focus:ring focus:ring-gray-300"
        >
          <option value="">select...</option>
          {rate?.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {errors.rateId && (
          <p className="mt-2 text-sm text-red-600">{errors.rateId.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        >
          Add Rate
        </button>
      </div>
    </form>
  );
}

export default AddRate;
