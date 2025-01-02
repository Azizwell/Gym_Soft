import React, { useEffect, useState } from "react";
import {
  useAddGymMutation,
  useDeleteGymMutation,
  useGetGymAdminMutation,
  useGetGymQuery,
} from "../../store/services/superAdminServices";
import { useDispatch, useSelector } from "react-redux";
import { setGym, setGymAdmin, setGymId } from "../../store/slices/appSlices";
import { toast } from "react-toastify";
import Rodal from "rodal";
import UpdateGym from "../../components/UpdateGym";
import "rodal/lib/rodal.css";
import { useNavigate } from "react-router-dom";
const AddGymCom = () => {
  const [hall, setHall] = useState({ name: "", location: "" });
  const [visible, setVisible] = useState(false);
  const [selectGym, setSelectGym] = useState(null);
  const { data, isSuccess, refetch } = useGetGymQuery();
  const { gym } = useSelector((state) => state.app);
  const [addGym] = useAddGymMutation();
  const [deleteGym] = useDeleteGymMutation();
  const [getGymAdmin] = useGetGymAdminMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getGymAdminHandler = (gymId) => {
    dispatch(setGymId(gymId));
    getGymAdmin(gymId).then((res) => {
      dispatch(setGymAdmin(res.data));
      console.log(res.data);
      navigate("/super_admin/admin");
    });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setGym(data));
    }
  }, [isSuccess, data]);

  const SaveGym = () => {
    addGym(hall).then((res) => {
      console.log(res);
      toast.success("Gym added");
      refetch();
      setHall({ name: "", location: "" });
    });
  };

  const deleteGymHandler = (gymId) => {
    deleteGym(gymId).then(() => {
      refetch();
      toast.success("successfuly");
    });
  };

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={hall.name}
          onChange={(e) => setHall({ ...hall, name: e.target.value })}
          placeholder="Gym name"
          className="border px-4 py-2 rounded-md w-1/3 focus:outline-none focus:ring focus:ring-gray-300"
        />
        <input
          type="text"
          value={hall.location}
          onChange={(e) => setHall({ ...hall, location: e.target.value })}
          placeholder="Location"
          className="border px-4 py-2 rounded-md w-1/3 focus:outline-none focus:ring focus:ring-gray-300"
        />
        <button
          onClick={SaveGym}
          className="bg-purple-500 text-white px-6 py-2 rounded-3xl hover:bg-purple-400 shadow-md"
        >
          Save
        </button>
      </div>

      <table className="w-full border-collapse ">
        <thead className="">
          <tr className=" text-center">
            <th className=" border-gray-300 px-4 py-2  font-semibold"></th>
            <th className=" border-gray-300 px-4 py-2  font-semibold">
              Gym Name
            </th>
            <th className=" border-gray-300 px-4 py-2  font-semibold">
              Location
            </th>
            <th className=" border-gray-300 px-4 py-2  font-semibold">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {gym.map((item) => (
            <tr key={item.id} className="text-left">
              <td className="border-y border-gray-300 px-4 py-2 font-bold text-xl"></td>
              <td className="border-y border-gray-300 px-4 py-2">
                {item.name}
              </td>
              <td className="border-y border-gray-300 px-4 py-2">
                {item.location}
              </td>
              <td className="border-y text-center border-gray-300 px-4 py-2 flex gap-2">
                <button
                  onClick={() => {
                    setSelectGym(item);
                    setVisible(true);
                  }}
                  className="bg-yellow-400 px-3 py-1 rounded-2xl hover:bg-yellow-300"
                >
                  edit
                </button>
                <button
                  onClick={() => {
                    deleteGymHandler(item.id);
                  }}
                  className="bg-red-600 text-white px-3 py-1 rounded-2xl hover:bg-red-500"
                >
                  delete
                </button>
                <button
                  onClick={() => {
                    getGymAdminHandler(item.id);
                  }}
                  className="bg-purple-500 text-white px-3 py-1 rounded-2xl hover:bg-purple-400"
                >
                  Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Rodal
        height={250}
        visible={visible}
        onClose={() => setVisible(!visible)}
      >
        <UpdateGym
          refetch={refetch}
          selectGym={selectGym}
          setVisible={setVisible}
          visible={visible}
        />
      </Rodal>
    </div>
  );
};

export default AddGymCom;
