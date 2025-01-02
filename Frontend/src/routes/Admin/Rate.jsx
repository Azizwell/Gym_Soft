import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import {
  useAddRateQueryMutation,
  useDeleteRateMutation,
  useGetRateQuery,
} from "../../store/services/adminService";
import { setRate } from "../../store/slices/appSlices";

const Rate = () => {
  const { rate } = useSelector((state) => state.app);
  const [inputGroup, setInputGroup] = useState({
    day: "",
    name: "",
    price: "",
    check: false,
  });
  const dispatch = useDispatch();
  const { data, isSuccess, refetch } = useGetRateQuery();
  const [addRateQuery] = useAddRateQueryMutation();
  const [deleteRate] = useDeleteRateMutation();

  useEffect(() => {
    dispatch(setRate(data));
    console.log(data);
  }, [isSuccess, data]);

  const addRate = () => {
    const admin = JSON.parse(localStorage.getItem("user"));
    const data = { ...inputGroup, adminName: admin.login };
    if (data.check) {
      delete data.check;
      const updateData = {
        ...data,
        day: Math.round(data.day / 2),
        everyDay: data.day,
      };
      //   console.log(updateData);
      addRateQuery(updateData).then((res) => {
        refetch();
        setInputGroup({
          day: "",
          name: "",
          price: "",
          check: false,
        });
      });
    } else {
      delete data.check;
      const updateData = {
        ...data,
        everyDay: data.day,
      };
      //   console.log(updateData);
      addRateQuery(updateData).then((res) => {
        console.log(res);
        refetch();
        setInputGroup({
          day: "",
          name: "",
          price: "",
          check: false,
        });
      });
    }
  };

  const deletRateHandler = (rateId) => {
    deleteRate(rateId).then(() => {
      refetch();
    });
  };

  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          value={inputGroup.name}
          onChange={(e) =>
            setInputGroup({ ...inputGroup, name: e.target.value })
          }
          placeholder="Rate name"
          className="border px-4 py-2 rounded-md w-1/3 focus:outline-none focus:ring focus:ring-gray-300"
        />
        <input
          type="number"
          value={inputGroup.price}
          onChange={(e) =>
            setInputGroup({ ...inputGroup, price: e.target.value })
          }
          placeholder="Rate price"
          className="border px-4 py-2 rounded-md w-1/3 focus:outline-none focus:ring focus:ring-gray-300"
        />
        <input
          type="number"
          value={inputGroup.day}
          onChange={(e) =>
            setInputGroup({ ...inputGroup, day: e.target.value })
          }
          placeholder="Day"
          className="border px-4 py-2 rounded-md w-1/3 focus:outline-none focus:ring focus:ring-gray-300"
        />
        <label className="border rounded-md w-1/4 px-4 py-2 flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inputGroup.check}
            onChange={(e) =>
              setInputGroup({ ...inputGroup, check: e.target.checked })
            }
            className="form-checkbox text-purple-500 h-5 w-5 focus:ring-0"
          />
          <span className="text-gray-700">Every other day</span>
        </label>
        <button
          onClick={() => {
            addRate();
          }}
          className="bg-purple-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-purple-600"
        >
          save
        </button>
      </div>

      <div className="space-y-4">
        {rate?.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center space-x-4">
              <div>
                <h3 className="font-semibold text-lg">{user.name}</h3>
              </div>
            </div>

            <div className="text-gray-700">
              <p>{user.price} &nbsp; ming </p>
            </div>

            <p className="text-gray-700">{user.day} &nbsp; kun</p>

            <div>
              <button
                onClick={() => deletRateHandler(user.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-full shadow hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rate;

{
  /* <Rodal
height={action == "register" ? 400 : 150}
visible={visible}
onClose={() => setVisible(!visible)}
>
<div>
  {action === "register" ? (
    <RegisterUser refetch={refetch} setVisible={setVisible} />
  ) : action === "addRate" ? (
    <AddRate
      refetch={refetch}
      userId={userId}
      setVisible={setVisible}
    />
  ) : (
    ""
  )}
</div>
</Rodal> */
}
