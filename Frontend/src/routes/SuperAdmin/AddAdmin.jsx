import React, { useEffect, useState } from "react";
import {
  useAddGymAdminMutation,
  useGetGymQuery,
  useUpdateAdminMutation,
} from "../../store/services/superAdminServices";
import { useDispatch, useSelector } from "react-redux";
import { setGym, setGymAdmin } from "../../store/slices/appSlices";
import { toast } from "react-toastify";
import "rodal/lib/rodal.css";
import { useForm } from "react-hook-form";
const AddAdmin = () => {
  const [admin, setadmin] = useState(null);
  const { data, isSuccess, refetch } = useGetGymQuery();
  const { gymAdmin, gymId } = useSelector((state) => state.app);
  const [addGymAdmin] = useAddGymAdminMutation();
  const [updateAdmin] = useUpdateAdminMutation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setGym(data));
    }
  }, [isSuccess, data]);

  const submitHandler = async (data) => {
    if (!gymAdmin.id) {
      const updateData = { ...data, GymId: gymId };
      addGymAdmin(updateData)
        .then((res) => {
          if (res.error) {
            toast.error("Xatolik");
            reset();
          }
          console.log(res);
          dispatch(setGymAdmin(res.data.admin));
          reset();
          setadmin(null);
          toast.success("Admin added");
        })
        .catch((e) => {
          toast.error("Xatolik");
          reset();
        });
    } else if (admin) {
      const updateData = { ...data, GymId: gymId };
      updateAdmin(updateData).then(({ data }) => {
        console.log(data);
        dispatch(setGymAdmin(data));
        reset();
        toast.success("Admin updated");
        setadmin(null);
      });
    } else {
      toast.info("Admin Mavjud");
      reset();
    }
  };

  return (
    <div>
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
            <p className="mt-1 text-sm text-red-500">
              {errors.username.message}
            </p>
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
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
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
            <p className="mt-1 text-sm text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="flex items-end w-full">
          <button
            type="submit"
            className=" bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 shadow-md transition duration-300"
          >
            {admin ? "update" : "Save"}
          </button>
        </div>
      </form>

      <table className="w-full  table-auto">
        <thead>
          <tr className="text-center bg-gray-100">
            <th className="border-y border-gray-300 px-4 py-2 font-semibold"></th>
            <th className="border-y border-gray-300 px-4 py-2 font-semibold">
              Admin Name
            </th>
            <th className="border-y border-gray-300 px-4 py-2 font-semibold">
              FullName
            </th>

            <th className="border-y border-gray-300 px-4 py-2 font-semibold">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {gymAdmin.id ? (
            <tr className="text-center hover:bg-gray-50">
              <td className="border-y border-gray-300 px-4 py-2 font-bold text-xl"></td>
              <td className="border-y border-gray-300 px-4 py-2">
                {gymAdmin?.username}
              </td>
              <td className="border-y border-gray-300 px-4 py-2">
                {gymAdmin?.fullName}
              </td>
              <td className="border-y border-gray-300 px-4 py-2">
                <button
                  onClick={() => {
                    setValue("username", gymAdmin.username);
                    setValue("fullName", gymAdmin.fullName);
                    setadmin([]);
                  }}
                  className="bg-yellow-400 px-3 py-1 rounded-2xl hover:bg-yellow-300"
                >
                  Edit
                </button>
              </td>
            </tr>
          ) : (
            <tr>
              <td
                colSpan="5"
                className="border-y border-gray-300 px-4 py-2 text-center text-gray-500"
              >
                User not found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AddAdmin;
